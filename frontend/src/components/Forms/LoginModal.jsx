import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import useCustomToast from "../Helpers/useCustomToast";
import { useLoginUserMutation } from "../../store/apiSlice";
import { useDispatch } from "react-redux";
import { signIn } from "../../store/authSlice";

const LoginModal = ({ isOpen, handleClose, handleRegister }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const { showToast } = useCustomToast();

  const [loginUser, {isLoading}] = useLoginUserMutation();

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
    if (!email || !password) {
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
      const response = await loginUser({ email, password }).unwrap();
      localStorage.setItem("AuthToken", response.token);
      console.log("Token saved:", response.token);
      showToast("success", response.message);
      handleCancel();
      dispatch(signIn());
    } catch (error) {
      console.log("Error caught:", error);
      setErrorMessage("Registration failed. Please try again.");
      showToast("error", error.data.message);
    }
  };

  const handleCancel = () => {
    setEmail("");
    setPassword("");
    setErrorMessage("");
    handleClose();
  };

  return (
    <>
      {isOpen === "login" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
            <form onSubmit={handleSubmit}>
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
                {isLoading ? "Logging in..." : "Login"}
              </button>
              </div>
            </form>
            <p className="text-sm text-center">
              New here?{" "}
              <span
                onClick={handleRegister}
                className="text-accentBlue cursor-pointer hover:underline"
              >
                Create an account
              </span>
            </p>
          </div>
        </div>
      )}
    </>
  );
};

LoginModal.propTypes = {
  isOpen: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
};

export default LoginModal;
