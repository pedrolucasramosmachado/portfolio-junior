import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Estoque', href: '#estoque' },
    { name: 'Financiamento', href: '#financiamento' },
    { name: 'Sobre Nós', href: '#sobre-nós' },
    { name: 'Contato', href: '#contato' }
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        scrolled 
          ? 'bg-white py-3 shadow-2xl shadow-black/5' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 group relative z-[110]">
          <div className="flex flex-col">
            <h1 className={`font-outfit text-2xl lg:text-3xl font-black leading-none tracking-tighter transition-colors duration-500 ${
              scrolled || isMenuOpen ? 'text-brand-blue' : 'text-white'
            }`}>
              STREET<span className="text-brand-red ml-1">.</span>
            </h1>
            <p className={`text-[9px] font-bold tracking-[0.4em] uppercase leading-none mt-1.5 transition-colors duration-500 ${
              scrolled || isMenuOpen ? 'text-gray-400' : 'text-white/60'
            }`}>
              Multimarcas
            </p>
          </div>
        </a>

        <nav className="hidden lg:flex items-center gap-10">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className={`text-[13px] font-black uppercase tracking-widest transition-all hover:text-brand-red ${
                scrolled ? 'text-brand-blue' : 'text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6 relative z-[110]">
          <a 
            href="https://wa.me/554799999999" 
            target="_blank" 
            className={`hidden sm:flex items-center gap-3 px-7 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all shadow-lg ${
              scrolled 
                ? 'bg-brand-red text-white hover:bg-brand-blue hover:shadow-brand-blue/20' 
                : 'bg-white text-brand-blue hover:bg-brand-red hover:text-white hover:shadow-brand-red/20'
            }`}
          >
            <i className="fab fa-whatsapp text-lg"></i>
            <span>Consultar</span>
          </a>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`lg:hidden text-2xl transition-colors ${
              scrolled || isMenuOpen ? 'text-brand-blue' : 'text-white'
            }`}
          >
            <i className={`fas ${isMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-white z-[105] flex flex-col pt-32 px-10"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, idx) => (
                <motion.a
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-4xl font-black text-brand-blue uppercase tracking-tighter hover:text-brand-red transition-colors italic"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="mt-auto mb-16 space-y-10">
              <div className="h-px w-full bg-gray-100"></div>
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-4 italic">Fale Conosco</p>
                <a href="tel:11987654321" className="text-2xl font-black text-brand-blue block mb-2">(11) 98765-4321</a>
                <p className="text-sm font-bold text-gray-500">Av. das Nações, 1000 - São Paulo/SP</p>
              </div>
              <div className="flex gap-6">
                 {['instagram', 'facebook', 'youtube'].map(social => (
                  <a key={social} href="#" className="text-brand-blue text-2xl">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

