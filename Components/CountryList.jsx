import { useEffect, useState } from 'react'
import CountryCard from './CountryCard'
// import countriesData from '../countriesData.js'

export default function CountryList({ search, region }) {
  const [countriesData, setCountriesData] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)
    fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,flags,population,currencies,languages,region,maps,borders,cca3',
    )
      .then((res) => res.json())
      .then((data) => {
        setCountriesData(data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.error('Error fetching countries:', err)
        setIsLoading(false)
      })
  }, [])

  const filteredCountries = countriesData.filter((country) => {
    const matchesSearch = country.name.common.toLowerCase().includes(search.toLowerCase())
    const matchesRegion = region === '' || country.region === region
    return matchesSearch && matchesRegion
  })

  // Show skeleton loaders while loading
  if (isLoading) {
    return (
      <div className="countries-container">
        {Array.from({ length: 12 }).map((_, index) => (
          <CountryCard
            key={`skeleton-${index}`}
            name=""
            flag=""
            population=""
            region=""
            capital=""
            isLoading={true}
          />
        ))}
      </div>
    )
  }

  return (
    <div className="countries-container">
      {filteredCountries.map((country) => (
        <CountryCard
          key={country.cca3}
          name={country.name.common}
          flag={country.flags.svg}
          population={country.population.toLocaleString('en-IN')}
          region={country.region}
          capital={
            country.capital && country.capital.length > 0
              ? country.capital.join(', ')
              : 'No capital'
          }
          isLoading={false}
        />
      ))}
    </div>
  )
}
