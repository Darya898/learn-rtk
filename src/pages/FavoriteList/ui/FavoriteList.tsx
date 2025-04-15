
import {Recipe} from "@/shared/types/type.ts";
import {useTypedSelector} from "@/shared/hooks/TypedUseSelectorHook.ts";
import CardResipe from "@/entities/recipe/ui/CardResipe.tsx";

const FavoriteList = () => {
    const favoriteList = useTypedSelector(state => state.recipesList.favoriteList);
    return (
        <div>
            {favoriteList && favoriteList.length ?
                favoriteList.map((recipe:Recipe) => (
                        <div key={recipe.id}>
                            <CardResipe {...recipe} />
                        </div>
                    )
                ) : <div>Список пуст</div>
            }
        </div>
    );
};

export default FavoriteList;