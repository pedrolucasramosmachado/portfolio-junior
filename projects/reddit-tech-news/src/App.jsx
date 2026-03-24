import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Sun, Moon, Loader2, RefreshCcw,
  ThumbsUp, MessageCircle, Languages,
  Star, ArrowLeft, Code, Cpu, Brain, Rocket
} from 'lucide-react';
import './index.css';

// Subreddits por categoria — curadoria cirúrgica dos melhores canais
const CATEGORIES = {
  tech: {
    label: 'TECH',
    subs: ['technology', 'programming', 'gadgets'],
  },
  saas: {
    label: 'SAAS',
    subs: ['SideProject', 'SaaS', 'startups'],
  },
  ai: {
    label: 'AI',
    subs: ['ArtificialIntelligence', 'MachineLearning', 'OpenAI'],
  },
  dev: {
    label: 'DEV',
    subs: ['reactjs', 'webdev', 'javascript'],
  },
};

const PLACEHOLDERS = {
  tech: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&q=80',
  saas: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80',
  ai: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&q=80',
  dev: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&q=80',
};

const ICONS = {
  tech: <Cpu size={28} />,
  saas: <Rocket size={28} />,
  ai: <Brain size={28} />,
  dev: <Code size={28} />,
};

// Extrai o nome do subreddit a partir da URL do post
function extractSubreddit(link = '') {
  const m = link.match(/reddit\.com\/r\/([^/]+)/i);
  return m ? m[1] : 'reddit';
}

// Traduz texto EN→PT via Google Translate (sem chave)
async function translate(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=pt&dt=t&q=${encodeURIComponent(text)}`;
    const res = await axios.get(url, { timeout: 4000 });
    return res.data[0].map(c => c[0]).join('');
  } catch {
    return text;
  }
}

// Busca posts de UM subreddit via API JSON nativa do Reddit (com proxy CORS)
async function fetchSub(sub) {
  const redditUrl = `https://www.reddit.com/r/${sub}/hot.json?limit=25`;
  const proxy = `https://corsproxy.io/?${encodeURIComponent(redditUrl)}`;
  const res = await axios.get(proxy, { timeout: 8000 });
  const children = res.data?.data?.children || [];
  return children.map(c => {
    // Preferência: preview image > thumbnail
    const preview = c.data.preview?.images?.[0]?.source?.url?.replace(/&amp;/g, '&');
    const thumb = c.data.thumbnail?.startsWith('http') ? c.data.thumbnail : '';
    return {
      guid: c.data.id,
      title: c.data.title,
      link: `https://www.reddit.com${c.data.permalink}`,
      image: preview || thumb || '',
      subreddit: c.data.subreddit,
      ups: c.data.ups,
      num_comments: c.data.num_comments,
    };
  });
}

