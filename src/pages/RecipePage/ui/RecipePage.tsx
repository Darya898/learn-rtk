import { useTypedSelector } from '@/shared/hooks/TypedUseSelectorHook.ts';
import { Recipe } from '@/shared/types/type.ts';
import { TopActions } from '@/widgets/TopActions';
import CardResipe from '@/entities/recipe/ui/CardResipe.tsx';

const RecipePage = () => {
  const recipes = useTypedSelector((state) => state.recipesList.recipes);

  let searchQuery = useTypedSelector((state) => state.recipesList.searchQuery);

  const filteredItems = searchQuery
    ? recipes
      ? recipes.filter((item: Recipe) => {
          return (
            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.ingredients.find((ingredient) =>
              ingredient.toLowerCase().includes(searchQuery.toLowerCase())
            )
          );
        })
      : []
    : recipes;

  return (
    <>
      <h1>Список рецептов</h1>
      <TopActions></TopActions>
      {filteredItems && filteredItems.length ? (
        filteredItems.map((recipe: Recipe) => (
          <div key={recipe.id}>
            <CardResipe {...recipe} />
          </div>
        ))
      ) : (
        <div>Список пуст</div>
      )}
    </>
  );
};

export default RecipePage;
