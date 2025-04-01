import Layout from "./layouts/Layout.jsx";
import RecipeList from "../pages/RecipeList/ui/RecipeList.jsx";
import {createBrowserRouter} from "react-router-dom";
import {NotFound} from "../pages/NotFound/index.jsx";
import FavoriteList from "../pages/FavoriteList/ui/FavoriteList.jsx";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout/>,
        children: [
            {
                path: '/',
                element: <RecipeList/>,
            },
            {
                path: '/favorits',
                element: <FavoriteList/>,
            },
        ]
    },
    {
        path: '*',
        element: <NotFound/>,
    },

]);