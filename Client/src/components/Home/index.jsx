import Feed from '../Feed';
import Navbar from '../Navbar';
import { useState } from 'react';
import '../Styles/App.css';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="home">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Feed searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default Home;