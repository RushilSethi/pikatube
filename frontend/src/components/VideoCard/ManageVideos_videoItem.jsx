const ManageVideos_videoItem = ({
  video,
  id,
  thumbnail,
  title,
  description,
  handleDelete,
  handleEditButton
}) => {
  function onEditClick(){
    handleEditButton(video);
  }
  return (
    <>
      <div
        key={id}
        className="flex items-center justify-between gap-4 text-textPrimary w-full bg-card p-4 rounded"
      >
        <img
          src={thumbnail}
          alt={title}
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-sm">{description}</p>
        </div>
        <div className="flex gap-2">
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

export default ManageVideos_videoItem;
