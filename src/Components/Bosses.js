import React, { useState} from "react";
import {Card} from "react-bootstrap"

const Bosses = ()  => {
    const[search, setSearch]=useState("");
    const[boss, setBosses]=useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const searchQuery = e.target.value;
        setSearch(searchQuery);

    try {
        if (searchQuery.trim() === "") {
            setBosses ({ search: searchQuery, list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/bosses?name=${searchQuery}`)
        const data = await response.json();

        if (data.data) {
            const filteredBosses = data.data.filter((boss) => 
            boss.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setBosses({ search: searchQuery, list: filteredBosses})
        } else {
            setBosses({ search: searchQuery, list: []})
        }
    } catch (error) {
        console.error ("Error fetching data", error)
    }
 }       
    return (
        <div>
            <h1 className="title">Bosses</h1> 
            <form>
                <p className="searchHeader">Search for Bosses by Name:</p>
                <input type='text' value = {search} onChange={handleChange}/>  
            </form>
                <ul className="mappedResults">
                    {boss.list.map((boss,index) => (
                        <Card className="listItem" key={index}>
                            <Card.Body>
                                <Card.Title className="cardTitle">{boss.name}</Card.Title>
                                <Card.Img className="cardImage" src={boss.image} alt={boss.name}/>
                                <Card.Text className="itemInfo">Location: {boss.location}</Card.Text>
                            </Card.Body>
                        </Card>  
                    ))}
                </ul>
        </div>
    )
}


export default Bosses