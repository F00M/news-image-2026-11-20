// Every story on the page: what happened, or was first reported, on Friday 20 November 2026.
// reg: EU europe · ME middle east · AS asia · AF africa · AM americas · OC oceania · GL global
// tag: how sure — CONFIRMED (2+ outlets or on the record), OFFICIAL (the body itself), REPORTED (one outlet), CLAIM (one side)

export const DAY = {
  weekday: "Friday",
  date: "20 November 2026",
  kicker: "The world in one day",
  dek: "Russian missiles cut Kyiv’s bridges · Cyclone Akvan comes ashore in India · An AI sell-off sinks Asia · Britain and the EU seal their reset",
};

// Six numbers that tell the day at a glance (n = the number, t = what it counts)
export const NUMBERS = [
  { n: "3", t: "Kyiv bridges hit by Russian missiles", reg: "EU" },
  { n: "440,000", t: "people moved to shelters before Akvan", reg: "AS" },
  { n: "−6.2%", t: "Taiwan’s stock index on Friday", reg: "AS" },
  { n: "100,000", t: "youth visa places a year in UK–EU deal", reg: "EU" },
  { n: "2.3%", t: "Japan’s inflation rate in October", reg: "AS" },
  { n: "1 in 4", t: "children now live near war, a record", reg: "GL" },
];

// The day on a 24-hour UTC clock (hour as a decimal). "Night" times are approximate.
export const TIMELINE = [
  { h: 1.5, t: "Night", txt: "Missiles hit Kyiv bridges", reg: "EU" },
  { h: 2.5, t: "02:00–03:00", txt: "Akvan makes landfall", reg: "AS" },
  { h: 6.5, t: "06:30", txt: "Tokyo, Seoul close deep red", reg: "AS" },
  { h: 9.5, t: "Morning", txt: "Italy’s general strike", reg: "EU" },
  { h: 11.4, t: "11:25", txt: "M4.2 quake shakes L.A.", reg: "AM" },
  { h: 14.5, t: "14:30", txt: "Nasdaq opens lower", reg: "AM" },
  { h: 17.5, t: "17:30", txt: "Trump briefs on China trip", reg: "AM" },
  { h: 22.0, t: "Late", txt: "COP31 in overtime", reg: "GL" },
];

export const LEADS = [
  {
    art: "kyiv", reg: "EU", place: "Kyiv, Ukraine", field: "War",
    head: "Russian missiles hit three Kyiv bridges",
    dek: "Podilskyi, Darnytskyi and Southern bridges hit by 111 missiles and 404 drones; 8+ killed.",
    tag: "CONFIRMED", src: "Kyiv city · Air Force · AP",
  },
  {
    art: "akvan", reg: "AS", place: "Odisha, India", field: "Weather",
    head: "Cyclone Akvan makes landfall near Gopalpur",
    dek: "Crossed the coast at 7:30–8:30 am IST, then weakened. No deaths reported; 69 trains cancelled.",
    tag: "OFFICIAL", src: "IMD · Odisha govt",
  },
  {
    art: "selloff", reg: "AS", place: "Taipei · Seoul · Tokyo", field: "Markets",
    head: "AI sell-off sinks Asia’s stock markets",
    dek: "Chips led the rout a day after Anthropic’s debut: Kospi −5.2%, Nikkei −5.1%.",
    tag: "CONFIRMED", src: "Reuters · Al Jazeera",
  },
];

export const CARDS = [
  { art: "ukeu", reg: "EU", place: "Brussels", head: "UK and EU seal ‘reset’: youth visas, food trade", tag: "OFFICIAL", src: "No 10 · EU" },
  { art: "cop", reg: "GL", place: "Antalya", head: "COP31 runs into overtime with no deal on fossil fuels", tag: "CONFIRMED", src: "Reuters · DW" },
  { art: "poland", reg: "EU", place: "Lublin, Poland", head: "Russian Kh-101 missile lands in a Polish field", tag: "OFFICIAL", src: "Polish MoD" },
  { art: "estonia", reg: "EU", place: "Tallinn", head: "Estonia to shut Russia road border for six months", tag: "OFFICIAL", src: "Estonian govt" },
  { art: "italy", reg: "EU", place: "Rome · Milan", head: "General strike over Italy’s budget in 100+ cities", tag: "CONFIRMED", src: "CGIL · ANSA" },
  { art: "presser", reg: "AM", place: "Washington", head: "Trump, back from China, calls Iran’s offer ‘unacceptable’", tag: "CONFIRMED", src: "White House" },
  { art: "iraq", reg: "ME", place: "Jurf al-Sakhar, Iraq", head: "Iraqi troops enter Kataib Hezbollah stronghold", tag: "CONFIRMED", src: "Reuters" },
  { art: "yemen", reg: "ME", place: "Hodeidah, Yemen", head: "Saudi-led coalition strikes Houthi-held port", tag: "REPORTED", src: "AP · Al Jazeera" },
  { art: "japan", reg: "AS", place: "Tokyo", head: "Japan’s inflation rises to 2.3% in October", tag: "OFFICIAL", src: "Stats Bureau" },
  { art: "children", reg: "GL", place: "Global", head: "Record 1 in 4 children now live near war", tag: "REPORT", src: "Save the Children" },
  { art: "quake", reg: "AM", place: "Los Angeles", head: "M4.2 quake jolts L.A. at 3:25 am; no damage", tag: "OFFICIAL", src: "USGS · LAFD" },
  { art: "sco", reg: "AS", place: "New Delhi", head: "Modi opens SCO forum; Pakistan delegation attends", tag: "OFFICIAL", src: "PMO · ANI" },
];

