import { ToastContainer } from 'react-toastify';

const CustomToastContainer = () => {
  return (
    <ToastContainer
      position="bottom-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      pauseOnHover
      theme='dark'
    />
  );
};

export default CustomToastContainer;
