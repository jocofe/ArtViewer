import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes.tsx';
import "./styles/index.scss";
import React from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(<RouterProvider router={router} />);