import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sortRecipeList} from "../../features/recipes/recipesSlice.js";
import styles from './SortOption.module.css'

const SortOption = () => {
    const [sortData,setSortData]=useState('');
    const dispatch=useDispatch();
    const getSort=(e)=>{
        setSortData(e.target.value);
        dispatch(sortRecipeList(e.target.value));
    }
    return (
        <select className={styles['sort-select']} value={sortData} onChange={(e) => getSort(e)}>
            <option value="" disabled hidden>Сортировка по алфавиту</option>
            <option value="bottom">От А до Я</option>
            <option value="top">От Я до А</option>
        </select>
    );
};

export default SortOption;