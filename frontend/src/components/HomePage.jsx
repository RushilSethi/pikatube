import { useFetchVideosQuery } from "../store/apiSlice"; // Import the query hook
import Loader from "./Helpers/Loader";
import VideoItemCard from "./VideoCard/VideoItemCard";

const HomePage = () => {
  const { data: videos, error, isLoading } = useFetchVideosQuery();

  console.log("Loading:", isLoading);
  console.log("Videos:", videos);
  console.log("Error:", error);

  if (isLoading) {
    return (
        <Loader />
    );
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading videos. Please try again later.</p>;
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 items-start">
      {videos?.map((video) => (
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
      ))}
    </div>
  );
};

export default HomePage;
