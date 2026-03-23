import React, { useState, useEffect } from 'react';
import { Layout, Plus, Trash2, ArrowLeft, ArrowRight, GripVertical, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_TASKS = [
  { id: '1', title: 'Refinar UX do Portfolio', status: 'todo', priority: 'high' },
  { id: '2', title: 'Implementar animações Framer', status: 'progres', priority: 'medium' },
  { id: '3', title: 'Ajustar API do Reddit', status: 'done', priority: 'low' },
];

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    return saved ? JSON.parse(saved) : INITIAL_TASKS;
  });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (status) => {
    const title = prompt('Título da tarefa:');
    if (!title) return;
    const newTask = {
      id: Date.now().toString(),
      title,
      status,
      priority: 'medium'
    };
    setTasks([...tasks, newTask]);
  };

  const moveTask = (id, newStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const Column = ({ title, status, icon: Icon }) => {
    const columnTasks = tasks.filter(t => t.status === status);
    
    return (
      <div className="column">
        <div className="column-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Icon size={20} color="var(--accent)" />
            <h2>{title}</h2>
          </div>
          <span className="badge">{columnTasks.length}</span>
        </div>

        <div className="task-list">
          <AnimatePresence mode="popLayout">
            {columnTasks.map(task => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="task-card"
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="task-title">{task.title}</div>
                  <button 
                    onClick={() => deleteTask(task.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  
                  <div style={{ display: 'flex', gap: '0.4rem' }}>
                    {status !== 'todo' && (
                      <button 
                        className="move-btn"
                        onClick={() => moveTask(task.id, status === 'done' ? 'progres' : 'todo')}
                        title="Mover para esquerda"
                      >
                        <ArrowLeft size={14} />
                      </button>
                    )}
                    {status !== 'done' && (
                      <button 
                        className="move-btn"
                        onClick={() => moveTask(task.id, status === 'todo' ? 'progres' : 'done')}
                        title="Mover para direita"
                      >
                        <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <button className="btn-add" onClick={() => addTask(status)}>
          <Plus size={18} />
        </button>
      </div>
    );
  };

  return (
    <div className="kanban-container">
      <header>
        <div className="logo-group">
          <Layout color="var(--accent)" size={32} />
          <h1>Kanban<span>Pro</span></h1>
        </div>
        <a href="../../projeto1-portfolio-react/index.html" className="back-link">
          <ArrowLeft size={16} /> Voltar ao Portfolio
        </a>
      </header>

      <main className="board">
        <Column title="Para Fazer" status="todo" icon={ListTodo} />
        <Column title="Em Progresso" status="progres" icon={Clock} />
        <Column title="Concluído" status="done" icon={CheckCircle2} />
      </main>
    </div>
  );
}

export default App;
