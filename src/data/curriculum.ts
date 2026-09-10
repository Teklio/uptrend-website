export interface Lesson {
  id: string;
  title: string;
  duration: string;
  durationSeconds: number;
  videoUrl?: string; // sample video or mock embed
  poster?: string;
  description: string;
  keyTakeaways: string[];
  resources: {
    name: string;
    type: "pdf" | "pinescript" | "excel" | "link";
    size?: string;
    downloadUrl?: string;
    contentPreview?: string;
  }[];
}

export interface Module {
  id: string;
  title: string;
  subheading: string; // e.g. "Introduction", "Week 1", "Week 2", "Week 3", "Week 4"
  description: string;
  lessons: Lesson[];
}

export interface CourseCurriculum {
  courseSlug: string;
  courseTitle: string;
  instructor: string;
  instructorRole: string;
  totalDuration: string;
  totalLessons: number;
  batchInfo: string;
  telegramGroupUrl: string;
  nextLiveSession: {
    title: string;
    date: string;
    time: string;
    zoomLink: string;
  };
  modules: Module[];
}

export const COURSE_CURRICULA: Record<string, CourseCurriculum> = {
  "swing-trading-master-course": {
    courseSlug: "swing-trading-master-course",
    courseTitle: "Swing trading master course - 2026 September",
    instructor: "Nikhil Mathew",
    instructorRole: "Founder & Lead Market Strategist, UPtrend Academy",
    totalDuration: "18 Hours 45 Mins",
    totalLessons: 15,
    batchInfo: "September 2026 Live Cohort (Batch #14)",
    telegramGroupUrl: "https://t.me/uptrend_vip_cohort",
    nextLiveSession: {
      title: "Live Market Chart Breakdown & Weekend Setup Screening",
      date: "Saturday, 8:00 PM IST",
      time: "8:00 PM - 10:00 PM",
      zoomLink: "https://zoom.us/j/uptrend-live-session",
    },
    modules: [
      {
        id: "mod-intro",
        title: "Introduction & Setup",
        subheading: "Introduction",
        description: "Welcome to the cohort! Get your trading workspace, TradingView charts, and risk fundamentals calibrated.",
        lessons: [
          {
            id: "sw-intro-1",
            title: "Video 1: Welcome & Course Roadmap",
            duration: "08:45",
            durationSeconds: 525,
            description:
              "An orientation into the 6-week curriculum, cohort guidelines, expectations, and how institutional swing traders think differently from retail intraday scalpers.",
            keyTakeaways: [
              "Why swing trading offers superior risk-to-reward compared to intraday churning",
              "How to structure your daily 20-minute post-market analysis routine",
              "Accessing the VIP Telegram Batch community and submitting weekly assignments",
            ],
            resources: [
              {
                name: "Swing_Trading_Mastery_Roadmap_2026.pdf",
                type: "pdf",
                size: "2.4 MB",
              },
              {
                name: "TradingView_Layout_Templates_Checklist.pdf",
                type: "pdf",
                size: "1.1 MB",
              },
            ],
          },
          {
            id: "sw-intro-2",
            title: "Video 2: Setting up TradingView & Terminal Layouts",
            duration: "14:20",
            durationSeconds: 860,
            description:
              "Configuring clean multi-timeframe chart layouts (Weekly, Daily, 75-min, 15-min) with institutional color themes and essential key shortcuts.",
            keyTakeaways: [
              "Setting up clean chart themes without lagging indicator clutter",
              "Custom hotkeys for rapid watchlist scanning across 500+ NSE stocks",
              "Synchronized multi-timeframe crosshairs for pinpoint structural alignment",
            ],
            resources: [
              {
                name: "UPtrend_Pro_Color_Palette_Config.json",
                type: "link",
                size: "45 KB",
              },
            ],
          },
          {
            id: "sw-intro-3",
            title: "Video 3: Core Capital Preservation & Risk Rules",
            duration: "22:15",
            durationSeconds: 1335,
            description:
              "The mathematical law of drawdowns and why capping risk per trade at 1-1.5% is the non-negotiable foundation of all successful market operators.",
            keyTakeaways: [
              "The mathematics of recovery: why a 50% loss requires a 100% gain to break even",
              "Calculating maximum capital exposure and portfolio sector concentration limits",
              "The Golden 1:3+ Risk-to-Reward filtering benchmark",
            ],
            resources: [
              {
                name: "Position_Sizing_Risk_Calculator_v4.xlsx",
                type: "excel",
                size: "380 KB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-week-1",
        title: "Market Structure & Institutional Mechanics",
        subheading: "Week 1",
        description: "Deconstructing raw price action, market cycles, multi-timeframe structure, and trend shifts.",
        lessons: [
          {
            id: "sw-w1-1",
            title: "Video 1: Candlestick Anatomy & Rejection Wicks",
            duration: "28:10",
            durationSeconds: 1690,
            description:
              "Moving beyond textbook candle patterns into institutional supply/demand wick dynamics and buyer/seller absorption.",
            keyTakeaways: [
              "Understanding wick rejections as liquidity probes rather than simple turnarounds",
              "How to identify absorption volume at critical key support/resistance zones",
              "Why candle closes carry 10x more weight than intraday intra-candle noise",
            ],
            resources: [
              {
                name: "Candlestick_Absorption_CheatSheet.pdf",
                type: "pdf",
                size: "3.2 MB",
              },
            ],
          },
          {
            id: "sw-w1-2",
            title: "Video 2: Break of Structure (BOS) vs Change of Character (CHoCH)",
            duration: "34:50",
            durationSeconds: 2090,
            description:
              "Identifying when a trend is merely continuing vs when institutional smart money is reversing the trend direction.",
            keyTakeaways: [
              "Difference between internal structure pullback and true external structural break",
              "The exact criteria for confirming a valid Change of Character (CHoCH)",
              "Avoiding fake breakouts and early entries before structural confirmation",
            ],
            resources: [
              {
                name: "Market_Structure_Framework_Guide.pdf",
                type: "pdf",
                size: "4.1 MB",
              },
            ],
          },
          {
            id: "sw-w1-3",
            title: "Video 3: High-Probability Support & Resistance Zones",
            duration: "31:00",
            durationSeconds: 1860,
            description:
              "Drawing institutional price zones instead of thin single lines. Volume profile point of control (POC) and value area high/low.",
            keyTakeaways: [
              "Why single-line support/resistance fails and how zone boundaries create edge",
              "Volume profile Value Area High (VAH) & Value Area Low (VAL) mechanics",
              "Top-down zone mapping from Monthly -> Weekly -> Daily charts",
            ],
            resources: [
              {
                name: "Zone_Mapping_TopDown_Checklist.pdf",
                type: "pdf",
                size: "1.8 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-week-2",
        title: "Smart Money Concepts & Liquidity Traps",
        subheading: "Week 2",
        description: "Mastering Order Blocks, Fair Value Gaps (FVG), mitigation blocks, and retail trap avoidance.",
        lessons: [
          {
            id: "sw-w2-1",
            title: "Video 1: Institutional Order Blocks & Mitigation Zones",
            duration: "42:15",
            durationSeconds: 2535,
            description:
              "How institutional algorithmic orders leave footprints on the chart and how to time sniper entries on retracements.",
            keyTakeaways: [
              "Defining bullish and bearish institutional order blocks (OB)",
              "Refining large daily order blocks into 75-minute high precision entry triggers",
              "Mitigation vs unmitigated order blocks: spotting fresh institutional capital",
            ],
            resources: [
              {
                name: "Order_Block_Identification_Rules.pdf",
                type: "pdf",
                size: "3.7 MB",
              },
            ],
          },
          {
            id: "sw-w2-2",
            title: "Video 2: Fair Value Gaps (FVG) & Premium vs Discount Pricing",
            duration: "38:40",
            durationSeconds: 2320,
            description:
              "Understanding market imbalance gaps and utilizing Fibonacci equilibrium to only buy in deep discount zones.",
            keyTakeaways: [
              "3-candle imbalance structure defining an actionable Fair Value Gap (FVG)",
              "Equilibrium 50% line: Never buying in the premium zone during an uptrend",
              "Confluence of FVG with key higher-timeframe order block levels",
            ],
            resources: [
              {
                name: "FVG_Equilibrium_Pricing_Model.pdf",
                type: "pdf",
                size: "2.1 MB",
              },
            ],
          },
          {
            id: "sw-w2-3",
            title: "Video 3: Liquidity Sweeps & Retail Trap Avoidance",
            duration: "45:10",
            durationSeconds: 2710,
            description:
              "Where retail stop losses rest and how market makers sweep equal highs/lows before initiating real explosive moves.",
            keyTakeaways: [
              "Identifying buy-side liquidity (BSL) and sell-side liquidity (SSL) pools",
              "The Turtle Soup sweep pattern: buying right when retail stops get triggered",
              "Validating sweep rejection with volume and immediate displacement candle",
            ],
            resources: [
              {
                name: "Liquidity_Sweep_Playbook.pdf",
                type: "pdf",
                size: "2.9 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-week-3",
        title: "Stock Screening & Watchlist Blueprint",
        subheading: "Week 3",
        description: "The proprietary 15-minute scanning framework to filter 500+ NSE stocks down to top 3 actionable swing setups.",
        lessons: [
          {
            id: "sw-w3-1",
            title: "Video 1: Building the 15-Minute Daily Chartink Screener",
            duration: "29:30",
            durationSeconds: 1770,
            description:
              "Step-by-step creation of custom Chartink screener formulas for momentum breakouts, volume surges, and institutional accumulation.",
            keyTakeaways: [
              "Writing custom Chartink syntax for volume contraction pattern (VCP) breakouts",
              "Filtering out illiquid and penny stock traps with strict turnover criteria",
              "Automating Telegram alert webhooks for intraday breakout triggers",
            ],
            resources: [
              {
                name: "Chartink_Screener_Formulas_CopyPaste.txt",
                type: "link",
                size: "12 KB",
              },
              {
                name: "TradingView_PineScript_SMC_Indicator.pine",
                type: "pinescript",
                size: "34 KB",
              },
            ],
          },
          {
            id: "sw-w3-2",
            title: "Video 2: Entry Triggers, Stop-Loss Placement & Trailing",
            duration: "36:20",
            durationSeconds: 2180,
            description:
              "Exact execution rules: Limit order vs market confirmation, structural invalidation stop losses, and dynamic ATR trailing.",
            keyTakeaways: [
              "Why placing stops just below order block invalidation level protects capital",
              "Using ATR (Average True Range) buffer to prevent wick-out before the move",
              "The 3-stage profit taking rule: 1:2 initial de-risk, 1:3 target, and trailing runner",
            ],
            resources: [
              {
                name: "Trade_Execution_Checklist_Card.pdf",
                type: "pdf",
                size: "1.5 MB",
              },
            ],
          },
          {
            id: "sw-w3-3",
            title: "Video 3: Position Sizing Calculator & Capital Allocation",
            duration: "25:40",
            durationSeconds: 1540,
            description:
              "Automating position sizing with our Excel model so you never risk more than your predefined risk budget regardless of share price.",
            keyTakeaways: [
              "Formula: Position Quantity = (Account Capital * Risk %) / (Entry Price - Stop Loss)",
              "Managing maximum simultaneous active swing positions (4-6 max)",
              "Pyramiding into winning positions with locked-in risk-free stops",
            ],
            resources: [
              {
                name: "UPtrend_Advanced_Trade_Journal_v3.xlsx",
                type: "excel",
                size: "1.2 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mod-week-4",
        title: "Live Market Execution & Psychology",
        subheading: "Week 4",
        description: "Analyzing live trade case studies, post-market reviews, mastering psychological discipline, and final certification.",
        lessons: [
          {
            id: "sw-w4-1",
            title: "Video 1: Live Trade Breakdown - Nifty & Stock Swings",
            duration: "48:00",
            durationSeconds: 2880,
            description:
              "Deep-dive walk-through of 5 actual real-money trades executed during the cohort with full entry rationale and exit mechanics.",
            keyTakeaways: [
              "Case Study 1: +24% gain on Tata Motors institutional order block bounce",
              "Case Study 2: Nifty 50 weekly swing from discount liquidity sweep",
              "Handling trades that go against you without emotional hesitation",
            ],
            resources: [
              {
                name: "5_Real_Swing_Case_Studies_Annotated.pdf",
                type: "pdf",
                size: "5.8 MB",
              },
            ],
          },
          {
            id: "sw-w4-2",
            title: "Video 2: Overcoming FOMO & Emotional Discipline",
            duration: "32:15",
            durationSeconds: 1935,
            description:
              "Building an institutional trader mindset: dealing with losing streaks, avoiding revenge trades, and maintaining consistency.",
            keyTakeaways: [
              "The psychology of probability thinking: accepting that losses are simply cost of business",
              "Daily pre-market mental readiness checklist",
              "How to review your trade journal every Sunday for continuous refinement",
            ],
            resources: [
              {
                name: "Trader_Psychology_Daily_Affirmations.pdf",
                type: "pdf",
                size: "950 KB",
              },
            ],
          },
          {
            id: "sw-w4-3",
            title: "Video 3: Final Certification Quiz & Graduation",
            duration: "55:00",
            durationSeconds: 3300,
            description:
              "Complete review of all 5 pillars of the Swing Trading Blueprint, final batch assessment guidelines, and obtaining your verified completion certificate.",
            keyTakeaways: [
              "Final 30-question market structure and position sizing assessment",
              "Submitting your 10-trade verified journal for mentor 1-on-1 feedback",
              "Lifetime membership benefits in the UPtrend Alumni Network",
            ],
            resources: [
              {
                name: "UPtrend_Certificate_Criteria_Guide.pdf",
                type: "pdf",
                size: "1.4 MB",
              },
            ],
          },
        ],
      },
    ],
  },
  "market-basics-technical-analysis": {
    courseSlug: "market-basics-technical-analysis",
    courseTitle: "Master the Stock Market – From Basics to Technical Analysis",
    instructor: "Nikhil Mathew",
    instructorRole: "Founder & Lead Market Strategist, UPtrend Academy",
    totalDuration: "12 Hours 30 Mins",
    totalLessons: 12,
    batchInfo: "Self-Paced with Weekly Live Q&A",
    telegramGroupUrl: "https://t.me/uptrend_basics_community",
    nextLiveSession: {
      title: "Beginner Doubt Clearing & Live Chart Q&A",
      date: "Sunday, 11:00 AM IST",
      time: "11:00 AM - 12:30 PM",
      zoomLink: "https://zoom.us/j/uptrend-basics-live",
    },
    modules: [
      {
        id: "mb-intro",
        title: "Introduction to Markets & Exchanges",
        subheading: "Introduction",
        description: "Understanding financial markets, exchanges, brokers, and how prices move.",
        lessons: [
          {
            id: "mb-intro-1",
            title: "Video 1: How Stock Markets Work (NSE, BSE, SEBI)",
            duration: "18:20",
            durationSeconds: 1100,
            description: "Introduction to capital markets, regulatory bodies, and order matching engines.",
            keyTakeaways: [
              "Role of NSE & BSE in price discovery",
              "How Demat & Trading accounts interact",
              "Understanding market bid-ask spreads",
            ],
            resources: [
              {
                name: "Stock_Market_Beginners_Handbook.pdf",
                type: "pdf",
                size: "2.1 MB",
              },
            ],
          },
          {
            id: "mb-intro-2",
            title: "Video 2: Choosing Demat Brokers & Setting up Orders",
            duration: "24:10",
            durationSeconds: 1450,
            description: "Walkthrough of market orders, limit orders, stop loss orders, and bracket orders.",
            keyTakeaways: [
              "Comparing discount brokers (Zerodha, Groww, AngelOne)",
              "Placing CNC vs MIS orders safely",
              "Avoiding market order slippage",
            ],
            resources: [
              {
                name: "Order_Types_Quick_Guide.pdf",
                type: "pdf",
                size: "1.2 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mb-week-1",
        title: "Technical Charting Foundations",
        subheading: "Week 1",
        description: "Mastering Candlestick types, Support & Resistance, Trendlines, and Moving Averages.",
        lessons: [
          {
            id: "mb-w1-1",
            title: "Video 1: Reading Candlestick Charts & Timeframes",
            duration: "30:15",
            durationSeconds: 1815,
            description: "Open, High, Low, Close (OHLC) anatomy, bullish engulfing, hammer, and doji candles.",
            keyTakeaways: [
              "Why line charts hide crucial price extremes",
              "Anatomy of powerful bullish/bearish candle triggers",
              "Selecting timeframes for your trading horizon",
            ],
            resources: [
              {
                name: "Candlestick_CheatSheet_Beginners.pdf",
                type: "pdf",
                size: "3.4 MB",
              },
            ],
          },
          {
            id: "mb-w1-2",
            title: "Video 2: Support, Resistance & Trendline Mastery",
            duration: "35:40",
            durationSeconds: 2140,
            description: "Drawing accurate horizontal levels, trendlines, and understanding role reversal.",
            keyTakeaways: [
              "Prior resistance becoming future support (Polarity Principle)",
              "Correct 3-point trendline construction",
              "Identifying false trendline violations",
            ],
            resources: [
              {
                name: "Support_Resistance_Guide.pdf",
                type: "pdf",
                size: "2.8 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mb-week-2",
        title: "High-Probability Chart Patterns",
        subheading: "Week 2",
        description: "Head & Shoulders, Double Bottoms, Triangles, Flags, and Breakout confirmation techniques.",
        lessons: [
          {
            id: "mb-w2-1",
            title: "Video 1: Reversal Patterns (Double Top/Bottom, H&S)",
            duration: "38:20",
            durationSeconds: 2300,
            description: "Trading major structural tops and bottoms with measured price targets.",
            keyTakeaways: [
              "Identifying neckline breaks with volume expansion",
              "Calculating minimum pattern price objectives",
              "Avoiding early anticipation before neckline confirmation",
            ],
            resources: [
              {
                name: "Classic_Chart_Patterns_Poster.pdf",
                type: "pdf",
                size: "4.5 MB",
              },
            ],
          },
          {
            id: "mb-w2-2",
            title: "Video 2: Continuation Patterns (Bull Flags, Ascending Triangles)",
            duration: "32:50",
            durationSeconds: 1970,
            description: "Catching powerful mid-trend consolidations before the next impulsive leg up.",
            keyTakeaways: [
              "Pole and flag volume contraction dynamics",
              "Ascending triangle flat resistance breakout strategy",
              "Setting precise stop losses beneath flag base",
            ],
            resources: [
              {
                name: "Continuation_Pattern_Manual.pdf",
                type: "pdf",
                size: "2.3 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mb-week-3",
        title: "Indicators & Moving Averages",
        subheading: "Week 3",
        description: "Using RSI for divergence, 20/50/200 EMA crossovers, and volume confirmation.",
        lessons: [
          {
            id: "mb-w3-1",
            title: "Video 1: Moving Averages (20 EMA, 50 SMA, 200 SMA)",
            duration: "29:10",
            durationSeconds: 1750,
            description: "Trend filtering with the 200 EMA and dynamic pullback entries on the 20 EMA.",
            keyTakeaways: [
              "The Golden Cross (50 crosses 200 SMA) significance",
              "Using 20 EMA as dynamic support in high-momentum trends",
              "Why indicators must confirm price, not lead it",
            ],
            resources: [
              {
                name: "Moving_Average_Strategies.pdf",
                type: "pdf",
                size: "1.9 MB",
              },
            ],
          },
          {
            id: "mb-w3-2",
            title: "Video 2: RSI Divergence & Volume Confirmation",
            duration: "34:00",
            durationSeconds: 2040,
            description: "Spotting hidden momentum divergence between price highs and RSI peaks.",
            keyTakeaways: [
              "Regular bullish/bearish RSI divergence rules",
              "Using Volume spread to confirm breakout legitimacy",
              "Avoiding overbought RSI traps in strong bull markets",
            ],
            resources: [
              {
                name: "RSI_Divergence_Strategy_Guide.pdf",
                type: "pdf",
                size: "2.0 MB",
              },
            ],
          },
        ],
      },
      {
        id: "mb-week-4",
        title: "Risk Control & Trading Plan",
        subheading: "Week 4",
        description: "Constructing your personal rule-based trading plan, position sizing, and beginner discipline.",
        lessons: [
          {
            id: "mb-w4-1",
            title: "Video 1: Risk Management & Capital Allocation",
            duration: "27:40",
            durationSeconds: 1660,
            description: "Protecting your hard-earned capital with strict 1:2 risk-to-reward ratios.",
            keyTakeaways: [
              "The 2% maximum loss per trade rule",
              "How to calculate risk before looking at profit potential",
              "Preventing overnight gap risk in swing positions",
            ],
            resources: [
              {
                name: "Beginners_Risk_Calculator.xlsx",
                type: "excel",
                size: "210 KB",
              },
            ],
          },
          {
            id: "mb-w4-2",
            title: "Video 2: Creating Your 1-Page Trading Plan & Graduation",
            duration: "36:15",
            durationSeconds: 2175,
            description: "Synthesizing everything into an actionable one-page trading routine and taking the final quiz.",
            keyTakeaways: [
              "Your daily pre-market and post-market checklist",
              "Trade journaling template for self-audit",
              "Certificate of Completion and next steps",
            ],
            resources: [
              {
                name: "One_Page_Trading_Plan_Template.pdf",
                type: "pdf",
                size: "1.1 MB",
              },
            ],
          },
        ],
      },
    ],
  },
  "nifty-options-futures-masterclass": {
    courseSlug: "nifty-options-futures-masterclass",
    courseTitle: "Nifty 50 Options & Futures SMC Masterclass",
    instructor: "Nikhil Mathew",
    instructorRole: "Founder & Lead Market Strategist, UPtrend Academy",
    totalDuration: "24 Hours",
    totalLessons: 16,
    batchInfo: "Advanced Derivatives Live Mentorship",
    telegramGroupUrl: "https://t.me/uptrend_options_vip",
    nextLiveSession: {
      title: "Nifty Expiry OI Breakdown & Live Order Flow Analysis",
      date: "Thursday, 9:00 AM IST",
      time: "9:00 AM - 11:30 AM",
      zoomLink: "https://zoom.us/j/uptrend-options-live",
    },
    modules: [
      {
        id: "opt-intro",
        title: "Derivatives Architecture & Greeks",
        subheading: "Introduction",
        description: "Options pricing models, Delta, Gamma, Theta, Vega, and implied volatility (IV).",
        lessons: [
          {
            id: "opt-intro-1",
            title: "Video 1: Derivatives Architecture & Option Pricing",
            duration: "25:30",
            durationSeconds: 1530,
            description: "How call and put options derive value from underlying spot index prices.",
            keyTakeaways: [
              "Spot vs Futures premium/discount mechanics",
              "Intrinsic value vs Extrinsic (Time) value breakdown",
              "Why option buying without momentum loses to theta decay",
            ],
            resources: [
              {
                name: "Option_Greeks_Reference_Guide.pdf",
                type: "pdf",
                size: "2.7 MB",
              },
            ],
          },
          {
            id: "opt-intro-2",
            title: "Video 2: Delta, Gamma & Theta Decay Dynamics",
            duration: "32:15",
            durationSeconds: 1935,
            description: "Mastering Greeks to choose the exact right strike price (ITM vs ATM vs OTM).",
            keyTakeaways: [
              "Delta sensitivity and probability of expiring ITM",
              "Gamma explosions during weekly expiry days",
              "Managing weekend and overnight Theta erosion",
            ],
            resources: [
              {
                name: "Strike_Selection_Matrix.pdf",
                type: "pdf",
                size: "1.6 MB",
              },
            ],
          },
        ],
      },
      {
        id: "opt-week-1",
        title: "Open Interest (OI) & Smart Money Footprints",
        subheading: "Week 1",
        description: "Reading option chain data, PCR ratio, Max Pain, and institutional buildup.",
        lessons: [
          {
            id: "opt-w1-1",
            title: "Video 1: Option Chain Data & PCR Ratio Mechanics",
            duration: "40:20",
            durationSeconds: 2420,
            description: "Decoding call writing vs put writing to identify institutional ceiling and floor.",
            keyTakeaways: [
              "Interpreting Change in OI (Open Interest) during market hours",
              "Put-Call Ratio (PCR) extremes and contrarian reversal zones",
              "Max Pain theory and expiry settlement magnetism",
            ],
            resources: [
              {
                name: "Live_Option_Chain_Interpreter.xlsx",
                type: "excel",
                size: "890 KB",
              },
            ],
          },
        ],
      },
      {
        id: "opt-week-2",
        title: "Smart Money Order Flow & Volume Profile",
        subheading: "Week 2",
        description: "Integrating Footprint charts, cumulative delta, and institutional liquidity sweeps.",
        lessons: [
          {
            id: "opt-w2-1",
            title: "Video 1: Volume Profile & Footprint Order Flow",
            duration: "46:10",
            durationSeconds: 2770,
            description: "Seeing bid-ask imbalances inside each candle for sniper index entries.",
            keyTakeaways: [
              "Delta divergence at key session highs/lows",
              "Unfinished auction business and POC targets",
              "Identifying institutional trapped buyers/sellers",
            ],
            resources: [
              {
                name: "OrderFlow_Setup_Guide_GoCharting.pdf",
                type: "pdf",
                size: "3.5 MB",
              },
            ],
          },
        ],
      },
      {
        id: "opt-week-3",
        title: "High R:R Options Buying Strategies",
        subheading: "Week 3",
        description: "Timing explosive momentum breakouts and delta spikes with minimal capital risk.",
        lessons: [
          {
            id: "opt-w3-1",
            title: "Video 1: The 1:4 Momentum Option Buying Strategy",
            duration: "44:00",
            durationSeconds: 2640,
            description: "Buying slightly ITM options on multi-timeframe liquidity sweep triggers.",
            keyTakeaways: [
              "Triggering entries only on volume expansion candles",
              "Risking 8-12 points index premium for 40-60 points gain",
              "Trailing with 5-minute swing pivot stops",
            ],
            resources: [
              {
                name: "Options_Buying_Blueprint.pdf",
                type: "pdf",
                size: "2.2 MB",
              },
            ],
          },
        ],
      },
      {
        id: "opt-week-4",
        title: "Hedging & Non-Directional Strategies",
        subheading: "Week 4",
        description: "Iron Condors, Credit Spreads, and systematic dynamic adjustments.",
        lessons: [
          {
            id: "opt-w4-1",
            title: "Video 1: Credit Spreads & Non-Directional Hedging",
            duration: "52:10",
            durationSeconds: 3130,
            description: "Earning consistent returns from time decay with strictly defined maximum risk.",
            keyTakeaways: [
              "Bull Put Spreads & Bear Call Spreads structure",
              "Dynamic adjustments when the market tests your short strike",
              "Portfolio margin optimization for non-directional trading",
            ],
            resources: [
              {
                name: "Spread_Adjustment_Playbook.pdf",
                type: "pdf",
                size: "3.1 MB",
              },
            ],
          },
        ],
      },
    ],
  },
};
