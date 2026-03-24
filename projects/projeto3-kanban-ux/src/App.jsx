import React, { useState, useEffect } from 'react';
import { Layout, Plus, Trash2, ArrowLeft, ArrowRight, X, Edit2, CheckCircle2, Clock, ListTodo } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const INITIAL_TASKS = [
  { id: '1', title: 'Refinar UX do Portfolio', status: 'todo', priority: 'high' },
  { id: '2', title: 'Implementar animações Framer', status: 'progress', priority: 'medium' },
  { id: '3', title: 'Ajustar API do Reddit', status: 'done', priority: 'low' },
];

const Modal = ({ editingTask, newTaskData, setNewTaskData, handleSaveTask, setIsModalOpen }) => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="modal-overlay"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      className="modal-content"
    >
      <div className="modal-header">
        <h3>{editingTask ? 'Editar Tarefa' : 'Nova Tarefa'}</h3>
        <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={20} /></button>
      </div>
      <form onSubmit={handleSaveTask}>
        <div className="form-group">
          <label>Título</label>
          <input 
            autoFocus
            value={newTaskData.title}
            onChange={e => setNewTaskData({...newTaskData, title: e.target.value})}
            placeholder="Ex: Estudar Framer Motion"
          />
        </div>
        <div className="form-group">
          <label>Prioridade</label>
          <div className="priority-selector">
            {['low', 'medium', 'high'].map(p => (
              <button
                key={p}
                type="button"
                onClick={() => setNewTaskData({...newTaskData, priority: p})}
                className={`p-chip ${p} ${newTaskData.priority === p ? 'active' : ''}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
        <button type="submit" className="btn-save">
          {editingTask ? 'Salvar Alterações' : 'Criar Tarefa'}
        </button>
      </form>
    </motion.div>
  </motion.div>
);

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('kanban-tasks');
    if (saved) {
      // Migração automática de 'progres' para 'progress'
      const parsed = JSON.parse(saved);
      return parsed.map(t => t.status === 'progres' ? { ...t, status: 'progress' } : t);
    }
    return INITIAL_TASKS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [newTaskData, setNewTaskData] = useState({ title: '', priority: 'medium', status: 'todo' });

  useEffect(() => {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleOpenModal = (status = 'todo', task = null) => {
    if (task) {
      setEditingTask(task);
      setNewTaskData({ title: task.title, priority: task.priority, status: task.status });
    } else {
      setEditingTask(null);
      setNewTaskData({ title: '', priority: 'medium', status });
    }
    setIsModalOpen(true);
  };

  const handleSaveTask = (e) => {
    e.preventDefault();
    if (!newTaskData.title.trim()) return;

    if (editingTask) {
      setTasks(tasks.map(t => 
        t.id === editingTask.id ? { ...t, title: newTaskData.title, priority: newTaskData.priority } : t
      ));
    } else {
      const newTask = {
        id: Date.now().toString(),
        title: newTaskData.title,
        status: newTaskData.status,
        priority: newTaskData.priority
      };
      setTasks([...tasks, newTask]);
    }
    setIsModalOpen(false);
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
          <div className="column-title">
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
                <div className="task-body">
                  <div className="task-title">{task.title}</div>
                  <div className="task-actions-top">
                    <button onClick={() => handleOpenModal(status, task)} className="icon-btn" title="Editar">
                      <Edit2 size={14} />
                    </button>
                    <button onClick={() => deleteTask(task.id)} className="icon-btn delete" title="Excluir">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                
                <div className="task-meta">
                  <span className={`priority priority-${task.priority}`}>
                    {task.priority}
                  </span>
                  
                  <div className="move-controls">
                    {status !== 'todo' && (
                      <button 
                        className="move-btn"
                        onClick={() => moveTask(task.id, status === 'done' ? 'progress' : 'todo')}
                      >
                        <ArrowLeft size={14} />
                      </button>
                    )}
                    {status !== 'done' && (
                      <button 
                        className="move-btn"
                        onClick={() => moveTask(task.id, status === 'todo' ? 'progress' : 'done')}
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

        <button className="btn-add" onClick={() => handleOpenModal(status)}>
          <Plus size={18} /> Adicionar Tarefa
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
        <Column title="Em Progresso" status="progress" icon={Clock} />
        <Column title="Concluído" status="done" icon={CheckCircle2} />
      </main>

      <AnimatePresence>
        {isModalOpen && (
          <Modal 
            editingTask={editingTask}
            newTaskData={newTaskData}
            setNewTaskData={setNewTaskData}
            handleSaveTask={handleSaveTask}
            setIsModalOpen={setIsModalOpen}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
