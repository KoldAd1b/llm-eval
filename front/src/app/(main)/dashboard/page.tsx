import React from "react";

type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="container mx-auto p-8">
      <div className="flex flex-col gap-8">
        {/* Experiments Section */}
        <div className="bg-black rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Experiments</h2>
            <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md flex items-center w-[200px] justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
              New Experiment
            </button>
          </div>
          <div className="space-y-4">
            {/* Placeholder for experiment list */}
            <div className=" p-4 rounded-md">
              <p className="text-gray-300">No experiments yet</p>
            </div>
          </div>
        </div>

        {/* Runs Section */}
        <div className="bg-black rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-white">Recent Runs</h2>
            <button className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md flex items-center w-[200px] justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              View All Runs
            </button>
          </div>
          <div className="space-y-4">
            <div className=" p-4 rounded-md">
              <p className="text-gray-300">No recent runs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
