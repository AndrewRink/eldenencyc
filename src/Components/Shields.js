import { useState } from 'react'
import { Card } from 'react-bootstrap'

const Shields = () => {
    const [search, setSearch] = useState("")
    const [shield, setShields] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
    const shieldSearch = e.target.value
    setSearch(shieldSearch)

    try {
        if(shieldSearch.trim()==="") {
            setShields({ search: "", list: []})
            return
        }

        const response = await fetch (`https://eldenring.fanapis.com/api/shields?name=${shieldSearch}`)
        const data = await response.json()

        if(data.data) {
            const filteredShields = data.data.filter((shield) => 
            shield.name.toLowerCase().includes(shieldSearch.toLowerCase())
            );
        setShields({search: shieldSearch, list: filteredShields })
        } else {
            setShields({ search: shieldSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
}
    return (
        <div>
            <h1 className='title'>Shields</h1>
            <p className='searchHeader'>Search for a Shield</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul className="mappedResults">
                {shield.list.map((shield, index) =>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title className="cardTitle">{shield.name}</Card.Title>
                        <Card.Img className="cardImage" src={shield.image} alt={shield.name}/>
                        <Card.Text className="itemInfo">Description: {shield.description}</Card.Text>
                    </Card.Body>
                </Card> 
                )}      
            </ul>
        </div>
    )
}

export default Shields