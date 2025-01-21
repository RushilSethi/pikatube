const CreateChannelModal = ({ isOpen, onClose }) => {

    isOpen = true;
    return (
      isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 text-textPrimary">
          <div className="bg-card p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Create Channel</h2>
            <form>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="channelName">
                  Channel Name
                </label>
                <input
                  type="text"
                  id="channelName"
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  rows="4"
                  className="w-full p-2 bg-hover border-2 border-border rounded outline-none"
                ></textarea>
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded border-2 border-hover hover:bg-hover duration-200"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 duration-200 border-accentBlue border-2 hover:bg-accentBlue text-textPrimary rounded">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )
    );
  };
  
  export default CreateChannelModal;
  