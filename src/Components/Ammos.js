import { useState } from "react"

const Ammos = () => {
    const [search, setSearch] = useState("");
    const [ammo, setAmmo] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const ammoSearch = e.target.value
        setSearch(ammoSearch)
    

    try {
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
    }
    }

    return (
        <div>
            <h1 className="title">Ammos</h1>
            <p className="searchHeader">Search for Ammo</p>
            <form>
                <input type="text" input={search} onChange={handleChange}/>
            </form>
            <ul>
                {ammo.list.map((ammo, index) =>
                <li className="listItem" key={index}>{ammo.name}</li>)}
            </ul>
       </div>
    )
}

export default Ammos