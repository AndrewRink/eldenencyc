import { useState } from "react";
import { Card } from 'react-bootstrap';

const Items = () => {
    const [search, setSearch] = useState("");
    const [item, setItems] = useState({
        search: "",
        list: []
    });

    const handleChange = async (e) => {
        const searchItem = e.target.value
        setSearch(searchItem)
    

    try{
        if (searchItem.trim()==="") {
            setItems({ search: "", list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/items?name=${searchItem}`)
        const data = await response.json()

        if (data.data) {
            const filteredItems = data.data.filter((item) => 
            item.name.toLowerCase().includes(searchItem.toLowerCase())
            );
            setItems({search: searchItem, list: filteredItems})
        } else {
            setItems({search: searchItem, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
    }

    return (
        <div>
            <h1 className="title">Items</h1>
            <p className="searchHeader">Search for an Item</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul>
                {item.list.map((item,index)=>
                <Card className="listItem" key={index}>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Img className="cardImage" src={item.image} alt={item.name}/>
                    <Card.Text>Location: {item.location}</Card.Text>
                </Card.Body>
             </Card>
                )}
            </ul>
        </div>
    )
}

export default Items