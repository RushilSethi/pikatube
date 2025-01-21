import React from 'react'
import VideoItemCard from './VideoCard/VideoItemCard'
import LoginModal from './Forms/LoginModal';
import RegisterModal from './Forms/RegisterModal';
import CreateChannelModal from './Forms/CreateChannelModal';
import AddVideoModal from './Forms/AddVideoModal';

// add the filter tags here
const HomePage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4 items-start">
      {/* <LoginModal /> */}
      {/* <RegisterModal /> */}
      {/* <CreateChannelModal /> */}
      {/* <AddVideoModal /> */}
      <VideoItemCard />
      <VideoItemCard />
      <VideoItemCard />
    </div>
  )
}

export default HomePage