import Feed from '../Feed';
import Navbar from '../Navbar';



import '../styles/App.css';


const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Feed />
    </div>

  )
}

export default Home;