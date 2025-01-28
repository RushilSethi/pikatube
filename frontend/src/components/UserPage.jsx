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
import { Link, useNavigate } from "react-router-dom";
import useDeleteChannel from "./Helpers/useDeleteChannel";
import useDeleteUser from "./Helpers/useDeleteUser";

const UserPage = () => {
  const [isUserFormOpen, setIsUserFormOpen] = useState("");
  const [editUserForm, setEditUserForm] = useState(false);
  const [editChannelForm, setEditChannelForm] = useState(false);
  const [createChannelForm, setCreateChannelForm] = useState(false);
  const [settingsDropdown, setSettingsDropdown] = useState(false);

  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userId = useSelector((state) => state.user.userId);
  const deleteChannel = useDeleteChannel();
  const deleteUser = useDeleteUser();

  const {
    data: userDetails,
    error,
    isLoading,
  } = useFetchUserDetailsByIdQuery(userId);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading User Information. Please try again later.
      </p>
    );
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

  const manageVideos = () => {
    const channelId = userDetails?.channelId
    navigate(`/user/${userId}/manage`, {
      state: { channelId: channelId },
    });
  };

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
      <EditUserDetailsModal
        isOpen={editUserForm}
        handleClose={setEditUserForm}
        userId={userId}
        userDetails={userDetails}
      />
      <CreateChannelModal
        isOpen={createChannelForm}
        handleClose={setCreateChannelForm}
        userId={userId}
      />
      <EditChannelModal
        isOpen={editChannelForm}
        handleClose={setEditChannelForm}
        userDetails={userDetails}
      />

      {isSignedIn && (
        <div className="fixed top-16 right-4 z-50">
          <button
            onClick={() => setSettingsDropdown(!settingsDropdown)}
            className="p-3 duration-200 bg-textPrimary text-background rounded-full hover:bg-hover focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 12c0-.414.336-.75.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM3.75 6c0-.414.336-.75.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zM3.75 18c0-.414.336-.75.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
              />
            </svg>
          </button>
          {settingsDropdown && (
            <div className="absolute right-0 mt-2 w-48 bg-card rounded-lg shadow-lg">
              <ul className="py-2 text-sm text-textPrimary">
                {userDetails?.channelId && (
                  <>
                    <li>
                      <button
                        className="w-full text-left px-4 py-2 hover:bg-hover"
                        onClick={manageVideos}
                      >
                        🎥 Manage Videos
                      </button>
                    </li>
                    <li>
                      <button onClick={() => deleteChannel(userDetails?.channelId)} className="w-full text-left px-4 py-2 text-red-500 hover:bg-hover">
                        🗑️ Delete Channel
                      </button>
                    </li>
                  </>
                )}
                <li>
                  <button onClick={() => deleteUser(userId)} className="w-full text-left px-4 py-2 text-red-500 hover:bg-hover">
                    ❌ Delete Account
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      )}

      <div className="min-h-screen flex items-start mt-24 justify-center bg-background text-textPrimary w-full">
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
                  <>
                    <button
                      onClick={() => setEditChannelForm(true)}
                      className="px-6 py-2 bg-textPrimary text-background font-medium rounded-md duration-200 hover:bg-hover hover:text-textPrimary transition"
                    >
                      Edit Channel Details
                    </button>
                    <Link to={`/channel/${userDetails?.channelId}`}>
                      <div className="flex items-center gap-2 px-6 py-2 w-full text-textPrimary font-medium rounded-md duration-200 hover:bg-hover transition">
                        Go to Channel
                        <>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            stroke="#ffffff"
                            className="w-6 h-6"
                          >
                            <path
                              d="M20 4L12 12M20 4V8.5M20 4H15.5M19 12.5V16.8C19 17.9201 19 18.4802 18.782 18.908C18.5903 19.2843 18.2843 19.5903 17.908 19.782C17.4802 20 16.9201 20 15.8 20H7.2C6.0799 20 5.51984 20 5.09202 19.782C4.71569 19.5903 4.40973 19.2843 4.21799 18.908C4 18.4802 4 17.9201 4 16.8V8.2C4 7.0799 4 6.51984 4.21799 6.09202C4.40973 5.71569 4.71569 5.40973 5.09202 5.21799C5.51984 5 6.07989 5 7.2 5H11.5"
                              stroke="#ffffff"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </>
                      </div>
                    </Link>
                  </>
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
