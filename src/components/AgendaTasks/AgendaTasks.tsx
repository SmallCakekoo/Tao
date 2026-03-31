import "./AgendaTasks.css";
import type { TaskInterface } from '../../types/AgendaTypes';

export const AgendaTasks = ({ tasks }: { tasks: TaskInterface[] }) => {
    return (
        <div className="tasks-container">
            {tasks.map((task, index) => (
                <div key={index} className="task-card">
                    

                    <div className="task-content">
                        <div className="task-header">
                            <h5>{task.name}</h5>
                            <p className={`task-priority ${task.priority}`}>
                                {task.priority}
                            </p>
                        </div>
                        <p className="task-description">{task.description}</p>
                    </div>

                    <div className="task-check">
                        <input type="checkbox" />
                    </div>
                </div>
            ))}
        </div>
    );
};