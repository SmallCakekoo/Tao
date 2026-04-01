import { useState } from "react";
import "./AgendaContent.css";
import { AgendaForm } from "../AgendaForm/AgendaForm";
import { AgendaTasks } from "../AgendaTasks/AgendaTasks";
import agendaEmpty from "../../assets/tasks-empty.png";
import type {TaskInterface}  from "../../types/AgendaTypes";


export const AgendaContent = () => {

    const [tasks, setTasks] = useState<TaskInterface[]>([]);
    const [showForm, setShowForm] = useState(false);

    return(
        <div>

           
            {tasks.length === 0 && !showForm && (
                <div className="agenda-empty">
                    <div className="add-task-container">
                        <h5>You have no tasks yet!</h5>
                        <button className="add-button" onClick={() => setShowForm(true)}>
                            +
                        </button>
                    </div>

                    <img className='emptyImage' src={agendaEmpty} alt="Empty Agenda" />
                </div>
            )}

            
            {tasks.length === 0 && showForm && (
                <div className="form-wrapper">
                    <AgendaForm setTasks={setTasks} />
                </div>
            )}

            
            {tasks.length > 0 && (
                <div className="agenda-layout">

                    <div className="tasks-column">
                        <AgendaTasks tasks={tasks} />
                    </div>

                    <div className="form-column">
                        <AgendaForm setTasks={setTasks} />
                    </div>

                </div>
            )}

        </div>
    );
};