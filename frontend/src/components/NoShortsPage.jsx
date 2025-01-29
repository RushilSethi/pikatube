import { Link } from "react-router-dom";

const NoShortsPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-background text-textPrimary text-center p-6">
      <h1 className="text-4xl font-bold mb-4 text-accentRed">No Doomscrolling Here</h1>
      <p className="text-lg text-textSecondary max-w-md">
        Save your attention span. We don’t do infinite scrolling here. Watch content that matters. 🚀
      </p>
      <Link
        to="/"
        className="mt-4 bg-accentBlue text-white px-5 py-2 rounded-md hover:bg-opacity-80 transition"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NoShortsPage;
