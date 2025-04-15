
import {deleteRecipe} from "@/entities/recipe/model/recipesSlice.ts"
import { Recipe} from "@/shared/types/type.ts";
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";
export interface ChildProps {
    edit:Recipe,
    clickOutside: (flag:boolean) => void; // Функция, принимающая строку и ничего не возвращающая
}

const FormDelete = ({clickOutside,edit}:ChildProps) => {

    const dispatch=useAppDispatch();
    const deleteRecipeItem=()=>{
        dispatch(deleteRecipe(edit.id));
        clickOutside(true);
    }

    return (
        <div>
            <h2>Вы действительно хотите удалить рецепт?</h2>
            <button onClick={()=>clickOutside(false)}>Отмена</button>
            <button onClick={deleteRecipeItem}>Удалить</button>
        </div>
    );
};

export default FormDelete;