// User related types
export interface UserProfile {
  id: string;
  name: string;
  username: string;
  avatar: string;
  bio?: string;
  followers: number;
  following: number;
  isVerified?: boolean;
}

// Analysis related types
export type ColorSeason = 'Spring Warm' | 'Summer Cool' | 'Autumn Warm' | 'Winter Cool';
export type FaceShape = 'Oval' | 'Round' | 'Square' | 'Heart' | 'Diamond' | 'Rectangle' | 'Triangle';
export type SkinType = 'Dry' | 'Oily' | 'Combination' | 'Normal' | 'Sensitive';

export type AnalysisType = 'color' | 'face' | 'skin' | 'style' | 'outfit';

export interface ColorPalette {
  name: string;
  hex: string;
}

export interface AnalysisResult {
  id: string;
  type: AnalysisType;
  date: string;
  title: string;
  description: string;
  imageUrl?: string;
  result?: {
    colorSeason?: ColorSeason;
    faceShape?: FaceShape;
    skinType?: SkinType;
    palette?: ColorPalette[];
    recommendations?: string[];
  };
  recommendedProducts?: Product[];
}

// Product related types
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  imageUrl: string;
  rating: number;
  category: string;
  description?: string;
  colors?: string[];
  isWishlisted?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  imageUrl?: string;
}

export interface Collection {
  id: string;
  name: string;
  description?: string;
  imageUrl: string;
  products: Product[];
}

// Social feed related types
export interface FeedPost {
  id: string;
  user: UserProfile;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
  date: string;
  products?: Product[];
  tags?: string[];
  isLiked?: boolean;
  isSaved?: boolean;
}

export interface Comment {
  id: string;
  user: UserProfile;
  text: string;
  date: string;
  likes: number;
}