import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Route, Routes } from 'react-router-dom';
import Calc from './components/calc';
import Home from "./components/home";
import List from './components/list';
import Search from "./components/search";
import './styles.css';

function App() {
    return (
        <div className="main">
            <Routes>
                <Route path="/" element={<Home />}>
                    <Route path="search" element={<Search />} />
                    <Route path="calculator" element={<Calc />} />
                    <Route path="todolist" element={<List />} />
                </Route>
            </Routes>
        </div>
    );
}


export default App;
