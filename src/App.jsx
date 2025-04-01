import { useState } from 'react'
import RecipeList from "./pages/RecipeList/ui/RecipeList.jsx";
import {RouterProvider} from "react-router-dom";
import {router} from "./app/router.jsx";


function App() {
  return (
    <RouterProvider router={router}>
    </RouterProvider>
  )
}

export default App
