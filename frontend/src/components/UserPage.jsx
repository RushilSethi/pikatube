import PropTypes from "prop-types";
import { useState } from "react";
import icon1 from "../assets/avatars/1.svg";
import icon2 from "../assets/avatars/2.svg";
import icon3 from "../assets/avatars/3.svg";
import icon4 from "../assets/avatars/4.svg";
import icon5 from "../assets/avatars/5.svg";
import icon6 from "../assets/avatars/6.svg";
import LoginModal from "./Forms/LoginModal";
import RegisterModal from "./Forms/RegisterModal";

const avatars = [icon1, icon2, icon3, icon4, icon5, icon6];

const UserPage = ({ isSignedIn, userDetails, handleLogin, handleRegister }) => {
  isSignedIn = false

  userDetails = {
    username: "John Doe",
    email: "johndoe@example.com",
    avatar: 3,
  }


  const [isUserFormOpen, setIsUserFormOpen] = useState("");
    const handleOpenLogin = () => {
      setIsUserFormOpen("login");
    }
    const handleOpenRegister = () => {
      setIsUserFormOpen("register");
    }
    const handleUserFormClose = () => {
      setIsUserFormOpen("");
    }
  return (
    <>
    <LoginModal isOpen={isUserFormOpen} handleRegister={handleOpenRegister} handleClose={handleUserFormClose}/>
    <RegisterModal isOpen={isUserFormOpen} handleLogin={handleOpenLogin} handleClose={handleUserFormClose}/>
    <div className="min-h-screen flex items-start mt-24 justify-center bg-background text-textPrimary w-full">
      {/* Main content */}
      <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg w-full max-w-sm">
        {isSignedIn ? (
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-4">Welcome, {userDetails.username}!</h2>
            <img
              src={avatars[userDetails.avatar - 1]}
              alt="User Avatar"
              className="w-48 h-48"
            />
            <p className="text-lg">Email: {userDetails.email}</p>
          </div>
        ) : (

          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">You are signed in as a Guest</h2>
            <div className="flex gap-4 mt-4">
              <button
                onClick={handleOpenLogin}
                className="px-6 py-2 rounded bg-accentBlue text-white hover:bg-hover duration-200"
              >
                Login
              </button>
              <button
                onClick={handleOpenRegister}
                className="px-6 py-2 rounded bg-textPrimary text-background hover:bg-hover duration-200"
              >
                Register
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

// Define PropTypes
UserPage.propTypes = {
  isSignedIn: PropTypes.bool.isRequired,
  userDetails: PropTypes.shape({
    username: PropTypes.string,
    email: PropTypes.string,
    avatar: PropTypes.number, // Avatar ID (1-6)
  }),
  handleLogin: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
};

export default UserPage;
