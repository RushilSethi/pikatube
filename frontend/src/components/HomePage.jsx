import React from 'react'
import VideoItemCard from './VideoCard/VideoItemCard'

const HomePage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 items-start">
      <VideoItemCard />
      <VideoItemCard />
      <VideoItemCard />
    </div>
  )
}

export default HomePage