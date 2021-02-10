export interface Alcohol {
  name: string;
  thumbnail: string;
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
  reviews?: Review[];
}

export interface Review {
  desc: string;
}
