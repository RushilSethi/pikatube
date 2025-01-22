import channelAvatar from "../../assets/test_object/channel_profile.jpg";

const SearchItemChannelCard = () => {
  const channelName = "My GameDev Pal";
  const subscribers = "2.5k";
  const description =
    "Welcome to my channel where I share tips and resources on game development. Subscribe to stay updated with tutorials, game design strategies, and more.";

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer">
      <img
        src={channelAvatar}
        alt={`${channelName} Avatar`}
        className="w-20 h-20 object-cover rounded-full"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
          {channelName}
        </h3>

        <p className="text-sm text-textSecondary">{subscribers} subscribers</p>

        <p className="text-sm text-textSecondary mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchItemChannelCard;
