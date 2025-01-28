import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  useFetchChannelByIdQuery,
  useDeleteVideoByIdMutation,
  useEditVideoByIdMutation,
} from "../store/apiSlice";
import useCustomToast from "./Helpers/useCustomToast";
import ManageVideos_videos from "./ManageVideos_Videos";
import Loader from "./Helpers/Loader";
import EditVideoModal from "./Forms/EditVideoModal";

const ManageVideos = () => {
  const location = useLocation();
  console.log(`location from managevideos page: ${location}`);
  console.log(location);
  const { channelId } = location.state || {};
  const { data: channelDetails, isLoading, error } = useFetchChannelByIdQuery(channelId);
  const [deleteVideoById, { isLoading: isDeleting }] = useDeleteVideoByIdMutation();
  const { showToast } = useCustomToast();

  const [videoToBeEdited, setVideoToBeEdited] = useState({});
  const [isEditVideoModalOpen, setIsEditVideoModalOpen] = useState(false);

  const [refetchFlag, setRefetchFlag] = useState(false);

  const handleEditSuccess = () => {
    setRefetchFlag((prev) => !prev);
  };

  function handleEditVideoModalOpen(videoDetails){
    setVideoToBeEdited(videoDetails);
    setIsEditVideoModalOpen(true);
  }
  function handleEditVideoModalClose(){
    setIsEditVideoModalOpen(false);
  }

  const videoIds = channelDetails?.videos || [];

  const handleDelete = (videoId) => {
    showToast("confirm", "Are you sure you want to delete this video?", async (confirm) => {
      if (confirm) {
        try {
          const response = await deleteVideoById({ id: videoId }).unwrap();
          console.log(response);
          showToast("success", "Video deleted successfully!");
        } catch (error) {
          showToast("error", "Failed to delete video. Please try again.");
        }
      } 
    });
  };

  if (isLoading) return <Loader />;
  if (error) return <p>Error loading channel details. Please try again later.</p>;

  return (
    <div className="p-4">
      <EditVideoModal onEditSuccess={handleEditSuccess} isOpen={isEditVideoModalOpen} handleClose={handleEditVideoModalClose} videoDetails={videoToBeEdited}/>
      <h2 className="text-2xl font-bold mb-4 text-textPrimary">Manage Videos</h2>
      <ManageVideos_videos videoIds={videoIds} refetchFlag={refetchFlag} handleDelete={handleDelete} handleEditButton={handleEditVideoModalOpen}/>
    </div>
  );
};

export default ManageVideos;
