import { useState, useEffect } from 'react'
import { Card } from 'react-bootstrap'

export const EldenRingCategorySearch = ({ route, label }) => {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState({ search: '', list: [] })
  const [loading, setLoading] = useState(false)

  useEffect(() => resetStates(), [route, label])

  const resetStates = () => {
    setSearch('')
    setResults({ search: '', list: [] })
    setLoading(false)
  }

  const fetchData = async (categorySearch) => {
    try {
      setLoading(true)
      if (!categorySearch.trim()) {
        setResults({ search: categorySearch, list: [] })
        return
      }

      const response = await fetch(`https://eldenring.fanapis.com/api/${route}?name=${categorySearch}`)
      const { data } = await response.json()

      if (data) {
        const filteredData = data.filter((item) => item.name.toLowerCase().includes(categorySearch.toLowerCase()))
        setResults({ search: categorySearch, list: filteredData })
      } else {
        setResults({ search: categorySearch, list: [] })
      }
    } catch (error) {
      console.error('Error Fetching Data', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const categorySearch = e.target.value
    setSearch(categorySearch)
    fetchData(categorySearch)
  }

  return (
    <div>
      <h1 className="title">{label}</h1>

      <form>
        <p className="searchHeader">Search for {label}</p>
        <input type="text" value={search} onChange={handleChange} />
      </form>

      {loading && <p>Info Loading!</p>}

      {results.list.length === 0 && !loading && search.trim() !== '' && <p>No results found</p>}

      <ul className="mappedResults">
        {results.list.map(({ name, image, description }, index) => (
          <Card className="listItem" key={index}>
            <Card.Body>
              <Card.Title className="cardTitle">{name}</Card.Title>
              <Card.Img className="cardImage" src={image} alt={name} />
              <Card.Text className="itemInfo">Description: {description}</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </ul>
    </div>
  )
}
