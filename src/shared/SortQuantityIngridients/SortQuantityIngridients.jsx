import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {sortQuentity} from "../../features/recipes/recipesSlice.js";
import styles from './SortQuantityIngridients.module.css';

const SortQuantityIngridients = () => {
    const [sortData,setSortData]=useState('');
    const dispatch=useDispatch();
    const getSort=(e)=>{
        setSortData(e.target.value);
        dispatch(sortQuentity(e.target.value));
    }
    return (
        <select className={styles['sort-select']} value={sortData} onChange={(e) => getSort(e)}>
            <option value="" disabled hidden>Сортировка по кол-ву ингридиентов</option>
            <option value="bottom">По возрастанию</option>
            <option value="top">По убыванию</option>
        </select>
    );
};

export default SortQuantityIngridients;