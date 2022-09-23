import React from "react";
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { BiRightArrowAlt } from 'react-icons/bi';
import { Link, Outlet } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <div className="container fluid justify-content-center nav pt-3 mb-3">
                <Row className="mt-auto">
                    <Col>
                        <text>Pick One<BiRightArrowAlt /></text>
                    </Col>
                    <Col>
                        <Link to="/calculator" className="btn btn-sm btn-dark ">Calculator</Link>
                    </Col>
                    <Col>
                        <Link to="/search" className="btn btn-sm btn-dark">Random</Link>
                    </Col>
                    <Col>
                        <Link to="/todolist" className="btn btn-sm btn-dark ">todoList</Link>
                    </Col>
                </Row>
            </div>
            <Outlet />
        </>
    )
}


export default Home;