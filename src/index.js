import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles/index.css';
import SingleQuant from './components/SingleQuant';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import DoubleQuant from './components/DoubleQuant';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path='/single-quant' element={<SingleQuant />}></Route>
                <Route path='/double-quant' element={<DoubleQuant />}></Route>
                <Route path={'/'} element={<Home />}></Route>
                <Route element={<ErrorPage />}></Route>
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);