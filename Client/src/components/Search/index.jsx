import '../Styles/Navbar.css';

const Search = () => {

  return (
    <div >
      <form className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
      />
      <button type="submit">SEARCH</button>
      </form>
    </div>
  )
}

export default Search;