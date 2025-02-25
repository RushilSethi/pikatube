import { useNavigate } from "react-router-dom";
import AvatarShow from "../Helpers/AvatarShow";
import PropTypes from "prop-types";
import TruncateText from "../Helpers/TruncateText";

const SearchItemChannelCard = ({ id, channelName, avatar, description }) => {
  const navigate = useNavigate();
  function handleClick() {
    navigate(`/channel/${id}`);
  }
  return (
    <div
      onClick={handleClick}
      className="flex max-w-[80vw] flex-row gap-4 p-4 hover:bg-hover rounded-lg transition duration-200 cursor-pointer"
    >
      <div className="w-20 h-20 flex items-center">
        <AvatarShow avatarUrl={avatar} />
      </div>

      <div className="flex flex-col flex-1">
        <h3 className="text-xl font-semibold text-textPrimary line-clamp-2">
          {channelName}
        </h3>

        <p className="text-sm text-textSecondary mt-2 line-clamp-3">
          <TruncateText text={description} length={75} showReadMore={true} />
        </p>
      </div>
    </div>
  );
};

SearchItemChannelCard.propTypes = {
  id: PropTypes.string.isRequired,
  channelName: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

export default SearchItemChannelCard;
