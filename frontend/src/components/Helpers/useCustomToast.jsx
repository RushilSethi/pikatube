import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const useCustomToast = () => {
  const showToast = (type, message, onConfirm) => {
    switch (type) {
      case 'success':
        toast.success(message);
        break;
      case 'error':
        toast.error(message);
        break;
      case 'info':
        toast.info(message);
        break;
      case 'confirm':
        toast(
          <div>
            <p>{message}</p>
            <button
              onClick={() => {
                onConfirm(true);
                toast.dismiss(); // Close the toast
              }}
              className="bg-card py-1 px-2 rounded-md mx-2 duration-200 hover:bg-textPrimary hover:text-background"
            >
              Yes
            </button>
            <button
              onClick={() => {
                onConfirm(false);
                toast.dismiss(); // Close the toast
              }}
              className="bg-purple-700 py-1 px-2 rounded-md mx-2 duration-200 hover:bg-textPrimary hover:text-background"
            >
              No
            </button>
          </div>
        );
        break;
      default:
        toast(message);
        break;
    }
  };

  return { showToast };
};

export default useCustomToast;
