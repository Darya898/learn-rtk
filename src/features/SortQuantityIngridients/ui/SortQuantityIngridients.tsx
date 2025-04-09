import React, {useState} from 'react';
import {sortQuentity} from "../../../entities/recipe/model/recipesSlice.ts";
import styles from './SortQuantityIngridients.module.css';
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";

const SortQuantityIngridients = () => {

    const [sortData,setSortData]=useState('');

    const dispatch=useAppDispatch();
    const getSort=(e:React.ChangeEvent<HTMLSelectElement>)=>{
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