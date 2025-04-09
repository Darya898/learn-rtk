import React, {useState} from 'react';
import {sortRecipeList} from "../../../entities/recipe/model/recipesSlice.ts";
import styles from './SortOption.module.css'
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";

const SortOption = () => {

    const [sortData,setSortData]=useState('');

    const dispatch=useAppDispatch();
    const getSort=(event:React.ChangeEvent<HTMLSelectElement>)=>{
        setSortData(event.target.value);
        dispatch(sortRecipeList(event.target.value));
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