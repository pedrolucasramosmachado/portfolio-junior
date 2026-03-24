import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Trash2, 
  Wallet,
  Filter,
  Utensils,
  Car,
  Gamepad,
  HeartPulse,
  GraduationCap,
  DollarSign,
  MoreHorizontal,
  Search,
  X,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip, 
  Legend,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts';
import './index.css';

const API_URL = 'http://localhost:3001/api'; // Em produção, aponte para o backend real se necessário

const iconMap = {
  Utensils,
  Car,
  Gamepad,
  HeartPulse,
  GraduationCap,
  DollarSign,
  MoreHorizontal
};

const COLORS = ['#4f46e5', '#10b981', '#ef4444', '#f59e0b', '#06b6d4', '#8b5cf6', '#ec4899'];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters & UI State
  const [filterType, setFilterType] = useState('ALL'); // ALL, INCOME, EXPENSE
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  // Form State
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('EXPENSE');
  const [categoryId, setCategoryId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [tRes, cRes] = await Promise.all([
        fetch(`${API_URL}/transactions`),
        fetch(`${API_URL}/categories`)
      ]);
      const [tData, cData] = await Promise.all([tRes.json(), cRes.json()]);
      console.log('Transactions loaded:', tData);
      setTransactions(tData);
      setCategories(cData);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!description || !amount || !categoryId) return alert('Preecha todos os campos!');
    
    try {
      const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount, type, categoryId })
      });
      if (res.ok) {
        fetchData();
        setIsModalOpen(false);
        resetForm();
      }
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir esta transação?')) return;
    try {
      const res = await fetch(`${API_URL}/transactions/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setTransactions(prev => prev.filter(t => t.id !== id));
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  const resetForm = () => {
    setDescription('');
    setAmount('');
    setType('EXPENSE');
    setCategoryId('');
  };

  // Filter Logic - FIXED: Ensure clean filtering
  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filterType === 'ALL' || t.type === filterType;
    const matchesSearch = t.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totals = transactions.reduce((acc, t) => {
    if (t.type === 'INCOME') acc.income += t.amount;
    else acc.expense += t.amount;
    return acc;
  }, { income: 0, expense: 0 });

  const balance = totals.income - totals.expense;

  // Chart Data: Expense by Category
  const pieData = categories.map(cat => {
    const total = transactions
      .filter(t => t.categoryId === cat.id && t.type === 'EXPENSE')
      .reduce((sum, t) => sum + t.amount, 0);
    return { name: cat.name, value: total };
  }).filter(d => d.value > 0);

  // Chart Data: Balance Timeline (Mocking a simple progression)
  const timelineData = transactions.slice().reverse().reduce((acc, t) => {
    const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const currentBalance = t.type === 'INCOME' ? prevBalance + t.amount : prevBalance - t.amount;
    acc.push({
      date: new Date(t.date).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      balance: currentBalance
    });
    return acc;
  }, []);

  if (loading) return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
      <div className="loader">Carregando Finanças...</div>
    </div>
  );

  return (
    <div className="container">
      <header className="section-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <a href="https://pedro-jr-portfolio-prm.pages.dev/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem' }}>
             ← Voltar
          </a>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>FinanceFlow<span style={{ color: 'var(--primary)' }}>Dash</span></h1>
            <p style={{ color: 'var(--text-secondary)' }}>Controle de gastos pessoal</p>
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Nova Transação
        </button>
      </header>

      <section className="summary-grid">
        <div className="glass-card summary-card" style={{ borderLeft: `4px solid ${balance >= 0 ? 'var(--success)' : 'var(--danger)'}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Saldo Total</h3>
            <Wallet size={16} color="var(--text-secondary)" />
          </div>
          <div className={`amount ${balance >= 0 ? 'income' : 'expense'}`}>
            R$ {balance.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="glass-card summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Entradas</h3>
            <TrendingUp size={16} color="var(--success)" />
          </div>
          <div className="amount income">
            R$ {totals.income.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
        <div className="glass-card summary-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3>Saídas</h3>
            <TrendingDown size={16} color="var(--danger)" />
          </div>
          <div className="amount expense">
            R$ {totals.expense.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </div>
        </div>
      </section>

      <div className="dashboard-content" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <section className="left-panel">
          {/* Charts Row */}
          <div className="glass-card" style={{ marginBottom: '2rem', padding: '1.5rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1rem' }}>Evolução do Saldo</h3>
            <div style={{ height: '200px', width: '100%' }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={timelineData}>
                  <defs>
                    <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                  <XAxis dataKey="date" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{ background: 'var(--bg-secondary)', border: 'none', borderRadius: '8px' }} />
                  <Area type="monotone" dataKey="balance" stroke="var(--primary)" fillOpacity={1} fill="url(#colorBalance)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <section className="transactions-section">
            <div className="section-header">
              <h2>Atividades Recentes</h2>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-card)', borderRadius: '0.75rem', padding: '0.25rem 0.75rem', border: '1px solid var(--border-card)' }}>
                  <Search size={18} style={{ color: 'var(--text-secondary)' }} />
                  <input 
                    value={searchTerm} 
                    onChange={e => setSearchTerm(e.target.value)}
                    placeholder="Buscar..." 
                    style={{ background: 'none', border: 'none', padding: '0.5rem', width: '150px', color: 'white' }}
                  />
                </div>
                <button 
                  className="btn" 
                  style={{ background: isFilterVisible ? 'var(--primary)' : 'var(--bg-card)' }}
                  onClick={() => setIsFilterVisible(!isFilterVisible)}
                >
                  <Filter size={18} />
                </button>
              </div>
            </div>

            {isFilterVisible && (
              <div className="glass-card" style={{ marginBottom: '1.5rem', display: 'flex', gap: '1rem', padding: '1rem', background: 'rgba(255,255,255,0.02)' }}>
                <button className={`btn ${filterType === 'ALL' ? 'btn-primary' : ''}`} onClick={() => setFilterType('ALL')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Todos</button>
                <button className={`btn ${filterType === 'INCOME' ? 'btn-primary' : ''}`} onClick={() => setFilterType('INCOME')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Receitas</button>
                <button className={`btn ${filterType === 'EXPENSE' ? 'btn-primary' : ''}`} onClick={() => setFilterType('EXPENSE')} style={{ fontSize: '0.8rem', padding: '0.5rem 1rem' }}>Despesas</button>
              </div>
            )}

            <div className="transaction-list">
              {filteredTransactions.map(t => {
                const Icon = iconMap[t.category.icon] || MoreHorizontal;
                return (
                  <div key={t.id} className="glass-card transaction-item">
                    <div className="transaction-info">
                      <div className="icon-wrapper">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{t.description}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {t.category.name} • {new Date(t.date).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ fontWeight: 700, color: t.type === 'INCOME' ? 'var(--success)' : 'var(--danger)' }}>
                        {t.type === 'INCOME' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                      </div>
                      <button onClick={() => handleDelete(t.id)} style={{ background: 'none', border: 'none', color: 'rgba(239, 68, 68, 0.4)', cursor: 'pointer' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {filteredTransactions.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                  <Wallet size={48} style={{ opacity: 0.2, marginBottom: '1rem' }} />
                  <p>Nenhuma transação encontrada.</p>
                </div>
              )}
            </div>
          </section>
        </section>

        <aside className="stats-sidebar">
          <div className="glass-card" style={{ height: 'fit-content', position: 'sticky', top: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.1rem' }}>Despesas por Categoria</h3>
            {pieData.length > 0 ? (
              <div style={{ height: '300px', width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pieData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: 'none', borderRadius: '8px', color: 'white' }} itemStyle={{ color: 'white' }} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <p style={{ textAlign: 'center', color: 'var(--text-secondary)', padding: '2rem' }}>Adicione despesas para ver o gráfico.</p>
            )}
          </div>
        </aside>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="glass-card modal-content" onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2>Adicionar Transação</h2>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleAddTransaction}>
              <div className="form-group">
                <label>Descrição</label>
                <input required value={description} onChange={e => setDescription(e.target.value)} placeholder="Ex: Mercado, Salário..." />
              </div>
              <div className="form-group">
                <label>Valor (R$)</label>
                <input type="number" step="0.01" required value={amount} onChange={e => setAmount(e.target.value)} placeholder="0,00" />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select value={type} onChange={e => setType(e.target.value)}>
                  <option value="EXPENSE">Despesa</option>
                  <option value="INCOME">Receita</option>
                </select>
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select required value={categoryId} onChange={e => setCategoryId(e.target.value)}>
                  <option value="">Selecione uma categoria</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn" onClick={() => setIsModalOpen(false)} style={{ flex: 1, justifyContent: 'center' }}>Cancelar</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center' }}>Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
