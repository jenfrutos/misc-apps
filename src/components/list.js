import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import { BsPencilSquare, BsTrash } from 'react-icons/bs';

const accessLocalStorage = () => {
    let storedItems = localStorage.getItem("listItems");

    if (storedItems) {
        return (JSON.parse(storedItems));
    } else { return [] }
}

const List = () => {

    let [listItems, setListItems] = useState(accessLocalStorage());
    let [item, setItem] = useState({
        id: 0,
        name: ""
    });
    let [editing, setEditing] = useState(false);
    let [editId, setEditId] = useState(0);

    // Delete Modal
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!item.name) {
            console.log("write something")
        } else if (item.name && editing) {
            console.log("editing rn");
            setListItems(
                listItems.map(obj => {
                    if (obj.id === editId) {
                        return { ...obj, name: item.name }
                    } return obj
                }
                )
            )
            setItem({ name: "" });
            setEditing(false);
        } else {
            setListItems([item, ...listItems]);
            console.log(listItems);
            setItem({ name: "" });
        }
    }
    const editItem = (id) => {
        setEditing(true);
        setEditId(id);
        console.log(editId);
    }
    const deleteItem = (id) => {
        const newArr = listItems.filter(obj => obj.id !== id)
        console.log(newArr);
        setListItems(listItems.filter(obj => obj.id !== id))
    }


    const deleteAllItems = () => {
        setListItems([]);
        handleClose();
    }

    useEffect(() => {
        localStorage.setItem("listItems", JSON.stringify(listItems));
    }, [listItems]);


    return (
        <div className="container justify-content-center todo-app">
            <div className="list text-center">
                <h1>Things To Do</h1>
                <Form onSubmit={handleSubmit}>
                    <InputGroup>
                        <Form.Control
                            type="text"
                            size="sm"
                            value={item.name}
                            onChange={e => setItem({ id: Math.floor((Math.random() * 1000) + 1), name: e.target.value })}
                            placeholder={editing ? "new name" : "e.g. walk dog"}
                        />
                        <button className="btn btn-sm btn-success" type="submit">{editing ? "Update" : "Add"}</button>
                    </InputGroup>
                </Form>
            </div>
            <div className="list text-center">
                <ul>
                    {
                        listItems.map((obj) => {
                            return (
                                <li key={obj.id} className="list-item">{obj.name}
                                    <div className="list-btns">
                                        <button className="text-secondary" onClick={() => editItem(obj.id)}><BsPencilSquare /></button>
                                        <button className="text-danger" onClick={() => deleteItem(obj.id)}><BsTrash /></button>
                                    </div>
                                </li>)
                        })
                    }
                </ul>
                <Modal show={show} onHide={handleClose} size="sm" centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete All?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="text-center d-grid gap-2">
                        <button className="btn btn-sm btn-danger" onClick={deleteAllItems}>Yes, Delete</button>
                        <button className="btn btn-sm btn-outline-secondary" onClick={handleClose}>Cancel</button>
                    </Modal.Body>
                </Modal>
                <button className="btn btn-sm btn-outline-danger" onClick={handleShow}>Delete All</button>
            </div>
        </div>
    )
}

export default List;