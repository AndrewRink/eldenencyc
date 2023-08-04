import {useState} from 'react'
import {Card} from 'react-bootstrap'

const Locations = () => {
    const [search, setSearch] = useState("")
    const [location, setLocations] = useState ({
        search: "",
        list: []
    });

    const handleChange = async (e) => {
        const locationSearch = e.target.value
        setSearch(locationSearch)

    try {
        if (locationSearch.trim()==="") {
        setLocations({ search: "", list: []})
        return
        }

        const response = await fetch(`https://eldenring.fanapis.com/api/locations?name=${locationSearch}`)
        const data = await response.json()

        if (data.data) {
            const filteredLocations = data.data.filter((location) =>
            location.name.toLowerCase().includes(locationSearch.toLowerCase())
            );
            setLocations({search: locationSearch, list: filteredLocations })
        } else {
            setLocations({search: locationSearch, list: []})
        }
        } catch (error) {
            console.error("Error Fetching Data", error)
        }
    }
    return (
        <div>
            <h1 className='title'>Locations</h1>
            <p className='searchHeader'>Search for a Location</p>
            <form>
                <input type="text" value={search} onChange={handleChange}/>
            </form>
            <ul className="mappedResults">
                {location.list.map((location,index)=> 
                    <Card className="listItem" key={index}>
                    <Card.Body>
                        <Card.Title>{location.name}</Card.Title>
                        <Card.Img className="cardImage" src={location.image} alt={location.name}/>
                        <Card.Text>Description: {location.description}</Card.Text>
                    </Card.Body>
                 </Card>
                )}
            </ul>
        </div>
    )
}

export default Locations