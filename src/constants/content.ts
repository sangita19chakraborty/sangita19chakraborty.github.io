// ─────────────────────────────────────────────────────────────────────────────
// PORTFOLIO CONTENT — edit anything here to update the site
// ─────────────────────────────────────────────────────────────────────────────

// ── GLOBAL ───────────────────────────────────────────────────────────────────
export const SITE = {
  name: "Sangita",
  fullName: "Sangita Chakraborty",
  role: "Strategy Consultant & Marketing Specialist",
  tagline: "Strategic thinker. Marketing-driven.\nI build frameworks that move brands forward.",
  copyright: "© 2026 Sangita Chakraborty. All rights reserved.",
};

// ── NAVIGATION ───────────────────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "01 Work",       href: "#work" },
  { label: "02 About",      href: "#about" },
  { label: "03 Activities", href: "#extracurricular" },
  { label: "04 Instagram",  href: "#instagram" },
  { label: "05 Contact",    href: "#contact" },
];

// ── HERO ─────────────────────────────────────────────────────────────────────
export const HERO = {
  scrollLabel:    "{ SCROLL }",
  availableLabel: "{ AVAILABLE FOR WORK }",
  cta: {
    label: "See My Work",
    href:  "#work",
  },
  secondaryCta: {
    label: "Download CV",
    href:  "/cv-sangita-chakraborty.pdf",
  },
};

// ── WORK / PROJECTS ──────────────────────────────────────────────────────────
export const WORK_SECTION = {
  tag:   "Featured Work",
  title: "Academic Projects\n& Case Studies",
};

export const PROJECTS = [
  {
    id: 1,
    client:     "Ferrari",
    title:      "Ferrari Accounting and Financial Analysis",
    tags:       ["Accounting Analysis", "Financial Analysis", "Case Study"],
    year:       "2025",
    outcome:    "10 years ratio analysis across five industry peers with 15+ financial metrics evaluated",
    color:      "#1a0505",
    canvaEmbed: "https://www.canva.com/design/DAGonJkaJXQ/T-nG5knAf1jIf-daStOgNw/view?embed",
  },
  {
    id: 2,
    client:     "Tesla",
    title:      "Tesla Forecasting P/L Analysis in German Market",
    tags:       ["Strategy Map", "SWOT Analysis", "Internal/External Audit", "Implementation Plan"],
    year:       "2025",
    outcome:    "Comprehensive strategic analysis and forecasting of Tesla's profitability in the German market, including a detailed implementation roadmap using CAGR based modelling",
    color:      "#0a0f1a",
    canvaEmbed: "https://www.canva.com/design/DAG6FRxRJag/dM7WaZHl17tQdWXH_2xKkg/view?embed",
  },
  {
    id: 3,
    client:     "Starbucks",
    title:      "Starbucks Marketing Analysis",
    tags:       ["Marketing Analysis", "4P Analysis", "Campaign Performance"],
    year:       "2025",
    outcome:    "Analysed Starbucks' market profit expansion strategy in South Korea using new business plan",
    color:      "#031a0a",
    canvaEmbed: "https://www.canva.com/design/DAG6U5nu2OU/6ebqvt00r0r7b3oong3A2Q/view?embed",
  },
  {
    id: 4,
    client:     "Culture Study",
    title:      "Cultural Profile: Japan",
    tags:       ["Cross-Cultural Marketing", "Research", "Asia-Pacific"],
    year:       "2024",
    outcome:    "Deep-dive cultural analysis informing market-entry strategy for Japan",
    color:      "#1a0a12",
    canvaEmbed: "https://www.canva.com/design/DAG5GOoO6dY/xcyfO1TjG1M5VOnwATLanQ/view?embed",
  },
  {
    id: 5,
    client:     "Samsung",
    title:      "Samsung Marketing Analysis",
    tags:       ["Consumer Electronics", "Marketing Mix", "Competitive Analysis"],
    year:       "2024",
    outcome:    "Comprehensive marketing mix and competitive landscape review for Samsung",
    color:      "#051020",
    canvaEmbed: "https://www.canva.com/design/DAG58ng4oDE/4Ct5VOvau0D99fBBOkYSng/view?embed",
  },
  {
    id: 6,
    client:     "HYBE Corporation",
    title:      "HYBE — Marketing & Financial Analysis",
    tags:       ["K-Pop Industry", "Financial Analysis", "Brand Extensions"],
    year:       "2024",
    outcome:    "Marketing and financial deep-dive into HYBE's multi-artist IP ecosystem",
    color:      "#0d0523",
    canvaEmbed: "https://www.canva.com/design/DAGkH_48jrU/jUiPkZg7i6HTm40ol0PVbA/view?embed",
  },
  {
    id: 7,
    client:     "Walt Disney",
    title:      "Strategic Analysis of Walt Disney",
    tags:       ["Strategic Management", "Media & Entertainment", "M&A"],
    year:       "2024",
    outcome:    "Strategic assessment of Disney's business model, diversification and digital pivot",
    color:      "#100515",
    canvaEmbed: "https://www.canva.com/design/DAGnlPbyePw/tunwU7o7pX7mM1PN38sEpw/view?embed",
  },
];

