import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import homeIcon from "../assets/navbarIcons/home-outline.svg";
import folderIcon from "../assets/navbarIcons/folder-outline.svg";
import playIcon from "../assets/navbarIcons/play-circle-outline.svg";
import homeIconFilled from "../assets/navbarIcons/home-filled.svg";
import folderIconFilled from "../assets/navbarIcons/folder-filled.svg";
import playIconFilled from "../assets/navbarIcons/play-circle-filled.svg";
import userIcon from "../assets/navbarIcons/user.svg";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const menuItems = [
    { label: "Home", icon: homeIcon, iconActive: homeIconFilled, route: "/" },
    { label: "Subsciptions", icon: folderIcon, iconActive: folderIconFilled, route: "/subscriptions" },
    { label: "Shorts", icon: playIcon, iconActive: playIconFilled, route: "/shorts" },
    { label: "You", icon: userIcon, iconActive: userIcon, route: "/user" },
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
