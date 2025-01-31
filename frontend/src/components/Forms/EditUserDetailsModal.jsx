import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import icon1 from "../../assets/avatars/1.svg";
import icon2 from "../../assets/avatars/2.svg";
import icon3 from "../../assets/avatars/3.svg";
import icon4 from "../../assets/avatars/4.svg";
import icon5 from "../../assets/avatars/5.svg";
import icon6 from "../../assets/avatars/6.svg";
import useCustomToast from "../Helpers/useCustomToast";
import { useDispatch } from "react-redux";
import { useUpdateUserDetailsMutation } from "../../store/apiSlice";

const EditUserDetailsModal = ({ isOpen, handleClose, userId, userDetails }) => {
  const [username, setUsername] = useState(userDetails.username || "");
  const [avatarMode, setAvatarMode] = useState("default");
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [customAvatar, setCustomAvatar] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [updateUserDetails, {isLoading}] = useUpdateUserDetailsMutation(); 

  const { showToast } = useCustomToast();
  const dispatch = useDispatch();

  const avatars = [icon1, icon2, icon3, icon4, icon5, icon6];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const validateForm = () => {
    if (!username || (avatarMode === "default" && !selectedAvatar) || (avatarMode === "custom" && !customAvatar)) {
      setErrorMessage("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    const updatedAvatar = avatarMode === "default" ? selectedAvatar : customAvatar;

    try {
      updateUserDetails( {id: userId, body:{ username, avatar: updatedAvatar }});
      showToast("success", "User details updated successfully!");
      handleCancel();
    } catch (error) {
      setErrorMessage("Failed to update user details. Please try again.");
      showToast("error", "Failed to update user details.");
    }
  };

  const handleCancel = () => {
    setUsername("");
    setSelectedAvatar(null);
    setCustomAvatar("");
    setErrorMessage("");
    handleClose(false);
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Edit User Details</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="username"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Avatar
                </label>
                <div className="flex items-center gap-4 mb-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="avatarMode"
                      value="default"
                      checked={avatarMode === "default"}
                      onChange={() => setAvatarMode("default")}
                    />
                    Default Avatars
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="avatarMode"
                      value="custom"
                      checked={avatarMode === "custom"}
                      onChange={() => setAvatarMode("custom")}
                    />
                    Custom Avatar
                  </label>
                </div>
                {avatarMode === "default" && (
                  <div className="grid grid-cols-3 gap-2">
                    {avatars.map((avatar, index) => (
                      <div
                        key={index}
                        className={`p-2 border-2 rounded ${
                          selectedAvatar === avatar
                            ? "border-accentBlue"
                            : "border-border"
                        } cursor-pointer`}
                        onClick={() => setSelectedAvatar(avatar)}
                      >
                        <img
                          src={avatar}
                          alt={`Avatar ${index + 1}`}
                          className="w-full h-16 object-contain rounded"
                        />
                      </div>
                    ))}
                  </div>
                )}
                {avatarMode === "custom" && (
                  <div>
                    <label
                      htmlFor="customAvatar"
                      className="block text-sm font-medium mb-2"
                    >
                      Avatar URL
                    </label>
                    <input
                      type="url"
                      id="customAvatar"
                      value={customAvatar}
                      onChange={(e) => setCustomAvatar(e.target.value)}
                      className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                      placeholder="https://example.com/avatar.png"
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 rounded border-2 border-hover hover:bg-hover duration-200"
                >
                  Cancel
                </button>
                <button
                type="submit"
                disabled={isLoading}
                className={`px-4 py-2 duration-200 border-accentBlue border-2 hover:bg-accentBlue text-textPrimary rounded ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? "Saving..." : "Save"}
              </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

EditUserDetailsModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userId: PropTypes.string.isRequired,
  userDetails: PropTypes.shape({
    username: PropTypes.string.isRequired,
  })
};

export default EditUserDetailsModal;
