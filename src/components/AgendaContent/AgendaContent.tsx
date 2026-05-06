import { useEffect, useState } from 'react';
import './AgendaContent.css';
import { AgendaForm } from '../AgendaForm/AgendaForm';
import { AgendaTasks } from '../AgendaTasks/AgendaTasks';
import agendaEmpty from '../../assets/tasks-empty.png';
import { useTasks } from '../../contexts/TasksContext';

export const AgendaContent = () => {
  const { tasks, setTasks, toggleTask, removeTask } = useTasks();
  const [showForm, setShowForm] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  return (
    <div>
      {/* ── Empty state ── */}
      {tasks.length === 0 && !showForm && (
        <div className="agenda-empty">
          <div className="add-task-container">
            <h5>You have no tasks yet!</h5>
            {!isMobile && (
              <button className="add-button" onClick={() => setShowForm(true)}>
                +
              </button>
            )}
          </div>
          <img className="emptyImage" src={agendaEmpty} alt="Empty Agenda" />
        </div>
      )}

      {/* ── Form reemplaza empty state ── */}
      {tasks.length === 0 && showForm && (
        <div className="form-wrapper">
          <AgendaForm setTasks={setTasks} />
        </div>
      )}

      {/* ── Layout desktop con tasks ── */}
      {tasks.length > 0 && !isMobile && (
        <div className="agenda-layout">
          <div className="tasks-column">
            <AgendaTasks
              tasks={tasks}
              completeTask={toggleTask}
              removeTask={(task) => {
                removeTask(task);
                if (tasks.length === 1) setShowForm(false);
              }}
            />
          </div>
          <div className="form-column">
            <AgendaForm setTasks={setTasks} />
          </div>
        </div>
      )}

      {/* ── Tasks mobile ── */}
      {tasks.length > 0 && isMobile && (
        <div className="tasks-mobile">
          <AgendaTasks
            tasks={tasks}
            completeTask={toggleTask}
            removeTask={(task) => {
              removeTask(task);
              if (tasks.length === 1) setShowForm(false);
            }}
          />
        </div>
      )}

      {/* FAB — aparece siempre en mobile excepto cuando el form está abierto */}
      {isMobile && !showForm && (
        <button className="fab-button" onClick={() => setShowForm(true)}>
          +
        </button>
      )}
    </div>
  );
};
