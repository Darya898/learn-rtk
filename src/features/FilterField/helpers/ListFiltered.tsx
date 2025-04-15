import {Recipe} from "@/shared/types/type.ts";

interface MyComponentProps {
    recipes: Recipe[];
    searchQuery: string;
}

const ListFiltered = ({recipes, searchQuery}: MyComponentProps) => {
    const arrIngredients: string[] = recipes && recipes.length ? recipes.map((i) => i.ingredients).flat() : [];

    const filteredItems = [...new Set(searchQuery ?
        (arrIngredients && arrIngredients.length ?
            arrIngredients.filter((item: string) => {
                return item.toLowerCase().includes(searchQuery.toLowerCase())
            }).map((i: string) => i.toLowerCase()) : []) : [])
    ];

    return (
        <ul>
            {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                    <li key={item}>{item}</li>
                ))
            ) : (
                <li>Нет результатов</li>
            )}
        </ul>
    );
};

export default ListFiltered;