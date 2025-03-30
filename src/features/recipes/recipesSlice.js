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
};

const recipesSlice=createSlice({
    name:'recipes',
    initialState:preloadedState,
    reducers:{
        addRecipe:(state,action)=> {state.recipes.push(action.payload)},
        editRecipe:(state,action)=> {
            let recipe=state.recipes.find(recipe=>recipe.id==action.payload.id);
            if(recipe){
                for (const key in action.payload) {
                    if (action.payload.hasOwnProperty(key)) {
                        recipe[key]=action.payload[key]
                    }
                }
            }
            },
        deleteRecipe:(state,action)=>{
            return state.recipes.filter(recipe=>!(recipe.id==action.payload))
        },
        changeFavoriteRecipe:(state,action)=>{
            let recipe=state.recipes.find(recipe=>recipe.id==action.payload.id);
            recipe.favorite=!recipe.favorite;
    },
        sortQuentity:(state,action)=>{state.recipes.sort((a,b)=>action.payload=='top'?b.ingredients.length-a.ingredients.length:a.ingredients.length-b.ingredients.length)},
        sortRecipeList:(state,action)=>{ state.recipes.sort((a,b)=>action.payload=='top'?b.name.localeCompare(a.name):a.name.localeCompare(b.name))},

},
    extraReducers:(builder)=>{
        builder.addCase(resetApp,state=>{
            state.recipes=preloadedState.recipes;
        })
    }}
)
export const {addRecipe, deleteRecipe,editRecipe,changeFavoriteRecipe,sortRecipeList,sortQuentity}=recipesSlice.actions;
export {resetApp};
export default recipesSlice.reducer;