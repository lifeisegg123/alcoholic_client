export interface Alcohol {
  id?: string;
  name: string;
  thumbnail: string;
  rating: number;
  ratingCount: number;
  desc: string;
  category: number;
  alcoholPercentage: number;
  sellingAt?: string;
  recommandedFood?: string;
  ingredient: string;
}

export interface User {
  id?: string;
  email: string;
  nickname: string;
  password?: string;
  profileImg?: string;
  reviews?: Review[];
}

export interface Review {
  desc?: string;
  rate?: number;
}
