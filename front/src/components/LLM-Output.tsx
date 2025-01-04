import { ScrollArea } from "@/components/ui/scroll-area";
import React from "react";
import { OutputType } from "./LLM-Output-Comparision";

interface LLMOutputProps {
  output: string;
  type: OutputType;
}

const LLMOutput: React.FC<LLMOutputProps> = ({ output, type }) => {
  return (
    <ScrollArea>
      {type === "streaming" ? (
        <div className="font-mono whitespace-pre-wrap text-gray-300">
          {output.split("").map((char, index) => (
            <span
              key={index}
              className="animate-typing"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {char}
            </span>
          ))}
        </div>
      ) : (
        <div className="font-mono whitespace-pre-wrap text-gray-300">
          {output}
        </div>
      )}
    </ScrollArea>
  );
};

export default LLMOutput;
