import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/navbarIcons/home-outline.svg";
import folderIcon from "../assets/navbarIcons/folder-outline.svg";
import playIcon from "../assets/navbarIcons/play-circle-outline.svg";
import homeIconFilled from "../assets/navbarIcons/home-filled.svg";
import folderIconFilled from "../assets/navbarIcons/folder-filled.svg";
import playIconFilled from "../assets/navbarIcons/play-circle-filled.svg";
import userIcon from "../assets/navbarIcons/user.svg";
import logoutIcon from "../assets/navbarIcons/logout.svg";
import rulesIcon from "../assets/navbarIcons/rules.svg";
import useCustomToast from "./Helpers/useCustomToast";
import { useDispatch, useSelector } from "react-redux";
import { signOut } from "../store/authSlice";
import { clearUserId } from "../store/userSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { showToast } = useCustomToast();

  function HomeClick() {
    navigate("/");
  }
  function SubClick() {
    navigate("/subs");
  }
  function ShortsClick() {
    navigate("/shorts");
  }
  function UserClick() {
    if (isSignedIn) {
      navigate("/user");
    } else {
      showToast("error", "Login or Signup to access this page");
    }
  }
  function RulesClick() {
    navigate("/rules");
  }
  function LogoutClick() {
    if (isSignedIn) {
      showToast("confirm", "Are you sure you want to log out?", (confirmed) => {
        if (confirmed) {
          dispatch(signOut());
          dispatch(clearUserId());
          navigate("/");
        }
      });
    } else {
      showToast("info", "It seems you're not logged in. Please sign in first.");
    }
  }
  const menuItems = [
    {
      label: "Home",
      icon: homeIcon,
      iconActive: homeIconFilled,
      route: "/",
      onClick: HomeClick,
    },
    {
      label: "Subsciptions",
      icon: folderIcon,
      iconActive: folderIconFilled,
      route: "/subs",
      onClick: SubClick,
    },
    {
      label: "Shorts",
      icon: playIcon,
      iconActive: playIconFilled,
      route: "/shorts",
      onClick: ShortsClick,
    },
    {
      label: "You",
      icon: userIcon,
      iconActive: userIcon,
      route: "/user",
      onClick: UserClick,
    },
    {
      label: "Platform Rules",
      icon: rulesIcon,
      iconActive: rulesIcon,
      route: "/rules",
      onClick: RulesClick,
    },
    {
      label: "Logout",
      icon: logoutIcon,
      iconActive: logoutIcon,
      route: null,
      onClick: LogoutClick,
    },
  ];

  return (
    <>
      <div className="flex">
        <div
          className={`hidden md:flex h-screen bg-background text-textPrimary ${
            isOpen ? "w-64" : "w-16"
          } duration-100 transition-all flex flex-col`}
        >
          <div className="flex-1 mt-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={item.onClick}
                className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg ${
                  location.pathname === item.route
                    ? "bg-hover text-highlight"
                    : "hover:bg-hover"
                }`}
              >
                <img
                  src={
                    location.pathname === item.route
                      ? item.iconActive
                      : item.icon
                  }
                  alt={`${item.label} Icon`}
                  className="w-8 h-8"
                />
                {isOpen && <span className="text-lg">{item.label}</span>}
              </div>
            ))}
          </div>
        </div>

        <div
          className={`fixed top-0 left-0 h-full w-64 bg-background text-textPrimary transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-200 md:hidden z-50`}
        >
          <div className="flex flex-col mt-8">
            {menuItems.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  item.onClick();
                  toggleSidebar();
                }}
                className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg ${
                  location.pathname === item.route
                    ? "bg-hover text-highlight"
                    : "hover:bg-hover"
                }`}
              >
                <img
                  src={
                    location.pathname === item.route
                      ? item.iconActive
                      : item.icon
                  }
                  alt={`${item.label} Icon`}
                  className="w-8 h-8"
                />
                <span className="text-lg">{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-40"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
