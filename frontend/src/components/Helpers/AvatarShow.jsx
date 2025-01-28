import PropTypes from "prop-types";
import icon1 from "../../assets/avatars/1.svg";
import icon2 from "../../assets/avatars/2.svg";
import icon3 from "../../assets/avatars/3.svg";
import icon4 from "../../assets/avatars/4.svg";
import icon5 from "../../assets/avatars/5.svg";
import icon6 from "../../assets/avatars/6.svg";

const AvatarShow = ({ avatarUrl }) => {
  const avatars = [icon1, icon2, icon3, icon4, icon5, icon6];

  const avatarSrc =
    typeof avatarUrl === "number" &&
    avatarUrl >= 0 &&
    avatarUrl < avatars.length
      ? avatars[avatarUrl]
      : avatarUrl;

  return (
    <>
      <img src={avatarSrc || 1} alt="User Avatar" className="rounded-full"/>
    </>
  );
};

AvatarShow.propTypes = {
  avatarUrl: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
};

export default AvatarShow;






