export interface Alcohol {
  name: string;
  rating: number;
  ratingCount: number;
  desc: string;
  category: number;
  alcoholPercentage: number;
  sellingAt: string;
  recommandedFood: string[];
  ingredient: string;
}

export interface User {
  email: string;
  nickname: string;
  profileImg?: string;
}

export interface Review {
  desc: string;
}
