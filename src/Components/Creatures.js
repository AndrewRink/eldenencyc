import { useState } from "react";
import { Card } from 'react-bootstrap';

const Creatures = () => {
    const [search, setSearch] = useState("");
    const [creature, setCreature] = useState({
        search: "",
        list: []
    })
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const creatureSearch = e.target.value;
        setSearch(creatureSearch);

    try {
        setLoading(true);
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
    } finally {
        setLoading(false);
    }
    }

    return (
        <div>
            <h1 className="title">Creatures</h1>
            <p className="searchHeader"> Search for Creature</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            {loading === true && <p>Info Loading!</p>}
                <ul className="mappedResults">
                    {creature.list.map((creature,index) =>
                    <Card className="listItem" key={index}>
                        <Card.Body>
                            <Card.Title className="cardTitle">{creature.name}</Card.Title>
                            <Card.Img className="cardImage" src={creature.image} alt={creature.name}/>
                            <Card.Text className="itemInfo">Location: {creature.location}</Card.Text>
                        </Card.Body>
                    </Card> 
                    )}
                </ul>
            
        </div>
    )
}

export default Creatures