// ── ABOUT ─────────────────────────────────────────────────────────────────────
export const ABOUT_SECTION = {
  tag:        "About",
  profileTag: "{ PROFILE }",
  headline:   "Master's student at Yonsei GSIS, bridging global strategy with creative marketing.",
  bio: [
    "Currently pursuing a Master's in Global Strategy and Management at Yonsei Graduate School of International Studies (GSIS), Seoul. I combine academic rigour with hands-on marketing experience across brand strategy, content creation, and international communications.",
    "Passionate about the intersection of culture and commerce — from K-Pop's global market impact to luxury brand storytelling. Whether moderating industry panels, writing for an international university newsletter, or creating content for 2,100+ Instagram followers, my focus is always on authentic connections that drive real results.",
  ],
};

export const ABOUT_STATS = [
  { num: "8+",   label: "Projects Completed" },
  { num: "3+",   label: "Club Leadership Roles" },
  { num: "2.1K", label: "Instagram Followers" },
];

// ── EXPERIENCE ───────────────────────────────────────────────────────────────
export const EXPERIENCE_SECTION = {
  tag:          "Experience",
  title:        "Education & Roles",
  downloadLabel: "Download CV",
  downloadHref:  "/cv-sangita-chakraborty.pdf",
};

export const EXPERIENCE_ITEMS = [
  { role: "M.A. Global Strategy & Management",        company: "Yonsei GSIS, Seoul",            from: "2024", to: "NOW"  },
  { role: "VP & Head of Partnerships",                company: "Global Business Hub Club",      from: "2025", to: "NOW"  },
  { role: "Editor",                                   company: "University Newsletter Club",    from: "2025", to: "NOW"  },
  { role: "Social/Inter-GSIS Committee Manager",      company: "Graduate Student Assoc. (GSA)", from: "2024", to: "NOW"  },
  { role: "University Campus Ambassador",             company: "KCampus JoongAng Daily",        from: "2026", to: "NOW"  },
];

// ── SKILLS ───────────────────────────────────────────────────────────────────
export const SKILLS_SECTION = {
  tag:   "Skills",
  title: "Core Capabilities",
  body:  "A versatile strategic marketing skill set developed through academic research, club leadership, and real-world content creation.",
};

export const SKILLS = [
  { number: "01", label: "Brand Strategy" },
  { number: "02", label: "Content Creation" },
  { number: "03", label: "Campaign Management" },
  { number: "04", label: "Cross-Cultural Marketing" },
  { number: "05", label: "Negotiation Skills" },
  { number: "06", label: "Social Media & Influencer Marketing" },
  { number: "07", label: "Marketing Research & Analytics" },
  { number: "08", label: "Public Relations" }
];

// ── EXTRACURRICULAR ───────────────────────────────────────────────────────────
export const EXTRA_SECTION = {
  tag:   "Activities",
  title: "Extracurricular\nActivities",
};

export const EXTRA_ITEMS = [
  {
    id:     1,
    org:    "University Newsletter Club",
    role:   "Junior Editor → Editor",
    period: "2025 – NOW",
    desc:   "Write university articles covering student club activities and Korean issues — creating survival-kit content for international students.",
    icon:   "✍️",
  },
  {
    id:     2,
    org:    "KCampus University Ambassador",
    role:   "Campus Ambassador",
    period: "2026 – NOW",
    desc:   "Official ambassador for KCampus JoongAng Daily, representing the university and promoting Korea-focused media and education content.",
    icon:   "🎓",
  },
  {
    id:     3,
    org:    "Global Business Hub Club",
    role:   "Head of Partnerships → VP",
    period: "2025 – NOW",
    desc:   "Organises panel talk events as moderator, LinkedIn events, networking meetups, company visits, and Korean Resume Workshops for international students.",
    icon:   "🤝",
  },
  {
    id:     4,
    org:    "Graduate Student Association (GSA)",
    role:   "Social Manager → MT Gala & Inter-GSIS Committee Manager",
    period: "3 Semesters",
    desc:   "Social Manager, MT Gala & inter-GSIS committee member. Organised esports tournaments, baseball matches, and hiking events for the graduate community.",
    icon:   "⚡",
  },
  {
    id:     5,
    org:    "Instagram — @sani.seoulscapes",
    role:   "Content Creator & Brand Collaborator",
    period: "2023 – NOW",
    desc:   "Maintains an Instagram account with barter brand collaborations with beauty & skincare brands, campaign participations, marketing review content and lifestyle vlogging",
    icon:   "📱",
  },
];

