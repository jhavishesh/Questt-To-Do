"use client";

import { useState } from "react";
import { observer } from "mobx-react-lite";
import Task from "./Task";
import AddTask from "./AddTask";
import { useStore } from "@/stores/StoreProvider";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const TaskList = observer(() => {
  const { taskStore } = useStore();

  const onDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const movedTask = taskStore.tasks.find((task) => task.id === result.draggableId);

    if (movedTask) {
      taskStore.editTask(movedTask.id, { ...movedTask, status: destination.droppableId });
    }
  };

  const tasksByStatus = taskStore.tasks.reduce((acc: any, task: any) => {
    acc[task.status] = acc[task.status] || [];
    acc[task.status].push(task);
    return acc;
  }, { pending: [], in_progress: [], completed: [] });

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between mb-8 sm:mb-14">
        <h2 className="text-2xl font-semibold">All Tasks</h2>
        <AddTask />
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {["pending", "in_progress", "completed"].map((status) => (
            <Droppable key={status} droppableId={status}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="bg-gray-100 p-4 rounded-lg shadow-sm overflow-auto h-full"
                  style={{ maxHeight: "70vh" }} // Dynamic height handling
                >
                  <h3 className="text-lg font-medium capitalize mb-4">{status.replace('_', ' ')}</h3>
                  {tasksByStatus[status].map((task: any, index: number) => (
                    <Draggable key={task.id} draggableId={task.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="mb-2 last:mb-0"
                        >
                          <Task
                            id={task.id}
                            title={task.title}
                            description={task.description}
                            status={task.status}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
});

export default TaskList;
