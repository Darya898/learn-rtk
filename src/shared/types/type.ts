export interface Recipe {
  id: number;
  name: string;
  ingredients: string[];
  steps: string[];
  favorite: boolean;
}
export interface Recipes {
  recipes: Recipe[];
}
