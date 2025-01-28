import { useDeleteChannelByIdMutation } from "../../store/apiSlice";
import { signOut } from "../../store/authSlice";
import { useDispatch } from "react-redux";
import useCustomToast from "./useCustomToast";

const useDeleteChannel = () => {
  const [deleteChannelById] = useDeleteChannelByIdMutation();
  const dispatch = useDispatch();
  const { showToast } = useCustomToast();

  const deleteChannel = async (channelId) => {
    // Step 1: Show confirmation toast with warning about videos
    showToast("confirm", "Are you sure you want to delete your channel? This will also delete all videos associated with it.", async (confirm) => {
      if (confirm) {
        // Step 2: Show browser-based alert for extra confirmation
        const userInput = prompt("Type 'IConfirmToDelete' to confirm deleting the channel and its videos:");
        if (userInput === "IConfirmToDelete") {
          try {
            // Call the delete API
            await deleteChannelById({ id: channelId }).unwrap();
            showToast("success", "Channel and associated videos deleted successfully.");
            dispatch(signOut()); // Log out the user
          } catch (error) {
            console.error("Failed to delete channel:", error);
            showToast("error", "An error occurred while deleting the channel. Please try again.");
          }
        } else {
          showToast("error", "Deletion canceled. Input did not match.");
        }
      }
    });
  };

  return deleteChannel;
};

export default useDeleteChannel;
