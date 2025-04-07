import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import styles from './ReceipePage.module.css';
import Modal from "@/shared/hooks/modalWindow/Modal.tsx";
import Form from "@/shared/Form/Form.tsx";
import FormDelete from "@/shared/FormDelete/FormDelete.tsx";
import Favorite from "./img/Favorite.tsx";
import SortOption from "@/shared/SortOption/SortOption.tsx";
import SortQuantityIngridients from "@/shared/SortQuantityIngridients/SortQuantityIngridients.tsx";
import {addFavoriteRecipe} from "@/features/recipes/recipesSlice.ts";
import FilterField from "@/shared/Filter/FilterField.tsx";
import {changeFavoriteRecipe, getInitial, resetApp} from "@/features/recipes/recipesSlice.ts";
import {useTypedSelector} from "@/shared/hooks/TypedUseSelectorHook.ts";
import {Recipe} from "@/shared/types/type.ts";


const RecipePage: React.FC = () => {
    const dispatch = useDispatch();
    const {recipes} = useTypedSelector((state) => state.recipes);
    console.log("recipes",recipes)
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [isVisibleDelete, setIsVisibleDelete] = useState<boolean>(false);
    const [isConfirm, setIsConfirm] = useState<boolean>(false);
    const [edit, setEdit] = useState<Recipe>(() => {
        return {
            id: 0,
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        }
    });

    const editRecipe = (recipe: Recipe): void => {
        setIsVisible(true);
        setEdit(recipe);
    }
    const deleteRecipe = (recipe: Recipe): void => {
        setEdit(recipe);
        setIsVisibleDelete(true);
    }
    const activeDelete = (): void => {
        setIsVisibleDelete(prev => !prev);
        setEdit({
            id: 0,
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        });
    }
    const activeEdit = (): void => {
        setIsVisible(prev => !prev);
        setEdit({
            id: 0,
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        });
        setIsConfirm(true);
    }
    const addFavorite = (recipe: Recipe): void => {
        dispatch(changeFavoriteRecipe(recipe));
        dispatch(addFavoriteRecipe(recipe));
    }
    const resetLists = (): void => {
        dispatch(resetApp());
    }
    let {searchQuery} = useTypedSelector((state) => state);
    const filteredItems = searchQuery ? (recipes ? recipes.filter((item: Recipe) => {
        return (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (
            item.ingredients.find(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
        ))
    }) : []) : recipes;
    useEffect(() => {
        let timer: number;
        if (isConfirm) {
            timer = window.setTimeout(() => {
                setIsConfirm(false);
            }, 1000)
        }
        return () => {
            clearTimeout(timer);
        }

    }, [isConfirm]);

    useEffect(() => {
        if (localStorage.recipes) {
            dispatch(getInitial(JSON.parse(localStorage.recipes)))
        }
    }, []);

    return (
        <>
            <h1> Список рецептов</h1>
            <div className={styles.title}>
                <SortOption></SortOption>
                <SortQuantityIngridients></SortQuantityIngridients>
                <button onClick={() => resetLists()}>Сбросить</button>
                <button onClick={() => setIsVisible(true)}>Добавить</button>
            </div>
            <FilterField></FilterField>
            {filteredItems && filteredItems.length ?
                filteredItems.map((recipe: Recipe) => (
                        <div className={styles.recipe} key={recipe.id}>
                            <div>
                                <span className={styles['recipe-name']}>{recipe.name}</span>
                                <button className={styles['recipe-btn']} onClick={() => addFavorite(recipe)}>
                                    <Favorite fill={recipe.favorite ? '#ffe719' : '#ffe71900'}></Favorite>
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
                    )
                )
                :
                <div>Список пуст</div>
            }
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
    )
        ;
};

export default RecipePage;