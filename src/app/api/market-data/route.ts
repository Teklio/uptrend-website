import { NextResponse } from "next/server";

export interface MarketItem {
  id: string;
  symbol: string;
  name: string;
  category: "Indian Indices" | "Global Indices" | "Forex" | "Commodities";
  price: number;
  change: number;
  changePercent: number;
  high?: number;
  low?: number;
  previousClose?: number;
  currency: string;
  tradingViewSymbol: string;
  lastUpdated: string;
  status: "up" | "down" | "neutral";
}

const INSTRUMENT_CONFIGS = [
  {
    id: "nifty-50",
    symbol: "^NSEI",
    name: "Nifty 50 Index",
    category: "Indian Indices" as const,
    currency: "₹",
    tradingViewSymbol: "NSE:NIFTY",
  },
  {
    id: "nifty-midsmallcap-400",
    symbol: "MIDSMALL.NS",
    fallbackSymbol: "0P0001YAYR.BO",
    name: "Nifty MidSmallCap 400",
    category: "Indian Indices" as const,
    currency: "₹",
    tradingViewSymbol: "AMEX:INDA",
  },
  {
    id: "nifty-midcap-100",
    symbol: "NIFTY_MIDCAP_100.NS",
    name: "Nifty MidCap 100",
    category: "Indian Indices" as const,
    currency: "₹",
    tradingViewSymbol: "AMEX:INDA",
  },
  {
    id: "nifty-smallcap-100",
    symbol: "^CNXSC",
    name: "Nifty SmallCap 100",
    category: "Indian Indices" as const,
    currency: "₹",
    tradingViewSymbol: "AMEX:INDA",
  },
  {
    id: "xauusd",
    symbol: "GC=F",
    name: "XAUUSD (Gold)",
    category: "Commodities" as const,
    currency: "$",
    tradingViewSymbol: "TVC:GOLD",
  },
  {
    id: "dxy",
    symbol: "DX-Y.NYB",
    name: "US Dollar Currency Index",
    category: "Forex" as const,
    currency: "",
    tradingViewSymbol: "CAPITALCOM:DXY",
  },
  {
    id: "sp500",
    symbol: "^GSPC",
    name: "S&P 500 Index",
    category: "Global Indices" as const,
    currency: "$",
    tradingViewSymbol: "FOREXCOM:SPXUSD",
  },
  {
    id: "dowjones",
    symbol: "^DJI",
    name: "Dow Jones Industrial Average",
    category: "Global Indices" as const,
    currency: "$",
    tradingViewSymbol: "FOREXCOM:DJI",
  },
  {
    id: "nasdaq100",
    symbol: "^NDX",
    name: "Nasdaq 100 Index",
    category: "Global Indices" as const,
    currency: "$",
    tradingViewSymbol: "FOREXCOM:NSXUSD",
  },
  {
    id: "brent-crude",
    symbol: "BZ=F",
    name: "Brent Crude Oil Futures",
    category: "Commodities" as const,
    currency: "$",
    tradingViewSymbol: "TVC:UKOIL",
  },
  {
    id: "usdinr",
    symbol: "USDINR=X",
    name: "Indian Rupee / US Dollar",
    category: "Forex" as const,
    currency: "₹",
    tradingViewSymbol: "FX_IDC:USDINR",
  },
];

// In-memory cache to prevent Yahoo rate limits and reduce latency
let cachedData: { timestamp: number; items: MarketItem[] } | null = null;
const CACHE_TTL_MS = 15000; // 15 seconds

async function fetchQuote(config: typeof INSTRUMENT_CONFIGS[number]): Promise<MarketItem | null> {
  const fallbackSymbol = "fallbackSymbol" in config ? config.fallbackSymbol : undefined;
  const symbolsToTry = [config.symbol, fallbackSymbol].filter((s): s is string => Boolean(s));

  for (const sym of symbolsToTry) {
    try {
      const url = `https://query1.finance.yahoo.com/v8/finance/chart/${encodeURIComponent(sym)}?interval=1d&range=1d`;
      const res = await fetch(url, {
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "application/json",
        },
        next: { revalidate: 15 },
      });

      if (!res.ok) continue;

      const data = await res.json();
      const meta = data.chart?.result?.[0]?.meta;

      if (!meta || meta.regularMarketPrice === undefined || meta.regularMarketPrice === null) {
        continue;
      }

      const price: number = meta.regularMarketPrice;
      const prevClose: number = meta.chartPreviousClose || meta.previousClose || price;
      const change: number = price - prevClose;
      const changePercent: number =
        meta.regularMarketChangePercent !== undefined && meta.regularMarketChangePercent !== null
          ? meta.regularMarketChangePercent
          : prevClose > 0
          ? (change / prevClose) * 100
          : 0;

      const status = change > 0.0001 ? "up" : change < -0.0001 ? "down" : "neutral";

      return {
        id: config.id,
        symbol: config.symbol,
        name: config.name,
        category: config.category,
        price,
        change,
        changePercent,
        high: meta.regularMarketDayHigh || meta.dayHigh,
        low: meta.regularMarketDayLow || meta.dayLow,
        previousClose: prevClose,
        currency: config.currency,
        tradingViewSymbol: config.tradingViewSymbol,
        lastUpdated: new Date().toISOString(),
        status,
      };
    } catch {
      // Continue to next fallback if any
    }
  }

  return {
    id: config.id,
    symbol: config.symbol,
    name: config.name,
    category: config.category,
    price: 0,
    change: 0,
    changePercent: 0,
    currency: config.currency,
    tradingViewSymbol: config.tradingViewSymbol,
    lastUpdated: new Date().toISOString(),
    status: "neutral",
  };
}

export async function GET() {
  try {
    const now = Date.now();
    if (cachedData && now - cachedData.timestamp < CACHE_TTL_MS) {
      return NextResponse.json(
        {
          success: true,
          cached: true,
          data: cachedData.items,
          timestamp: new Date(cachedData.timestamp).toISOString(),
        },
        {
          headers: {
            "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
          },
        }
      );
    }

    const promises = INSTRUMENT_CONFIGS.map((cfg) => fetchQuote(cfg));
    const results = await Promise.all(promises);
    const validItems = results.filter((item): item is MarketItem => item !== null && item.price > 0);

    if (validItems.length > 0) {
      cachedData = {
        timestamp: now,
        items: validItems,
      };
    }

    return NextResponse.json(
      {
        success: true,
        cached: false,
        data: validItems.length > 0 ? validItems : cachedData?.items || [],
        timestamp: new Date().toISOString(),
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=15, stale-while-revalidate=30",
        },
      }
    );
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "Failed to fetch live market data",
        data: cachedData?.items || [],
      },
      { status: 500 }
    );
  }
}
