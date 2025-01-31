import PropTypes from "prop-types";

const ManageVideos_videoItem = ({
  video,
  id,
  thumbnail,
  title,
  description,
  handleDelete,
  handleEditButton,
}) => {
  function onEditClick() {
    handleEditButton(video);
  }
  return (
    <>
      <div
        key={id}
        className="flex flex-col md:flex-row items-center justify-center md:justify-between gap-4 text-textPrimary w-full bg-card p-4 rounded"
      >
        <img
          src={thumbnail}
          alt={title}
          loading="lazy"
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1 w-[50vw] text-center md:text-left">
          <h3 className="text-lg font-bold break-words overflow-hidden text-ellipsis whitespace-nowrap">{title}</h3>
          <p className="text-sm break-words overflow-hidden max-h-24 overflow-y-auto line-clamp-3">
            {description}
          </p>
        </div> 
        <div className="flex gap-2 min-w-0">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={onEditClick}
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleDelete(id)}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

ManageVideos_videoItem.propTypes = {
  video: PropTypes.shape({
    id: PropTypes.string,
    videoUrl: PropTypes.string,
    title: PropTypes.string,
    thumbnailUrl: PropTypes.string,
    description: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  id: PropTypes.string,
  thumbnail: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleEditButton: PropTypes.func.isRequired,
};


export default ManageVideos_videoItem;
