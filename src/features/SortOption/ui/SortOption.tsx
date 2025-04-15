import React, {useEffect, useState} from 'react';
import {sortRecipeList} from "@/entities/recipe/model/recipesSlice.ts";
import styles from './SortOption.module.css'
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";
import {useSearchParams} from "react-router-dom";

const SortOption = () => {

    const [sortData,setSortData]=useState('');

    const [query, setQueryParam]=useSearchParams();

    const sort=query.get('sort')||'bottom';

    const dispatch=useAppDispatch();

    useEffect(() => {
        dispatch(sortRecipeList(sort));
        setSortData(sort);
    }, [sort]);

    const getSort=(event:React.ChangeEvent<HTMLSelectElement>)=>{
         setSortData(event.target.value);
        if(event.target.value=='bottom'){
            query.delete('sort')
        }
        else{
            query.set('sort',event.target.value)
        }
        setQueryParam(query);
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