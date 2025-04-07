import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {filterRecipe} from "@/features/recipes/recipesSlice.ts";
import styles from './FilterField.module.css';
import {useTypedSelector} from "@/shared/hooks/TypedUseSelectorHook.ts";


const FilterField: React.FC = () => {
    const [search, setSearch] = useState<string>('');
    const dispatch = useDispatch();
    const getSearch = ((e:React.ChangeEvent<HTMLInputElement>):void => {
        setSearch(e.target.value);
        dispatch(filterRecipe(e.target.value));
    })
    const {recipes} = useTypedSelector((state) => state);
    let {searchQuery} = useTypedSelector((state) => state);
    const arrIngredients:string[] =recipes&&recipes.length?recipes.map((i) => i.ingredients).flat():[];
    const filteredItems = [...new Set(searchQuery ? (arrIngredients && arrIngredients.length ? arrIngredients.filter((item:string) => {
        return item.toLowerCase().includes(searchQuery.toLowerCase())
    }).map((i:string) => i.toLowerCase()) : []) : [])];
    console.log("filteredItems",filteredItems)
    return (
        <>
            <input className={styles.field} placeholder="Поиск" value={search} onChange={(e) => getSearch(e)}></input>
            {searchQuery && (
                <ul>
                    {filteredItems.length > 0 ? (
                        filteredItems.map((item) => (
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