"use client";
import Modal from "@/components/Modal";
import React from "react";
import ExperimentForm from "./ExperimentForm";
import ExperimentCard from "./ExperimentCard";

type Props = {};

const ExperimentSection = (props: Props) => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  return (
    <>
      <Modal
        description="Create a new experiment"
        open={isModalOpen}
        onOpenChange={() => {
          setIsModalOpen(!isModalOpen);
        }}
        title="New Experiment"
      >
        <ExperimentForm onSubmit={() => {}} initialValues={[]} />
      </Modal>
      <div className="bg-black rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Experiments</h2>
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
          <ExperimentCard
            id="234324234"
            onDelete={() => {}}
            systemPrompt="You are an engineer working on a new project. You have been asked to design a new product. Generate a kanban board for the project."
          />
        </div>
      </div>
    </>
  );
};

export default ExperimentSection;
