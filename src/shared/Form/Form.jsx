import  {useState} from 'react';
import styles from './form.module.css'
import {useDispatch} from "react-redux";
import ApplyBtn from "./img/ApplyBtn.jsx";
import {addRecipe, editRecipe} from "../../features/recipes/recipesSlice.js";


const Form = ({clickOutside,edit}) => {
    const [message, setMessage]=useState('');
    const [recipe,setRecipe]=useState(edit)
    const [visible,setVisible]=useState(false);
    const [ingridient,setIngridient]=useState('');
    const [step,setStep]=useState('');
    const [visibleStepBtn,setVisibleStepBtn]=useState(false);
    const dispatch=useDispatch();
    const addItemRecipe=()=>{
        setRecipe(prev=>({...prev,ingredients:[...prev.ingredients,ingridient]}));
        setIngridient('');
        setVisible(false);
    }
    const addItemStep=()=>{
        setRecipe(prev=>({...prev,steps:[...prev.steps,step]}));
        setStep('');
        setVisibleStepBtn(false);

    }
    const handlerSubmit=(e)=>{
        e.preventDefault();
        if(recipe.name&&recipe.steps&&recipe.ingredients){
            clickOutside();
            setMessage('');
            if(edit.id){
                dispatch(editRecipe(recipe))
            }
            else{
                dispatch(addRecipe({...recipe, id:new Date().getTime()}))
            }
        }
        else{
            setMessage('Заполните все поля')
        }
    }

    return (
        <div>
            <form onSubmit={handlerSubmit} className={styles.form}>
                <label className={styles.label} htmlFor="nameRecipe">Название</label>
                <input id="nameRecipe" value={recipe.name}
                       onChange={(e) => setRecipe(prev => ({...prev, name: e.target.value}))}></input>
                <div className={styles.button}><h5>Ингридиенты</h5>{!visible &&
                    <button onClick={() => setVisible(true)}>Добавить</button>}</div>
                {visible &&
                    <>
                        <label className={styles.label} htmlFor="ingridient">Ингридиент</label>
                        <div><input id="ingridient" value={ingridient}
                                    onChange={(e) => setIngridient(e.target.value)}></input>
                            <button onClick={addItemRecipe}>
                                <ApplyBtn></ApplyBtn>
                            </button>
                        </div>
                    </>
                }
                <ul>
                    {recipe.ingredients.map((ingridient,index) =>
                        (<li key={index}>{ingridient}</li>)
                    )}
                </ul>

                <div className={styles.button}><h5>Шаги</h5>{!visibleStepBtn &&
                    <button onClick={() => setVisibleStepBtn(true)}>Добавить</button>}</div>
                {visibleStepBtn &&
                    <>
                        <label className={styles.label} htmlFor="step">Шаги</label>
                        <div><input id="step" value={step}
                                    onChange={(e) => setStep(e.target.value)}></input>
                            <button onClick={addItemStep}>
                                <ApplyBtn></ApplyBtn>
                            </button>
                        </div>
                    </>
                }
                <ul>
                    {recipe.steps.map((step,index) =>
                        (<li key={index}>{step}</li>)
                    )}
                </ul>

                <div className={styles['message']}> {message}< /div>
                <div className={styles['btn-group']}>
                    <button className={styles['btn-cancel']} onClick={clickOutside}>Отмена</button>
                    <button className={styles.btn} type="submit">Сохранить</button>
                </div>
            </form>
        </div>
    );
};

export default Form;