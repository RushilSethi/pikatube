import { useParams } from "react-router-dom";
import AvatarShow from "./Helpers/AvatarShow";
import VideoItemCard from "./VideoCard/VideoItemCard";
import { useFetchChannelByIdQuery, useFetchUserDetailsByIdQuery } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import ChannelPage_videos from "./ChannelPage_videos";
import TruncateText from "./Helpers/TruncateText";
import {useState, useEffect} from 'react';

const ChannelPage = () => {
  const { id } = useParams();

  const {
    data: channelDetails,
    error: channelError,
    isLoading: channelLoading,
  } = useFetchChannelByIdQuery(id);

  const [userId, setUserId] = useState(null);
  const [shouldFetchUser, setShouldFetchUser] = useState(false);

  const {
    data: userDetails,
    error: userError,
    isLoading: userLoading,
  } = useFetchUserDetailsByIdQuery(userId, {
    skip: !shouldFetchUser || !userId,
  });

  useEffect(() => {
    if (!channelLoading && channelDetails?.userId) {
      setUserId(channelDetails.userId);
      setShouldFetchUser(true);
    }
  }, [channelLoading, channelDetails]);

  if (channelLoading || userLoading) return <Loader />;

  if (channelError) {
    return <p className="text-center text-red-500">Error loading channel details. Please try again later.</p>;
  }
  if (userError) {
    return <p className="text-center text-red-500">Error loading user details. Please try again later.</p>;
  }

  const handleSubscribe = () => {
    console.log("Subscription toggled!");
  };

  return (
    <div className="flex flex-col w-screen">
      <div className="w-full flex flex-row px-32 items-start">
        <div className="text-textPrimary flex items-center">
          <div className="w-48 h-48">
            <AvatarShow avatarUrl={userDetails?.avatar} />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {channelDetails.channelName}
            </div>
            <div className="text-textSecondary">@{userDetails?.username || ""}</div>
            <div className="text-textSecondary">
              {channelDetails.videos.length} video(s)
            </div>
            <div className="text-textSecondary">
              <TruncateText
                text={channelDetails.description}
                length={50}
                showReadMore={true}
              />
            </div>
          </div>
          <div className="ml-16">
            <button
              onClick={handleSubscribe}
              className={`px-4 py-2 rounded-md ${
                channelDetails.isSubscribed
                  ? "bg-textPrimary text-background"
                  : "bg-background text-textPrimary hover:bg-hover"
              }`}
            >
              {channelDetails.isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
      <hr className="border-t-2 border-border my-4" />

      <div className="p-8">
        <ChannelPage_videos videos={channelDetails.videos} avatar={userDetails?.avatar}/>
      </div>
    </div>
  );
};

export default ChannelPage;
