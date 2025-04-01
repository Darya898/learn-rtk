import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './ReceipeList.module.css';
import Modal from "../../../shared/hooks/modalWindow/Modal.jsx";
import Form from "../../../shared/Form/Form.jsx";
import FormDelete from "../../../shared/FormDelete/FormDelete.jsx";
import Favorite from "./img/Favorite.jsx";
import {changeFavoriteRecipe, getInitial, resetApp} from "../../../features/recipes/recipesSlice.js";
import SortOption from "../../../shared/SortOption/SortOption.jsx";
import SortQuantityIngridients from "../../../shared/SortQuantityIngridients/SortQuantityIngridients.jsx";
import {addFavoriteRecipe} from "../../../features/recipes/favoriteRecipesSlice.js";
import FilterField from "../../../shared/Filter/FilterField.jsx";


const RecipeList = () => {
    const dispatch = useDispatch();
    const {recipes} = useSelector((state) => state.recipes);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisibleDelete, setIsVisibleDelete] = useState(false);
    const [isConfirm, setIsConfirm] = useState(false);
    const [edit, setEdit] = useState({
        name: '',
        ingredients: [],
        steps: [],
        favorite: false
    });
    const editRecipe = (recipe) => {
        setIsVisible(true);
        setEdit(recipe);
    }
    const deleteRecipe = (recipe) => {
        setEdit(recipe);
        setIsVisibleDelete(true);
    }
    const activeDelete = () => {
        setIsVisibleDelete(prev => !prev);
        setEdit({
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        });
    }
    const activeEdit = () => {
        setIsVisible(prev => !prev);
        setEdit({
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        });
        setIsConfirm(true);
    }
    const addFavorite = (recipe) => {
        dispatch(changeFavoriteRecipe(recipe));
        dispatch(addFavoriteRecipe(recipe));
    }
    const resetLists = () => {
        dispatch(resetApp());
    }
    let {searchQuery} = useSelector((state) => state.recipes);
    const filteredItems = searchQuery ? (recipes ? recipes.filter(item => {
        return (item.name.toLowerCase().includes(searchQuery.toLowerCase()) || (
            item.ingredients.find(ingredient => ingredient.toLowerCase().includes(searchQuery.toLowerCase()))
        ))
    }) : []) : recipes;
    useEffect(() => {
        let timer = '';
        if (isConfirm) {
            timer = setTimeout(() => {
                setIsConfirm(false);
            }, 1000)
        }
        return () => {
            timer = null;
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
                filteredItems.map(recipe => (
                    <div className={styles.recipe} key={recipe.id}>
                        <div>
                            <span className={styles['recipe-name']}>{recipe.name}</span>
                            <button className={styles['recipe-btn']} onClick={() => addFavorite(recipe)}>
                                <Favorite title="Добавить в избранное"
                                    fill={recipe.favorite ? '#ffe719' : '#ffe71900'}></Favorite>
                            </button>

                            <div className={styles['recipe-ingridients']}><span>Ингридиенты:</span> {recipe.ingredients.join(', ')}
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
                <Modal isVisible={isVisible}>
                    <Form edit={edit} clickOutside={activeEdit}></Form>
    </Modal>
}
{
    isVisibleDelete &&
    <Modal isVisible={isVisibleDelete}>
        <FormDelete edit={edit} clickOutside={activeDelete}></FormDelete>
    </Modal>
}
{
    isConfirm &&
    <Modal isVisible={isConfirm}>
        <h4>Рецепт успешно добавлен!</h4>
    </Modal>
}
</>
)
    ;
};

export default RecipeList;