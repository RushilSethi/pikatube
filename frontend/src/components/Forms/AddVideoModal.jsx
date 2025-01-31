import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useAddVideoByChannelIdMutation } from "../../store/apiSlice";
import useCustomToast from "../Helpers/useCustomToast";
4;
import toolTipIcon from "../../assets/questionMark-toolTip.svg";

const AddVideoModal = ({ isOpen, handleClose, userDetails }) => {
  const [videoUrl, setVideoUrl] = useState("");
  const [title, setTitle] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [addVideoByChannelId, { isLoading }] = useAddVideoByChannelIdMutation();

  const { showToast } = useCustomToast();

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

  const handleCancel = () => {
    setVideoUrl("");
    setDescription("");
    setThumbnailUrl("");
    setTitle("");
    setErrorMessage("");
    setTags("");
    handleClose();
  };

  const handleTooltipClick = () => {
    showToast(
      "info",
      "Please upload your video and thumbnail to Google Drive or any other cloud platform, and use the generated shareable link here."
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!userDetails.channelId || userDetails.channelId === "") {
      showToast("error", "Please create a channel to post a video.");
      return;
    }
  
    if (!videoUrl || !title || !thumbnailUrl || !description || !tags) {
      showToast("error", "All fields are required!");
      return;
    }

    const tagsArray = tags.split(',').map(tag => tag.trim()).filter(tag => tag);
  
    const videoData = {
      videoUrl,
      title,
      thumbnailUrl,
      description,
      tags: tagsArray,
    };
  
    try {
      await addVideoByChannelId({
        channelId: userDetails.channelId,
        body: videoData,
      });
      showToast("success", "Video added successfully!");
      handleCancel();
    } catch (error) {
      showToast("Error adding video. Please try again.", "error");
    }
  };

  return (
    isOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
        <div className="bg-card p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-xl font-bold mb-4">Add Video</h2>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="videoUrl"
              >
                <div className="flex gap-2 items-center">
                  Video URL
                  <div className="w-6 h-6" onClick={handleTooltipClick}>
                    <img src={toolTipIcon} alt="tooltip" />
                  </div>
                </div>
              </label>
              <input
                type="url"
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="title">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="thumbnailUrl"
              >
                Thumbnail URL
              </label>
              <input
                type="url"
                id="thumbnailUrl"
                value={thumbnailUrl}
                onChange={(e) => setThumbnailUrl(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="description"
              >
                Description
              </label>
              <textarea
                id="description"
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              ></textarea>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2" htmlFor="tags">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
              />
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
                className="px-4 py-2 duration-200 border-accentBlue border-2 hover:bg-accentBlue text-textPrimary rounded"
              >
                Add Video
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};

AddVideoModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  userDetails: PropTypes.shape({
    channelId: PropTypes.string.isRequired,
  }),
};


export default AddVideoModal;
