export interface Recipe {
    id: number,
    name: string;
    ingredients: string[],
    steps: string[]
    favorite: boolean,
}
export type Recipes = Recipe[];
export interface RootState {
    recipes:Recipes,
    searchQuery:string,
    favoriteList:Recipes,
}
