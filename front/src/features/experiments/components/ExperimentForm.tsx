"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import TestCaseSelector from "@/features/test-cases/components/TestCaseSelector";
import TestCaseForm from "@/features/test-cases/components/TestForm";

const models = ["GPT-3.5", "GPT-4", "Claude", "PALM"];

type ExperimentFormProps = {
  onSubmit: () => void;
  initialValues?: {};
};

export default function ExperimentForm({
  onSubmit,
  initialValues,
}: ExperimentFormProps) {
  const [isTestCaseFormOpen, setIsTestCaseFormOpen] = useState(false);

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          Create New Experiment
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">System Prompt</Label>
            <Input id="systemPrompt" placeholder="Enter system prompt" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model</Label>
            <Select>
              <SelectTrigger id="model">
                <SelectValue placeholder="Select a model" />
              </SelectTrigger>
              <SelectContent>
                {models.map((model) => (
                  <SelectItem key={model} value={model}>
                    {model}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 mb-4">
            <Label>Test Cases</Label>
            <TestCaseSelector
              onAddTestCase={() => setIsTestCaseFormOpen(true)}
            />
          </div>

          <Button type="submit" className="w-full ">
            Create Experiment
          </Button>
        </form>
      </CardContent>

      <TestCaseForm
        initialValues={{}}
        isOpen={isTestCaseFormOpen}
        onClose={() => setIsTestCaseFormOpen(false)}
      />
    </Card>
  );
}
