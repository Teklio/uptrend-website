export interface CourseReview {
  name: string;
  location: string;
  rating: number;
  comment: string;
  date: string;
}

export interface CourseDetail {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  image: string;
  instructor: string;
  language: string;
  originalPrice: number;
  price: number;
  internetHandlingFee: number;
  totalPrice: number;
  duration: string;
  access: string;
  level: string;
  tag?: string;
  about: string[];
  keyHighlights: string[];
  features: {
    title: string;
    description: string;
  }[];
  reviews: CourseReview[];
}

export const COURSES_DATA: CourseDetail[] = [
  {
    id: "swing-trading-master",
    slug: "swing-trading-master-course",
    title: "Swing trading master course - 2026 September",
    shortDescription: "Unlock the secrets to successful swing trading in September 2026!",
    image: "/course-swing-trading.jpg",
    instructor: "Nikhil Mathew",
    language: "Malayalam",
    originalPrice: 17999,
    price: 14999,
    internetHandlingFee: 318.58,
    totalPrice: 15317.58,
    duration: "6 Weeks Live Cohort",
    access: "Full Course Access",
    level: "Intermediate to Pro",
    tag: "September 2026 Batch",
    about: [
      "The Swing Trading Master Course is designed to help you capture multi-day and multi-week market momentum with institutional precision. Instead of sitting in front of the charts all day, learn how to spot high-probability swing opportunities using objective price action, volume profile, and Smart Money Concepts (SMC).",
      "Led by expert mentor Nikhil Mathew, this program covers institutional order blocks, liquidity sweeps, momentum breakout screeners, and strict 1:3+ risk-to-reward position sizing frameworks tailored for Indian Equities, Nifty 50, and Global Markets.",
    ],
    keyHighlights: [
      "Live interactive weekend cohort sessions with real-time chart breakdowns",
      "Rule-based Swing Screening framework to filter 500+ NSE stocks in 15 minutes",
      "Institutional order flow and multi-timeframe structural analysis",
      "Strict capital preservation and mathematical position sizing formulas",
      "1-on-1 trade review and dedicated Telegram batch community",
      "Certificate of Course Completion from UPtrend Financial Academy",
    ],
    features: [
      {
        title: "Module 1: Market Structure & Institutional Mechanics",
        description: "Understanding market cycles, trend continuation, break of structure (BOS), and change of character (CHoCH).",
      },
      {
        title: "Module 2: Smart Money Concepts & Liquidity Traps",
        description: "Identifying order blocks, fair value gaps (FVG), liquidity pools, and retail trap avoidance strategies.",
      },
      {
        title: "Module 3: Stock Screening & Watchlist Building",
        description: "Custom TradingView and Chartink screeners for identifying institutional accumulation and sector rotation.",
      },
      {
        title: "Module 4: Risk Management & Execution Blueprint",
        description: "Calculating maximum risk per trade, trailing stop losses, partial profit booking, and journal maintenance.",
      },
      {
        title: "Module 5: Live Trading Desk & Case Studies",
        description: "Weekly live market review sessions analyzing live setups and post-market trade breakdowns.",
      },
    ],
    reviews: [
      {
        name: "Rahul Krishnan",
        location: "Kochi, Kerala",
        rating: 5,
        comment: "Nikhil sir's swing trading framework completely changed my approach. Made +18% on my swing portfolio within 2 months with zero stress.",
        date: "August 2026",
      },
      {
        name: "Anas Parakkal",
        location: "Malappuram, Kerala",
        rating: 5,
        comment: "The Malayalam explanations made advanced institutional liquidity concepts so easy to understand. Best mentorship ever!",
        date: "August 2026",
      },
      {
        name: "Deepak Menon",
        location: "Calicut, Kerala",
        rating: 5,
        comment: "No lagging indicators, just pure price action and risk control. Highly recommended for working professionals.",
        date: "July 2026",
      },
    ],
  },
  {
    id: "market-basics-technical",
    slug: "market-basics-technical-analysis",
    title: "Master the Stock Market – From Basics to Technical Analysis",
    shortDescription: "A structured, beginner-friendly introduction to stock market investing, charting, and technical analysis.",
    image: "/course-basics-technical.jpg",
    instructor: "Nikhil Mathew",
    language: "Malayalam & English",
    originalPrice: 1999,
    price: 1500,
    internetHandlingFee: 31.85,
    totalPrice: 1531.85,
    duration: "4 Weeks Self-Paced + Live Q&A",
    access: "Full Course Access",
    level: "Beginner to Intermediate",
    tag: "Bestseller",
    about: [
      "Master the Stock Market is the definitive starting point for anyone looking to enter the world of financial trading and investing with confidence. We eliminate confusing jargon and break down technical concepts into actionable, structured learning modules.",
      "You will learn candlestick anatomy, chart patterns, support/resistance zones, trendlines, momentum indicators, trading psychology, and how to operate trading terminals safely.",
    ],
    keyHighlights: [
      "Comprehensive beginner-friendly curriculum taught in clear Malayalam & English",
      "Hands-on walkthrough of Demat account setup, charting platforms, and order types",
      "Essential candlestick and chart patterns with high win-rate probability",
      "Introduction to risk management and risk-reward ratio",
      "Dedicated doubt clearing sessions and complete access to study materials",
    ],
    features: [
      {
        title: "Module 1: Introduction to Stock Exchanges & Markets",
        description: "NSE, BSE, SEBI regulations, market participants, and how stock prices move.",
      },
      {
        title: "Module 2: Technical Charting Foundations",
        description: "Mastering Candlestick types, Support & Resistance, Trendlines, and Moving Averages.",
      },
      {
        title: "Module 3: High-Probability Chart Patterns",
        description: "Head & Shoulders, Double Bottoms, Triangles, Flags, and Breakout confirmation techniques.",
      },
      {
        title: "Module 4: Risk Control & Capital Safety",
        description: "Position sizing rules, setting Stop Losses, and avoiding beginner pitfalls.",
      },
    ],
    reviews: [
      {
        name: "Sujith Varma",
        location: "Thrissur, Kerala",
        rating: 5,
        comment: "As a complete beginner, this course cleared all my doubts. Excellent explanation of charts and terms.",
        date: "August 2026",
      },
      {
        name: "Amina R.",
        location: "Kottayam, Kerala",
        rating: 5,
        comment: "Very affordable and extremely high quality. Nikhil sir makes trading easy to understand.",
        date: "July 2026",
      },
    ],
  },
  {
    id: "nifty-options-futures",
    slug: "nifty-options-futures-masterclass",
    title: "Nifty 50 Options & Futures SMC Masterclass",
    shortDescription: "Master index derivatives, options buying & selling strategies with Smart Money order flow mechanics.",
    image: "/course-swing-trading.jpg",
    instructor: "Nikhil Mathew",
    language: "Malayalam & English",
    originalPrice: 19999,
    price: 16999,
    internetHandlingFee: 360.50,
    totalPrice: 17359.50,
    duration: "8 Weeks Live Mentorship",
    access: "Full Course Access",
    level: "Advanced Derivatives",
    tag: "High Demand",
    about: [
      "Take your index trading to the institutional level. Master the mechanics of Option Greeks, Open Interest (OI) analysis, Delta/Gamma shifts, and institutional Order Flow to trade Nifty 50 and BankNifty with razor-sharp risk controls.",
      "Designed specifically for active intraday and positional options traders seeking consistent 1:3+ risk-to-reward setups.",
    ],
    keyHighlights: [
      "Live market execution and index trade planning",
      "Option Greeks mastery (Delta, Gamma, Theta, Vega)",
      "Open Interest (OI) and institutional unwinding detection",
      "Smart Money Order Flow & Volume Profile integration",
      "Non-directional hedging and options selling strategies",
    ],
    features: [
      {
        title: "Module 1: Derivatives Architecture & Greeks",
        description: "In-depth options pricing models, implied volatility (IV), and Greeks management.",
      },
      {
        title: "Module 2: Open Interest & Institutional Footprints",
        description: "Reading option chain data, PCR ratio, Max Pain, and institutional buildup.",
      },
      {
        title: "Module 3: Options Buying Strategies for High R:R",
        description: "Timing explosive momentum breakouts and delta spikes with minimal capital risk.",
      },
      {
        title: "Module 4: Non-Directional Adjustments & Hedging",
        description: "Iron Condors, Strangles, Ratio Spreads, and dynamic intraday adjustment rules.",
      },
    ],
    reviews: [
      {
        name: "Fasil M.",
        location: "Perinthalmanna, Kerala",
        rating: 5,
        comment: "Option buying with SMC order flow is unmatched. My win rate improved drastically.",
        date: "August 2026",
      },
    ],
  },
];
