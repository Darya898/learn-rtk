import {createAction, createSlice} from "@reduxjs/toolkit";

const resetApp = createAction('recipes/reset');

const preloadedState = {
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
};

const recipesSlice = createSlice({
        name: 'recipes',
        initialState: preloadedState,
        reducers: {
            addRecipe: (state, action) => {
                state.recipes.push(action.payload);
                localStorage.setItem('recipes', JSON.stringify(state.recipes))
            },
            editRecipe: (state, action) => {
                let recipe = state.recipes.find(recipe => recipe.id == action.payload.id);
                if (recipe) {
                    for (const key in action.payload) {
                        if (action.payload.hasOwnProperty(key)) {
                            recipe[key] = action.payload[key]
                        }
                    }
                }
                localStorage.setItem('recipes', JSON.stringify(state.recipes))
            },
            deleteRecipe: (state, action) => {
                let list = state.recipes.filter(recipe => !(recipe.id == action.payload));
                localStorage.setItem('recipes', JSON.stringify(list))
                return list;
            },
            changeFavoriteRecipe: (state, action) => {
                let recipe = state.recipes.find(recipe => recipe.id == action.payload.id);
                recipe.favorite = !recipe.favorite;
                localStorage.setItem('recipes', JSON.stringify(state.recipes))
            },
            sortQuentity: (state, action) => {
                state.recipes.sort((a, b) => action.payload == 'top' ? b.ingredients.length - a.ingredients.length : a.ingredients.length - b.ingredients.length)
            },
            sortRecipeList: (state, action) => {
                state.recipes.sort((a, b) => action.payload == 'top' ? b.name.localeCompare(a.name) : a.name.localeCompare(b.name))
            },
            getInitial: (state, action) => {
                state.recipes = action.payload;
            },
            filterRecipe: (state, action) => {
                state.searchQuery = action.payload;
            }
        },
        extraReducers: (builder) => {
            builder.addCase(resetApp, state => {
                state.recipes = preloadedState.recipes;
                localStorage.removeItem('recipes');
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
    filterRecipe
} = recipesSlice.actions;
export {resetApp};
export default recipesSlice.reducer;