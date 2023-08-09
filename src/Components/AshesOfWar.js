import {useState} from "react";
import {Card} from 'react-bootstrap'

const AshesOfWar = () => {
    const [search, setSearch]=useState("")
    const [ashes, setAshes]=useState ({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const ashSearch = e.target.value;
        setSearch(ashSearch);

    try {
        if(ashSearch.trim() === "") {
            setAshes({ search: ashSearch, list: []})
            return
        }

        const response = await fetch (`https://eldenring.fanapis.com/api/ashes?name=${ashSearch}`)
        const data = await response.json();

        if(data.data) {
            const filteredAshes = data.data.filter((ashes) => 
            ashes.name.toLowerCase().includes(ashSearch.toLowerCase())
            );
            setAshes({ search: ashSearch, list: filteredAshes})
        } else {
            setAshes({ search: ashSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
    }

    return (
        <div>
            <h1 className="title">Ashes of War</h1>
            <form>
            <p className="searchHeader">Search for Ashes of War</p>
            <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul className="mappedResults">
                {ashes.list.map((ashes,index)=>
                <Card className="listItem" key={index}>
                <Card.Body>
                    <Card.Title className="cardTitle">{ashes.name}</Card.Title>
                    <Card.Img className="cardImage" src={ashes.image} alt={ashes.name}/>
                    <Card.Text className="itemInfo">Description: {ashes.description}</Card.Text>
                </Card.Body>
            </Card> 
            )}
            </ul>
        </div>
    )
}

export default AshesOfWar