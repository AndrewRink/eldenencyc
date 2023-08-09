import { useState } from 'react'
import { Card } from 'react-bootstrap'

const NPCS = () => {
    const [search, setSearch] = useState("")
    const [npc, setNPC] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const npcSearch = e.target.value
        setSearch(npcSearch)

    try {
        if (npcSearch.trim()==="") {
            setNPC({search: "", list: []})
        return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/npcs?name=${npcSearch}`)
        const data = await response.json()

        if (data.data) {
            const filteredNPC = data.data.filter((npc) => 
                npc.name.toLowerCase().includes(npcSearch.toLowerCase())
            );
            setNPC({search: npcSearch, list: filteredNPC})
        } else {
            setNPC({ search: npcSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
    }

    return (
        <div>
            <h1 className='title'>NPCs</h1>
            <p className='searchHeader'>Search for an NPC</p>
            <form>
                <input type="text" value={search} onChange={handleChange} />
            </form>
            <ul className="mappedResults">
                {npc.list.map((npc, index)=>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title className="cardTitle">{npc.name}</Card.Title>
                        <Card.Img className="cardImage" src={npc.image} alt={npc.name}/>
                        <Card.Text className="itemInfo">Location: {npc.location}</Card.Text>
                    </Card.Body>
                </Card>
                )}
            </ul>
        </div>
    )
}

export default NPCS