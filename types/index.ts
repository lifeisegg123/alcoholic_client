export interface Alcohol {
  id?: string;
  name: string;
  thumbnail: string;
  rating: number;
  ratingCount: number;
  desc: string;
  category: number;
  alcoholPercentage: number;
  sellingAt: string;
  recommandedFood: string;
  ingredient: string;
  price: number;
  reviews: Review[];
  ratings: Rating[];
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
  id?: string;
  desc: string;
  userId?: string;
  alcoholId?: string;
  user?: User;
}

export interface Rating {
  id?: string;
  rating: number;
  userId?: string;
  alcoholId: string;
}