// One-line stories: f = flag, p = place, t = what happened, s = source
export const BRIEFS = [
  // Europe
  { reg: "EU", f: "UA", p: "Zelensky", t: "asks allies to speed Patriot interceptors", s: "Kyiv Indep." },
  { reg: "EU", f: "UA", p: "Lviv", t: "strike on a railway station kills 2", s: "BBC" },
  { reg: "EU", f: "UA", p: "Kharkiv", t: "drone damages a hospital, 4 hurt", s: "DN" },
  { reg: "EU", f: "GB", p: "UK", t: "retail sales up 0.7% in October", s: "ONS" },
  { reg: "EU", f: "GB", p: "UK", t: "top general: Britain runs offensive cyber ops", s: "Sky" },
  { reg: "EU", f: "FR", p: "ECB", t: "France nominates Laurence Boone to board", s: "Reuters" },
  { reg: "EU", f: "DE", p: "Germany", t: "IG Metall’s first all-day strikes in 8 years", s: "BR" },
  { reg: "EU", f: "DE", p: "Germany", t: "‘Gen Z’ youth protests in 73 cities", s: "The Local" },
  { reg: "EU", f: "VA", p: "Vatican", t: "Pope urges aid so Mideast Christians stay", s: "EWTN" },
  { reg: "EU", f: "RU", p: "Moscow", t: "calls Estonia’s closure a ‘new Iron Curtain’", s: "MFA" },
  { reg: "EU", f: "ES", p: "Turin", t: "Alcaraz tops ATP Finals group, 3–0", s: "ATP" },
  // Middle East
  { reg: "ME", f: "SA", p: "Riyadh", t: "Houthis warn people off finance district", s: "Houthis" },
  { reg: "ME", f: "IR", p: "Qeshm", t: "blast blamed on munitions disposal", s: "Tasnim" },
  { reg: "ME", f: "PS", p: "Gaza", t: "Israeli strike in Bureij kills 4", s: "Pal. media" },
  { reg: "ME", f: "IL", p: "Israel", t: "report: new strikes on Iran being weighed", s: "CBS" },
  { reg: "ME", f: "GLOBE", p: "Oil", t: "Brent near $90, third weekly fall", s: "LSEG" },
  // Asia
  { reg: "AS", f: "IN", p: "Odisha", t: "1,317 babies born in cyclone shelters", s: "CM" },
  { reg: "AS", f: "IN", p: "Jharkhand", t: "orange alert as Akvan rain moves in", s: "IMD" },
  { reg: "AS", f: "IN", p: "Rajasthan", t: "Congress leads rural council count", s: "SEC" },
  { reg: "AS", f: "NP", p: "Nepal", t: "PM Balendra Shah to visit Delhi on Sunday", s: "MoFA" },
  { reg: "AS", f: "MM", p: "Myanmar", t: "calls ICJ genocide ruling ‘unfair’", s: "ANI" },
  { reg: "AS", f: "PK", p: "Pakistan", t: "says it does not recognise the Taliban", s: "FO" },
  // Africa
  { reg: "AF", f: "SN", p: "Senegal", t: "search for dozens missing off Dakar", s: "allAfrica" },
  { reg: "AF", f: "SL", p: "Somaliland", t: "rebuffs Mogadishu on its diplomacy", s: "allAfrica" },
  { reg: "AF", f: "ZA", p: "S. Africa", t: "NGO seeks arms-to-Myanmar probe", s: "SALC" },
  // Americas
  { reg: "AM", f: "US", p: "Trump", t: "threatens penalties on data centres abroad", s: "ToI" },
  { reg: "AM", f: "US", p: "Trump", t: "agrees Iran war cost GOP the midterms", s: "ToI" },
  { reg: "AM", f: "US", p: "New York", t: "Mamdani plans Rikers closure by 2032", s: "NYC" },
  { reg: "AM", f: "US", p: "Wall St", t: "chip rout: Nasdaq −3.4% by midday", s: "Benzinga" },
  { reg: "AM", f: "US", p: "NSA", t: "classified network down a third day", s: "Fox" },
  { reg: "AM", f: "US", p: "Cinemas", t: "‘Sunrise on the Reaping’ opens", s: "Lionsgate" },
  { reg: "AM", f: "GLOBE", p: "OAS", t: "council weighs Rio Treaty against cartels", s: "AFP" },
  { reg: "AM", f: "BR", p: "Brazil", t: "Black Consciousness Day; markets shut", s: "Rio Times" },
  { reg: "AM", f: "US", p: "Las Vegas", t: "Russell fastest in rain-hit F1 practice", s: "Reuters" },
  // Oceania
  { reg: "OC", f: "NZ", p: "Wellington", t: "Nicholls 175*, NZ 368; India 159/1", s: "NZ Herald" },
  // Global
  { reg: "GL", f: "PA", p: "COP31", t: "Panama threatens to block the final text", s: "AP" },
];

// Left out on purpose: news of an earlier day, and things that have not happened yet.
export const DATE_CHECK = {
  earlier: [
    "ICJ Myanmar genocide ruling",
    "Trump–Xi–Putin Shenzhen statement",
    "Anthropic’s market debut",
    "Houthi strike on Riyadh’s PIF tower",
    "Denmark’s 109–0 Greenland vote",
    "Somalia expels UAE envoy",
    "Senate Iran war-powers vote",
    "Fiona the hippo dies",
  ],
  notYet: "BepiColombo enters Mercury orbit (Sat 21) · COP31’s final deal · Nepal PM in Delhi (Sun 22)",
};

export const SOURCES = "Reuters, AP, AFP, BBC, Al Jazeera, IMD, USGS and others named per story";
