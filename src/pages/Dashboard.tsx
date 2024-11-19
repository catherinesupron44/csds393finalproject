import GetActiveMarkets from "../components/GetActiveMarkets.jsx";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Active Markets</h2>
          <button className="text-indigo-600 hover:text-indigo-700 font-medium">
            View All
          </button>
        </div>
        <div className="space-y-4">
          <GetActiveMarkets />
        </div>
      </div>
    </div>
  );
}