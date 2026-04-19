import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'
import Contact from './Components/Contact'
import Home from './Components/Home'
import Error from './Components/Error'
import App from './App'
import CountryDetail from './Components/CountryDetail'

const router = createBrowserRouter([
  {
    path: '/',
    Component: App,
    errorElement: <Error/>,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/country/:name',
        Component: CountryDetail,
      },
    ],
  },
])

const root = createRoot(document.querySelector('#root'))
root.render(<RouterProvider router={router} />)
