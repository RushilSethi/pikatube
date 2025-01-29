import { useNavigate } from "react-router-dom";
import AvatarShow from "../Helpers/AvatarShow";

const SearchItemChannelCard = ({id, channelName, avatar, description}) => {
  const navigate = useNavigate();
  function handleClick(){
    navigate(`/channel/${id}`)
  }
  return (
    <div onClick={handleClick} className="flex flex-col max-w-[80vw] md:flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer">
      <div className="w-20 h-20">
      <AvatarShow avatarUrl={avatar}/>
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
          {channelName}
        </h3>

        <p className="text-sm text-textSecondary mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchItemChannelCard;
