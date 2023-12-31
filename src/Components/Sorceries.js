import { useState } from 'react'
import { Card } from 'react-bootstrap'

const Sorceries = () => {
    const [search, setSearch] = useState("")
    const [sorcery, setSorceries] = useState({
        search: "",
        list: []
    });
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const sorcerySearch = e.target.value
        setSearch(sorcerySearch)

        try {
            setLoading(true);
            if (sorcerySearch.trim()==="") {
                setSorceries({ seach: "", list: []})
                return
            }

            const response = await fetch(`https://eldenring.fanapis.com/api/sorceries?name=${sorcerySearch}`)
            const data = await response.json()

            if (data.data) {
                const filteredSorceries = (data.data.filter((sorcery) => 
                sorcery.name.toLowerCase().includes(sorcerySearch.toLowerCase())
                ))
                setSorceries({search: sorcerySearch, list: filteredSorceries})
            } else {
                setSorceries({search: sorcerySearch, list: []})
            }
        } catch (error) {
            console.error("Error Fetching Data", error)
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1 className='title'>Sorceries</h1>
            <p className='searchHeader'>Search for a Sorcery</p>
            <form>
                <input type="text" value={search} onChange={handleChange} />
            </form>
            {loading === true && <p>Info Loading!</p>}
            <ul className="mappedResults">
                {sorcery.list.map((sorcery, index) =>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title className="cardTitle">{sorcery.name}</Card.Title>
                        <Card.Img className="cardImage" src={sorcery.image} alt={sorcery.name}/>
                        <Card.Text className="itemInfo">Description: {sorcery.description}</Card.Text>
                    </Card.Body>
                </Card>
                )}
            </ul>
        </div>
    )
}

export default Sorceries