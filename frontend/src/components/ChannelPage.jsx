import AvatarShow from "./Helpers/AvatarShow";
import VideoItemCard from "./VideoCard/VideoItemCard";

const ChannelPage = () => {
  const videoDetails = {
    videoUrl: "https://www.youtube.com/embed/zeMPry3ak6Y",
    title: "Amazing Video",
    description: "This is an amazing video about coding.",
    views: 1500,
    postedAt: "2 days ago",
    likes: 120,
    dislikes: 3,
  };
  const comments = [
    {
      user: "John Doe",
      text: "Great video!",
      avatarUrl: 0,
      timestamp: "2025-01-20T12:34:56Z",
    },
    {
      user: "Jane Smith",
      text: "I learned a lot, thanks!",
      avatarUrl: 5,
      timestamp: "2025-01-21T14:45:10Z",
    },
  ];

  const channelDetails = {
    name: "CodeMaster",
    subscriberCount: 2500,
    isSubscribed: true,
    avatarUrl: 1,
  };

  const handleLike = () => {
    console.log("Liked the video!");
  };

  const handleDislike = () => {
    console.log("Disliked the video!");
  };

  const handleSubscribe = () => {
    console.log("Toggled subscription!");
  };

  const videos = [
    { title: "How to Learn React", description: "A tutorial on React basics." },
    {
      title: "JavaScript Tips",
      description: "Helpful JS tricks for developers.",
    },
    {
      title: "CSS Grid vs Flexbox",
      description: "Comparison of layout methods.",
    },
    {
      title: "Node.js for Beginners",
      description: "Understanding Node.js fundamentals.",
    },
    {
      title: "Introduction to Web Accessibility",
      description: "Making websites more accessible.",
    },
    { title: "GraphQL Tutorial", description: "Learn the basics of GraphQL." },
  ];

  return (
    <div className="flex flex-col">
      <div className="w-full flex flex-row px-32 items-start">
        <div className="text-textPrimary flex items-center">
          <div className="w-48 h-48">
            <AvatarShow avatarUrl={2} />
          </div>
          <div>
            <div className="text-3xl font-bold">Rushil Sethi</div>
            <div className="text-textSecondary">5 vidoes</div>
            <div className="text-textSecondary">Description</div>
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
        <h3 className="text-2xl font-bold mb-4 text-textPrimary">Videos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {videos.map((video, index) => (
            <VideoItemCard key={index} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelPage;
