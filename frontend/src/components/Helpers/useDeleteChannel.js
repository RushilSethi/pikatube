import { useDeleteChannelByIdMutation } from "../../store/apiSlice";
import useCustomToast from "./useCustomToast";

const useDeleteChannel = () => {
  const [deleteChannelById] = useDeleteChannelByIdMutation();
  const { showToast } = useCustomToast();

  const deleteChannel = async (channelId) => {
    showToast("confirm", "Are you sure you want to delete your channel? This will also delete all videos associated with it.", async (confirm) => {
      if (confirm) {
        const userInput = prompt("Type 'IConfirmToDelete' to confirm deleting the channel and its videos:");
        if (userInput === "IConfirmToDelete") {
          try {
            await deleteChannelById({ id: channelId }).unwrap();
            showToast("success", "Channel and associated videos deleted successfully.");
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
