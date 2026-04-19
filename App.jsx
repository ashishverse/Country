import Header from './Components/Header'
import { ThemeProvider } from './Components/DarkMode'
import { Outlet } from 'react-router'

export default function App() {
  return (
    <ThemeProvider>
      <Header />
      <Outlet />
    </ThemeProvider>
  )
}
