import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {getInitialListFavorite} from "@/features/recipes/recipesSlice.ts";
import {Recipe} from "@/shared/types/type.ts";
import {useTypedSelector} from "@/shared/hooks/TypedUseSelectorHook.ts";
const FavoriteList:React.FC = () => {
    const {favoriteList} = useTypedSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.favorite) {
            dispatch(getInitialListFavorite(JSON.parse(localStorage.favorite)))
        }
    }, []);
    return (
        <div>
            {favoriteList && favoriteList.length ?
                favoriteList.map((recipe:Recipe) => (
                        <li key={recipe.id}>
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
                ) : <div>Список пуст</div>
            }
        </div>
    );
};

export default FavoriteList;