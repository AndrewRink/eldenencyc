import {useState} from 'react';
import { Card } from 'react-bootstrap';

const Incantations = () => {
    const [search, setSearch] = useState("");
    const [incantation, setIncantation] = useState({
        search: "",
        list: []
    });

    const handleChange = async(e) => {
        const searchIncantation = e.target.value
        setSearch(searchIncantation)

    try {
        if (searchIncantation.trim()==="") {
            setIncantation({ search: "", list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/incantations?name=${searchIncantation}`)
        const data = await response.json()

        if (data.data) {
            const filteredIncantation = data.data.filter((incantation) => 
                incantation.name.toLowerCase().includes(searchIncantation.toLowerCase())
            );
            setIncantation({ search: searchIncantation, list: filteredIncantation})
        } else {
            setIncantation({ search: searchIncantation, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
    }
    return (
        <div>
            <h1 className='title'>Incantations</h1>
            <p className='searchHeader'>Search for an Incantation</p>
            <form>
                <input  type='text'value={search} onChange={handleChange}/>
            </form>
            <ul className="mappedResults">
                {incantation.list.map((incantation, index) => 
                <Card className="listItem" key={index}>
                <Card.Body>
                    <Card.Title className="cardTitle">{incantation.name}</Card.Title>
                    <Card.Img className="cardImage" src={incantation.image} alt={incantation.name}/>
                    <Card.Text className="itemInfo">Description: {incantation.description}</Card.Text>
                </Card.Body>
            </Card>
                )}
            </ul>
        </div>
    )


}

export default Incantations
