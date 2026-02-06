import type { SeattleRec } from "@/types";

export const REC_CATEGORIES = [
  "food",
  "coffee",
  "outdoors",
  "neighborhoods",
  "culture",
  "practical",
] as const;

export const seattleRecs: SeattleRec[] = [
  {
    id: "1",
    title: "Pike Place Market",
    category: "food",
    location: "Seattle",
    description:
      "The iconic market with fresh flowers, fish tossing, and local bites. Go early to beat the crowds and grab a piroshky.",
    whyPicked: "It's the Seattle postcard for a reason—you'll feel like you've arrived.",
    link: "https://pikeplacemarket.org",
    cuisine: "Various",
  },
  {
    id: "2",
    title: "Café Campagne",
    category: "food",
    location: "Seattle",
    description:
      "Cozy French bistro in Pike Place. Perfect for a slow weekend brunch or date night.",
    whyPicked: "Feels like a little escape without leaving the city.",
    link: "https://campagnerestaurant.com",
    cuisine: "French",
  },
  {
    id: "3",
    title: "Espresso Vivace",
    category: "coffee",
    location: "Seattle",
    description:
      "Seattle's beloved roaster. The Capitol Hill sidewalk stand is the move for a perfect latte.",
    whyPicked: "This is where Seattle's coffee culture really shines.",
    link: "https://espressovivace.com",
    workFriendly: true,
  },
  {
    id: "4",
    title: "Elm Coffee Roasters",
    category: "coffee",
    location: "Seattle",
    description:
      "Minimal, bright Pioneer Square spot. Great for working or a quiet catch-up.",
    whyPicked: "Calm vibes and really good single-origin.",
    workFriendly: true,
  },
  {
    id: "5",
    title: "Discovery Park",
    category: "outdoors",
    location: "Seattle",
    description:
      "Huge park with trails, beach, and lighthouse views. Best sunset spot in the city.",
    whyPicked: "You get forest, beach, and skyline in one place.",
  },
  {
    id: "6",
    title: "Alki Beach",
    category: "outdoors",
    location: "Seattle",
    description:
      "Long beach walk with Seattle skyline views. Good for bikes, walks, or just sitting with coffee.",
    whyPicked: "Feels like a mini West Coast getaway.",
  },
  {
    id: "7",
    title: "Capitol Hill",
    category: "neighborhoods",
    location: "Seattle",
    description:
      "Restaurants, bars, bookstores, and queer-friendly nightlife. Broadway and 15th are the main strips.",
    whyPicked: "Where a lot of Seattle's energy and community lives.",
  },
  {
    id: "8",
    title: "Fremont",
    category: "neighborhoods",
    location: "Seattle",
    description:
      "The \"Center of the Universe\" with the troll, Sunday market, and quirky shops.",
    whyPicked: "Weird and fun—very Seattle.",
  },
  {
    id: "9",
    title: "MoPOP",
    category: "culture",
    location: "Seattle",
    description:
      "Museum of Pop Culture: music, sci-fi, and interactive exhibits. The building alone is worth it.",
    whyPicked: "Unique and actually fun, not stuffy.",
    link: "https://www.mopop.org",
  },
  {
    id: "10",
    title: "Elliott Bay Book Company",
    category: "culture",
    location: "Seattle",
    description:
      "Independent bookstore in Capitol Hill. Wood shelves, readings, and that perfect bookshop smell.",
    whyPicked: "The kind of place you'll keep going back to.",
  },
  {
    id: "11",
    title: "Get a Sno-Park pass (winter)",
    category: "practical",
    location: "Seattle",
    description:
      "If you plan to hit the mountains for snow play or skiing, you need a Sno-Park permit for parking.",
    whyPicked: "Saves you a ticket and stress—worth it for one trip.",
  },
  {
    id: "12",
    title: "ORCA card",
    category: "practical",
    location: "Seattle",
    description:
      "Transit card for buses, Link light rail, and ferries. Load it once and tap everywhere.",
    whyPicked: "Makes getting around feel easy from day one.",
  },
  {
    id: "13",
    title: "CU Urban Market and Cafe",
    category: "coffee",
    location: "Seattle",
    description:
      "A family owned cafe, and a cozy spot to sip, snack, and have light meals!",
    whyPicked: "Sami had a ferrero rocher latte here and you must try it and we also must try together",
    workFriendly: true,
  },
  // Bellevue recommendations
  {
    id: "b1",
    title: "Bellevue Square & Downtown",
    category: "neighborhoods",
    location: "Bellevue",
    description:
      "The heart of Bellevue—shopping, restaurants, and a walkable downtown. Great for lunch breaks and weekend strolls.",
    whyPicked: "Your work neighborhood, so easy to explore during the day.",
  },
  {
    id: "b2",
    title: "Meydenbauer Bay Park",
    category: "outdoors",
    location: "Bellevue",
    description:
      "Waterfront park with a beach, walking paths, and views of Lake Washington. Perfect for a quick escape.",
    whyPicked: "Close to downtown and feels like a mini getaway.",
  },
  {
    id: "b3",
    title: "Bellevue Botanical Garden",
    category: "outdoors",
    location: "Bellevue",
    description:
      "Beautiful gardens with trails, seasonal displays, and a peaceful vibe. Free admission.",
    whyPicked: "A calm spot to reset after work or on weekends.",
  },
  {
    id: "b4",
    title: "Café Cesura",
    category: "coffee",
    location: "Bellevue",
    description:
      "Local roaster in downtown Bellevue. Great coffee, good vibes, and a solid spot to work or meet up.",
    whyPicked: "Quality coffee right where you work—no commute needed.",
    workFriendly: true,
  },
  {
    id: "b5",
    title: "Din Tai Fung",
    category: "food",
    location: "Bellevue",
    description:
      "Famous soup dumplings and Taiwanese food. Usually a wait, but worth it. Bellevue Square location.",
    whyPicked: "A Seattle-area favorite—perfect for a treat after work.",
    cuisine: "Asian",
  },
  {
    id: "b6",
    title: "Crossroads Bellevue",
    category: "neighborhoods",
    location: "Bellevue",
    description:
      "Diverse area with international food, shops, and a community feel. Different vibe from downtown.",
    whyPicked: "More local and less corporate—good for exploring.",
  },
  {
    id: "b7",
    title: "Kelsey Creek Farm",
    category: "outdoors",
    location: "Bellevue",
    description:
      "Historic farm with animals, trails, and open space. Cute and low-key for a walk or picnic.",
    whyPicked: "Quiet and charming—nice contrast to the city.",
  },
  {
    id: "b8",
    title: "Bellevue Arts Museum",
    category: "culture",
    location: "Bellevue",
    description:
      "Small but thoughtful art museum. Rotating exhibits and a nice way to spend an hour or two.",
    whyPicked: "Culture without the Seattle crowds.",
  },
  {
    id: "b9",
    title: "Lake Hills Greenbelt",
    category: "outdoors",
    location: "Bellevue",
    description:
      "Trail system through neighborhoods and green spaces. Good for running, walking, or just being outside.",
    whyPicked: "Easy access to nature without leaving Bellevue.",
  },
  {
    id: "b10",
    title: "John Howie Steak",
    category: "food",
    location: "Bellevue",
    description:
      "Upscale steakhouse for a special dinner or date night. Bellevue location is polished and cozy.",
    whyPicked: "Nice spot for celebrating or treating yourself.",
    cuisine: "American",
  },
];