function App() {
  const [category, setCategory] = useState('tech');
  const [posts, setPosts] = useState([]);
  const [displayed, setDisplayed] = useState(9);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [favs, setFavs] = useState(() => {
    try { return JSON.parse(localStorage.getItem('reddit-favs') || '[]'); } catch { return []; }
  });
  const [showFavs, setShowFavs] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('reddit-favs', JSON.stringify(favs));
  }, [favs]);

  useEffect(() => {
    if (!showFavs) load();
  }, [category, showFavs]);

  async function load() {
    setLoading(true);
    setError(false);
    setDisplayed(9);

    try {
      const subs = CATEGORIES[category].subs;

      // Busca todos os subreddits em paralelo; ignora falhas individuais
      const results = await Promise.allSettled(subs.map(fetchSub));

      const seen = new Set();
      let all = [];

      results.forEach(r => {
        if (r.status !== 'fulfilled') return;
        r.value.forEach(item => {
          if (!item.title || item.title.length < 10) return;
          if (seen.has(item.guid)) return;
          seen.add(item.guid);
          all.push(item); // item já vem formatado de fetchSub
        });
      });

      if (all.length === 0) {
        setError(true);
        setPosts([]);
        return;
      }

      // Traduz os primeiros 20 títulos
      const translated = await Promise.all(
        all.map(async (p, i) => {
          if (i < 20) {
            const t = await translate(p.title);
            return { ...p, title: t };
          }
          return p;
        })
      );

      setPosts(translated);
    } catch (e) {
      console.error(e);
      setError(true);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }

  function toggleFav(e, post) {
    e.preventDefault();
    e.stopPropagation();
    setFavs(prev =>
      prev.some(f => f.guid === post.guid)
        ? prev.filter(f => f.guid !== post.guid)
        : [...prev, post]
    );
  }

  function isFav(post) {
    return favs.some(f => f.guid === post.guid);
  }

  function loadMore() {
    setLoadingMore(true);
    setTimeout(() => {
      setDisplayed(prev => prev + 9);
      setLoadingMore(false);
    }, 400);
  }

  const list = showFavs ? favs : posts.slice(0, displayed);
  const hasMore = !showFavs && posts.length > displayed;

  return (
    <div className="app-container">
      <header>
        <div className="header-top">
          <a href="https://pedro-jr-portfolio-prm.pages.dev/" className="brand">
            <div className={loading && !showFavs ? 'spinner' : ''} style={{ display: 'flex' }}>
              <Languages size={22} />
            </div>
            <h1>Global Trends</h1>
          </a>
          <div className="nav-controls">
            <a href="https://pedro-jr-portfolio-prm.pages.dev/" className="back-link">
              <ArrowLeft size={15} /> Voltar
            </a>
            <button
              className="theme-toggle"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </div>

        <nav className="category-filters">
          <button
            className={`filter-btn fav-btn ${showFavs ? 'active' : ''}`}
            onClick={() => setShowFavs(v => !v)}
          >
            <Star size={13} fill={showFavs ? 'currentColor' : 'none'} />
            {showFavs ? 'Explorar' : 'Favoritos'}
          </button>
          <div className="v-divider" />
          {!showFavs && Object.entries(CATEGORIES).map(([key, val]) => (
            <button
              key={key}
              className={`filter-btn ${category === key ? 'active' : ''}`}
              onClick={() => setCategory(key)}
            >
              {val.label}
            </button>
          ))}
        </nav>
      </header>

      <main>
        {/* Estados de carga / erro / vazio */}
        {loading && !showFavs && (
          <div className="state-container">
            <Loader2 size={36} className="spinner" />
            <p>Buscando notícias em {CATEGORIES[category].label}...</p>
          </div>
        )}

        {!loading && error && (
          <div className="state-container">
            <p>Não foi possível carregar. Verifique sua conexão.</p>
            <button className="load-more-btn" onClick={load} style={{ marginTop: '1rem' }}>
              <RefreshCcw size={16} /> Tentar novamente
            </button>
          </div>
        )}

        {showFavs && favs.length === 0 && (
          <div className="state-container">
            <Star size={36} style={{ opacity: 0.2, marginBottom: '1rem' }} />
            <p>Nenhum favorito ainda.</p>
          </div>
        )}

        {/* Feed */}
        {(!loading || showFavs) && !error && (
          <>
            <div className="feed-list">
              {list.map((post, idx) => (
                <a
                  key={post.guid || idx}
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="post-card"
                >
                  <button
                    className={`favorite-btn ${isFav(post) ? 'active' : ''}`}
                    onClick={e => toggleFav(e, post)}
                  >
                    <Star size={16} fill={isFav(post) ? 'currentColor' : 'none'} />
                  </button>

                  <div className="card-image-wrap">
                    {post.image?.startsWith('http') ? (
                      <img src={post.image} alt="" className="post-thumbnail" />
                    ) : (
                      <div className="image-placeholder-luxury">
                        <img
                          src={PLACEHOLDERS[category]}
                          alt=""
                          className="post-thumbnail"
                          style={{ opacity: 0.25 }}
                        />
                        <div className="placeholder-icon-abs">{ICONS[category]}</div>
                      </div>
                    )}
                  </div>

                  <div className="post-content">
                    <h2 className="post-title">{post.title}</h2>
                    <div className="post-meta">
                      {post.ups != null && (
                        <span className="meta-item"><ThumbsUp size={13} /> {post.ups.toLocaleString()}</span>
                      )}
                      {post.num_comments != null && (
                        <span className="meta-item"><MessageCircle size={13} /> {post.num_comments.toLocaleString()}</span>
                      )}
                      <span className="meta-item subreddit-tag">r/{post.subreddit}</span>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {hasMore && (
              <button className="load-more-btn" onClick={loadMore} disabled={loadingMore}>
                {loadingMore ? <Loader2 size={16} className="spinner" /> : <RefreshCcw size={16} />}
                Ver Mais
              </button>
            )}

            {!showFavs && !hasMore && posts.length > 0 && (
              <div className="state-container" style={{ padding: '3rem 0', opacity: 0.5 }}>
                <p>✨ Você chegou ao fim da curadoria de hoje.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
