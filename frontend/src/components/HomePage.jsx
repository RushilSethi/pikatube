import { useState } from "react";
import { useFetchVideosQuery } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import VideoItemCard from "./VideoCard/VideoItemCard";

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const { data: videos, error, isLoading } = useFetchVideosQuery();

  const tags = [
    "All", "Tech", "Lifestyle", "Entertainment", "Education", "Gaming",
    "Food", "Sports", "Art & Design", "Science", "News", "Business", "Health", "Coding"
  ];

  const filteredVideos = selectedTag === "All"
    ? videos
    : videos?.filter(video => video.tags.includes(selectedTag));

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <p className="text-center text-red-500">Error loading videos. Please try again later.</p>;
  }

  return (
    <div className="p-4">

      <div className="flex flex-wrap gap-2 mb-6">
        {tags.map(tag => (
          <button
            key={tag}
            className={`px-2 py-1 text-lg rounded-lg ${selectedTag === tag ? 'bg-textPrimary text-background' : 'bg-card text-textPrimary hover:bg-hover duration-200'}`}
            onClick={() => setSelectedTag(tag === selectedTag ? "All" : tag)}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-start">
        {filteredVideos?.map((video) => (
          <VideoItemCard
            key={video._id}
            id={video._id}
            title={video.title}
            thumbnail={video.thumbnailUrl}
            channelName={video.channelName}
            avatar={video.avatar}
            views={video.views}
            uploadTime={video.uploadDate}
            description={video.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
