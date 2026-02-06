export type RecCategory =
  | "food"
  | "coffee"
  | "outdoors"
  | "neighborhoods"
  | "culture"
  | "practical";

export type RecLocation = "Seattle" | "Bellevue";

export type Cuisine =
  | "French"
  | "Asian"
  | "American"
  | "Italian"
  | "Mexican"
  | "Mediterranean"
  | "Various";

export interface SeattleRec {
  id: string;
  title: string;
  category: RecCategory;
  location: RecLocation;
  description: string;
  whyPicked: string;
  link?: string;
  workFriendly?: boolean;
  cuisine?: Cuisine;
}

export interface DateIdea {
  id: string;
  title: string;
  description?: string;
}

export interface OpenWhenLetterNote {
  id: string;
  title: string;
  message: string;
}
