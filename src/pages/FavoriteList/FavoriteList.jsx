import React from 'react';
import {useSelector} from "react-redux";


const FavoriteList = () => {
    const {favoriteList}=useSelector(state=>state.favoriteList);
    console.log("favoriteList",favoriteList)
    return (
        <div>
            {favoriteList&&favoriteList.length?
                favoriteList.map(recipe=>(
                        <li  key={recipe.id}>
                            <span>{recipe.name}</span>
                            <div>Ингридиенты: {recipe.ingredients.join(',')}
                                <div>
                                    <h5>Шаги приготовления</h5>
                                    <ul>
                                        {recipe.steps.map(step => (
                                            <li key={step}>
                                                {step}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </li>
                    )
                ):<div>Список пуст</div>
            }
        </div>
    );
};

export default FavoriteList;