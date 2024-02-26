import '../Styles/Navbar.css';

const Search = () => {

  return (
    <>
      <form className="search">
      <input
        className="search-input"
        type="text"
        placeholder="Search..."
      />
      <button className="search-button" type="submit">SEARCH</button>
      </form>
    </>
  )
}

export default Search;