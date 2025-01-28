import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import icon1 from "../../assets/avatars/1.svg";
import icon2 from "../../assets/avatars/2.svg";
import icon3 from "../../assets/avatars/3.svg";
import icon4 from "../../assets/avatars/4.svg";
import icon5 from "../../assets/avatars/5.svg";
import icon6 from "../../assets/avatars/6.svg";
import { useLoginUserMutation, useRegisterUserMutation } from "../../store/apiSlice";
import useCustomToast from "../Helpers/useCustomToast";
import { signIn } from "../../store/authSlice";
import { useDispatch } from "react-redux";

const RegisterModal = ({ isOpen, handleClose, handleLogin }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { showToast } = useCustomToast();
  const dispatch = useDispatch();

  const avatars = [icon1, icon2, icon3, icon4, icon5, icon6];
  const [registerUser, {isLoading}] = useRegisterUserMutation();
  const [loginUser] = useLoginUserMutation();

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

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
    if (!username || !email || !password || !selectedAvatar) {
      setErrorMessage("All fields are required.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!validateForm()) return;

    try {
      const registerResponse = await registerUser({
        username,
        email,
        password,
        avatar: selectedAvatar,
      }).unwrap();
      showToast("success", registerResponse.message);
      console.log(registerResponse);

      const loginResponse = await loginUser({ email, password }).unwrap();
      localStorage.setItem("AuthToken", loginResponse.token);
      showToast(
        "success",
        `Welcome, ${registerResponse.user.username}! You're now logged in.`
      );
      handleCancel();
      dispatch(signIn());
    } catch (error) {
      setErrorMessage("Registration failed. Please try again.");
      console.log(error);
      showToast("error", error.data.message);
    }
  };

  const handleCancel = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setSelectedAvatar(null);
    setErrorMessage("");
    handleClose();
  };

  return (
    <>
      {isOpen === "register" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Register</h2>
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
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  Select Avatar{" "}
                  <div className="text-textSecondary text-sm">
                    (You can use a custom avatar after registering)
                  </div>
                </label>
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
                {isLoading ? "Creating Account..." : "Register"}
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
      )}
    </>
  );
};

RegisterModal.propTypes = {
  isOpen: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default RegisterModal;
