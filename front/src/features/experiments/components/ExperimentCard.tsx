"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Edit, Trash2 } from "lucide-react";
import ExperimentForm from "./ExperimentForm";
import { DialogTitle } from "@radix-ui/react-dialog";

interface ExperimentCardProps {
  id: string;
  systemPrompt: string;
  onDelete: (id: string) => void;
}

export default function ExperimentCard({
  id,
  systemPrompt,
  onDelete,
}: ExperimentCardProps) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeletePopoverOpen, setIsDeletePopoverOpen] = useState(false);

  const truncatedPrompt =
    systemPrompt.length > 100
      ? systemPrompt.slice(0, 100) + "..."
      : systemPrompt;

  return (
    <Card className="w-full max-w-md">
      <CardContent className="pt-6">
        <p className="text-sm text-gray-600 mb-2">System Prompt:</p>
        <p className="text-base">{truncatedPrompt}</p>
      </CardContent>
      <CardFooter className="space-x-2">
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogTitle></DialogTitle>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <Edit className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <ExperimentForm
              initialValues={{ id, systemPrompt }}
              onSubmit={() => setIsEditDialogOpen(false)}
            />
          </DialogContent>
        </Dialog>
        <Popover
          open={isDeletePopoverOpen}
          onOpenChange={setIsDeletePopoverOpen}
        >
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="text-center">
              <h3 className="font-medium mb-2">Delete Experiment</h3>
              <p className="text-sm text-gray-500 mb-4">
                Are you sure you want to delete this experiment?
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDeletePopoverOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onDelete(id);
                    setIsDeletePopoverOpen(false);
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </CardFooter>
    </Card>
  );
}
