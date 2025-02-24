import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import AvatarShow from "./Helpers/AvatarShow";
import { useParams, Link } from "react-router-dom";
import {
  useFetchVideoByIdQuery,
  useManageVideoInteractionMutation,
} from "../store/apiSlice";
import Loader from "./Helpers/Loader";
import TruncateText from "./Helpers/TruncateText";
import useCustomToast from "./Helpers/useCustomToast";
import { formatDistanceToNow } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubscription } from "../store/subscriptionsSlice";

const VideoPage = () => {
  const dispatch = useDispatch();
  const subscriptions = useSelector((state) => state.subscriptions);
  const [manageVideoInteraction, { isLoading }] =
    useManageVideoInteractionMutation();
  const [comment, setComment] = useState("");
  const isSignedIn = useSelector((state) => state.auth.isSignedIn);
  const { id } = useParams();
  const { showToast } = useCustomToast();
  const [isSubscribed, setIsSubscribed] = useState(false);

  const {
    data: videoDetails,
    error: videoError,
    isLoading: isVideoLoading,
  } = useFetchVideoByIdQuery(id);

  useEffect(() => {
    if (videoDetails) {
      setIsSubscribed(subscriptions.includes(videoDetails.channelId));
    }
  }, [videoDetails, subscriptions]);

  if (isVideoLoading) return <Loader />;

  if (videoError) {
    return (
      <div>
        {videoError && <p>Error fetching video: {videoError.message}</p>}
      </div>
    );
  }

  // console.log(videoDetails);

  function handleSubscribe() {
    if (!videoDetails) return;
  
    dispatch(toggleSubscription(videoDetails.channelId));
    setIsSubscribed((prev) => !prev); // Toggle subscription state
  }

  function handleLike() {
    if (!isSignedIn) {
      return showToast("error", "Please sign in to like the video.");
    }
    manageVideoInteraction({ id, body: { like: true } });
  }

  function handleDislike() {
    if (!isSignedIn) {
      return showToast("error", "Please sign in to dislike the video.");
    }
    manageVideoInteraction({ id, body: { dislike: true } });
  }

  function postComment(e) {
    e.preventDefault();

    if (!isSignedIn) {
      return showToast("error", "Please sign in to post a comment.");
    }

    if (comment.trim() === "") return;

    // console.log("Posting comment:", comment);

    manageVideoInteraction({ id, body: { comment: { text: comment } } })
      .unwrap()
      .then((response) => {
        setComment("");
      })
      .catch((error) => {
        console.error("Error posting comment:", error);
        showToast("error", "Failed to post comment.");
      });
  }

  const timeAgo = formatDistanceToNow(new Date(videoDetails.uploadDate), {
    addSuffix: true,
  });

  return (
    <div className="flex flex-col items-center p-3 bg-background text-textPrimary min-h-screen w-full">
      <div className="w-full max-w-5xl aspect-video rounded-md overflow-hidden shadow-lg">
        <ReactPlayer
          url={videoDetails.videoUrl}
          controls
          playing={false}
          width="100%"
          height="100%"
        />
      </div>

      <div className="w-full max-w-5xl mt-6">
        <h1 className="text-2xl font-bold mb-2">{videoDetails.title}</h1>

        <div className="mb-2">
          <p className="text-sm text-textSecondary">
            <span>{videoDetails.views} views • </span>
            <span>{timeAgo}</span>
          </p>
        </div>

        <div className="w-full max-w-5xl mt-8 p-4 bg-card rounded-md shadow-md">
          <div className="flex items-center justify-between flex-col md:flex-row">
            <div className="flex flex-row items-center gap-3">
              <Link
                to={`/channel/${videoDetails.channelId}`}
                className="cursor-pointer"
              >
                <div className="h-12 w-12">
                  <AvatarShow avatarUrl={videoDetails.avatar} />
                </div>
              </Link>
              <Link
                to={`/channel/${videoDetails.channelId}`}
                className="cursor-pointer"
              >
                <div>
                  <h3 className="text-xl font-bold">
                    {videoDetails.channelName}
                  </h3>
                </div>
              </Link>
              <button
                onClick={handleSubscribe}
                className={`px-4 py-2 rounded-full ${
                  isSubscribed
                    ? "bg-textPrimary text-background"
                    : "bg-background text-textPrimary hover:bg-hover"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div className="flex items-center gap-4 mt-2 md:mt-0">
              <button
                onClick={handleLike}
                className="px-4 py-2 bg-accentBlue text-textPrimary rounded-full hover:bg-blue-600"
              >
                👍 Like ({videoDetails.likes})
              </button>
              <button
                onClick={handleDislike}
                className="px-4 py-2 bg-accentRed text-textPrimary rounded-full hover:bg-red-600"
              >
                👎 Dislike ({videoDetails.dislikes})
              </button>
            </div>
          </div>
        </div>

        <div className="bg-card p-4 rounded-md mt-2">
          <p className="text-lg text-textSecondary">
            <TruncateText
              text={videoDetails.description}
              length={75}
              showReadMore={true}
            />
          </p>

          {/* Tags Section */}
          <div className="mt-4 flex flex-wrap gap-2">
            {videoDetails.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-600 text-blue-200 rounded-full text-sm cursor-pointer hover:bg-blue-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full max-w-5xl mt-8">
        <h3 className="text-xl font-bold mb-4">Comments</h3>
        <form className="mb-4 flex flex-col space-y-2" onSubmit={postComment}>
          <textarea
            placeholder="Write a comment..."
            className="p-2 border bg-card outline-none text-textPrimary border-border rounded-md w-full"
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            className={`bg-card text-white py-2 px-4 rounded-md w-max self-start border-accentBlue border-2 duration-200 hover:bg-accentBlue ${
              isSignedIn ? "" : "grayscale"
            }`}
          >
            {isSignedIn ? "Post Comment" : "Sign in to Comment"}
          </button>
        </form>
        <div className="space-y-4">
          {videoDetails.comments && videoDetails.comments.length > 0 ? (
            videoDetails.comments.map((comment, index) => (
              <div key={index} className="p-4 bg-card rounded-md flex flex-row">
                <div className="h-12 w-12">
                  <AvatarShow avatarUrl={comment?.userId.avatar} />
                </div>
                <div className="ml-4">
                  <p className="font-bold">@{comment?.userId.username}</p>
                  <p>{comment?.text}</p>
                  <p className="text-sm text-textSecondary">
                    {new Date(comment?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-textSecondary">
              Be the first one to post a comment on this video
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoPage;
