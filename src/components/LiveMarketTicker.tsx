"use client";

import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiActivity,
  FiRefreshCw,
  FiX,
  FiExternalLink,
  FiGrid,
  FiSliders,
} from "react-icons/fi";
import { MarketItem } from "@/app/api/market-data/route";

const CATEGORIES = ["All", "Indian Indices", "Global Indices", "Commodities", "Forex"] as const;
type CategoryType = (typeof CATEGORIES)[number];

export default function LiveMarketTicker() {
  const [marketData, setMarketData] = useState<MarketItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>("All");
  const [selectedItemForChart, setSelectedItemForChart] = useState<MarketItem | null>(null);
  const [viewMode, setViewMode] = useState<"ticker" | "grid">("ticker");

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/market-data");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setMarketData(json.data);
      }
    } catch (err) {
      console.error("Failed to load market data:", err);
    } finally {
      setIsLoading(false);
      if (isManual) {
        setTimeout(() => setIsRefreshing(false), 500);
      }
    }
  }, []);

  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 20000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const filteredData = marketData.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
  });

  const formatPrice = (val: number, currency: string) => {
    if (!val && val !== 0) return "---";
    const prefix = currency === "₹" ? "₹" : currency === "$" ? "$" : "";
    const decimals = val < 2 ? 4 : 2;
    return `${prefix}${val.toLocaleString("en-IN", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}`;
  };

  const formatChange = (change: number, currency: string) => {
    const sign = change > 0 ? "+" : "";
    const prefix = currency === "₹" ? "₹" : currency === "$" ? "$" : "";
    return `${sign}${prefix}${change.toFixed(2)}`;
  };

  return (
    <section className="relative w-full py-6 sm:py-8 lg:py-10 bg-linear-to-b from-[#001c54] via-[#002b7f] to-[#001c54] border-y-2 border-brand-gold/40 text-white select-none overflow-hidden shadow-[0_10px_40px_rgba(0,43,127,0.5)]">
      {/* Dynamic ambient background glows */}
      <div className="absolute top-1/2 left-1/6 -translate-y-1/2 w-96 h-48 bg-brand-gold/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/6 -translate-y-1/2 w-96 h-48 bg-sky-400/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-40 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Top Controls Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 relative z-10 mb-2">
        {/* Live Status Badge */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/80 border border-emerald-400/50 text-emerald-300 text-xs font-bold tracking-wider uppercase shadow-none">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-80"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
          </span>
          <span className="flex items-center gap-1.5">
            <FiActivity className="text-sm text-emerald-300" /> Live Market
          </span>
        </div>

        {/* Categories Tabs (Clean direct buttons without outer overlay/shadow) */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-linear-to-r from-brand-gold via-amber-400 to-brand-gold text-slate-950 border border-amber-300 scale-105"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white border border-white/15"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Actions (View Mode & Refresh) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setViewMode(viewMode === "ticker" ? "grid" : "ticker")}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-slate-950 border border-white/20 hover:border-brand-gold text-xs font-bold text-white transition-all duration-300 cursor-pointer group"
            title="Toggle View Mode"
          >
            {viewMode === "ticker" ? (
              <>
                <FiGrid className="text-sm text-brand-gold group-hover:text-slate-950 transition-colors" />
                <span className="hidden md:inline">Grid View</span>
              </>
            ) : (
              <>
                <FiSliders className="text-sm text-brand-gold group-hover:text-slate-950 transition-colors" />
                <span className="hidden md:inline">Ticker View</span>
              </>
            )}
          </button>

          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="p-2 rounded-xl bg-white/10 hover:bg-brand-gold hover:text-slate-950 border border-white/20 hover:border-brand-gold text-white transition-all duration-300 cursor-pointer group"
            title="Refresh Quotes"
          >
            <FiRefreshCw className={`text-sm ${isRefreshing ? "animate-spin text-brand-gold" : "group-hover:text-slate-950"}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-12 flex items-center justify-center gap-3 text-slate-200 text-base font-semibold">
          <FiRefreshCw className="animate-spin text-brand-gold text-xl" /> Loading live market quotes...
        </div>
      ) : viewMode === "ticker" ? (
        /* Infinite Scrolling Ticker Tape with Yellow Border Cards */
        <div className="relative w-full overflow-hidden py-5 sm:py-6 lg:py-7">
          {/* Vignette Gradient Fades */}
          <div className="absolute left-0 inset-y-0 w-20 sm:w-36 lg:w-48 bg-linear-to-r from-[#001c54] via-[#002b7f]/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-20 sm:w-36 lg:w-48 bg-linear-to-l from-[#001c54] via-[#002b7f]/80 to-transparent z-10 pointer-events-none" />

          <div className="flex w-fit whitespace-nowrap">
            {(() => {
              const repeatedData =
                filteredData.length > 0 && filteredData.length < 5
                  ? [...filteredData, ...filteredData, ...filteredData, ...filteredData]
                  : [...filteredData, ...filteredData];
              const scrollDuration = Math.max(16, filteredData.length * 10);

              return (
                <motion.div
                  key={selectedCategory}
                  animate={{ x: ["0%", "-50%"] }}
                  transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: scrollDuration,
                  }}
                  className="flex items-center gap-5 sm:gap-6 shrink-0 pr-5 sm:pr-6"
                >
                  {repeatedData.map((item, idx) => (
                    <YellowBorderTickerPill
                      key={`${item.id}-${idx}`}
                      item={item}
                      onClick={() => setSelectedItemForChart(item)}
                      formatPrice={formatPrice}
                      formatChange={formatChange}
                    />
                  ))}
                </motion.div>
              );
            })()}
          </div>
        </div>
      ) : (
        /* Responsive Grid Layout with Yellow Border Cards */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredData.map((item) => (
              <YellowBorderGridCard
                key={item.id}
                item={item}
                onClick={() => setSelectedItemForChart(item)}
                formatPrice={formatPrice}
                formatChange={formatChange}
              />
            ))}
          </div>
        </div>
      )}

      {/* Interactive White Theme Chart Modal */}
      <AnimatePresence>
        {selectedItemForChart && (
          <WhiteThemeChartModal
            item={selectedItemForChart}
            onClose={() => setSelectedItemForChart(null)}
            formatPrice={formatPrice}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ItemProps {
  item: MarketItem;
  onClick: () => void;
  formatPrice: (val: number, currency: string) => string;
  formatChange: (val: number, currency: string) => string;
}

function YellowBorderTickerPill({ item, onClick, formatPrice, formatChange }: ItemProps) {
  const isUp = item.change >= 0;

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-5 sm:gap-6 px-6 py-4 sm:px-8 sm:py-5 min-h-24 sm:min-h-26 rounded-2xl bg-linear-to-br from-[#001c54]/95 via-[#002b7f]/90 to-[#001c54]/95 hover:from-[#002b7f] hover:to-[#0a3b9e] border-2 border-brand-gold hover:border-amber-300 transition-all duration-300 cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(245,163,0,0.4)] hover:scale-[1.02]"
    >
      <div className="flex flex-col text-left justify-center">
        <span className="text-base sm:text-lg font-extrabold tracking-tight text-white group-hover:text-brand-gold transition-colors">
          {item.name}
        </span>
        <span className="inline-block mt-1 px-2 py-0.5 rounded-md bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[11px] font-bold tracking-wide w-fit">
          {item.category}
        </span>
      </div>

      <div className="h-10 w-0.5 bg-linear-to-b from-transparent via-brand-gold/60 to-transparent shrink-0" />

      <div className="flex flex-col text-right justify-center">
        <span className="text-base sm:text-xl font-extrabold text-white font-mono tracking-tight drop-shadow-md">
          {formatPrice(item.price, item.currency)}
        </span>
        <div className="flex items-center gap-1.5 justify-end mt-1">
          {isUp ? (
            <FiTrendingUp className="text-sm text-emerald-400 animate-bounce" />
          ) : (
            <FiTrendingDown className="text-sm text-rose-400 animate-bounce" />
          )}
          <span
            className={`text-xs font-extrabold font-mono px-2.5 py-1 rounded-lg ${
              isUp
                ? "text-emerald-300 bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
                : "text-rose-300 bg-rose-500/20 border border-rose-400/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            }`}
          >
            {formatChange(item.change, item.currency)} ({item.changePercent >= 0 ? "+" : ""}
            {item.changePercent.toFixed(2)}%)
          </span>
        </div>
      </div>
    </button>
  );
}

function YellowBorderGridCard({ item, onClick, formatPrice, formatChange }: ItemProps) {
  const isUp = item.change >= 0;

  return (
    <button
      onClick={onClick}
      className="group p-6 sm:p-7 min-h-36 sm:min-h-40 rounded-2xl bg-linear-to-br from-[#001c54]/95 via-[#002b7f]/90 to-[#001c54]/95 hover:from-[#002b7f] hover:to-[#0a3b9e] border-2 border-brand-gold hover:border-amber-300 transition-all duration-300 text-left flex flex-col justify-between cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.35)] hover:shadow-[0_0_25px_rgba(245,163,0,0.4)] hover:scale-[1.02]"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div>
          <span className="block text-base sm:text-lg font-extrabold text-white group-hover:text-brand-gold transition-colors">
            {item.name}
          </span>
          <span className="inline-block mt-1 px-2.5 py-0.5 rounded-md bg-brand-gold/20 border border-brand-gold/40 text-brand-gold text-[11px] font-bold">
            {item.category}
          </span>
        </div>
        <span
          className={`text-xs font-extrabold px-2.5 py-1 rounded-lg ${
            isUp
              ? "text-emerald-300 bg-emerald-500/20 border border-emerald-400/50 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
              : "text-rose-300 bg-rose-500/20 border border-rose-400/50 shadow-[0_0_10px_rgba(239,68,68,0.3)]"
          }`}
        >
          {isUp ? "+" : ""}
          {item.changePercent.toFixed(2)}%
        </span>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-2">
        <div className="text-lg sm:text-2xl font-extrabold text-white font-mono drop-shadow-md">
          {formatPrice(item.price, item.currency)}
        </div>
        <div
          className={`text-xs font-mono font-extrabold flex items-center gap-1 ${
            isUp ? "text-emerald-400" : "text-rose-400"
          }`}
        >
          {isUp ? <FiTrendingUp className="text-sm" /> : <FiTrendingDown className="text-sm" />}
          {formatChange(item.change, item.currency)}
        </div>
      </div>
    </button>
  );
}

function WhiteThemeChartModal({
  item,
  onClose,
  formatPrice,
}: {
  item: MarketItem;
  onClose: () => void;
  formatPrice: (val: number, currency: string) => string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isUp = item.change >= 0;

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.innerHTML = "";

    const script = document.createElement("script");
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: item.tradingViewSymbol,
      interval: "D",
      timezone: "Etc/UTC",
      theme: "light",
      style: "1",
      locale: "en",
      enable_publishing: false,
      backgroundColor: "#ffffff",
      gridColor: "rgba(0, 0, 0, 0.05)",
      hide_side_toolbar: false,
      allow_symbol_change: false,
      save_image: true,
      calendar: false,
      hide_volume: false,
    });

    containerRef.current.appendChild(script);
  }, [item.tradingViewSymbol]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-900/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl h-[85vh] bg-white border border-slate-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-200 bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{item.name}</h3>
                <span className="text-xs px-2 py-0.5 rounded bg-slate-200 text-slate-700 font-semibold">
                  {item.category}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-sm sm:text-base font-bold font-mono text-slate-900">
                  {formatPrice(item.price, item.currency)}
                </span>
                <span
                  className={`text-xs font-mono font-bold ${
                    isUp ? "text-emerald-700" : "text-rose-700"
                  }`}
                >
                  {isUp ? "+" : ""}
                  {item.change.toFixed(2)} ({item.changePercent >= 0 ? "+" : ""}
                  {item.changePercent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={`https://finance.yahoo.com/quote/${encodeURIComponent(item.symbol)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition-colors"
            >
              <FiExternalLink className="text-xs text-slate-600" />
              <span className="hidden sm:inline">Yahoo Finance</span>
            </a>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 border border-slate-200 transition-colors cursor-pointer"
            >
              <FiX className="text-lg" />
            </button>
          </div>
        </div>

        {/* TradingView Chart Container (White Theme) */}
        <div className="relative flex-1 w-full bg-white overflow-hidden" ref={containerRef} />
      </motion.div>
    </div>
  );
}
