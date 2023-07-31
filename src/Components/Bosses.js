import React, { useState} from "react";

const Bosses = ()  => {
    const[search, setSearch]=useState("");
    const[boss, setBosses]=useState({
        search: "",
        list: []
    })

    const handleChange = async (e) => {
        const searchQuery = e.target.value;
        setSearch(searchQuery);

    try {
        if (searchQuery.trim() === "") {
            setBosses ({ search: searchQuery, list: []})
            return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/bosses?name=${searchQuery}`)
        const data = await response.json();

        if (data.data) {
            const filteredBosses = data.data.filter((boss) => 
            boss.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setBosses({ search: searchQuery, list: filteredBosses})
        } else {
            setBosses({ search: searchQuery, list: []})
        }
    } catch (error) {
        console.error ("Error fetching data", error)
    }
 }       
 console.log(boss.list) 
    return (
        <div>
            <h1 className="title">Bosses</h1> 
            <form>
                <p>Search for Bosses by Name:</p>
                <input type='text' value = {search} onChange={handleChange}/>
                <ul>
                    {boss.list.map((boss,index) => (
                        <li key={index}>{boss.name}</li>
                    ))}
                </ul>
            </form>

        </div>
    )
}


export default Bosses