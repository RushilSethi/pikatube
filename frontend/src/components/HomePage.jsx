import { useEffect, useState } from "react";
import { useFetchVideosQuery } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import VideoItemCard from "./VideoCard/VideoItemCard";

const HomePage = () => {
  const [selectedTag, setSelectedTag] = useState("All");
  const { data: videos, error, isLoading } = useFetchVideosQuery();
  const [orderedVideos, setOrderedVideos] = useState([]);

  const tags = [
    "All", "Tech", "Lifestyle", "Entertainment", "Music", "Education", "Gaming",
    "Food", "Art & Design", "News", "Business", "Health", "Coding"
  ];

  // done to give a more natural ordering to the videos
  useEffect(() => {
    if (videos) {
      const group1 = [];
      const group2 = [];
      const group3 = [];
      const group4 = [];

      videos.forEach((video, index) => {
        if (index % 4 === 0) {
          group1.push(video);
        } else if (index % 4 === 1) {
          group2.push(video);
        } else if (index % 4 === 2) {
          group3.push(video);
        } else {
          group4.push(video);
        }
      });

      setOrderedVideos([...group1, ...group2, ...group3, ...group4]);
    }
  }, [videos]);

  const filteredVideos = selectedTag === "All"
    ? orderedVideos
    : orderedVideos.filter(video => video.tags.includes(selectedTag));

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
