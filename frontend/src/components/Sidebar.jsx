import PropTypes from "prop-types";
import { useLocation, useNavigate } from "react-router-dom";
import homeIcon from "../assets/navbarIcons/home-outline.svg";
import folderIcon from "../assets/navbarIcons/folder-outline.svg";
import playIcon from "../assets/navbarIcons/play-circle-outline.svg";
import homeIconFilled from "../assets/navbarIcons/home-filled.svg";
import folderIconFilled from "../assets/navbarIcons/folder-filled.svg";
import playIconFilled from "../assets/navbarIcons/play-circle-filled.svg";
import userIcon from "../assets/navbarIcons/user.svg";
import logoutIcon from "../assets/navbarIcons/logout.svg"
import useCustomToast from "./Helpers/useCustomToast";
import { useDispatch } from "react-redux";
import { signOut } from "../store/authSlice";
import { clearUserId } from "../store/userSlice";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const { showToast } = useCustomToast();

  function HomeClick(){
    navigate("/");
  }
  function SubClick(){
    navigate("/");
  }
  function ShortsClick(){
    navigate("/");
  }
  function UserClick(){
    navigate("/");
  }
  function LogoutClick(){
    showToast("confirm", "Are you sure you want to log out?", (confirmed) => {
      if (confirmed) {
        dispatch(signOut());
        dispatch(clearUserId());
        navigate("/");
      }
    });
  }
  const menuItems = [
    { label: "Home", icon: homeIcon, iconActive: homeIconFilled, route: "/", onClick:HomeClick },
    { label: "Subsciptions", icon: folderIcon, iconActive: folderIconFilled, route: "/subscriptions", onClick:SubClick},
    { label: "Shorts", icon: playIcon, iconActive: playIconFilled, route: "/shorts", onClick:ShortsClick},
    { label: "You", icon: userIcon, iconActive: userIcon, route: "/user", onClick:UserClick},
    { label: "Logout", icon: logoutIcon, iconActive: logoutIcon, route: null, onClick:LogoutClick}
  ];

  return (
    <div className="flex">
      <div
        className={`h-screen bg-background text-textPrimary ${
          isOpen ? "w-64" : "w-16"
        } duration-100 transition-all flex flex-col`}
      >
        <div className="flex-1 mt-8">
          {menuItems.map((item, index) => (
            <div
              key={index}
              onClick={item.onClick}
              className={`flex items-center gap-4 p-4 cursor-pointer rounded-lg ${
                location.pathname === item.route ? "bg-hover text-highlight" : "hover:bg-hover"
              }`}
            >
              <img
                src={location.pathname === item.route ? item.iconActive : item.icon}
                alt={`${item.label} Icon`}
                className="w-8 h-8"
              />
              {isOpen && <span className="text-lg">{item.label}</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
};

export default Sidebar;
