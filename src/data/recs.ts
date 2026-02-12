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
      "according to Google, an iconic daily market with famed fish-throwing (and other shops!)",
    whyPicked: "got this rec from Sami!!",
    link: "https://pikeplacemarket.org",
    cuisine: "Various",
  },
  {
    id: "1a",
    title: "Original Starbucks (Pike Place)",
    category: "coffee",
    location: "Seattle",
    description:
      "the first Starbucks store, tucked inside Pike Place Market",
    whyPicked:
      "touristy but cute, get an iced hazelnut latte for me!!.",
    workFriendly: false,
  },
  {
    id: "2",
    title: "Café Campagne",
    category: "food",
    location: "Seattle",
    description:
      "a lil parisian french bistro in pike place market",
    whyPicked: "go get some wine and some escargot",
    link: "https://campagnerestaurant.com",
  },
  {
    id: "2a",
    title: "Marination",
    category: "food",
    location: "Seattle",
    description:
      "Hawaiian-Korean food (tacos, sliders, kimchi fried rice) with views of the water.",
    whyPicked:
      "try out something new! and sami said this was really good",
    link: "https://marinationmobile.com",
    cuisine: "Asian",
  },
  {
    id: "2b",
    title: "Di Fiora",
    category: "food",
    location: "Seattle",
    description:
      "cozy spot on Capitol Hill doing Thai-meets-Italian comfort food and pretty cocktails.",
    whyPicked:
      "a fun fusion place! try the THAI",
    cuisine: "Asian",
  },
  {
    id: "2c",
    title: "Flour Box",
    category: "food",
    location: "Seattle",
    description:
      "adorable donut shop in Columbia City with filled brioche donuts and seasonal flavors.",
    whyPicked:
      "gotta do a donut run",
    cuisine: "Various",
  },
  {
    id: "2d",
    title: "Vietnam House",
    category: "food",
    location: "Seattle",
    description:
      "cozy Vietnamese spot in Chinatown–International District for pho, rice plates, and comfort food.",
    whyPicked:
      "if you need some yummy pho 😋🍜",
    cuisine: "Asian",
  },
  {
    id: "2e",
    title: "Japonessa Sushi",
    category: "food",
    location: "Seattle",
    description:
      "fusion and modern sushi vibes with fun rolls, sashimi, and cocktails downtown.",
    whyPicked:
      "this sushi looks sooo good and very cool, right up your alley",
    cuisine: "Asian",
  },
  {
    id: "2f",
    title: "Honey Court & Purple Dot",
    category: "food",
    location: "Seattle",
    description:
      "late-night Chinese food in Chinatown",
    whyPicked:
      "for when you need 1 a.m. dumplings or noodles after a long day",
    cuisine: "Asian",
  },
  {
    id: "3",
    title: "Espresso Vivace",
    category: "coffee",
    location: "Seattle",
    description:
      "espresso bar in capitol hill!!",
    whyPicked: "you have to try the espresso and report back to me, also from user Total_Def-note on reddit quote \"Espresso Vivace ruined me\"",
    link: "https://espressovivace.com",
    workFriendly: true,
  },
  {
    id: "4",
    title: "Elm Coffee Roasters",
    category: "coffee",
    location: "Seattle",
    description:
      "quiet cozy coffee shop in pioneer square",
    whyPicked: "it looks really cute inside and all their lattes have hearts on them",
    workFriendly: true,
  },
  {
    id: "5",
    title: "Discovery Park",
    category: "outdoors",
    location: "Seattle",
    description:
      "a 534-acre, free urban oasis on Puget Sound featuring 11.81 miles of trails, beaches, and the historic West Point Lighthouse",
    whyPicked: "you gotta go hiking here it looks so cool ",
  },
  {
    id: "6",
    title: "Alki Beach",
    category: "outdoors",
    location: "Seattle",
    description:
      "pretty beach in west seattle, with views of the sound and the skyline",
    whyPicked: "looks pretty to walk or bike!!",
  },
  {
    id: "7",
    title: "Capitol Hill",
    category: "neighborhoods",
    location: "Seattle",
    description:
      "cute and quirky neighborhood in seattle, with a lot of indie shops, bars, and restaurants",
    whyPicked: "looks like cool scene with music and stuff! and where the young people are",
  },
  {
    id: "8",
    title: "Fremont",
    category: "neighborhoods",
    location: "Seattle",
    description:
      "indie shops, bohemian vibe, apparently tech and music people hang out here",
    whyPicked: "cool street art and good food apparently",
  },
  {
    id: "9",
    title: "MoPOP",
    category: "culture",
    location: "Seattle",
    description:
      "museum of pop culture: music, sci-fi, and interactive exhibits",
    whyPicked: "founded by microsoft! building looks super cool and sci fi! so you might enjoy",
    link: "https://www.mopop.org",
  },
  {
    id: "10",
    title: "Elliott Bay Book Company",
    category: "culture",
    location: "Seattle",
    description:
      "independent bookstore, multi-level in Capitol Hill",
    whyPicked: "this might be more for me but you should check it out for me 🤗",
  },
  {
    id: "12",
    title: "ORCA card",
    category: "practical",
    location: "Seattle",
    description:
      "Transit card for buses, Link light rail, and ferries. Load it once and tap everywhere",
    whyPicked: "gotta get to work!",
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
  {
    id: "13a",
    title: "Coffeeholic House",
    category: "coffee",
    location: "Seattle",
    description:
      "Vietnamese-inspired coffee shop known for phin brews and cute cups",
    whyPicked:
      "looks like such a fun coffee date spot, please try a fancy drink here.",
    link: "https://coffeeholichouse.com",
    workFriendly: true,
  },
  {
    id: "14",
    title: "Skalka",
    category: "food",
    location: "Seattle",
    description:
      "georgian bakery downtown with khachapuri, cheesy breads, and strong coffee",
    whyPicked:
      "another sami rec! sounds cool and unique",
    link: "https://skalkabakery.com",
    cuisine: "Various",
  },
  {
    id: "15",
    title: "Space Needle",
    category: "outdoors",
    location: "Seattle",
    description:
      "iconic seattle landmark",
    whyPicked: "observation tower with amazing views!",
  },
  {
    id: "16",
    title: "Amazon Spheres",
    category: "culture",
    location: "Seattle",
    description:
      "three glass biospheres at Amazon HQ filled with tropical plants, trees, and skybridges",
    whyPicked:
      "very sci‑fi plant bubble vibes, definitely seems like a cool place to visit!",
    link: "https://www.seattlespheres.com",
  },
  // Bellevue recommendations
  {
    id: "b1",
    title: "Bellevue Square & Downtown",
    category: "neighborhoods",
    location: "Bellevue",
    description:
      "very big mall, 200 shops, restaurants, and a walkable downtown",
    whyPicked: "Your work neighborhood, so easy to explore during the day.",
  },
  {
    id: "b2",
    title: "Meydenbauer Bay Park",
    category: "outdoors",
    location: "Bellevue",
    description:
      "a waterfront park with a beach, walking paths, and views of Lake Washington",
    whyPicked: "Close to downtown and feels like a mini getaway.",
  },
  {
    id: "b3",
    title: "Bellevue Botanical Garden",
    category: "outdoors",
    location: "Bellevue",
    description:
      "beautiful gardens with trails & free admission",
    whyPicked: "could be cute for a walk or some aesthetic pics",
  },
  {
    id: "b4",
    title: "Café Cesura",
    category: "coffee",
    location: "Bellevue",
    description:
      "local roaster in downtown Bellevue",
    whyPicked: "when you need a little pick me up during the work day 😋",
    workFriendly: true,
  },
  {
    id: "b5",
    title: "Din Tai Fung",
    category: "food",
    location: "Bellevue",
    description:
      "famous soup dumplings and taiwanese food and chocolate dumplingsss",
    whyPicked: "obvi not seattle unique but din tai fung is soooo good",
    cuisine: "Asian",
  },
  {
    id: "b6",
    title: "Crossroads Bellevue",
    category: "neighborhoods",
    location: "Bellevue",
    description:
      "known for the international food, shops, and a community feel",
    whyPicked: "more cutesy less corporate vibe",
  },
  {
    id: "b8",
    title: "Seattle Pinball Museum",
    category: "culture",
    location: "Seattle",
    description:
      "unlimited pinball, cool and vintage spot",
    whyPicked: "unlimited games, or no games?",
  },
  {
    id: "b9",
    title: "Lake Hills Greenbelt",
    category: "outdoors",
    location: "Bellevue",
    description:
      "trail system through neighborhoods and green spaces",
    whyPicked: "access to nature in bellevue!",
  },
  {
    id: "b10",
    title: "John Howie Steak",
    category: "food",
    location: "Bellevue",
    description:
      "upscale steakhouse for a special dinner in bellevue! ",
    whyPicked: "gotta find you the steak",
    cuisine: "American",
  },
];
