import { useState } from "react";
import { Card } from "react-bootstrap";

const Weapons = () => {
    const [search, setSearch] = useState("")
    const [weapon, setWeapons] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const weaponSearch = e.target.value
        setSearch(weaponSearch)

        try {
            if (weaponSearch.trim()==="") {
                setWeapons({ search: "", list: []})
                return
            } 

            const response = await fetch(`https://eldenring.fanapis.com/api/weapons?name=${weaponSearch}`)
            const data = await response.json()

            if (data.data) {
                const filteredWeapons = data.data.filter((weapon) =>
                weapon.name.toLowerCase().includes(weaponSearch.toLowerCase())
                );
                setWeapons({search: weaponSearch, list: filteredWeapons})
            } else {
                setWeapons({search: weaponSearch, list: []})
            }
        } catch (error) {
            console.error("Error Fetching Data", error)
        }
    }

    return (
        <div>
            <h1 className="title">Weapons</h1>
            <p className="searchHeader">Search for a Weapon</p>
            <form>
                <input type="text" input={search} onChange={handleChange} />
            </form>
            <ul>
                {weapon.list.map((weapon, index)=>
                <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title>{weapon.name}</Card.Title>
                        <Card.Img className="cardImage" src={weapon.image} alt={weapon.name}/>
                        <Card.Text>Description: {weapon.description}</Card.Text>
                    </Card.Body>
                </Card>
                )}
            </ul>
        </div>
    )
}

export default Weapons