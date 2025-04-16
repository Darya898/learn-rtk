import Layout from './layouts/Layout.tsx';
import { createBrowserRouter } from 'react-router-dom';
import { NotFound } from '@/pages/NotFound/index.tsx';
import FavoriteList from '@/pages/FavoriteList/ui/FavoriteList.tsx';
import { RecipePage } from '@/pages/RecipePage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <RecipePage />,
      },
      {
        path: '/favorits',
        element: <FavoriteList />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
