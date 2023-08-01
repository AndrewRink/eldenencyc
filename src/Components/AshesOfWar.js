import React, {useState} from "react";

const AshesOfWar = () => {
    const [search, setSearch]=useState("")
    const [ashes, setAshes]=useState ({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const ashSearch = e.target.value;
        setSearch(ashSearch);

    try {
        if(ashSearch.trim() === "") {
            setAshes({ search: ashSearch, list: []})
            return
        }

        const response = await fetch (`https://eldenring.fanapis.com/api/ashes?name=${ashSearch}`)
        const data = await response.json();

        if(data.data) {
            const filteredAshes = data.data.filter((ashes) => 
            ashes.name.toLowerCase().includes(ashSearch.toLowerCase())
            );
            setAshes({ search: ashSearch, list: filteredAshes})
        } else {
            setAshes({ search: ashSearch, list: []})
        }
    } catch (error) {
        console.error("Error Fetching Data", error)
    }
    }

    return (
        <div>
            <h1 className="title">Ashes of War</h1>
            <form>
            <p className="searchHeader">Search for Ashes of War</p>
            <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul>
                {ashes.list.map((ashes,index)=>(
                <li className="listItem" key={index}>{ashes.name}</li>
                ))}
            </ul>
        </div>
    )
}

export default AshesOfWar