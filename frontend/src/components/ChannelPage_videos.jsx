import { useFetchVideoByIdQuery } from "../store/apiSlice";
import VideoItemCard from "./VideoCard/VideoItemCard";
import Loader from "./Helpers/Loader"
import PropTypes from "prop-types";

const ChannelPage_videos = ({ videos }) => {
  if (!videos || videos.length === 0) {
    return <p>No videos available.</p>;
  }
  return (
    <>
      <h3 className="text-2xl font-bold mb-4 text-textPrimary">Videos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {videos.map((videoId, index) => {
          const { data: video, error, isLoading } = useFetchVideoByIdQuery(videoId);

          if (isLoading) {
            return <Loader key={index} />;
          }

          if (error) {
            return <p key={index} className="text-red-500">Error loading video {videoId}</p>;
          }

          return (
            <VideoItemCard
                      key={video._id}
                      id={video._id}
                      title={video.title}
                      thumbnail={video.thumbnailUrl}
                      channelName={video.channelName}
                      views={video.views}
                      uploadTime={video.uploadDate}
                      description={video.description}
                    />
          );
        })}
      </div>
    </>
  );
};

ChannelPage_videos.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ChannelPage_videos;
