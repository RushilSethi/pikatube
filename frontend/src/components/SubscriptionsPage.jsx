import { useSelector, useDispatch } from "react-redux";
import { toggleSubscription } from "../store/subscriptionsSlice";
import { useGetChannelsByIdsMutation } from "../store/apiSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Helpers/Loader";

const SubscriptionsPage = () => {
  const subscriptions = useSelector((state) => state.subscriptions);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [getChannelsByIds, { isLoading, error }] =
    useGetChannelsByIdsMutation();
  const [channelData, setChannelData] = useState([]);

  useEffect(() => {
    if (subscriptions.length > 0) {
      getChannelsByIds({ ids: subscriptions }).then((response) => {
        if (response.data) {
          setChannelData(response.data);
        }
      });
    } else {
      setChannelData([]);
    }
  }, [subscriptions, getChannelsByIds]);

  if (isLoading) return <Loader />;
  if (error)
    return (
      <p className="text-center text-red-500">Error loading subscriptions.</p>
    );

  return (
    <div className="min-h-screen w-screen bg-background text-textPrimary p-6">
      <p className="text-md text-textSecondary bg-hover p-3 rounded-md mb-4">
        ⚡ <b>Your subscriptions are saved only on this device.</b>
        They won’t carry over if you switch devices or clear your data. ✅{" "}
        <b>No sign-in needed</b>—just pick your favorites and enjoy!
      </p>

      <h1 className="text-3xl font-semibold mb-4">Your Subscriptions</h1>

      {channelData.length === 0 ? (
        <p className="text-center text-lg text-textSecondary">
          No subscriptions yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {channelData.map((channel) => (
            <div
              key={channel._id}
              className="bg-card p-4 rounded-lg flex cursor-pointer items-center gap-4 border border-border hover:bg-hover transition"
              onClick={() => navigate(`/channel/${channel._id}`)}
            >
              <img
                src={channel.userId?.avatar || "/default-avatar.png"}
                alt={channel.channelName}
                className="w-12 h-12 rounded-full border border-border"
              />
              <p className="text-lg">{channel.channelName}</p>
              <button
                className="ml-auto text-red-500 hover:text-red-700"
                onClick={(e) => {
                  e.stopPropagation();
                  dispatch(toggleSubscription(channel._id));
                }}
              >
                Unsubscribe
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubscriptionsPage;
