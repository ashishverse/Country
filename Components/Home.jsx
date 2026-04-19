import { useState } from 'react'
import SearchBar from './SearchBar'
import FilterMenu from './FilterMenu'
import CountryList from './CountryList'
import '../App.css'

export default function Home() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('')
  return (
    <main>
      <div className="search-and-filter-container">
        <SearchBar search={search} setSearch={setSearch} />
        <FilterMenu region={region} setRegion={setRegion} />
      </div>
      <CountryList search={search} region={region} />
    </main>
  )
}
