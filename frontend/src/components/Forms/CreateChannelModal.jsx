import { useState } from "react";
import { useCreateChannelMutation } from "../../store/apiSlice";
import useCustomToast from "../Helpers/useCustomToast";
import PropTypes from "prop-types";

const CreateChannelModal = ({ isOpen, handleClose }) => {
  const [channelName, setChannelName] = useState("");
  const [description, setDescription] = useState("");

  const [createChannel, {isLoading}] = useCreateChannelMutation();
  const { showToast } = useCustomToast();

  const handleCancel = () => {
    setChannelName("");
    setDescription("");
    handleClose(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!channelName.trim() || !description.trim()) {
      showToast("error", "Channel name and description are required.");
      return;
    }

    try {
      const response = await createChannel({ channelName, description }).unwrap();
      console.log(response);
      showToast("success", `Channel created successfully.`);
      handleCancel();
    } catch (error) {
      showToast("error", error?.data?.message || "Failed to create the channel. Please try again.");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
        <div className="bg-card p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Create Channel</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="channelName">
                Channel Name
              </label>
              <input
                type="text"
                id="channelName"
                value={channelName}
                onChange={(e) => setChannelName(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                placeholder="Enter channel name"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="description">
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                placeholder="Enter channel description"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
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
                {isLoading ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

CreateChannelModal.proptypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
} 

export default CreateChannelModal;
