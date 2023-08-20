import { BrowserRouter as Router, Routes, NavLink, Route } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Container } from 'react-bootstrap'
import './App.css'
import Home from './Components/Home'
import { EldenRingCategorySearch } from './Components/EldenRingCategorySearch'

const containerStyle = {
  backgroundImage: `url(${'../public/images/Elden Ring Background.jpg'})`,
  backgroundSize: '20%',
  backgroundPosition: 'center',
  backgroundRepeat: 'repeat',
  height: '100vh',
  width: '100vw',
}

const navItemStyle = {
  textDecoration: 'underline',
  color: '#fff',
  padding: '10px',
  fontSize: '0.8rem',
}

// additional categories or pages here
const categories = [
  { route: '', CustomComponent: Home, label: 'Home' },
  { route: 'ammos', label: 'Ammos' },
  { route: 'armors', label: 'Armors' },
  { route: 'ashes', label: 'Ashes of War' },
  { route: 'bosses', label: 'Bosses' },
  { route: 'classes', label: 'Classes' },
  { route: 'creatures', label: 'Creatures' },
  { route: 'incantations', label: 'Incantations' },
  { route: 'items', label: 'Items' },
  { route: 'locations', label: 'Locations' },
  { route: 'npcs', label: 'NPCs' },
  { route: 'shields', label: 'Shields' },
  { route: 'sorceries', label: 'Sorceries' },
  { route: 'spirits', label: 'Spirits' },
  { route: 'talismans', label: 'Talismans' },
  { route: 'weapons', label: 'Weapons' },
]

function App() {
  return (
    <div className="App">
      <Router>
        {/* Nav bar */}
        <Container>
          <Navbar bg="light" expand="lg">
            <Nav className="Nav" defaultActiveKey="/">
              {categories.map(({ route, label }) => (
                <NavLink key={route} to={`/${route}`} style={navItemStyle}>
                  {label}
                </NavLink>
              ))}
            </Nav>
          </Navbar>
        </Container>

        {/* Main content */}
        <div className="display" style={containerStyle}>
          <Routes>
            {categories.map(({ route, label, CustomComponent }) => (
              <Route
                key={route}
                path={`/${route}`}
                element={
                  // if the category has a custom component, use it (just home right now), else use EldenRingCategorySearch
                  CustomComponent ? <CustomComponent /> : <EldenRingCategorySearch route={route} label={label} />
                }
              />
            ))}
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App
