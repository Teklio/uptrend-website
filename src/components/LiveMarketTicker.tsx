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
  const [lastUpdated, setLastUpdated] = useState<string>("");

  const fetchData = useCallback(async (isManual = false) => {
    if (isManual) setIsRefreshing(true);
    try {
      const res = await fetch("/api/market-data");
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setMarketData(json.data);
        setLastUpdated(
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })
        );
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
    // Auto refresh every 20 seconds
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
    <section className="relative w-full bg-white border-y border-slate-200 text-slate-900 select-none overflow-hidden shadow-xs">
      {/* Top Controls Ribbon */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex flex-wrap items-center justify-between gap-3 border-b border-slate-100">
        {/* Live Status Pill */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold tracking-wider uppercase shadow-xs">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="flex items-center gap-1.5">
              <FiActivity className="text-xs" /> Live Market Feed
            </span>
          </div>

          {lastUpdated && (
            <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
              Live: {lastUpdated}
            </span>
          )}
        </div>

        {/* Categories Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === cat
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Actions (View Mode & Refresh) */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === "ticker" ? "grid" : "ticker")}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-xs font-medium text-slate-700 transition-colors cursor-pointer"
            title="Toggle View Mode"
          >
            {viewMode === "ticker" ? (
              <>
                <FiGrid className="text-xs text-slate-600" />
                <span className="hidden md:inline">Grid View</span>
              </>
            ) : (
              <>
                <FiSliders className="text-xs text-slate-600" />
                <span className="hidden md:inline">Ticker View</span>
              </>
            )}
          </button>

          <button
            onClick={() => fetchData(true)}
            disabled={isRefreshing}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
            title="Refresh Quotes"
          >
            <FiRefreshCw className={`text-xs ${isRefreshing ? "animate-spin text-emerald-600" : ""}`} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      {isLoading ? (
        <div className="py-8 flex items-center justify-center gap-2 text-slate-500 text-sm font-medium">
          <FiRefreshCw className="animate-spin text-slate-700" /> Loading live market quotes...
        </div>
      ) : viewMode === "ticker" ? (
        /* Infinite Scrolling White Ticker Tape with Taller Cards */
        <div className="relative w-full overflow-hidden py-4 sm:py-5 bg-slate-50/50">
          {/* Subtle Left & Right Gradient Fades */}
          <div className="absolute left-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-r from-white via-white/90 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 inset-y-0 w-16 sm:w-28 bg-gradient-to-l from-white via-white/90 to-transparent z-10 pointer-events-none" />

          <div className="flex w-fit whitespace-nowrap">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{
                repeat: Infinity,
                ease: "linear",
                duration: Math.max(28, filteredData.length * 5),
              }}
              className="flex items-center gap-4 sm:gap-5 shrink-0 pr-4 sm:pr-5"
            >
              {filteredData.concat(filteredData).map((item, idx) => (
                <WhiteTickerPill
                  key={`${item.id}-${idx}`}
                  item={item}
                  onClick={() => setSelectedItemForChart(item)}
                  formatPrice={formatPrice}
                  formatChange={formatChange}
                />
              ))}
            </motion.div>
          </div>
        </div>
      ) : (
        /* Clean Responsive Grid Layout with Taller Cards */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-slate-50/40">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredData.map((item) => (
              <WhiteGridCard
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

      {/* Interactive Chart Modal (Light / White Theme) */}
      <AnimatePresence>
        {selectedItemForChart && (
          <LightChartModal
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

function WhiteTickerPill({ item, onClick, formatPrice, formatChange }: ItemProps) {
  const isUp = item.change >= 0;

  return (
    <button
      onClick={onClick}
      className="group flex items-center gap-4 sm:gap-5 px-5 py-3 sm:px-6 sm:py-3.5 min-h-[76px] rounded-2xl bg-white hover:bg-slate-50/90 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md"
    >
      <div className="flex flex-col text-left justify-center">
        <span className="text-sm font-bold tracking-tight text-slate-800 group-hover:text-slate-900 transition-colors">
          {item.name}
        </span>
        <span className="text-[11px] text-slate-400 font-medium tracking-wide mt-0.5">{item.category}</span>
      </div>

      <div className="h-9 w-px bg-slate-200 shrink-0" />

      <div className="flex flex-col text-right justify-center">
        <span className="text-sm sm:text-base font-extrabold text-slate-900 font-mono tracking-tight">
          {formatPrice(item.price, item.currency)}
        </span>
        <div className="flex items-center gap-1.5 justify-end mt-0.5">
          {isUp ? (
            <FiTrendingUp className="text-xs text-emerald-600" />
          ) : (
            <FiTrendingDown className="text-xs text-rose-600" />
          )}
          <span
            className={`text-xs font-bold font-mono px-1.5 py-0.5 rounded-md ${
              isUp ? "text-emerald-700 bg-emerald-50 border border-emerald-200/60" : "text-rose-700 bg-rose-50 border border-rose-200/60"
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

function WhiteGridCard({ item, onClick, formatPrice, formatChange }: ItemProps) {
  const isUp = item.change >= 0;

  return (
    <button
      onClick={onClick}
      className="group p-4 sm:p-5 min-h-[115px] rounded-2xl bg-white hover:bg-slate-50 border border-slate-200/90 hover:border-slate-300 transition-all duration-200 text-left flex flex-col justify-between cursor-pointer shadow-xs hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span className="block text-sm font-bold text-slate-800 group-hover:text-slate-900 transition-colors">
            {item.name}
          </span>
          <span className="text-[11px] text-slate-400 font-medium mt-0.5 block">{item.category}</span>
        </div>
        <span
          className={`text-xs font-bold px-2 py-0.5 rounded-md ${
            isUp ? "bg-emerald-50 text-emerald-700 border border-emerald-200/60" : "bg-rose-50 text-rose-700 border border-rose-200/60"
          }`}
        >
          {isUp ? "+" : ""}
          {item.changePercent.toFixed(2)}%
        </span>
      </div>

      <div className="mt-2 flex items-baseline justify-between gap-2">
        <div className="text-base sm:text-lg font-extrabold text-slate-900 font-mono">
          {formatPrice(item.price, item.currency)}
        </div>
        <div
          className={`text-xs font-mono font-bold flex items-center gap-1 ${
            isUp ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {isUp ? <FiTrendingUp className="text-xs" /> : <FiTrendingDown className="text-xs" />}
          {formatChange(item.change, item.currency)}
        </div>
      </div>
    </button>
  );
}

function LightChartModal({
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

    // Clean any prior widget
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
      allow_symbol_change: true,
      save_image: true,
      calendar: false,
      hide_volume: false,
      support_host: "https://www.tradingview.com",
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

        {/* TradingView Chart Container (Light Mode) */}
        <div className="relative flex-1 w-full bg-white overflow-hidden" ref={containerRef} />
      </motion.div>
    </div>
  );
}
