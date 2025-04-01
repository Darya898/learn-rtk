import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from '../../features/recipes/recipesSlice.js';
import favoriteRecipeReducer from '../../features/recipes/favoriteRecipesSlice.js';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
        favoriteList: favoriteRecipeReducer,
    },
})
export default store;