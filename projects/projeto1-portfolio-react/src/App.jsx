import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Github, ExternalLink, Code2, X } from 'lucide-react';
import './index.css';

function App() {
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">DEV<span>.JR</span></div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">Sobre</a></li>
            <li><a href="#projects">Projetos</a></li>
            <li><a href="#contact">Contato</a></li>
          </ul>
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
        </div>
      </nav>

      <main className="container">
        <section id="home" className="hero">
          <h1>Transformando ideias em<br /><span>experiências digitais</span>.</h1>
          <p>
            Desenvolvedor Full Stack Júnior focado em criar
            interfaces de alto impacto e sistemas escaláveis com React e Node.js.
          </p>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <a href="#projects" className="btn-hero">
              Ver Projetos <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <a href="#contact" className="contact-email" style={{ marginTop: 0, padding: '1rem 2rem' }}>
              Contato
            </a>
          </div>
        </section>

        <section id="about">
          <h2 className="section-title">Sobre Mim</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Sou um desenvolvedor apaixonado pela intersecção entre design e código. 
                Meu foco é construir aplicações que não apenas funcionem, mas que proporcionem 
                uma experiência memorável ao usuário.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                Atualmente me especializando em <strong>React, TypeScript e Ecossistema Node.js</strong>, 
                sempre buscando as melhores práticas de Clean Code e Performance.
              </p>
            </div>
            <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> React.js</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> Node.js</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> SQLite / Prisma</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> UI/UX Design</div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <h2 className="section-title">Projetos em Destaque</h2>
          <div className="project-grid">
            <a href="https://kanban-pro-ux-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Kanban Pro | UX Focus</h3>
              <p>Aplicação premium de gerenciamento de tarefas com interface Glassmorphism, Modal personalizado e animações fluidas via Framer Motion.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <span className="tech-badge">React 19</span>
                <span className="tech-badge">Framer Motion</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>

            <a href="https://finance-flow-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>FinanceFlow Dash</h3>
              <p>Dashboard Full Stack completo para gestão financeira. Inclui gráficos interativos, controle de receitas/despesas e interface responsiva otimizada.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Chart.js / Recharts</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>

            <a href="https://reddit-tech-news-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Reddit Tech News</h3>
              <p>Curadoria de notícias globais via API do Reddit. Interface premium com tradução automática, modo dark/light e sistema de favoritos persistente.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem' }}>
                <span className="tech-badge">API Integration</span>
                <span className="tech-badge">Google Translate API</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>
          </div>
        </section>

        <section id="contact">
          <h2 className="section-title">Vamos conversar!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
            Estou em busca de novos desafios e oportunidades de aprendizado. 
            Se você tem um projeto em mente ou apenas quer trocar uma ideia, mande um salve!
          </p>
          <a href="mailto:dev.junior@exemplo.com" className="contact-email">
            Mandar E-mail
          </a>
        </section>
      </main>

      <style>{`
        .tech-badge {
          font-size: 0.75rem;
          padding: 0.25rem 0.75rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 20px;
          color: var(--text-secondary);
        }
        .project-card:hover .tech-badge {
          border-color: var(--accent);
          color: var(--text-primary);
        }
      `}</style>
    </>
  );
}

export default App;
