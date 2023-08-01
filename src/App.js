import { BrowserRouter as Router, Routes, Link, Route} from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import './App.css';
//Components
import Armors from './Components/Armors';
import Ammos from './Components/Ammos';
import AshesOfWar from './Components/AshesOfWar';
import Classes from './Components/Classes';
import Bosses from './Components/Bosses';
import Creatures from './Components/Creatures';
import Home from './Components/Home';
import Incantations from './Components/Incantations';

const containerStyle = {
  backgroundImage: `url(${"../public/images/Elden\ Ring\ Background.jpg"})`,
  backgroundSize: '20%',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  height: '100vh',
  width: '100vw',
}


function App() {
  return (
    <div className="App">
      <div>
      <Router>
        <Container>
          <Navbar bg="light" expand="lg">
            <Nav className='Nav' defaultActiveKey='/'>
                <Link to='/'>Home</Link>
                <Link to='/ammos'>Ammos</Link>
                <Link to='/armors'>Armors</Link>
                <Link to='/ashesofwar'>Ashes of War</Link>
                <Link to='/bosses'>Bosses</Link>
                <Link to='/classes'>Classes</Link>
                <Link to='/creatures'>Creatures</Link>
                <Link to='/incantations'>Incantations</Link>
            </Nav>
          </Navbar>
          </Container>
          <div className='display'
          style={containerStyle}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/armors' element={<Armors />} />
              <Route path='/ammos' element={<Ammos />} />
              <Route path='/classes' element={<Classes />} />
              <Route path='/bosses' element={<Bosses />} />
              <Route path='/ashesofwar' element={<AshesOfWar />} />
              <Route path='/creatures' element={<Creatures/>}/>
              <Route path='/incantations' element={<Incantations/>} />
            </Routes>
          </div>
        </Router>
        </div>
    </div>
  );
}

export default App;
