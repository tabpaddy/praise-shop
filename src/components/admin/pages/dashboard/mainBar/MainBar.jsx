export default function MainBar() {
  return (
    <main className="flex-1 overflow-y-auto bg-slate-200 font-outfit p-4">
      {/* Welcome Section */}
      <div className="text-center my-6">
        <h1 className="text-2xl lg:text-4xl font-bold">Welcome to the Admin Dashboard</h1>
        <p className="text-lg text-gray-600">
          Manage your platform efficiently with real-time updates and insights.
        </p>
      </div>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow">
          <p className="text-xl font-bold">Users</p>
          <span className="text-lg font-medium text-gray-700">10</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow">
          <p className="text-xl font-bold">Products</p>
          <span className="text-lg font-medium text-gray-700">200</span>
        </div>
        <div className="flex flex-col items-center justify-center p-6 bg-white shadow-sm rounded-md hover:shadow-lg transition-shadow">
          <p className="text-xl font-bold">Orders</p>
          <span className="text-lg font-medium text-gray-700">10</span>
        </div>
      </div>

      {/* Suggestions Section */}
      <div className="my-10 p-6 bg-white shadow-sm rounded-md">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Suggestions</h2>
        <ul className="list-disc list-inside text-gray-700 space-y-2">
          <li>Check the latest orders to ensure timely processing.</li>
          <li>Review and approve new user registrations.</li>
          <li>Keep product inventory up to date to avoid stock issues.</li>
          <li>Monitor sales trends for insights into customer behavior.</li>
        </ul>
      </div>
    </main>
  );
}
