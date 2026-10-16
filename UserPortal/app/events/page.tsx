export default function EventsPage() {
  const events = [
    {
      id: 1,
      name: "Basketball Regional Championship",
      date: "2024-03-15",
      location: "Main Arena",
      status: "Upcoming",
    },
    {
      id: 2,
      name: "Swimming State Finals",
      date: "2024-03-20",
      location: "Indoor Pool",
      status: "Upcoming",
    },
    {
      id: 3,
      name: "Football Friendly Match",
      date: "2024-03-10",
      location: "Football Field",
      status: "Completed",
    },
    {
      id: 4,
      name: "Volleyball Tournament",
      date: "2024-03-25",
      location: "Gymnasium",
      status: "Upcoming",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Events</h1>
        <p className="text-gray-600">Schedule and manage sports events</p>
      </div>

      <div className="flex justify-end mb-6">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          + Schedule Event
        </button>
      </div>

      <div className="space-y-4">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.name}
                </h3>
                <div className="mt-3 space-y-2">
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-3">📅</span>
                    {new Date(event.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-3">📍</span>
                    {event.location}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${
                    event.status === "Upcoming"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {event.status}
                </span>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 text-sm bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition">
                View Details
              </button>
              <button className="px-4 py-2 text-sm bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
