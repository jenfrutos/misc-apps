import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { Route, Routes, Link } from 'react-router-dom';
import Calc from './components/calc';
import Home from "./components/home";
import List from './components/list';
import Search from "./components/search";
import './styles.css';

function App() {
    return (
        <div className="main">
            <Link to="/" className="btn btn-sm btn-dark ">Home</Link>
            <Link to="/calculator" className="btn btn-sm btn-dark ">Calculator</Link>
            <Link to="/search" className="btn btn-sm btn-dark">Random</Link>
            <Link to="/todolist" className="btn btn-sm btn-dark ">todoList</Link>
            <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="search" element={<Search />} />
                    <Route path="calculator" element={<Calc />} />
                    <Route path="todolist" element={<List />} />
            </Routes>
        </div>
    );
}


export default App;
