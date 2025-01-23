import { useParams } from "react-router-dom";
import AvatarShow from "./Helpers/AvatarShow";
import VideoItemCard from "./VideoCard/VideoItemCard";
import { useFetchChannelByIdQuery } from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import ChannelPage_videos from "./ChannelPage_videos";
import TruncateText from "./Helpers/TruncateText";

const ChannelPage = () => {
  const { id } = useParams();

  const {
    data: channelDetails,
    error,
    isLoading,
  } = useFetchChannelByIdQuery(id);

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <p className="text-center text-red-500">
        Error loading channel. Please try again later.
      </p>
    );
  }

  const handleSubscribe = () => {
    console.log("Toggled subscription!");
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row px-32 items-start">
        <div className="text-textPrimary flex items-center">
          <div className="w-48 h-48">
            <AvatarShow avatarUrl={2} />
          </div>
          <div>
            <div className="text-3xl font-bold">
              {channelDetails.channelName}
            </div>
            <div className="text-textSecondary">{}</div>
            <div className="text-textSecondary">
              {channelDetails.videos.length}
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
        <ChannelPage_videos videos={channelDetails.videos} />
      </div>
    </div>
  );
};

export default ChannelPage;
