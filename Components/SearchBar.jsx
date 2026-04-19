export default function SearchBar({ search, setSearch }) {
  return (
    <div className="search-bar-wrapper">
      <div className="search-bar">
        <i className="fa-brands fa-sistrix"></i>
        <input
          type="text"
          placeholder="Search for a country..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </div>
  )
}
