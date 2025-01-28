import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import HomePage from './components/homePage.jsx'
import SearchPage from './components/SearchPage.jsx'
import VideoPage from './components/VideoPage.jsx'
import ChannelPage from './components/ChannelPage.jsx'
import UserPage from './components/UserPage.jsx';
import { Provider } from "react-redux";
import store from "./store/store";
import CustomToastContainer from "./components/Helpers/CustomToastContainer";
import ManageVideos from './components/ManageVideos.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    // errorElement: <ErrorElement />,
    children: [
      {path: "/", element: <HomePage />},
      {path: "/search/*", element: <SearchPage />},
      {path: "/video/:id", element: <VideoPage />},
      {path: "/channel/:id", element: <ChannelPage />},
      {path: "/user/:id", element: <UserPage />},
      {path: "/user/:id/manage", element: <ManageVideos />}
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
        <CustomToastContainer />
        <RouterProvider router={router}/>
    </Provider>
  </StrictMode>
)
