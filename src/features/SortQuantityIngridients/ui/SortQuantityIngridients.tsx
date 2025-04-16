import React, { useEffect, useState } from 'react';
import { sortQuentity } from '@/entities/recipe/model/recipesSlice.ts';
import styles from './SortQuantityIngridients.module.css';
import { useAppDispatch } from '@/shared/hooks/UseAppDispatch.ts';
import { useSearchParams } from 'react-router-dom';

const SortQuantityIngridients = () => {
  const [sortData, setSortData] = useState('');

  const [query, setQueryParam] = useSearchParams();

  const sort = query.get('sortQuantity') || 'bottom';

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(sortQuentity(sort));
    setSortData(sort);
  }, [sort]);

  const getSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortData(e.target.value);
    dispatch(sortQuentity(e.target.value));
    if (e.target.value == 'bottom') {
      query.delete('sortQuantity');
    } else {
      query.set('sortQuantity', e.target.value);
    }
    setQueryParam(query);
  };

  return (
    <select
      className={styles['sort-select']}
      value={sortData}
      onChange={(e) => getSort(e)}
    >
      <option value="" disabled hidden>
        Сортировка по кол-ву ингридиентов
      </option>
      <option value="bottom">По возрастанию</option>
      <option value="top">По убыванию</option>
    </select>
  );
};

export default SortQuantityIngridients;
