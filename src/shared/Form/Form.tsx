import {useState} from 'react';
import styles from './Form.module.css'
import ApplyBtn from "@/shared/ui/applyBtn/ApplyBtn.tsx";
import {addRecipe, editRecipe} from "../../entities/recipe/model/recipesSlice.ts";
import {Recipe} from "@/shared/types/type.ts";
import {ChildProps} from "@/shared/FormDelete/FormDelete.tsx";
import {useAppDispatch} from "@/shared/hooks/UseAppDispatch.ts";


const Form= ({clickOutside, edit}:ChildProps) => {

    const [errorMessage, setErrorMessage] = useState('');

    const [recipe, setRecipe] = useState<Recipe>(edit)

    const [visible, setVisible] = useState(false);

    const [ingridient, setIngridient] = useState('');

    const [step, setStep] = useState('');

    const [visibleStepBtn, setVisibleStepBtn] = useState(false);

    const dispatch = useAppDispatch();
    const addItemRecipe = () => {
        setRecipe(prev => ({...prev, ingredients: [...prev.ingredients, ingridient]}));
        setIngridient('');
        setVisible(false);
    }
    const addItemStep = () => {
        setRecipe(prev => ({...prev, steps: [...prev.steps, step]}));
        setStep('');
        setVisibleStepBtn(false);
    }
    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (recipe.name && recipe.steps&&recipe.steps.length && recipe.ingredients&& recipe.ingredients.length) {
            clickOutside(true);
            setErrorMessage('');
            if (edit.id) {
                dispatch(editRecipe(recipe));
            } else {
                dispatch(addRecipe({...recipe, id: new Date().getTime()}))
            }
        } else {
            setErrorMessage('Заполните все поля')
        }
    }

    return (
        <div>
            <form onSubmit={handlerSubmit} className={styles.form}>
                <label className={styles.label} htmlFor="nameRecipe">Название</label>
                <input id="nameRecipe"
                       value={recipe.name}
                       className={styles.field}
                       onChange={(e) => setRecipe(prev => ({...prev, name: e.target.value}))}></input>
                <div className={styles.button}>
                    <h5>Ингридиенты</h5>
                    {!visible &&
                    <button onClick={() => setVisible(true)}>Добавить</button>}
                </div>
                {visible &&
                        <div>
                            <input className={styles.field} id="ingridient" value={ingridient}
                                   onChange={(e) => setIngridient(e.target.value)}></input>
                            <button className={styles['btn-add']} onClick={addItemRecipe}>
                                <ApplyBtn></ApplyBtn>
                            </button>
                        </div>
                }
                <ul>
                    {recipe.ingredients.map((ingridient, index) =>
                        (<li key={index}>{ingridient}</li>)
                    )}
                </ul>
                <div className={styles.button}><h5>Шаги</h5>{!visibleStepBtn &&
                    <button onClick={() => setVisibleStepBtn(true)}>Добавить</button>}</div>
                {visibleStepBtn &&
                    <>
                        <div>
                            <input className={styles.field} id="step" value={step}
                                   onChange={(e) => setStep(e.target.value)}></input>
                            <button className={styles['btn-add']} onClick={addItemStep}>
                                <ApplyBtn></ApplyBtn>
                            </button>
                        </div>
                    </>
                }
                <ul>
                    {recipe.steps.map((step, index) =>
                        (<li key={index}>{step}</li>)
                    )}
                </ul>
                <div className={styles['message']}> {errorMessage}</div>
                <div className={styles['btn-group']}>
                    <button className={styles['btn-cancel']} onClick={()=>clickOutside(false)} >Отмена</button>
                    <button className={styles.btn} type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    );
};

export default Form;