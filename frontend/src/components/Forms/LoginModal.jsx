import { useState, useEffect } from "react";
import PropTypes from "prop-types";

const LoginModal = ({ isOpen, handleClose, handleRegister }) => {

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
  return (
    <>
      {isOpen === "login" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <form>
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
                <label
                  className="block text-sm font-medium mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                />
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
                  Login
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
}

export default LoginModal;
