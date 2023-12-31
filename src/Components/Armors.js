import {useState} from "react"
import { Card } from 'react-bootstrap'

const Armors = () => {
    const [search, setSearch] = useState("")
    const [armors, setArmor] = useState({
        search: "",
        list: []
    })
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const armorSearch = e.target.value;
        setSearch(armorSearch);
    
    try {
        setLoading(true);
        if (armorSearch.trim()==="") {
            setArmor({ search: armorSearch, list: []})
            return
        }

        const response =  await fetch(`https://eldenring.fanapis.com/api/armors?name=${armorSearch}`)
        const data = await response.json()

        if (data.data) {
            const filteredArmor = data.data.filter((armor) => 
            armor.name.toLowerCase().includes(armorSearch.toLowerCase())
            );
            setArmor({ search: armorSearch, list: filteredArmor})
        } else {
            setArmor({ search: armorSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    } finally {
        setLoading(false);
    }
}
    return (
    <div>
        <h1 class="title">Armors</h1>
        <p className="searchHeader">Search for Armors</p>
        <form>
            <input type="text" value={search} onChange={handleChange}/>
        </form>
        {loading === true && <p>Info Loading!</p>}
        <ul className="mappedResults">
            {armors.list.map((armors, index)=>
            <Card className="listItem" key={index}>
            <Card.Body>
                <Card.Title className="cardTitle">{armors.name}</Card.Title>
                <Card.Img className="cardImage" src={armors.image} alt={armors.name}/>
                <Card.Text className="itemInfo">Description: {armors.description}</Card.Text>
            </Card.Body>
        </Card> 
        )}
        </ul>
    </div>
    )
}

export default Armors