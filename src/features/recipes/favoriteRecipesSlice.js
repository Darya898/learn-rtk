import {createSlice} from "@reduxjs/toolkit";
import {resetApp} from "./recipesSlice.js";
const favoriteRecipesSlice=createSlice(
    {
        name:'favorite',
        initialState:{favoriteList:[]},
        reducers:{
            addFavoriteRecipe:(state,action)=>{state.favoriteList.push(action.payload);
                localStorage.setItem('favorite', JSON.stringify(state.favoriteList))
                },
            deleteFavoriteRecipe:(state,action)=>{
                let list=state.favoriteList.filter(recipe=>!(recipe.id==action.payload));
                localStorage.setItem('favorite', JSON.stringify(list))
                return list
            },
            getInitialListFavorite:(state,action)=>{
                state.favoriteList=action.payload;
            }
        },
        extraReducers:(builder)=>{
            builder.addCase(resetApp,(state)=>{
                localStorage.removeItem('favorite');
                state.favoriteList=[]})
        }
    }
)
export const {addFavoriteRecipe,deleteFavoriteRecipe,getInitialListFavorite}=favoriteRecipesSlice.actions;
export default favoriteRecipesSlice.reducer;