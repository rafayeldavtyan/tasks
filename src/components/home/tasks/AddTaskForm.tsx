import React from "react";
import SInput from "@ui/SInput";
import { IEditTask } from "@store/slices/taskSlice";
 
interface AddTaskFormProps {
    errors: Record<string, string>;
    task: { title: string; completed: boolean };
    onChange: (data: IEditTask) => void;
}

const AddTaskForm: React.FC<AddTaskFormProps> = ({ errors, task, onChange }) => {
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        onChange({ name: 'title', value });
    };

    const handleCompletedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange({ name: 'completed', value: e.target.checked });
    };

    return (
        <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-4"
        >
            <SInput
                id="task-title"
                label="Title"
                value={task.title}
                onChange={handleTitleChange}
                placeholder="Enter task title"
            />

            {errors.title && <p className="text-red-500 text-left text-sm">{errors.title}</p>}

            <div className="flex items-center gap-2">
                <input
                    type="checkbox"
                    id="completed"
                    checked={task.completed}
                    onChange={handleCompletedChange}
                    className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="completed" className="text-sm text-gray-700">
                    Mark as Completed
                </label>
            </div>
        </form>
    );
};

export default AddTaskForm;