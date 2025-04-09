import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from '../../entities/recipe/model/recipesSlice.ts';

const store = configureStore({
    reducer: {
        recipesList: recipesReducer,
    },
})
export type RootState = ReturnType<typeof store.getState>;

export default store;