import Feed from '../Feed';
import { useState } from 'react';
import '../Styles/App.css';
import Search from '../Search';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="home">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <Feed searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    </div>
  )
}

export default Home;