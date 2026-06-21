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
  TrendingDown,
  Loader2
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
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

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

const INITIAL_CATEGORIES = [
  { id: '1', nome: 'Alimentação', icone: 'Utensils' },
  { id: '2', nome: 'Transporte', icone: 'Car' },
  { id: '3', nome: 'Lazer', icone: 'Gamepad' },
  { id: '4', nome: 'Saúde', icone: 'HeartPulse' },
  { id: '5', nome: 'Educação', icone: 'GraduationCap' },
  { id: '6', nome: 'Salário', icone: 'DollarSign' }
];

const INITIAL_TRANSACTIONS = [
  { id: 't1', descricao: 'Salário Mensal', valor: 5000, tipo: 'INCOME', categoria_id: 6, data: new Date().toISOString(), categoria: INITIAL_CATEGORIES[5] },
  { id: 't2', descricao: 'Supermercado', valor: 450.50, tipo: 'EXPENSE', categoria_id: 1, data: new Date().toISOString(), categoria: INITIAL_CATEGORIES[0] },
  { id: 't3', descricao: 'Assinatura Netflix', valor: 55.90, tipo: 'EXPENSE', categoria_id: 3, data: new Date().toISOString(), categoria: INITIAL_CATEGORIES[2] },
  { id: 't4', descricao: 'Gasolina', valor: 200.00, tipo: 'EXPENSE', categoria_id: 2, data: new Date().toISOString(), categoria: INITIAL_CATEGORIES[1] }
];

