import { useGetMultipleVideosByIdsMutation } from "../store/apiSlice";
import VideoItemCard from "./VideoCard/VideoItemCard";
import Loader from "./Helpers/Loader";
import PropTypes from "prop-types";
import { useEffect } from "react";

const ChannelPage_videos = ({ videos, avatar, channelName }) => {
  const [getMultipleVideosByIds, { data, error, isLoading }] =
    useGetMultipleVideosByIdsMutation();

  useEffect(() => {
    if (videos && videos.length > 0) {
      getMultipleVideosByIds(videos);
    }
  }, [videos, getMultipleVideosByIds]);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-red-500">Error loading videos.</p>;
  }

  if (!data || data.length === 0) {
    return <p className="text-textPrimary">No videos available.</p>;
  }

  return (
    <>
      <h3 className="max-w-full text-2xl font-bold mb-4 text-textPrimary">Videos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.map((video) => (
          <VideoItemCard
            key={video._id}
            id={video._id}
            title={video.title}
            thumbnail={video.thumbnailUrl}
            channelName={channelName}
            avatar={avatar}
            views={video.views}
            uploadTime={video.uploadDate}
            description={video.description}
          />
        ))}
      </div>
    </>
  );
};

ChannelPage_videos.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
  avatar: PropTypes.string,
  channelName: PropTypes.string
};

export default ChannelPage_videos;
