import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import icon1 from "../../assets/avatars/1.svg";
import icon2 from "../../assets/avatars/2.svg";
import icon3 from "../../assets/avatars/3.svg";
import icon4 from "../../assets/avatars/4.svg";
import icon5 from "../../assets/avatars/5.svg";
import icon6 from "../../assets/avatars/6.svg";

const RegisterModal = ({ isOpen, handleClose, handleLogin }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  const avatars = [icon1, icon2, icon3, icon4, icon5, icon6];

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  useEffect(() => {
    if (isOpen) {
      // Prevent scrolling when modal is open
      document.body.style.overflow = "hidden";
    } else {
      // Re-enable scrolling when modal is closed
      document.body.style.overflow = "auto";
    }

    // Cleanup: reset the overflow when the component is unmounted or modal is closed
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  return (
    isOpen === "register" && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
        <div className="bg-card p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Register</h2>
          <form>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="username">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Select Avatar</label>
              <div className="grid grid-cols-3 gap-2">
                {avatars.map((avatar, index) => (
                  <div
                    key={index}
                    className={`p-2 border-2 rounded ${
                      selectedAvatar === avatar
                        ? "border-accentBlue"
                        : "border-border"
                    } cursor-pointer`}
                    onClick={() => handleAvatarSelect(avatar)}
                  >
                    <img
                      src={avatar}
                      alt={`Avatar ${index + 1}`}
                      className="w-full h-16 object-contain rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end gap-4 mb-4">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 rounded border-2 border-hover hover:bg-hover duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 duration-200 border-accentBlue border-2 hover:bg-accentBlue text-textPrimary rounded"
              >
                Register
              </button>
            </div>
          </form>
          <p className="text-sm text-center">
            Already a user?{" "}
            <span
              onClick={handleLogin}
              className="text-accentBlue cursor-pointer hover:underline"
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    )
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.string.isRequired,  
  handleClose: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
}

export default RegisterModal;
