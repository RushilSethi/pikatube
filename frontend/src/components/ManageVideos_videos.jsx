import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useGetMultipleVideosByIdsMutation } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import ManageVideos_videoItem from "./VideoCard/ManageVideos_videoItem";

const ManageVideos_videos = ({ videoIds, handleDelete, handleEditButton, refetchFlag }) => {
  const [getMultipleVideosByIds, { data, error, isLoading }] =
    useGetMultipleVideosByIdsMutation();
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    if (videoIds && videoIds.length > 0) {
      getMultipleVideosByIds(videoIds)
        .then((response) => {
            // console.log(response)
          setVideos(response?.data || []);
        })
        .catch((err) => {
          console.error("Error fetching videos:", err);
        });
    }
  }, [videoIds, getMultipleVideosByIds, refetchFlag]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-red-500">
        Error loading videos for {videoIds.join(", ")}
      </p>
    );
  }
  return (
    <div className="grid gap-4 grid-cols-1 w-full mx-auto px-4">
      {videos.map((video, index) => {
        return (
          <ManageVideos_videoItem
            video={video}
            key={video._id}
            id={video._id}
            title={video.title}
            thumbnail={video.thumbnailUrl}
            description={video.description}
            channelName={video.channelName}
            views={video.views}
            uploadTime={video.uploadDate}
            handleDelete={handleDelete}
            handleEditButton={handleEditButton}
          />
        );
      })}
    </div>
  );
};

ManageVideos_videos.propTypes = {
  videoIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired,
  refetchFlag: PropTypes.bool.isRequired
};

export default ManageVideos_videos;
