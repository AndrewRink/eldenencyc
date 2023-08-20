import { useState } from "react";
import { Card } from "react-bootstrap";

const Talismans = () => {
    const [search, setSearch] = useState("")
    const [talisman, setTalismans] = useState({
        search: "",
        list: []
    })
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const talismanSearch = e.target.value
        setSearch(talismanSearch)

        try {
            setLoading(true);
            if (talismanSearch.trim()==="") {
                setTalismans({search: "", list: []})
                return
            }

            const response = await fetch(`https://eldenring.fanapis.com/api/talismans?name=${talisman}`)
            const data = await response.json()

            if (data.data) {
                const filteredTalismans = data.data.filter((talisman) =>
                talisman.name.toLowerCase().includes(talismanSearch.toLowerCase())
                );
                setTalismans({search: talismanSearch, list: filteredTalismans})
            } else {
                setTalismans({search: talismanSearch, list: []})
            }
        } catch (error) {
            console.error("Error Fetching Data", error)
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <h1 className="title">Talismans</h1>
            <p className="searchHeader">Search for a Talisman</p>
            <form>
                <input type="text" value={search} onChange={handleChange} />
            </form>
            {loading === true && <p>Info Loading!</p>}
            <ul className="mappedResults">
                {talisman.list.map((talisman, index) =>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title className="cardTitle">{talisman.name}</Card.Title>
                        <Card.Img className="cardImage" src={talisman.image} alt={talisman.name}/>
                        <Card.Text className="itemInfo">Description: {talisman.description}</Card.Text>
                    </Card.Body>
                </Card>
                )}
            </ul>
        </div>
    )

}

export default Talismans