export type RecCategory =
  | "food"
  | "coffee"
  | "bar"
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

export type HikeDifficulty = "Easy" | "Med" | "Hard" | "Hard Hard";

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
  difficulty?: HikeDifficulty;
  isTopPick?: boolean;
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
