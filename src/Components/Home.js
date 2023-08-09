import DadSoulsEldenRing from '../images/DadSoulsEldenRing.jpg'

function Home () {
    return (
        <div>
            <h1 className="title">Elden Ring Encyclopedia</h1>
            <br/>
            <h3 className="title">Welcome to the Elden Ring Encyclopedia</h3>
            <img id="dadSouls" src={DadSoulsEldenRing} alt="friends playing elden ring" />
            <p className="title">This is a simple fan-made search tool to find basic information about most elements of the game!</p>
            
        </div>
    )
}

export default Home