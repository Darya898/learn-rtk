import React, { useEffect, useState } from 'react';
import styles from './FilterField.module.css';
import { useTypedSelector } from '@/shared/hooks/TypedUseSelectorHook.ts';
import { useSearchParams } from 'react-router-dom';
import ListFiltered from '@/features/FilterField/helpers/ListFiltered.tsx';
import { useAppDispatch } from '@/shared/hooks/UseAppDispatch.ts';
import { filterRecipe } from '@/entities/recipe/model/recipesSlice.ts';

const FilterField = () => {
  const [search, setSearch] = useState<string>('');

  const recipes = useTypedSelector((state) => state.recipesList.recipes);

  const [query, setQueryParam] = useSearchParams();

  const searchQuery = query.get('search') || '';

  const dispatch = useAppDispatch();

  useEffect(() => {
    setSearch(searchQuery);
    dispatch(filterRecipe(searchQuery));
  }, [searchQuery]);

  const getSearch = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
    if (e.target.value) {
      query.set('search', e.target.value);
    } else {
      query.delete('search');
    }
    setQueryParam(query);
    dispatch(filterRecipe(searchQuery));
  };
  return (
    <>
      <input
        className={styles.field}
        placeholder="Поиск"
        value={search}
        onChange={(e) => getSearch(e)}
      ></input>
      {searchQuery && (
        <ListFiltered recipes={recipes} searchQuery={searchQuery} />
      )}
    </>
  );
};

export default FilterField;
