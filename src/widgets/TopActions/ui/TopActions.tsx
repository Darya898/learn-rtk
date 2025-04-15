import {useEffect, useState} from 'react';
import styles from "./TopAction.module.css";
import SortOption from "@/features/SortOption/ui/SortOption.tsx";
import SortQuantityIngridients from "@/features/SortQuantityIngridients/ui/SortQuantityIngridients.tsx";
import {resetApp} from "@/entities/recipe/model/recipesSlice.ts";
import Modal from "@/shared/ui/modalWindow/Modal.tsx";
import Form from "@/shared/Form/Form.tsx";
import {Recipe} from "@/shared/types/type.ts";
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";
import FilterField from "@/features/FilterField/ui/FilterField.tsx";
import {initialRecipeState} from "@/shared/initialRecipeState/initialRecipeState.tsx";

const TopActions = () => {

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [isConfirm, setIsConfirm] = useState<boolean>(false);

    const [edit, setEdit] = useState<Recipe>(initialRecipeState);

    const dispatch = useAppDispatch();
    const resetLists = (): void => {
        dispatch(resetApp());
    }
    const activeEdit = (flag: boolean): void => {
        setIsVisible(prev => !prev);
        setEdit(initialRecipeState);
        if (flag) {
            setIsConfirm(true);
        }
    }

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;
        if (isConfirm) {
            timer = setTimeout(() => {
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
                <SortOption/>
                <SortQuantityIngridients/>
                <button onClick={resetLists}>Сбросить</button>
                <button onClick={() => setIsVisible(true)}>Добавить</button>
            </div>
            <FilterField/>
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