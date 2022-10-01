import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import SingleQuant from './SingleQuant';
import ErrorPage from './ErrorPage';
import Home from './Home';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path='/single-quant' element={<SingleQuant />}></Route>
                <Route path={'/'} element={<Home />}></Route>
                <Route element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);