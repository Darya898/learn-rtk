import React, {useEffect, useState} from 'react';
import styles from "./TopAction.module.css";
import SortOption from "@/features/SortOption/ui/SortOption.tsx";
import SortQuantityIngridients from "@/features/SortQuantityIngridients/ui/SortQuantityIngridients.tsx";
import {resetApp} from "@/entities/recipe/model/recipesSlice.ts";
import Modal from "@/shared/hooks/modalWindow/Modal.tsx";
import Form from "@/shared/Form/Form.tsx";
import {Recipe} from "@/shared/types/type.ts";
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";
import FilterField from "@/features/FilterField/ui/FilterField.tsx";

const TopActions: React.FC = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [edit, setEdit] = useState<Recipe>(() => {
        return {
            id: 0,
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        }
    });

    const dispatch = useAppDispatch();
    const resetLists = (): void => {
        dispatch(resetApp());
    }
    const activeEdit = (flag:boolean): void => {
        setIsVisible(prev => !prev);
        setEdit({
            id: 0,
            name: '',
            ingredients: [],
            steps: [],
            favorite: false
        });
        if(flag){
            setIsConfirm(true);
        }
    }

    useEffect(() => {
        let timer: number;
        if (isConfirm) {
            timer = window.setTimeout(() => {
                setIsConfirm(false);
            }, 1000)
        }
        return () => {
            clearTimeout(timer);
        }

    }, [isConfirm]);

    return (
        <>
        <div className={styles.title}>
            <SortOption></SortOption>
            <SortQuantityIngridients></SortQuantityIngridients>
            <button onClick={() => resetLists()}>Сбросить</button>
            <button onClick={() => setIsVisible(true)}>Добавить</button>
        </div>
            <FilterField></FilterField>
            {
                isVisible &&
                <Modal>
                    <Form edit={edit} clickOutside={activeEdit}></Form>
                </Modal>
            }
            {
                isConfirm &&
                <Modal>
                    <h4>Рецепт успешно добавлен!</h4>
                </Modal>
            }
            </>
    );
};

export default TopActions;