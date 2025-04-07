import {configureStore} from "@reduxjs/toolkit";
import recipesReducer from '../../features/recipes/recipesSlice.ts';

const store = configureStore({
    reducer: {
        recipes: recipesReducer,
    },
})
export type AppDispatch = typeof store.dispatch;
export default store;