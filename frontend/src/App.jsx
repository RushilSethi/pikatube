import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useValidateTokenMutation } from "./store/apiSlice";
import { signIn, signOut } from "./store/authSlice";

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };
  
  const dispatch = useDispatch();
  const [validateToken] = useValidateTokenMutation();

  useEffect(() => {
    console.log("token check started");
    const token = localStorage.getItem("jwtToken");

    if (token) {
      validateToken(token)
        .unwrap()
        .then((response) => {
          if (response.isValid) {
            dispatch(signIn());
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
    <div className="bg-background">
      <Navbar toggleSidebar={toggleSidebar} />
      <div className="flex">
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <Outlet />
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default App;
