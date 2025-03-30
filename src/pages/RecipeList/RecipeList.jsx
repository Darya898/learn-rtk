import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import styles from './receipeList.module.css';
import Modal from "../../shared/hooks/modalWindow/Modal.jsx";
import Form from "../../shared/Form/Form.jsx";
import FormDelete from "../../shared/FormDelete/FormDelete.jsx";
import Favorite from "./img/Favorite.jsx";
import {changeFavoriteRecipe, resetApp} from "../../features/recipes/recipesSlice.js";
import SortOption from "../../shared/SortOption/SortOption.jsx";
import SortQuantityIngridients from "../../shared/SortQuantityIngridients/SortQuantityIngridients.jsx";
import {addFavoriteRecipe} from "../../features/recipes/favoriteRecipesSlice.js";


const RecipeList = () => {
    const dispatch=useDispatch();
    const {recipes}=useSelector((state)=>state.recipes);
    const [isVisible,setIsVisible]=useState(false);
    const [isVisibleDelete,setIsVisibleDelete]=useState(false);
    const [isConfirm, setIsConfirm]=useState(false);
    const [edit,setEdit]=useState(  {
        name:'',
        ingredients:[],
        steps:[],
        favorite:false});
    const editRecipe=(recipe)=>{
        setIsVisible(true);
        setEdit(recipe);
    }
    const deleteRecipe=(recipe)=>{
        setEdit(recipe);
        setIsVisibleDelete(true);
    }
    const activeDelete=()=>{
        setIsVisibleDelete(prev => !prev);
        setEdit({
            name:'',
            ingredients:[],
            steps:[],
            favorite:false});
    }
    const activeEdit=()=>{
      setIsVisible(prev => !prev);
        setEdit({
            name:'',
            ingredients:[],
            steps:[],
            favorite:false});
        setIsConfirm(true);
    }
    const addFavorite=(recipe)=>{
       dispatch(changeFavoriteRecipe(recipe));
       dispatch(addFavoriteRecipe(recipe));
    }
    const resetLists=()=>{
        console.log("reset")
        dispatch(resetApp());
    }
    useEffect(() => {
        let timer='';
        if(isConfirm){
            timer=setTimeout(()=>{
                setIsConfirm(false);
            },1000)
        }
        return ()=>{
            timer=null;
        }

    }, [isConfirm]);



    return (
        <>

           <div className={styles.title}>
               <h1> Список рецептов</h1>
               <SortOption></SortOption>
               <SortQuantityIngridients></SortQuantityIngridients>
               <button onClick={()=>resetLists()}>Сбросить</button>
               <button onClick={()=>setIsVisible(true)}>Добавить</button></div>
           {recipes&&recipes.length?
                recipes.map(recipe=>(
                     <li className={styles.name} key={recipe.id}>
                         <span>{recipe.name}</span>
                         <span onClick={()=>addFavorite(recipe)}>
                                <Favorite
                                    fill={recipe.favorite?'#ffe719':'#ffe71900'}></Favorite>
                         </span>

                         <button onClick={() => editRecipe(recipe)}>Редактировать</button>
                         <button onClick={() => deleteRecipe(recipe)}>Удалить</button>
                         <div>Ингридиенты: {recipe.ingredients.join(',')}
                             <div>
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
                     </li>
                 )
             )
               :<div>Список пуст</div>
            }

            {isVisible &&
                <Modal isVisible={isVisible} >
                    <Form edit={edit} clickOutside={activeEdit}></Form>
                </Modal>}
            {isVisibleDelete &&
                <Modal isVisible={isVisibleDelete} >
                    <FormDelete edit={edit} clickOutside={activeDelete}></FormDelete>
                </Modal>}
            {isConfirm&&
            <Modal isVisible={isConfirm}>
                <h4>Рецепт успешно добавлен!</h4>
            </Modal>
            }
        </>
    );
};

export default RecipeList;