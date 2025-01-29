const SubscriptionsPage = () => {
    const dummySubscriptions = [
      { id: 1, name: "Tech", avatar: " https://placehold.co/600x400?text=No+Subscriptions+Yet" },
      { id: 2, name: "Gaming", avatar: " https://placehold.co/600x400?text=No+Subscriptions+Yet" },
      { id: 3, name: "Vlogs", avatar: " https://placehold.co/600x400?text=No+Subscriptions+Yet" },
      { id: 4, name: "Music", avatar: " https://placehold.co/600x400?text=No+Subscriptions+Yet" },
    ];
  
    return (
      <div className="min-h-screen w-screen bg-background text-textPrimary p-6">
        <p className="text-md text-textSecondary bg-hover p-3 rounded-md mb-4">
          🚧 This is a dummy page and is currently under development.
        </p>
  
        <h1 className="text-3xl font-semibold mb-4">Your Subscriptions</h1>
  
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {dummySubscriptions.map((channel) => (
            <div
              key={channel.id}
              className="bg-card p-4 rounded-lg flex cursor-pointer items-center gap-4 border border-border hover:bg-hover transition"
            >
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-12 h-12 rounded-full border border-border"
              />
              <p className="text-lg">{channel.name}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default SubscriptionsPage;
  