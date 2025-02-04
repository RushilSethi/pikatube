import PropTypes from "prop-types";
import PikachuLogo from "../assets/pikachu-logo.svg";
import { useState, useRef, useEffect } from "react";
import LoginModal from "./Forms/LoginModal";
import RegisterModal from "./Forms/RegisterModal";
import AddVideoModal from "./Forms/AddVideoModal";
import pikachu from "../assets/pikachu.mp3";
import { useSelector } from "react-redux";
import AvatarShow from "./Helpers/AvatarShow";
import { useFetchUserDetailsByIdQuery } from "../store/apiSlice";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const userId = useSelector((state) => state.user.userId);
  const [avatarUrl, setAvatarUrl] = useState(null);
  const [searchText, setSearchText] = useState("");

  const [isAddVideoFormOpen, setIsAddVideoFormOpen] = useState(false);
  const [isUserFormOpen, setIsUserFormOpen] = useState("");

  useEffect(() => {
    // console.log("Redux state updated:", { isSignedIn, userId });
  }, [isSignedIn, userId]);
  
  const handleOpenLogin = () => {
    setIsUserFormOpen("login");
  };
  const handleOpenRegister = () => {
    setIsUserFormOpen("register");
  };
  const handleUserFormClose = () => {
    setIsUserFormOpen("");
  };
  const {
    data: userDetails,
    error,
    isLoading,
    refetch 
  } = useFetchUserDetailsByIdQuery(userId, {
    skip: !isSignedIn || !userId,
  });

  useEffect(() => {
    if (isSignedIn && userId) {
      refetch();
    }
  }, [userId, isSignedIn, refetch]);

  useEffect(() => {
    // console.log("1st console")
    // console.log(userDetails)
    if (userDetails) {
      // console.log("2nd console")
      // console.log(userDetails)
      setAvatarUrl(userDetails.avatar);
    }
  }, [userDetails]);

  const handleAvatarClick = () => {
    navigate(`/user/${userId}`);
  };

  const audioRef = useRef(null);

  const handlePikaPika = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const handleSearch = () => {
    if (searchText.trim() !== "") {
      navigate(`/search/${searchText}`);
    }
  };

  const handleAddVideoForm = () => {
    setIsAddVideoFormOpen(false);
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
      <AddVideoModal
        isOpen={isAddVideoFormOpen}
        handleClose={handleAddVideoForm}
        userDetails={userDetails}
      />

      <div className="flex items-center justify-between px-4">
        <div className="flex items-center  min-w-[120px] sm:min-w-[160px]">
          <div
            className="rounded-full hover:bg-hover px-2 py-2 mr-2 cursor-pointer"
            onClick={toggleSidebar}
          >
            {/* Menu Icon */}
            <svg
              viewBox="-0.5 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M2 12.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M2 18.32H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M2 6.32001H22"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
              </g>
            </svg>
          </div>

          {/* pikatube logo */}
          <div
            onClick={handlePikaPika}
            className={`flex items-center bg-textPrimary rounded-full px-3 py-1 m-1 cursor-pointer active:scale-95 transition-transform duration-200`}
          >
            <audio ref={audioRef} src={pikachu} />
            <img src={PikachuLogo} className="w-8 h-8" />
            <span className="text-background font-bold lg:text-lg text-sm md:text-md">PikaTube</span>
          </div>
        </div>

        {/* search bar */}
        <div className="items-center hidden sm:flex">
          <input
            className="searchbar w-full sm:w-64 md:w-80 lg:w-96 bg-card border-border border-2 text-textPrimary px-3 py-1.5 rounded-full focus:outline-none focus:border-accentBlue"
            placeholder="Search"
            onChange={(e) => setSearchText(e.target.value)}
            value={searchText}
          />
          <style>{`
            .searchbar::placeholder {
              color: #aaaaaa; 
            }
          `}</style>
          {/* search icon */}
          <div
            className="rounded-full bg-hover p-2 m-2 cursor-pointer"
            onClick={handleSearch}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#aaaaaa"
              className="w-6 h-6"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth={0} />
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M17 17L21 21"
                  stroke="#aaaaaa"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />{" "}
                <path
                  d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                  stroke="#aaaaaa"
                  strokeWidth={2}
                />{" "}
              </g>
            </svg>
          </div>
        </div>

        {/* sign in / add video and account */}
        <div>
          {isSignedIn ? (
            <div className="flex items-center gap-2">
              <div
                onClick={() => setIsAddVideoFormOpen(true)}
                className="flex items-center text-textPrimary gap-1 bg-card px-2 py-1.5 m-2 rounded-full cursor-pointer hover:bg-hover sm:text-base"
              >
                <>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    stroke="#ffffff"
                    className="w-6 h-6"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <g id="SVGRepo_iconCarrier">
                      {" "}
                      <path
                        d="M4 12H20M12 4V20"
                        stroke="#ffffff"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />{" "}
                    </g>
                  </svg>
                </>
                Create
              </div>
              <div
                className="w-11 h-11 mx-1 mt-1 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <AvatarShow avatarUrl={avatarUrl} />
              </div>
            </div>
          ) : (
            <div
              onClick={handleOpenLogin}
              className="flex items-center rounded-full py-1 px-2 m-2 text-textPrimary bg-card gap-2 cursor-pointer hover:bg-accentBlue duration-300"
            >
              <div className="rounded-full border-textPrimary border-2 p-1.5">
                <svg
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#ffffff"
                  className="w-5 h-5"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="m 8 1 c -1.65625 0 -3 1.34375 -3 3 s 1.34375 3 3 3 s 3 -1.34375 3 -3 s -1.34375 -3 -3 -3 z m -1.5 7 c -2.492188 0 -4.5 2.007812 -4.5 4.5 v 0.5 c 0 1.109375 0.890625 2 2 2 h 8 c 1.109375 0 2 -0.890625 2 -2 v -0.5 c 0 -2.492188 -2.007812 -4.5 -4.5 -4.5 z m 0 0"
                      fill="#ffffff"
                    />{" "}
                  </g>
                </svg>
              </div>
              Sign In
            </div>
          )}
        </div>
      </div>

      {/* searchbar and icon for smaller devices */}
      <div className="items-center flex sm:hidden px-4">
        <input
          className="searchbar w-full sm:w-64 md:w-80 lg:w-96 bg-card border-border border-2 text-textPrimary px-3 py-1.5 rounded-full focus:outline-none focus:border-accentBlue"
          placeholder="Search"
          onChange={(e) => setSearchText(e.target.value)}
          value={searchText}
        />
        <style>{`
            .searchbar::placeholder {
              color: #aaaaaa; 
            }
          `}</style>
        {/* search icon */}
        <div
          className="rounded-full bg-hover p-2 m-2 cursor-pointer"
          onClick={handleSearch}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            stroke="#aaaaaa"
            className="w-6 h-6"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth={0} />
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                d="M17 17L21 21"
                stroke="#aaaaaa"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />{" "}
              <path
                d="M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                stroke="#aaaaaa"
                strokeWidth={2}
              />{" "}
            </g>
          </svg>
        </div>
      </div>
    </>
  );
};

Navbar.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
};

export default Navbar;
