import { useParams } from "react-router-dom";
import AvatarShow from "./Helpers/AvatarShow";
import {
  useFetchChannelByIdQuery,
  useFetchUserDetailsByIdQuery,
} from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import ChannelPage_videos from "./ChannelPage_videos";
import TruncateText from "./Helpers/TruncateText";
import { useState, useEffect } from "react";

const ChannelPage = () => {
  const { id } = useParams();

  const {
    data: channelDetails,
    error: channelError,
    isLoading: channelLoading,
  } = useFetchChannelByIdQuery(id);

  const [userId, setUserId] = useState(null);
  const [shouldFetchUser, setShouldFetchUser] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

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
    return (
      <p className="text-center text-red-500">
        Error loading channel details. Please try again later.
      </p>
    );
  }
  if (userError) {
    return (
      <p className="text-center text-red-500">
        Error loading user details. Please try again later.
      </p>
    );
  }

  const handleSubscribe = () => {
    setIsSubscribed(!isSubscribed);
  };

  return (
    <div className="flex flex-col  w-full min-w-0 overflow-hidden">
      <div className="flex flex-col w-full px-4 sm:px-8 md:px-16 lg:px-32">
        <div className="text-textPrimary flex items-center">
          <div className="w-36 md:w-48 md:h-48 flex items-center">
            <AvatarShow avatarUrl={userDetails?.avatar} />
          </div>
          <div>
            <div className="text-lg md:text-lg lg:text-3xl font-bold">
              {channelDetails.channelName}
            </div>
            <div className="text-textSecondary">
              @{userDetails?.username || ""}
            </div>
            <div className="text-textSecondary text-sm md:text-md">
              {channelDetails.videos.length} video(s)
            </div>
            <div className="text-textSecondary hidden md:flex">
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
              className={`px-4 py-2 rounded-full ${
                isSubscribed
                  ? "bg-textPrimary text-background"
                  : "bg-card text-textPrimary hover:bg-hover"
              }`}
            >
              {isSubscribed ? "Subscribed" : "Subscribe"}
            </button>
          </div>
        </div>
      </div>
      <div className="text-textSecondary md:hidden flex mx-2 ">
        <TruncateText
          text={channelDetails.description}
          length={50}
          showReadMore={true}
        />
      </div>
      <hr className="border-t-2 border-border my-4" />

      <div className="p-8">
        <ChannelPage_videos
          videos={channelDetails.videos}
          avatar={userDetails?.avatar}
        />
      </div>
    </div>
  );
};

export default ChannelPage;
