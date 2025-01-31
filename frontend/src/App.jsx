import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useValidateTokenMutation } from "./store/apiSlice";
import { signIn, signOut } from "./store/authSlice";
import { setUserId } from "./store/userSlice";
import useCustomToast from "./components/Helpers/useCustomToast";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  const {showToast} = useCustomToast();
  
  const dispatch = useDispatch();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const [validateToken] = useValidateTokenMutation();

  useEffect(() => {
    console.log("token check started");
    const token = localStorage.getItem("AuthToken");

    if (token) {
      validateToken(token)
        .unwrap()
        .then((response) => {
          console.log(response);
          if (response.isValid) {
            dispatch(signIn());
            dispatch(setUserId(response.user.id));
          } else {
            dispatch(signOut());
          }
        })
        .catch(() => {
          dispatch(signOut());
        });
    } else {
      dispatch(signOut());
    }
  }, [dispatch, validateToken]);

  return (
    <div className="bg-background w-full min-w-screen min-h-screen">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar}/>
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
