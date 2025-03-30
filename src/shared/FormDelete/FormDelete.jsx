import React from 'react';
import {editRecipe} from "../../features/recipes/recipesSlice.js";
import {useDispatch} from "react-redux";
import {deleteRecipe} from "../../features/recipes/recipesSlice.js"

const FormDelete = ({clickOutside,edit}) => {
    const dispatch=useDispatch();
    const deleteRecipeItem=()=>{
        clickOutside();
        dispatch(deleteRecipe(edit.id));
    }
    return (
        <div>
            <h2>Вы действительно хотите удалить рецепт?</h2>
            <button onClick={()=>clickOutside()}>Отмена</button>
            <button onClick={deleteRecipeItem}>Удалить</button>
        </div>
    );
};

export default FormDelete;