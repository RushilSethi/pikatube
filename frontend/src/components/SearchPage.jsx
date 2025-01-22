import React from 'react'
import SearchItemCard from './VideoCard/SearchItemCard'
import SearchItemChannelCard from './VideoCard/SearchItemChannelCard'

// add tags to filter between vidoes and channels 
const SearchPage = () => {
  return (
    <div className='p-4'>
      <SearchItemCard />
      <SearchItemChannelCard />
    </div>
  )
}

export default SearchPage