function App() {
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Filters & UI State
  const [filterType, setFilterType] = useState('ALL'); // ALL, INCOME, EXPENSE
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  // Form State
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [tipo, setTipo] = useState('EXPENSE');
  const [categoriaId, setCategoriaId] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Fetch Categories
      const { data: cData, error: cErr } = await supabase
        .from('categorias')
        .select('*')
        .order('nome');
      
      if (cErr) throw cErr;

      // 2. Fetch Transactions with Category details
      const { data: tData, error: tErr } = await supabase
        .from('transacoes')
        .select(`
          *,
          categoria:categorias(*)
        `)
        .order('data', { ascending: false });

      if (tErr) throw tErr;

      setCategories(cData);
      setTransactions(tData);
      setIsOffline(false);
    } catch (err) {
      console.warn('Supabase Offline/Error. Usando LocalStorage/Mock.');
      setIsOffline(true);
      
      const localData = localStorage.getItem('finance_flow_data');
      if (localData) {
        setTransactions(JSON.parse(localData));
      } else {
        setTransactions(INITIAL_TRANSACTIONS);
      }
      setCategories(INITIAL_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };


  const handleAddTransaction = async (e) => {
    e.preventDefault();
    if (!descricao || !valor || !categoriaId) return alert('Preecha todos os campos!');
    
    const val = parseFloat(valor);
    const catId = parseInt(categoriaId);

    if (isOffline) {
      const newTransaction = {
        id: `local-${Date.now()}`,
        descricao,
        valor: val,
        tipo,
        categoria_id: catId,
        data: new Date().toISOString(),
        categoria: categories.find(c => c.id == catId)
      };
      const updated = [newTransaction, ...transactions];
      setTransactions(updated);
      localStorage.setItem('finance_flow_data', JSON.stringify(updated));
      setIsModalOpen(false);
      resetForm();
      return;
    }

    try {
      const { data, error } = await supabase
        .from('transacoes')
        .insert([{
          descricao,
          valor: val,
          tipo,
          categoria_id: catId,
          data: new Date().toISOString()
        }])
        .select(`
          *,
          categoria:categorias(*)
        `)
        .single();

      if (error) throw error;

      setTransactions([data, ...transactions]);
      setIsModalOpen(false);
      resetForm();
    } catch (err) {
      console.error('Error adding to Supabase:', err);
      // Fallback local if Supabase fails
      const newTransaction = {
        id: `local-${Date.now()}`,
        descricao,
        valor: val,
        tipo,
        categoria_id: catId,
        data: new Date().toISOString(),
        categoria: categories.find(c => c.id == catId)
      };
      const updated = [newTransaction, ...transactions];
      setTransactions(updated);
      localStorage.setItem('finance_flow_data', JSON.stringify(updated));
      setIsModalOpen(false);
      resetForm();
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Excluir esta transação?')) return;

    if (isOffline || String(id).startsWith('local-')) {
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      localStorage.setItem('finance_flow_data', JSON.stringify(updated));
      return;
    }

    try {
      const { error } = await supabase
        .from('transacoes')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTransactions(prev => prev.filter(t => t.id !== id));
    } catch (err) {
      console.error('Error deleting from Supabase:', err);
      const updated = transactions.filter(t => t.id !== id);
      setTransactions(updated);
      localStorage.setItem('finance_flow_data', JSON.stringify(updated));
    }
  };

  const resetForm = () => {
    setDescricao('');
    setValor('');
    setTipo('EXPENSE');
    setCategoriaId('');
  };

  // Filter Logic - FIXED: Ensure clean filtering
  const filteredTransactions = transactions.filter(t => {
    const matchesFilter = filterType === 'ALL' || t.tipo === filterType;
    const matchesSearch = t.descricao.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const totals = transactions.reduce((acc, t) => {
    if (t.tipo === 'INCOME') acc.income += t.valor;
    else acc.expense += t.valor;
    return acc;
  }, { income: 0, expense: 0 });

  const balance = totals.income - totals.expense;

  // Chart Data: Expense by Category
  const pieData = categories.map(cat => {
    const total = transactions
      .filter(t => t.categoria_id === cat.id && t.tipo === 'EXPENSE')
      .reduce((sum, t) => sum + t.valor, 0);
    return { name: cat.nome, value: total };
  }).filter(d => d.value > 0);

  // Chart Data: Balance Timeline (Mocking a simple progression)
  const timelineData = transactions.slice().reverse().reduce((acc, t) => {
    const prevBalance = acc.length > 0 ? acc[acc.length - 1].balance : 0;
    const currentBalance = t.tipo === 'INCOME' ? prevBalance + t.valor : prevBalance - t.valor;
    acc.push({
      date: new Date(t.data).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' }),
      balance: currentBalance
    });
    return acc;
  }, []);

  if (loading) return (
    <div style={{ background: '#0a0a0c', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', gap: '1rem' }}>
      <Loader2 size={40} className="animate-spin" style={{ color: 'var(--primary)' }} />
      <div style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Carregando Finanças...</div>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Controle de gastos pessoal</p>
              {isOffline && <span style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.65rem', padding: '0.1rem 0.4rem', borderRadius: '4px', border: '1px solid rgba(245,158,11,0.2)' }}>MODO DEMO / OFFLINE</span>}
            </div>
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
                const Icon = iconMap[t.categoria.icone] || MoreHorizontal;
                return (
                  <div key={t.id} className="glass-card transaction-item">
                    <div className="transaction-info">
                      <div className="icon-wrapper">
                        <Icon size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 600 }}>{t.descricao}</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                          {t.categoria.nome} • {new Date(t.data).toLocaleDateString('pt-BR')}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                      <div style={{ fontWeight: 700, color: t.tipo === 'INCOME' ? 'var(--success)' : 'var(--danger)' }}>
                        {t.tipo === 'INCOME' ? '+' : '-'} R$ {t.valor.toFixed(2)}
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
                <input required value={descricao} onChange={e => setDescricao(e.target.value)} placeholder="Ex: Mercado, Salário..." />
              </div>
              <div className="form-group">
                <label>Valor (R$)</label>
                <input type="number" step="0.01" required value={valor} onChange={e => setValor(e.target.value)} placeholder="0,00" />
              </div>
              <div className="form-group">
                <label>Tipo</label>
                <select value={tipo} onChange={e => setTipo(e.target.value)}>
                  <option value="EXPENSE">Despesa</option>
                  <option value="INCOME">Receita</option>
                </select>
              </div>
              <div className="form-group">
                <label>Categoria</label>
                <select required value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                  <option value="">Selecione uma categoria</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
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
