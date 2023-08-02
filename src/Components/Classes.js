import { useState } from "react";
import { Card } from "react-bootstrap"


const Classes = () => {
    const [search, setSearch]=useState("");
    const [charClass, setClasses]=useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const classSearch = e.target.value;
        setSearch(classSearch);

    try {
        if (classSearch.trim() === ""){
            setClasses({search: classSearch, list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/classes?name=${classSearch}`)
        const data = await response.json()

        if(data.data) {
            const filteredClasses = data.data.filter((charClass) =>
            charClass.name.toLowerCase().includes(classSearch.toLowerCase())
            );
            setClasses({search: classSearch, list: filteredClasses})
        } else {
            setClasses({search: classSearch, list: []})
        }
    } catch (error) {
        console.error ("Error fetching data", error)
    }
}

    return (
        <div>
            <h1 className="title">Classes</h1>
            <form>
                <p className="searchHeader">Search for Classes</p>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul>
                {charClass.list.map((charClass,index)=>
                <Card className="listItem" key={index}>
                <Card.Body>
                    <Card.Title>{charClass.name}</Card.Title>
                    <Card.Img className="cardImage" src={charClass.image} alt={charClass.name}/>
                    <Card.Text>Description: {charClass.description}</Card.Text>
                </Card.Body>
            </Card> 
            )}
            </ul>
        </div>
    )
}

export default Classes