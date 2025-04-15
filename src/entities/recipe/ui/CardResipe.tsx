import  {useEffect, useState} from 'react';
import styles from "./CardResipe.module.css";
import Favorite from "@/pages/RecipePage/ui/img/Favorite.tsx";
import {Recipe} from "@/shared/types/type.ts";
import {addFavoriteRecipe, changeFavoriteRecipe} from "@/entities/recipe/model/recipesSlice.ts";
import Modal from "@/shared/ui/modalWindow/Modal.tsx";
import Form from "@/shared/Form/Form.tsx";
import FormDelete from "@/shared/FormDelete/FormDelete.tsx";
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";
import {initialRecipeState} from "@/shared/initialRecipeState/initialRecipeState.tsx";

const CardResipe  = (recipe: Recipe) => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [edit, setEdit] = useState<Recipe>(initialRecipeState);

    const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);

    const dispatch = useAppDispatch();

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isConfirm) {
            timer = setTimeout(() => {
                setIsConfirm(false);
            }, 1000)
        }
        return () => {
            clearTimeout(timer);
        }

    }, [isConfirm]);

    const addFavorite = (recipe: Recipe): void => {
        dispatch(addFavoriteRecipe(recipe));
        dispatch(changeFavoriteRecipe(recipe));
    }
    const editRecipe = (recipe: Recipe): void => {
        setIsVisible(true);
        setEdit(recipe);
    }
    const deleteRecipe = (recipe: Recipe): void => {
        setEdit(recipe);
        setIsVisibleDelete(true);
    }
    const activeEdit = (flag:boolean): void => {
        setIsVisible(prev => !prev);
        setEdit(initialRecipeState);
        if(flag){
            setIsConfirm(true);
        }

    }
    const activeDelete = (): void => {
        setIsVisibleDelete(prev => !prev);
        setEdit(initialRecipeState);
    }

    return (
        <>
            <div className={styles.recipe}>
                <div>
                    <span className={styles['recipe-name']}>{recipe.name}</span>
                    <button className={styles['recipe-btn']} onClick={() => addFavorite(recipe)}>
                        <Favorite fill={recipe.favorite ? '#ffe719' : '#ffe71900'}/>
                    </button>
                    <div className={styles['recipe-ingridients']}>
                        <span>Ингридиенты:</span> {recipe.ingredients.join(', ')}
                        <div className={styles['recipe-steps']}>
                            <h5>Шаги приготовления</h5>
                            <ul>
                                {recipe.steps.map(step => (
                                    <li key={step}>
                                        {step}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={styles['recipe-btns']}>
                    <button onClick={() => editRecipe(recipe)}>Редактировать</button>
                    <button onClick={() => deleteRecipe(recipe)}>Удалить</button>
                </div>
            </div>
            {
                isVisible &&
                <Modal>
                    <Form edit={edit} clickOutside={activeEdit}></Form>
                </Modal>
            }
            {
                isVisibleDelete &&
                <Modal>
                    <FormDelete edit={edit} clickOutside={activeDelete}></FormDelete>
                </Modal>
            }
            {
                isConfirm &&
                <Modal>
                    <h4>Рецепт успешно добавлен!</h4>
                </Modal>
            }
        </>
    );
};

export default CardResipe;