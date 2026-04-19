import { Link } from "react-router";

export default function CountryCard({ name, flag, population, region, capital, isLoading = false }) {
  if (isLoading) {
    return (
      <div className="country-card skeleton">
        <div className="skeleton-image"></div>
        <div className="country-content">
          <div className="skeleton-text skeleton-title"></div>
          <p>
            <b>Population: </b>
            <span className="skeleton-text skeleton-line"></span>
          </p>
          <p>
            <b>Region: </b>
            <span className="skeleton-text skeleton-line"></span>
          </p>
          <p>
            <b>Capital: </b>
            <span className="skeleton-text skeleton-line"></span>
          </p>
        </div>
      </div>
    );
  }

  return (
    <Link className="country-card" to={`country/${name}`}>
      <img src={flag} alt={name + ' flag'} />
      <div className="country-content">
        <h2 className="country-name">{name}</h2>
        <p>
          <b>Population: </b>{population}
        </p>
        <p>
          <b>Region: </b>{region}
        </p>
        <p>
          <b>Capital: </b>{capital}
        </p>
      </div>
    </Link>
  );
}
