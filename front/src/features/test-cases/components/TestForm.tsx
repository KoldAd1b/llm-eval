"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface TestCaseFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: {};
}

export default function TestCaseForm({ isOpen, onClose }: TestCaseFormProps) {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [expectedOutput, setExpectedOutput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Test Case</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="systemPrompt">Name</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="Name"
              placeholder="Enter a name for the test"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="input">Input</Label>
            <Textarea
              id="input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter test case input"
              className="h-40 min-h-[160px] max-h-[400px] resize-y overflow-y-scroll"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="expectedOutput">Expected Output</Label>
            <Textarea
              id="expectedOutput"
              value={expectedOutput}
              onChange={(e) => setExpectedOutput(e.target.value)}
              placeholder="Enter expected output"
              className="h-40 min-h-[160px] max-h-[400px] resize-y overflow-y-scroll"
            />
          </div>
          <DialogFooter>
            <Button type="submit">Add Test Case</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
