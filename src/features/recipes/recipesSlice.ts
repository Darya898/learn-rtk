import {createAction, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Recipe, RootState} from "@/shared/types/type.ts";

const resetApp = createAction('recipes/reset');

const preloadedState:RootState = {
    recipes: [
        {
            id: 1,
            name: "Паста Карбонара",
            ingredients: ["Макароны", "Яйца", "Пармезан", "Бекон"],
            steps: ["Варим макароны", "Готовим соус", "Смешиваем"],
            favorite: false,
        },
    ],
    searchQuery: '',
    favoriteList:[]
};
const recipesSlice = createSlice({
        name: 'recipes',
        initialState: preloadedState,
        reducers: {
            addRecipe: (state, action) => {
                state.recipes.push(action.payload);
                localStorage.setItem('recipes', JSON.stringify(state.recipes))
            },
            editRecipe: (state,  action: PayloadAction<Recipe>) => {
                const index= state.recipes.findIndex(recipe => recipe.id == action.payload.id);
                if (index!==-1) {
                    state.recipes[index]={...state.recipes[index],...action.payload}
                }
                localStorage.setItem('recipes', JSON.stringify(state.recipes))
            },
            deleteRecipe: (state,  action:PayloadAction<number>) => {
                let list = state.recipes.filter(recipe => !(recipe.id == action.payload));
                localStorage.setItem('recipes', JSON.stringify(list))
                state.recipes=list;
            },
            changeFavoriteRecipe: (state,  action:PayloadAction<Recipe>) => {
                let recipe = state.recipes.find(recipe => recipe.id == action.payload.id);
                if(recipe&&recipe.favorite){
                    recipe.favorite = !recipe.favorite;
                    localStorage.setItem('recipes', JSON.stringify(state.recipes))
                }
            },
            sortQuentity: (state, action) => {
                state.recipes.sort((a:Recipe, b:Recipe) => action.payload == 'top' ? b.ingredients.length - a.ingredients.length : a.ingredients.length - b.ingredients.length)
            },
            sortRecipeList: (state, action) => {
                state.recipes.sort((a:Recipe, b:Recipe) => action.payload == 'top' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))
            },
            getInitial: (state, action) => {
                state.recipes = action.payload;
            },
            filterRecipe: (state, action) => {
                state.searchQuery = action.payload;
            },
            addFavoriteRecipe:(state,action)=>{state.favoriteList.push(action.payload);
                localStorage.setItem('favorite', JSON.stringify(state.favoriteList))
            },
            deleteFavoriteRecipe:(state, action:PayloadAction<number>)=>{
                let list=state.favoriteList.filter(recipe=>!(recipe.id==action.payload));
                localStorage.setItem('favorite', JSON.stringify(list))
                state.favoriteList=list;
            },
            getInitialListFavorite:(state, action)=>{
                state.favoriteList=action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(resetApp, state => {
                state.recipes = preloadedState.recipes;
                localStorage.removeItem('recipes');
                localStorage.removeItem('favorite');
                state.favoriteList=[]
            })
        }
    }
)
export const {
    addRecipe,
    deleteRecipe,
    editRecipe,
    changeFavoriteRecipe,
    sortRecipeList,
    sortQuentity,
    getInitial,
    filterRecipe,
    addFavoriteRecipe,
    deleteFavoriteRecipe,
    getInitialListFavorite
} = recipesSlice.actions;
export {resetApp};
export default recipesSlice.reducer;