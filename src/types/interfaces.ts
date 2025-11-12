export interface Recipe {
  recipeId?: string;
  authorUsername: string;
  title: string;
  description: string;
  imageUrl?: string | File;
  createdAt: Date;
  averageRating: number;
  totalFavorites: number;
  isFavoritedByCurrentUser: boolean;
  ingredients: Ingredients[];
  steps: Step[];
}
export interface User {
  email: string;
  username: string;
  recipes: Recipe[];
  favorites: Favorite[];
  ratings: Rating[];
}

export interface RegisterUser {
  email: string;
  username: string;
  password: string;
}

export interface LoginUser {
  loginIdentifier: string;
  password: string;
}

export interface Favorite {
  favoriteId: string;
  userId: string;
  createdAt: Date;
  authorUsername: string;
  recipe: Recipe;
}
export interface PagedFavorites {
  currentPage: number;
  items: Favorite[];
  totalCount: number;
  totalPages: number;
}

export interface Rating {
  ratingId: string;
  score: number;
  comment: string;
  createdAt: Date;
  authorName: string;
  recipeTitle: string;
}

export interface RecipeFilter {
  title?: string;
  authorName?: string;
  page?: number;
  sort?: string;
}
export interface FavoriteFilter {
  search?: string;
  page?: number;
}
export interface PagedRecipes {
  currentPage: number;
  items: Recipe[];
  totalCount: number;
  totalPages: number;
}

export interface Ingredients {
  name: string;
  amount: number;
  units: string;
}
export interface Step {
  stepNumber: number;
  description: string;
}
export interface Toast {
  id: number;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}
