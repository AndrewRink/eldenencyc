import {useState} from "react"

const Armors = () => {
    const [search, setSearch] = useState("")
    const [armors, setArmor] = useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const armorSearch = e.target.value;
        setSearch(armorSearch);
    
    try {
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
    }
}
    return (
    <div>
        <h1 class="title">Armors</h1>
        <p className="searchHeader">Search for Armors</p>
        <form>
            <input type="text" value={search} onChange={handleChange}/>
        </form>
        <ul>
            {armors.list.map((armors, index)=>
            <li className="listItem" key={index}>{armors.name}</li>)}
        </ul>
    </div>
    )
}

export default Armors