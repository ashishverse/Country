import { useTheme } from './DarkMode'

export default function Header() {
  const { isDarkMode, toggleDarkMode } = useTheme()

  return (
    <header className="header-container">
      <div className="header-content">
        <h2>
          <a href="/">Where in the world?</a>
        </h2>
        <p className="theme-changer" onClick={toggleDarkMode}>
          <i className={`fa-regular ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
          <span className="dark-mode">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </p>
      </div>
    </header>
  )
}
