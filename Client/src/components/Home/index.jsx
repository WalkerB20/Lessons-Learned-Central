import Feed from '../Feed';
import Navbar from '../Navbar';
import AARComponent from '../AARComponent';
import '../styles/App.css';


const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Feed />
      <AARComponent />
    </div>

  )
}

export default Home;