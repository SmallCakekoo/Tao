import { useState } from "react";
import "./AgendaForm.css";
import type {TaskInterface}  from "../../types/AgendaTypes";


export const AgendaForm = ({ setTasks }: { setTasks: React.Dispatch<React.SetStateAction<TaskInterface[]>> }) => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [priority, setPriority] = useState("");

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const newTask: TaskInterface = {
            name: taskName,
            description: taskDescription,
            priority: priority
        };

        setTasks((prev) => [...prev, newTask]);

        setTaskName("");
        setTaskDescription("");
        setPriority("");
    };

    return (
        <div className="form-container">
            <h5>Adding a new task</h5>

            <form>
                <input
                    type="text"
                    placeholder="Task name"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Task description"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                />

                <div className="priority-container">
                    <label>Priority level</label>

                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                    >
                        <option value="">Select priority</option>
                        <option value="low">When there’s time (Low)</option>
                        <option value="medium">Work calmly (Medium)</option>
                        <option value="high">Objective (High)</option>
                    </select>
                </div>

                <button onClick={handleSubmit}>
                    Add Task
                </button>
            </form>
        </div>
    );
};