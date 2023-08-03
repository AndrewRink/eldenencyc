import { useState } from "react";
import { Card } from 'react-bootstrap';

const Creatures = () => {
    const [search, setSearch] = useState("");
    const [creature, setCreature] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const creatureSearch = e.target.value;
        setSearch(creatureSearch);

    try {
        if (creatureSearch.trim()==="") {
            setCreature({ search: "", list: []})
            return
        }
        const response = await fetch (`https://eldenring.fanapis.com/api/creatures?name=${creatureSearch}`)
        const data = await response.json()
        if (data.data) {
            const filteredCreatures = data.data.filter((creature) =>
            creature.name.toLowerCase().includes(creatureSearch.toLowerCase())
            );
            setCreature({ search: creatureSearch, list: filteredCreatures})
        } else {
            setCreature({ search: creatureSearch, list: []})
        }
    } catch (error) {
        console.error ("Error Fetching Data", error)
    }
    }

    return (
        <div>
            <h1 className="title">Creatures</h1>
            <p className="searchHeader"> Search for Creature</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
                <ul>
                    {creature.list.map((creature,index) =>
                    <Card className="listItem" key={index}>
                        <Card.Body>
                            <Card.Title>{creature.name}</Card.Title>
                            <Card.Img className="cardImage" src={creature.image} alt={creature.name}/>
                            <Card.Text>Location: {creature.location}</Card.Text>
                        </Card.Body>
                    </Card> 
                    )}
                </ul>
            </form>
        </div>
    )
}

export default Creatures