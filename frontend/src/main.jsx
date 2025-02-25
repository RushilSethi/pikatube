import React, { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./store/store";
import CustomToastContainer from "./components/Helpers/CustomToastContainer";
import Loader from './components/Helpers/Loader.jsx';

const HomePage = React.lazy(() => import('./components/HomePage.jsx'));
const SearchPage = React.lazy(() => import('./components/SearchPage.jsx'));
const VideoPage = React.lazy(() => import('./components/VideoPage.jsx'));
const ChannelPage = React.lazy(() => import('./components/ChannelPage.jsx'));
const UserPage = React.lazy(() => import('./components/UserPage.jsx'));
const ManageVideos = React.lazy(() => import('./components/ManageVideos.jsx'));
const ErrorPage = React.lazy(() => import('./components/ErrorPage.jsx'));
const SubscriptionsPage = React.lazy(() => import('./components/SubscriptionsPage.jsx'));
const NoShortsPage = React.lazy(() => import('./components/NoShortsPage.jsx'));
const RegulationsPage = React.lazy(() => import('./components/RegulationsPage.jsx'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/subs", element: <SubscriptionsPage /> },
      { path: "/shorts", element: <NoShortsPage /> },
      { path: "/rules", element: <RegulationsPage /> },
      { path: "/search/*", element: <SearchPage /> },
      { path: "/video/:id", element: <VideoPage /> },
      { path: "/channel/:id", element: <ChannelPage /> },
      { path: "/user", element: <UserPage /> },
      { path: "/user/:id", element: <UserPage /> },
      { path: "/user/:id/manage", element: <ManageVideos /> }
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <CustomToastContainer />
      <Suspense fallback={<Loader />}>
        <RouterProvider router={router} />
      </Suspense>
    </Provider>
  </StrictMode>
);