// ── BRAND COLLABORATIONS ──────────────────────────────────────────────────────
export const BRANDS_SECTION = {
  tag:  "Collaborations",
  title: "Brand Partners",
  body: "Worked with Korea-based beauty, skincare, and wellness brands through barter collaborations, campaigns, and content creation.",
};

export const BRANDS = [
  { name: "VT Cosmetics",         abbr: "VT",   color: "#c8ff00" },
  { name: "Juno Hair",            abbr: "JH",   color: "#ff9cda" },
  { name: "Lamiche Dermatology",  abbr: "LM",   color: "#a0e4ff" },
  { name: "Vog Hair",             abbr: "VH",   color: "#ffd6a5" },
  { name: "BtheB",                abbr: "BtB",  color: "#b9fbc0" },
  { name: "Face Republic",        abbr: "FR",   color: "#ffadad" },
  { name: "Dellaborn",            abbr: "DB",   color: "#e0c3fc" },
  { name: "Vands Clinic",         abbr: "VC",   color: "#caffbf" },
  { name: "ID Clinic",            abbr: "ID",   color: "#ffd6ff" },
  { name: "Mary & May",           abbr: "M&M",  color: "#fdffb6" },
];

// ── VOLUNTEERING ──────────────────────────────────────────────────────────────
export const VOLUNTEER_SECTION = {
  tag:   "Giving Back",
  title: "Volunteering",
};

export const VOLUNTEER_ITEMS = [
  {
    org:    "Hello World Korea",
    role:   "English Mentor",
    period: "2025",
    desc:   "Mentoring Korean middle school students in English, fostering language confidence and cross-cultural understanding.",
    icon:   "🌍",
  },
  {
    org:    "NomadHER — She Can Travel Anywhere Festival",
    role:   "Guide & Connector",
    period: "2026",
    desc:   "Volunteered at the NomadHER festival, guiding attendees, facilitating meaningful connections, and helping people navigate the event space.",
    icon:   "✈️",
  },
  {
    org:    "KCampus JoongAng Daily",
    role:   "University Campus Ambassador",
    period: "2026 – NOW",
    desc:   "Serving as an official Campus Ambassador for KCampus, a key Korean media and education platform, representing Yonsei University.",
    icon:   "📰",
  },
];

// ── LANGUAGES ─────────────────────────────────────────────────────────────────
export const LANGUAGES_SECTION = {
  tag:  "Languages",
  title: "Multilingual\nCommunicator",
  body: "Fluent across multiple languages, enabling authentic connections across cultures.",
};

export const LANGUAGES = [
  { lang: "English",  level: "Fluent",       proficiency: 100, script: "Hello"    },
  { lang: "Hindi",    level: "Native",        proficiency: 100, script: "नमस्ते"  },
  { lang: "Bengali",  level: "Native",        proficiency: 100, script: "নমস্কার" },
  { lang: "Korean",   level: "Level 3",       proficiency: 75,  script: "안녕하세요" },
  { lang: "Japanese", level: "Beginner",      proficiency: 20,  script: "こんにちは" },
];

// ── INSTAGRAM INSIGHTS ────────────────────────────────────────────────────────
export const INSTAGRAM_SECTION = {
  tag:    "Social Proof",
  title:  "Instagram\nInsights",
  handle: "@sani.seoulscapes",
  period: "13 Jan — 13 Apr 2026",
  days:   "90 days",
  href:   "https://www.instagram.com/sani.seoulscapes/",
  followers: "2,100+",
};

export const INSTAGRAM_STATS = [
  { label: "Reel Views",       value: "1.4L",  sub: "140,000+ views" },
  { label: "Accounts Reached", value: "94K",   sub: "in 90 days"     },
  { label: "Likes",            value: "14K",   sub: "total"          },
  { label: "Saves",            value: "791",   sub: "saved posts"    },
  { label: "Shares",           value: "672",   sub: "organic"        },
  { label: "Reposts",          value: "518",   sub: "reposts"        },
  { label: "Comments",         value: "342",   sub: "conversations"  },
  { label: "Reels",            value: "43",    sub: "published"      },
];

// ── CONTACT ──────────────────────────────────────────────────────────────────
export const CONTACT_SECTION = {
  tag:      "Contact",
  headline: "Let's work\ntogether.",
  body:     "Open to internships, full time jobs, collaborations, and interesting conversations. Based in Seoul, open to opportunities in India too — drop me a line.",
  cta:      "Send a Message",
  email:    "sangita19chakraborty@gmail.com",
  phone:    "Instagram DM",
};

export const SOCIAL_LINKS = [
  { label: "Instagram", href: "https://www.instagram.com/sani.seoulscapes/" },
  { label: "LinkedIn",  href: "https://www.linkedin.com/in/sangita-chakraborty-8607a9169/" },
  { label: "Email",     href: "mailto:sangita19chakraborty@gmail.com" },
];
