import { useNavigate } from "react-router-dom";
import AvatarShow from "../Helpers/AvatarShow";

const SearchItemCard = ({id, title, channelName, views, uploadTime, description, avatar, thumbnail}) => {
  const navigate = useNavigate();
  function handleClick(){
    navigate(`/video/${id}`);
  }
  return (
    <div onClick={handleClick} className="flex flex-col felx-shrink max-w-[80vw] md:flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer">
      <img
        src={thumbnail}
        alt="Video Thumbnail"
        className="w-full md:w-60 h-36 object-cover rounded-lg"
      />

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
            {title}
        </h3>

        <div className="flex items-center gap-2 my-1">
          <div className="h-8 w-8">
            <AvatarShow avatarUrl={avatar}/>
          </div>
          <p className="text-sm text-textSecondary">{channelName}</p>
        </div>

        <p className="text-sm text-textSecondary">
          {views} views • {uploadTime}
        </p>

        <p className="text-sm text-textSecondary mt-2 line-clamp-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SearchItemCard;
