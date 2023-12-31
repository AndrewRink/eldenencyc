import { useState } from "react"
import { Card } from "react-bootstrap"

const Ammos = () => {
    const [search, setSearch] = useState("");
    const [ammo, setAmmo] = useState({
        search: "",
        list: []
    })
    const [loading, setLoading] = useState(false);

    const handleChange = async (e) => {
        const ammoSearch = e.target.value
        setSearch(ammoSearch)
    

    try {
        setLoading(true);
        if (ammoSearch.trim()==="") {
            setAmmo({search: ammoSearch, list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/ammos?name=${ammoSearch}`)
        const data = await response.json()

        if (data.data) {
            const filteredAmmo = data.data.filter((ammo) => 
                ammo.name.toLowerCase().includes(ammoSearch.toLowerCase())
            );
            setAmmo({search: ammoSearch, list: filteredAmmo});
        } else {
            setAmmo({search: ammoSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    } finally {
        setLoading(false);
    }
    }

    return (
        <div>
            <h1 className="title">Ammos</h1>
            <p className="searchHeader">Search for Ammo</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            {loading === true && <p>Info Loading!</p>}
            <ul className="mappedResults">
                {ammo.list.map((ammo, index) =>
                <Card className="listItem" key={index}>
                <Card.Body>
                    <Card.Title className="cardTitle">{ammo.name}</Card.Title>
                    <Card.Img className="cardImage" src={ammo.image} alt={ammo.name}/>
                    <Card.Text className="itemInfo">Description: {ammo.description}</Card.Text>
                </Card.Body>
            </Card>
                )} 
            </ul>
       </div>
    )
}

export default Ammos