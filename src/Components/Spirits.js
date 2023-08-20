import { useState } from "react";
import { Card } from "react-bootstrap";

const Spirits = () => {
    const [search, setSearch] = useState("")
    const [spirit, setSpirits] = useState({
        search: "",
        list:  []
    })
    const [loading, setLoading] = useState(false);

    const handleChange = async(e) => {
        const spiritSearch = e.target.value
        setSearch(spiritSearch)

        try{
            setLoading(true);
            if (spiritSearch.trim()==="") {
                setSpirits({ search: "", list: []})
                return
            }

            const response = await fetch(`https://eldenring.fanapis.com/api/spirits?name=${spiritSearch}`)
            const data = await response.json()

            if (data.data) {
                const filteredSpirits = data.data.filter((spirit)=>
                spirit.name.toLowerCase().includes(spiritSearch.toLowerCase())
                );
                setSpirits({search: spiritSearch, list: filteredSpirits})
            } else {
                setSpirits({search: spiritSearch, list: []})
            }
        } catch (error) {
            console.error('Error Fetching Data', error)
        } finally {
            setLoading(false);
        }
    } 

    return (
        <div>
            <h1 className="title">Spirits</h1>
            <p className="searchHeader">Search for a Spirit</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            {loading === true && <p>Info Loading!</p>}
            <ul className="mappedResults">
                {spirit.list.map((spirit, index)=>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title className="cardTitle">{spirit.name}</Card.Title>
                        <Card.Img className="cardImage" src={spirit.image} alt={spirit.name}/>
                        <Card.Text className="itemInfo">Description: {spirit.description}</Card.Text>
                    </Card.Body>
                </Card>
                )}
            </ul>
        </div>
    )
}

export default Spirits