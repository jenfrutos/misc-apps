import React, { useEffect, useState } from "react";
import Form from 'react-bootstrap/Form';


const Search = () => {
    const [items, setItems] = useState([]);
    const [type, setType] = useState("")

    useEffect(() => {
        console.log("Hello");
    }, []);

    const searchItem = () => {
        fetch(`https://www.boredapi.com/api/activity?type=${type}`, {
            method: "GET"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setItems(data);
            })
            .catch(err => console.log(err.message))
    }


    return (
        <div className="d-flex flex-column justify-content-center align-items-center content-container">
            <div className="search">
                <h2>Give Me Something To Do</h2>
                <div className="py-3 border-bottom border-2">
                    <Form.Select 
                        aria-label="avtivity type selector" 
                        onChange={e => setType(e.target.value)} size="sm"
                    >
                        <option>Select type of activity</option>
                        <option value="recreational">Recreational</option>
                        <option value="education">Educational</option>
                        <option value="social">Social</option>
                        <option value="cooking">Cooking</option>
                        <option value="diy">DIY</option>
                        <option value="charity">Charity</option>
                    </Form.Select>
                    <button onClick={searchItem} className="btn btn-dark mt-3">Search</button>
                </div>
                <div key={items.id} className="py-3">
                    <h2>{items.activity}</h2>
                </div>
                <div>
                    <a href="http://www.boredapi.com/"><text>Made with Bored API</text></a>
                </div>
            </div>
        </div>
    )
}


export default Search;