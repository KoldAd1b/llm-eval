"use client";
import React from "react";
import TestCaseForm from "./TestForm";
import TestCaseCard from "./TestCard";

type Props = {};

const TestCaseSection = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <TestCaseForm
        initialValues={{}}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen((prev) => !prev)}
      />
      <div className="bg-black rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Test Cases</h2>
          <button
            className="bg-white hover:bg-gray-200 text-black px-4 py-2 rounded-md flex items-center w-[200px] justify-center gap-2"
            onClick={() => setIsModalOpen(true)}
          >
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
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            Add Test Case
          </button>
        </div>
        <div className="space-y-4">
          <div className="p-4 rounded-md">
            <p className="text-gray-300">No test cases available</p>
          </div>
        </div>
        <div className="flex gap-4">
          <TestCaseCard id="3423432423" name="Accuracy" onDelete={() => {}} />
          <TestCaseCard id="3423432423" name="Relevance" onDelete={() => {}} />
          <TestCaseCard
            id="3423432423"
            name="Custom Counter"
            onDelete={() => {}}
          />
        </div>
      </div>
    </>
  );
};

export default TestCaseSection;
