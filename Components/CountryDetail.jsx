import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'

export default function CountryDetail() {
  const { name } = useParams()

  const [countryData, setCountryData] = useState({})
  const [borderCountries, setBorderCountries] = useState([])

  useEffect(() => {
    // FIRST FETCH: Get main country data
    fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        setCountryData({
          name: data.name.common,
          flag: data.flags.svg,
          population: data.population.toLocaleString('en-IN'),
          region: data.region,
          nativeName: data.name.nativeName
            ? Object.values(data.name.nativeName)[0].common
            : data.name.common,
          region: data.region,
          subRegion: data.subregion ?? 'No subregion',
          capital: data.capital ? data.capital.join(', ') : 'No capital',
          topLevelDomain: data.tld.join(', '),
          currencies: data.currencies
            ? Object.values(data.currencies)[0].name
            : 'No currencies',
          languages: data.languages
            ? Object.values(data.languages).join(', ')
            : 'No languages',
        })

        // SECOND FETCH (NESTED): Fetch border countries data
        if (data.borders && data.borders.length > 0) {
          const borderPromises = data.borders.map((borderCode) =>
            fetch(`https://restcountries.com/v3.1/alpha/${borderCode}`)
              .then((res) => res.json())
              .then((borderData) => ({
                name: borderData[0].name.common,
                flag: borderData[0].flags.svg,
                code: borderCode,
              }))
          )

          Promise.all(borderPromises)
            .then((borders) => setBorderCountries(borders))
            .catch((err) => console.error('Error fetching border countries:', err))
        }
      })
      .catch((err) => console.error('Error fetching country:', err))
  }, [name])

  const isLoading = !countryData.name;

  if (isLoading) {
    return (
      <main>
        <Link to="/" className="back-btn" onClick={() => history.back()}>
          <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
        </Link>
        <div className="country-container">
          <div className="country-details skeleton-detail">
            <div className="skeleton-image skeleton-detail-image"></div>
            <div className="details-text-container">
              <div className="skeleton-text skeleton-title"></div>
              <div className="details-text">
                <p>
                  <b>Native name: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Population: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Region: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Sub Region: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Capital: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Top Level Domain: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Currencies: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
                <p>
                  <b>Languages: </b>
                  <span className="skeleton-text skeleton-line"></span>
                </p>
              </div>
              <div className="border-countries">
                <b>Border Countries: &nbsp; &nbsp;</b>
                <div className="border-buttons skeleton-borders">
                  <div className="skeleton-border-btn"></div>
                  <div className="skeleton-border-btn"></div>
                  <div className="skeleton-border-btn"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <Link to="/" className="back-btn" onClick={() => history.back()}>
        <i className="fa-solid fa-arrow-left"></i> &nbsp;Back
      </Link>
      <div className="country-container">
        <div className="country-details">
          <img src={countryData.flag} alt="Cook Islands flag" />
          <div className="details-text-container">
            <h2>{countryData.name}</h2>
            <div className="details-text">
              <p>
                <b>Native name: </b>
                {countryData.nativeName}
              </p>
              <p>
                <b>Population: </b>
                {countryData.population}
              </p>
              <p>
                <b>Region: </b>
                {countryData.region}
              </p>
              <p>
                <b>Sub Region: </b>
                {countryData.subRegion}
              </p>
              <p>
                <b>Capital: </b>
                {countryData.capital}
              </p>
              <p>
                <b>Top Level Domain: </b> {countryData.topLevelDomain}
              </p>
              <p>
                <b>Currencies: </b>
                {countryData.currencies}
              </p>
              <p>
                <b>Languages: </b>
                {countryData.languages}
              </p>
            </div>
            <div className="border-countries">
              <b>Border Countries: &nbsp; &nbsp;</b>
              {borderCountries.length > 0 ? (
                <div className="border-buttons">
                  {borderCountries.map((country) => (
                    <Link
                      key={country.code}
                      to={`/country/${country.name}`}
                      className="border-btn"
                    >
                      <img src={country.flag} alt={country.name} title={country.name} />
                      <span>{country.name}</span>
                    </Link>
                  ))}
                </div>
              ) : (
                'No border countries'
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
