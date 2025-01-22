import PropTypes from "prop-types";
import { useState } from "react";
import LoginModal from "./Forms/LoginModal";
import RegisterModal from "./Forms/RegisterModal";
import AvatarShow from "./Helpers/AvatarShow";

const UserPage = ({ isSignedIn, userDetails, handleLogin, handleRegister }) => {
  isSignedIn = true

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
            <div className="w-48 h-48">
              <AvatarShow avatarUrl={userDetails.avatar}/>
            </div>
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
