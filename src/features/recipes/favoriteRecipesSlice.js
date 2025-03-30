import {createSlice} from "@reduxjs/toolkit";
import recipesSlice, {resetApp} from "./recipesSlice.js";
const favoriteRecipesSlice=createSlice(
    {
        name:'favorite',
        initialState:{favoriteList:[]},
        reducers:{
            addFavoriteRecipe:(state,action)=>{state.favoriteList.push(action.payload)},
            deleteFavoriteRecipe:(state,action)=>{return state.favoriteList.filter(recipe=>!(recipe.id==action.payload))}
        },
        extraReducers:(builder)=>{
            builder.addCase(resetApp,(state)=>{state.favoriteList=[]})
        }
    }
)
export const {addFavoriteRecipe,deleteFavoriteRecipe}=favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;