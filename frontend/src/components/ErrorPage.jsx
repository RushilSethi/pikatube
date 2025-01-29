import { Link, useRouteError } from "react-router-dom";
import notFound from "../assets/404.png";

const ErrorPage = () => {
  const error = useRouteError();
  
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-background text-textPrimary text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-accentRed">Oops!</h1>
      <p className="text-lg text-textSecondary mb-2">
        {error?.status === 404
          ? "The page you’re looking for doesn’t exist."
          : "Something went wrong."}
      </p>
      <img src={notFound} alt="Not Found" className="h-40 w-40 mb-4" />
      
      {error?.statusText && (
        <p className="text-md text-border italic mb-2">{error.statusText}</p>
      )}
      
      <Link
        to="/"
        className="mt-4 bg-accentBlue text-white px-5 py-2 rounded-md hover:bg-opacity-80 transition"
      >
        Go Back
      </Link>

      <a
        href="https://www.freepik.com/free-vector/hand-drawn-404-error_1587367.htm"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 text-textSecondary text-sm hover:text-accentBlue transition"
      >
        Image by Freepik
      </a>
    </div>
  );
};

export default ErrorPage;
