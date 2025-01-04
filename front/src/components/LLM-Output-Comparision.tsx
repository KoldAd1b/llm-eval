"use client";
import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import LLMOutput from "./LLM-Output";
import { models } from "@/lib/data";

export type OutputType = "streaming" | "static";

const LLMOutputSection: React.FC<{ side: "left" | "right" }> = ({ side }) => {
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [output, setOutput] = useState("");
  const [outputType, setOutputType] = useState<OutputType>("static");
  const [responseTime, setResponseTime] = useState(0);

  // Simulating LLM output generation
  const generateOutput = (modelId: string) => {
    setOutputType("streaming");
    const startTime = Date.now();
    setTimeout(() => {
      setOutput(
        `This is a sample output from ${modelId}.\n\nIt can contain multiple lines and demonstrate different formatting options.\n\nFor example:\n- Bullet points\n- Code blocks\n- And more...`
      );
      setResponseTime((Date.now() - startTime) / 1000); // Convert to seconds
    }, Math.random() * 2000 + 500); // Random delay between 0.5 and 2.5 seconds
  };

  useEffect(() => {
    generateOutput(selectedModel);
  }, [selectedModel]);

  return (
    <div className="flex flex-col h-full">
      <div className="mb-4">
        <Label
          htmlFor={`model-select-${side}`}
          className="text-gray-400 mb-2 block"
        >
          Select Model
        </Label>
        <Select
          onValueChange={(value) => {
            setSelectedModel(value);
            generateOutput(value);
          }}
        >
          <SelectTrigger
            id={`model-select-${side}`}
            className="w-full bg-gray-800 text-gray-300 border-gray-700"
          >
            <SelectValue placeholder="Select a model" />
          </SelectTrigger>
          <SelectContent className="bg-gray-800 text-gray-300 border-gray-700">
            {models.map((model) => (
              <SelectItem
                key={model.id}
                value={model.id}
                className="hover:bg-gray-700"
              >
                {model.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="mb-4">
        <Label className="text-gray-400">
          Response Time: {responseTime.toFixed(2)}s
        </Label>
      </div>
      <LLMOutput output={output} type={outputType} />
    </div>
  );
};

export default function LLMOutputComparison() {
  return (
    <div className="flex flex-col md:flex-row h-screen mt-[30%] md:mt-[10%] p-4 gap-4 ">
      <div className="w-full md:w-1/2 mb-4 md:mb-0">
        <LLMOutputSection side="left" />
      </div>
      <div className="w-full md:w-1/2">
        <LLMOutputSection side="right" />
      </div>
    </div>
  );
}
