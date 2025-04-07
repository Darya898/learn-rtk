import React from 'react';
import {useDispatch} from "react-redux";
import {deleteRecipe} from "@/features/recipes/recipesSlice.ts"
import { Recipe} from "@/shared/types/type.ts";
export interface ChildProps {
    edit:Recipe,
    clickOutside: () => void; // Функция, принимающая строку и ничего не возвращающая
}

const FormDelete: React.FC<ChildProps> = ({clickOutside,edit}) => {
    const dispatch=useDispatch();
    const deleteRecipeItem=()=>{
        dispatch(deleteRecipe(edit.id));
        clickOutside();

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