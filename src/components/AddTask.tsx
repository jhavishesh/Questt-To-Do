// components/AddTask.tsx
"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Button } from "./ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/Dialog";
import { Label } from "./ui/Label";
import { Input } from "./ui/Input";
import { Textarea } from "./ui/Textarea";
import { useStore } from "@/stores/StoreProvider";

const AddTask = observer(() => {
  const { taskStore } = useStore();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [error, setError] = useState<string>();

  const handleNewTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (title.length < 3) {
      setError("Please enter a title with at least 3 characters");
    } else if (description.length < 3) {
      setError("Please enter a description with at least 3 characters");
    } else {
      const newTask = {
        id: Date.now().toString(),
        title,
        description,
        status: "pending", // Default status
      };

      taskStore.addTask(newTask);

      // Reset the input values
      setTitle("");
      setDescription("");
      setError("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add New Task</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Add Task</DialogTitle>
          <DialogDescription>
            Add a new Task to your Questt Study App. Click save when you are
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNewTask}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="name" className="text-left">
                Title
              </Label>
              <Input
                id="name"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-2">
              <Label htmlFor="description" className="text-left">
                Description
              </Label>
              <Textarea
                id="description"
                className="col-span-3"
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Description"
              />
            </div>
            {error && (
              <p className="text-center py-1 rounded bg-error-background text-error-foreground">
                {error}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Save Task</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

export default AddTask;
