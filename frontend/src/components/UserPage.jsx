import { useState } from "react";
import LoginModal from "./Forms/LoginModal";
import RegisterModal from "./Forms/RegisterModal";
import AvatarShow from "./Helpers/AvatarShow";
import { useSelector } from "react-redux";
import { useFetchUserDetailsByIdQuery } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import EditUserDetailsModal from "./Forms/EditUserDetailsModal";
import CreateChannelModal from "./Forms/CreateChannelModal";
import EditChannelModal from "./Forms/EditChannelModal";

const UserPage = () => {
  const [isUserFormOpen, setIsUserFormOpen] = useState("");
  const [editUserForm, setEditUserForm] = useState(false);
  const [editChannelForm, setEditChannelForm] = useState(false);
  const [createChannelForm, setCreateChannelForm] = useState(false);
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userId = useSelector((state) => state.user.userId);

  const {
    data: userDetails,
    error,
    isLoading,
  } = useFetchUserDetailsByIdQuery(userId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading User Information. Please try again later.</p>;
  }

  const handleOpenLogin = () => {
    setIsUserFormOpen("login");
  };
  const handleOpenRegister = () => {
    setIsUserFormOpen("register");
  };
  const handleUserFormClose = () => {
    setIsUserFormOpen("");
  };
  console.log(userDetails);
  return (
    <>
      <LoginModal
        isOpen={isUserFormOpen}
        handleRegister={handleOpenRegister}
        handleClose={handleUserFormClose}
      />
      <RegisterModal
        isOpen={isUserFormOpen}
        handleLogin={handleOpenLogin}
        handleClose={handleUserFormClose}
      />
      <EditUserDetailsModal isOpen={editUserForm} handleClose={setEditUserForm} userId={userId} userDetails={userDetails}/>
      <CreateChannelModal isOpen={createChannelForm} handleClose={setCreateChannelForm} userId={userId} />
      <EditChannelModal isOpen={editChannelForm} handleClose={setEditChannelForm} userDetails={userDetails}/>
      <div className="min-h-screen flex items-start mt-24 justify-center bg-background text-textPrimary w-full">
        {/* Main content */}
        <div className="flex flex-col items-center justify-center p-6 bg-card rounded-lg w-full max-w-sm">
          {isSignedIn ? (
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold mb-4">
                Welcome, {userDetails?.username}!
              </h2>
              <div className="w-48 h-48">
                <AvatarShow avatarUrl={userDetails?.avatar} />
              </div>
              <p className="text-lg">Email: {userDetails?.email}</p>

              <div className="mt-6 flex flex-col gap-4">
                <button
                  onClick={() => setEditUserForm(true)}
                  className="px-6 py-2 bg-textPrimary text-background font-medium rounded-md duration-200 hover:bg-hover hover:text-textPrimary transition"
                >
                  Edit User Details
                </button>

                {userDetails?.channelId ? (
                  <button
                    onClick={() => setEditChannelForm(true)}
                    className="px-6 py-2 bg-textPrimary text-background font-medium rounded-md duration-200 hover:bg-hover hover:text-textPrimary transition"
                  >
                    Edit Channel Details
                  </button>
                ) : (
                  <button
                    onClick={() => setCreateChannelForm(true)}
                    className="px-6 py-2 bg-textPrimary text-background font-medium rounded-md duration-200 hover:bg-hover hover:text-textPrimary transition"
                  >
                    Create a Channel
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">
                You are signed in as a Guest
              </h2>
              <div className="flex gap-4 mt-4">
                <button
                  onClick={handleOpenLogin}
                  className="px-6 py-2 rounded bg-accentBlue text-white hover:bg-hover duration-200"
                >
                  Login
                </button>
                <button
                  onClick={handleOpenRegister}
                  className="px-6 py-2 rounded bg-textPrimary text-background hover:bg-hover hover:text-textPrimary duration-200"
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

export default UserPage;
