import { useDeleteUserByIdMutation } from "../../store/apiSlice";
import { signOut } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import useCustomToast from "./useCustomToast";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const [deleteUserById] = useDeleteUserByIdMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { showToast } = useCustomToast();

  const deleteUser = async (userId) => {
    showToast("confirm", "Are you sure you want to delete your account? This will also delete all your videos and your channel.", async (confirm) => {
      if (confirm) {
        const userInput = prompt("Type 'IConfirmToDelete' to confirm deleting your account and all associated videos:");
        if (userInput === "IConfirmToDelete") {
          try {
            await deleteUserById({ id: userId }).unwrap();
            showToast("success", "Account and associated videos deleted successfully.");
            dispatch(signOut());
            navigate("/");
          } catch (error) {
            console.error("Failed to delete account:", error);
            showToast("error", "An error occurred while deleting the account. Please try again.");
          }
        } else {
          showToast("error", "Deletion canceled. Input did not match.");
        }
      }
    });
  };

  return deleteUser;
};

export default useDeleteUser;
