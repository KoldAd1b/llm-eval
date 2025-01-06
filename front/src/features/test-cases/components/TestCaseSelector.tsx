"use client";

import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { DialogTitle } from "@radix-ui/react-dialog";

interface TestCase {
  id: string;
  name: string;
}

interface TestCaseSelectorProps {
  onAddTestCase: () => void;
}

const testCases: TestCase[] = [
  { id: "1", name: "Basic functionality" },
  { id: "2", name: "Edge cases" },
  { id: "3", name: "Performance test" },
  { id: "4", name: "Security test" },
];

export default function TestCaseSelector({
  onAddTestCase,
}: TestCaseSelectorProps) {
  const [open, setOpen] = useState(false);
  const [selectedTestCases, setSelectedTestCases] = useState<TestCase[]>([]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedTestCases.length > 0
            ? `${selectedTestCases.length} test case${
                selectedTestCases.length > 1 ? "s" : ""
              } selected`
            : "Select test cases"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </DialogTrigger>
      <DialogContent className="p-2">
        <DialogTitle className="hidden"></DialogTitle>
        <Command>
          <CommandInput placeholder="Search test cases..." />
          <CommandEmpty>No test case found.</CommandEmpty>
          <CommandList>
            <CommandGroup>
              {testCases.map((testCase) => (
                <CommandItem
                  key={testCase.id}
                  onSelect={() => {
                    setSelectedTestCases((prev) =>
                      prev.some((item) => item.id === testCase.id)
                        ? prev.filter((item) => item.id !== testCase.id)
                        : [...prev, testCase]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedTestCases.some((item) => item.id === testCase.id)
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {testCase.name}
                </CommandItem>
              ))}
            </CommandGroup>
            <CommandGroup>
              <CommandItem onSelect={onAddTestCase}>
                <Plus className="mr-2 h-4 w-4" />
                Add new test case
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </DialogContent>
    </Dialog>
  );
}
