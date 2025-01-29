import { useState, useEffect } from 'react';
import SearchItemCard from './VideoCard/SearchItemCard';
import SearchItemChannelCard from './VideoCard/SearchItemChannelCard';
import { useParams } from 'react-router-dom';
import { useSearchVideosAndChannelsQuery } from '../store/apiSlice';
import Loader from './Helpers/Loader';

const SearchPage = () => {
  const { "*": searchQuery } = useParams(); 
  const [filter, setFilter] = useState('all'); 

  const { data, error, isLoading } = useSearchVideosAndChannelsQuery(searchQuery, {
    skip: !searchQuery,
  });

  const [videos, setVideos] = useState([]);
  const [channels, setChannels] = useState([]);
  
  useEffect(() => {
    if (data) {
      setVideos(data.videos || []);
      setChannels(data.channels || []);
    }
  }, [data]);

  const filteredVideos = filter === 'all' || filter === 'videos' ? videos : [];
  const filteredChannels = filter === 'all' || filter === 'channels' ? channels : [];

  console.log(channels);

  return (
    <div className="p-4 w-screen">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-textPrimary">
          Search Results for: &quot;{searchQuery}&quot;
        </h2>
        {/* Filter Buttons */}
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded-md border-2 ${
              filter === 'all' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'
            }`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md border-2 ${
              filter === 'videos' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'
            }`}
            onClick={() => setFilter('videos')}
          >
            Videos
          </button>
          <button
            className={`px-4 py-2 rounded-md border-2 ${
              filter === 'channels' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'
            }`}
            onClick={() => setFilter('channels')}
          >
            Channels
          </button>
        </div>
      </div>

      {isLoading && <Loader />}
      {error && <p className="text-red-500">Error fetching search results.</p>}

      {!isLoading && !error && (
        <div>
          {filteredVideos.length > 0 && (
            <div className="mb-8">
              <h3 className="text-lg text-textPrimary font-semibold mb-4">Videos</h3>
              <div className="">
                {filteredVideos.map((video) => (
                  <SearchItemCard
                    key={video._id}
                    id={video._id}
                    title={video.title}
                    thumbnail={video.thumbnailUrl}
                    description={video.description}
                    channelName={video.channelId.channelName}
                    uploadTime={video.uploadDate}
                    avatar={video.channelId.userId.avatar}
                    views={video.views}
                  />
                ))}
              </div>
            </div>
          )}

          {filteredChannels.length > 0 && (
            <div>
              <h3 className="text-lg text-textPrimary font-semibold mb-4">Channels</h3>
              <div className="">
                {filteredChannels.map((channel) => (
                  <SearchItemChannelCard
                    key={channel._id}
                    id={channel._id}
                    channelName={channel.channelName}
                    avatar={channel.userId.avatar}
                    description={channel.description}
                  />
                ))}
              </div>
            </div>
          )}

          {/* No Results */}
          {filteredVideos.length === 0 && filteredChannels.length === 0 && (
            <p className="text-gray-500">No results found for &quot;{searchQuery}&quot;.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
