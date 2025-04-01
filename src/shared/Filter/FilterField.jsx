import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {filterRecipe} from "../../features/recipes/recipesSlice.js";
import styles from './FilterField.module.css';

const FilterField = () => {
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();
    const getSearch = (e) => {
        setSearch(e.target.value);
        dispatch(filterRecipe(e.target.value));
    }
    const {recipes} = useSelector((state) => state.recipes);
    let {searchQuery} = useSelector((state) => state.recipes);
    const arrIngredients = recipes.map(i => i.ingredients).flat();
    const filteredItems = [...new Set(searchQuery ? (arrIngredients && arrIngredients.length ? arrIngredients.filter(item => {
        return item.toLowerCase().includes(searchQuery.toLowerCase())
    }).map(i => i.toLowerCase()) : []) : [])];
    return (
        <>
            <input className={styles.field} placeholder="Поиск" value={search} onChange={(e) => getSearch(e)}></input>
            {searchQuery && (
                <ul>
                    {filteredItems.length > 0 ? (
                        filteredItems.map(item => (
                            <li key={item}>{item}</li>
                        ))
                    ) : (
                        <li>Нет результатов</li>
                    )}
                </ul>
            )}
        </>
    );
};

export default FilterField;