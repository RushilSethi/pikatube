import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/homePage.jsx'
import SearchPage from './components/SearchPage.jsx'
import VideoPlayerPage from './components/VideoPlayerPage.jsx'
import ChannelPage from './components/ChannelPage.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorElement />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/search", element: <SearchPage />},
      {path: "/video/:id", element: <VideoPlayerPage />},
      {path: "/channel/:id", element: <ChannelPage />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <Provider store={productStore}> */}
        <RouterProvider router={router}/>
    {/* </Provider> */}
  </StrictMode>
)
