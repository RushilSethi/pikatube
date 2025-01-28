import { useState, useEffect } from 'react'
import SearchItemCard from './VideoCard/SearchItemCard'
import SearchItemChannelCard from './VideoCard/SearchItemChannelCard'
import { useParams } from "react-router-dom"
import { useSearchVideosAndChannelsQuery } from '../store/apiSlice'

// add tags to filter between vidoes and channels 
const SearchPage = () => {
  const { "*": searchQuery } = useParams(); 
  const [videos, setVideos] = useState([]); // State for videos
  const [channels, setChannels] = useState([]); // State for channels
  const [filter, setFilter] = useState('all');

  return (
    <div className='p-4'>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-textPrimary">Search Results for: &quot;{searchQuery}&quot;</h2>
        {/* Filter Buttons */}
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded-md border-2 ${filter === 'all' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`px-4 py-2 rounded-md border-2 ${filter === 'videos' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'}`}
            onClick={() => setFilter('videos')}
          >
            Videos
          </button>
          <button
            className={`px-4 py-2 rounded-md border-2 ${filter === 'channels' ? 'bg-textPrimary text-background' : 'bg-card border-textPrimary text-textPrimary'}`}
            onClick={() => setFilter('channels')}
          >
            Channels
          </button>
        </div>
      </div>

      <SearchItemCard />
      <SearchItemChannelCard />
    </div>
  )
}

export default SearchPage