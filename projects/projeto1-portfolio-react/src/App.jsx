import React, { useState, useEffect } from 'react';
import { Moon, Sun, ArrowRight, Github, ExternalLink, Code2, X, Terminal, Mail, MessageCircle, Instagram, Home, User, Briefcase, Bot, ShieldCheck, ArrowUpRight, Landmark, Sparkles } from 'lucide-react';
import './index.css';
import profilePic from './assets/profile.jpg';

// Main Application Component - Pedro Lucas Portfolio
function App() {
  const [theme, setTheme] = useState('dark');
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -50px 0px' });

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach(el => observer.observe(el));

    return () => {
      revealElements.forEach(el => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section');
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { threshold: 0.1, rootMargin: '-25% 0px -45% 0px' });

    sections.forEach(section => {
      if (section.id) navObserver.observe(section);
    });

    return () => {
      sections.forEach(section => {
        if (section.id) navObserver.unobserve(section);
      });
    };
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return (
    <>
      <nav className="navbar">
        <div className="container nav-content">
          <div className="logo">
            <Terminal size={22} className="logo-icon" />
            PEDRO<span>LUCAS</span>
          </div>
          <ul className="nav-links">
            <li><a href="#home" className={activeSection === 'home' ? 'active' : ''}>Home</a></li>
            <li><a href="#about" className={activeSection === 'about' ? 'active' : ''}>Sobre</a></li>
            <li><a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projetos</a></li>
            <li><a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contato</a></li>
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
          <div className="btn-container" style={{ display: 'flex', gap: '1rem' }}>
            <a href="#projects" className="btn-hero">
              Ver Projetos <ArrowRight size={18} style={{ marginLeft: '8px' }} />
            </a>
            <a href="#contact" className="contact-email" style={{ marginTop: 0, padding: '1rem 2rem' }}>
              Contato
            </a>
          </div>
        </section>

        <section id="about">
          <h2 className="section-title reveal">Sobre Mim</h2>
          <div className="about-grid">
            <div className="profile-container reveal">
              <div className="profile-blur-bg"></div>
              <img src={profilePic} alt="Pedro Lucas" className="profile-img" />
            </div>
            <div className="about-content reveal reveal-delay-1">
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
                Sou um desenvolvedor apaixonado pela intersecção entre design e código. 
                Meu foco é construir aplicações que não apenas funcionem, mas que proporcionem 
                uma experiência memorável ao usuário.
              </p>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '2rem' }}>
                Atualmente me especializando em <strong>React, TypeScript e Ecossistema Node.js</strong>, 
                sempre buscando as melhores práticas de Clean Code e Performance.
              </p>
              <div className="glass-card" style={{ padding: '2rem', border: '1px solid var(--glass-border)', borderRadius: '20px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> React.js</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> Node.js</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> SQLite / Prisma</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}><Code2 size={20} color="var(--accent)" /> UI/UX Design</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects">
          <h2 className="section-title reveal">Projetos em Destaque</h2>
          <div className="project-grid">
            <a href="https://newbanks-web.vercel.app/login" target="_blank" rel="noopener noreferrer" className="project-card reveal">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>NewBanks Web | Fintech & AI</h3>
              <p>Plataforma bancária neobank com sistema de autenticação, transações de conta para conta (enviar/sacar) e IA assistente financeiro.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">React</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Fintech AI</span>
                <span className="tech-badge">Vercel</span>
              </div>
            </a>

            <a href="https://kanban-pro-ux-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card reveal reveal-delay-1">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Kanban Pro | UX Focus</h3>
              <p>Aplicação premium de gerenciamento de tarefas com interface Glassmorphism, Modal personalizado e animações fluidas via Framer Motion.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">React 19</span>
                <span className="tech-badge">Framer Motion</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>

            <a href="https://reddit-tech-news-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card reveal reveal-delay-2">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Reddit Tech News</h3>
              <p>Curadoria de notícias globais via API do Reddit. Interface premium com tradução automática, modo dark/light e sistema de favoritos persistente.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">API Integration</span>
                <span className="tech-badge">Google Translate API</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>

            <a href="https://finance-flow-prm.pages.dev/" target="_blank" rel="noopener noreferrer" className="project-card reveal reveal-delay-3">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>FinanceFlow Dash</h3>
              <p>Dashboard Full Stack completo para gestão financeira. Inclui gráficos interativos, controle de receitas/despesas e interface responsiva otimizada.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Chart.js / Recharts</span>
                <span className="tech-badge">Cloudflare Pages</span>
              </div>
            </a>

            <a href="https://sparta-fitness-v1.netlify.app" target="_blank" rel="noopener noreferrer" className="project-card reveal reveal-delay-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Sparta Fitness</h3>
              <p>Plataforma web completa para academias e estúdios fitness. Inclui controle de planos, agendamento de aulas experimentais e e-commerce de suplementos.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">React</span>
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">TailwindCSS</span>
                <span className="tech-badge">Netlify</span>
              </div>
            </a>

            <a href="https://style-barber-milton.netlify.app" target="_blank" rel="noopener noreferrer" className="project-card reveal reveal-delay-4">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <Github size={20} color="var(--text-secondary)" />
                <ExternalLink size={20} color="var(--text-secondary)" />
              </div>
              <h3>Style Barber Milton</h3>
              <p>Landing page moderna e sistema de agendamento online de alta performance para barbearias de luxo, com foco em experiência mobile-first rápida.</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="tech-badge">HTML5</span>
                <span className="tech-badge">CSS Modules</span>
                <span className="tech-badge">JavaScript</span>
                <span className="tech-badge">Netlify</span>
              </div>
            </a>
          </div>
        </section>

        <section id="contact">
          <h2 className="section-title reveal">Vamos conversar!</h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto 3rem' }} className="reveal reveal-delay-1">
            Estou em busca de novos desafios e oportunidades de aprendizado. 
            Se você tem um projeto em mente ou apenas quer trocar uma ideia, mande um salve!
          </p>
          <div className="contact-links-grid reveal reveal-delay-2">
            <a href="mailto:pedroramosmachado19@gmail.com" className="contact-card-link">
              <Mail size={24} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">E-mail</span>
                <span className="contact-value">pedroramosmachado19@gmail.com</span>
              </div>
              <ArrowRight size={18} className="arrow-icon" />
            </a>
            
            <a href="https://wa.me/5511965417890" target="_blank" rel="noopener noreferrer" className="contact-card-link">
              <MessageCircle size={24} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">WhatsApp</span>
                <span className="contact-value">(11) 96541-7890</span>
              </div>
              <ArrowRight size={18} className="arrow-icon" />
            </a>

            <a href="https://www.instagram.com/tarzanselva16/" target="_blank" rel="noopener noreferrer" className="contact-card-link">
              <Instagram size={24} className="contact-icon" />
              <div className="contact-info">
                <span className="contact-label">Instagram</span>
                <span className="contact-value">@tarzanselva16</span>
              </div>
              <ArrowRight size={18} className="arrow-icon" />
            </a>
          </div>
        </section>
      </main>

      <div className="mobile-nav-dock">
        <a href="#home" className={`mobile-nav-item ${activeSection === 'home' ? 'active' : ''}`}>
          <Home size={20} />
          <span>Home</span>
        </a>
        <a href="#about" className={`mobile-nav-item ${activeSection === 'about' ? 'active' : ''}`}>
          <User size={20} />
          <span>Sobre</span>
        </a>
        <a href="#projects" className={`mobile-nav-item ${activeSection === 'projects' ? 'active' : ''}`}>
          <Briefcase size={20} />
          <span>Projetos</span>
        </a>
        <a href="#contact" className={`mobile-nav-item ${activeSection === 'contact' ? 'active' : ''}`}>
          <Mail size={20} />
          <span>Contato</span>
        </a>
      </div>

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
        .contact-links-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 1.5rem;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }
        .contact-card-link {
          display: flex;
          align-items: center;
          gap: 1.25rem;
          padding: 1.5rem;
          background: var(--glass-bg);
          border: 1px solid var(--glass-border);
          border-radius: 16px;
          color: var(--text-primary);
          text-decoration: none;
          transition: var(--transition);
          text-align: left;
        }
        .contact-card-link:hover {
          border-color: var(--accent);
          background: var(--card-bg);
          transform: translateY(-4px);
          box-shadow: 0 10px 20px var(--accent-glow);
        }
        .contact-icon {
          color: var(--accent);
          flex-shrink: 0;
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.25rem;
          flex-grow: 1;
        }
        .contact-label {
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          font-weight: 600;
        }
        .contact-value {
          font-size: 1rem;
          font-weight: 500;
          word-break: break-all;
        }
        .arrow-icon {
          color: var(--text-secondary);
          transition: var(--transition);
          opacity: 0.5;
        }
        .contact-card-link:hover .arrow-icon {
          color: var(--accent);
          transform: translateX(4px);
          opacity: 1;
        }
        .mobile-nav-dock {
          display: none;
        }
        @media (max-width: 768px) {
          .contact-links-grid {
            grid-template-columns: 1fr;
          }
          .mobile-nav-dock {
            display: flex;
            position: fixed;
            bottom: 1.5rem;
            left: 50%;
            transform: translateX(-50%);
            background: var(--card-bg);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            border: 1px solid var(--glass-border);
            padding: 0.5rem 1rem;
            border-radius: 40px;
            gap: 0.75rem;
            z-index: 1000;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
            width: max-content;
            align-items: center;
            justify-content: center;
          }
          .mobile-nav-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.2rem;
            color: var(--text-secondary);
            text-decoration: none;
            font-size: 0.7rem;
            font-weight: 500;
            padding: 0.4rem 0.8rem;
            border-radius: 20px;
            transition: var(--transition);
          }
          .mobile-nav-item svg {
            transition: var(--transition);
          }
          .mobile-nav-item.active {
            color: var(--accent);
            background: rgba(99, 102, 241, 0.1);
          }
          .mobile-nav-item.active svg {
            transform: translateY(-2px);
          }
        }
      `}</style>
    </>
  );
}

export default App;
