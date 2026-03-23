import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import FinancingSimulator from './components/FinancingSimulator';
import VehicleCard from './components/VehicleCard';
import CarModal from './components/CarModal';
import { cars } from './data/cars';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [selectedCar, setSelectedCar] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [simulationCarValue, setSimulationCarValue] = useState(null);

  const handleSimulate = (value) => {
    setSimulationCarValue(value);
    setIsModalOpen(false); // Close modal if open
    document.getElementById('financiamento')?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredCars = useMemo(() => {
    return cars.filter(car => {
      const matchesSearch = car.brand.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           car.model.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = categoryFilter === "" || car.category === categoryFilter;
      const matchesPrice = priceFilter === "" || car.price <= parseInt(priceFilter);

      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [searchTerm, categoryFilter, priceFilter]);
  
  // Handle mobile 'back' button to close modal
  useEffect(() => {
    const handlePopState = () => {
      if (isModalOpen) {
        setIsModalOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isModalOpen]);

  const handleOpenDetails = (car) => {
    setSelectedCar(car);
    window.history.pushState({ modalOpen: true }, '');
    setIsModalOpen(true);
  };

  const handleCloseDetails = () => {
    if (window.history.state?.modalOpen) {
      window.history.back();
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      
      {/* Search & Filter Section */}
      <section id="estoque" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="bg-brand-blue/95 p-10 lg:p-16 rounded-[60px] shadow-[0_40px_100px_rgba(10,29,55,0.4)] relative -mt-24 lg:-mt-48 z-30 border border-white/5 backdrop-blur-3xl overflow-hidden"
          >
            {/* Background Decorative Gradient */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/10 rounded-full blur-[120px] -mr-48 -mt-48"></div>
            
            <div className="grid lg:grid-cols-4 gap-10 items-end relative z-10">
              <div className="lg:col-span-1">
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block italic">Busca Rápida</label>
                <div className="relative group">
                  <i className="fas fa-search absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-red transition-all duration-300"></i>
                  <input 
                    type="text" 
                    placeholder="Ex: Honda Civic..." 
                    className="w-full bg-white/5 border-white/10 border text-white rounded-2xl py-6 pl-16 pr-6 focus:bg-white/10 focus:border-brand-red/50 transition-all outline-none font-medium placeholder:text-white/20 italic"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block italic">Perfil</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border-white/10 border text-white rounded-2xl py-6 px-6 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer font-bold italic"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                  >
                    <option value="" className="text-black">Todos Modelos</option>
                    <option value="sedan" className="text-black">Sedan</option>
                    <option value="suv" className="text-black">SUV</option>
                    <option value="hatch" className="text-black">Hatch</option>
                    <option value="picape" className="text-black">Picape</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
                </div>
              </div>

              <div>
                <label className="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-4 block italic">Investimento</label>
                <div className="relative">
                  <select 
                    className="w-full bg-white/5 border-white/10 border text-white rounded-2xl py-6 px-6 focus:bg-white/10 transition-all outline-none appearance-none cursor-pointer font-bold italic"
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                  >
                    <option value="" className="text-black">Preço Máximo</option>
                    <option value="60000" className="text-black">Até R$ 60k</option>
                    <option value="100000" className="text-black">Até R$ 100k</option>
                    <option value="150000" className="text-black">Até R$ 150k</option>
                    <option value="200000" className="text-black">Até R$ 200k</option>
                  </select>
                  <i className="fas fa-chevron-down absolute right-6 top-1/2 -translate-y-1/2 text-white/20 pointer-events-none"></i>
                </div>
              </div>

              <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: '#ffffff', color: '#f20d0d' }}
                whileTap={{ scale: 0.98 }}
                onClick={() => document.getElementById('catalogo')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-brand-red text-white py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all shadow-2xl shadow-red-500/30 flex items-center justify-center gap-3 italic"
              >
                Explorar Agora
                <i className="fas fa-arrow-right text-[10px]"></i>
              </motion.button>
            </div>
          </motion.div>


          {/* Results Grid */}
          <div className="mt-32">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-16">
              <div className="text-center md:text-left">
                <span className="text-brand-red font-black uppercase tracking-[0.3em] text-[10px]">Catálogo 2024</span>
                <h2 className="font-outfit text-4xl lg:text-5xl font-black text-brand-blue mt-2 italic">Nosso Estoque.</h2>
                <div className="h-1.5 w-24 bg-brand-red rounded-full mt-4 mx-auto md:mx-0 shadow-lg shadow-red-500/30"></div>
              </div>
              <div className="bg-gray-50 px-8 py-4 rounded-3xl border border-gray-100">
                <p className="text-sm font-bold text-gray-400">
                  Mostrando <span className="text-brand-blue font-black">{filteredCars.length}</span> resultados
                </p>
              </div>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredCars.map(car => (
                  <VehicleCard 
                    key={car.id} 
                    car={car} 
                    onOpenDetails={handleOpenDetails} 
                    onSimulate={handleSimulate}
                  />
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-32 bg-gray-50 rounded-[60px] border-2 border-dashed border-gray-200"
              >
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl">
                  <i className="fas fa-search text-3xl text-gray-200"></i>
                </div>
                <h3 className="text-2xl font-black text-brand-blue/50 font-outfit mb-4 uppercase tracking-tighter">Nenhum veículo encontrado</h3>
                <p className="text-gray-400 mb-8">Tente ajustar seus filtros ou pesquisar por outro termo.</p>
                <button 
                  onClick={() => {setSearchTerm(''); setCategoryFilter(''); setPriceFilter('');}}
                  className="bg-brand-blue text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-brand-red transition-all shadow-lg"
                >
                  Limpar todos os filtros
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* About Section */}
      <About />

      {/* Financing Section */}
      <FinancingSimulator initialValue={simulationCarValue} />

      {/* Footer */}
      <footer className="bg-white pt-32 pb-16 border-t border-gray-100 relative overflow-hidden">
        <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-red-50/50 rounded-full blur-[120px] -z-10"></div>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-12 h-12 bg-brand-red rounded-2xl flex items-center justify-center shadow-xl shadow-red-500/20">
                  <i className="fas fa-car text-white text-xl"></i>
                </div>
                <div>
                  <h1 className="font-outfit text-2xl font-black text-brand-blue leading-none">STREET</h1>
                  <p className="text-[10px] font-bold text-gray-400 tracking-[0.3em] uppercase mt-1">Multimarcas</p>
                </div>
              </div>
              <p className="text-gray-400 text-base leading-relaxed mb-10 font-medium">
                Sua próxima conquista começa aqui. Referência em qualidade e transparência no mercado de seminovos.
              </p>
              <div className="flex gap-5">
                {['facebook', 'instagram', 'youtube'].map(social => (
                  <a key={social} href="#" className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-blue hover:bg-brand-red hover:text-white transition-all shadow-sm">
                    <i className={`fab fa-${social} text-lg`}></i>
                  </a>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-outfit font-black text-brand-blue uppercase tracking-[0.2em] mb-10 text-xs">Onde Estamos</h4>
              <div className="flex flex-col gap-8">
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-red-50 text-brand-red rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <i className="fas fa-location-arrow"></i>
                  </div>
                  <p className="text-sm font-bold text-gray-600 leading-snug pt-1">Av. das Nações, 1000<br />São Paulo - SP</p>
                </div>
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 bg-blue-50 text-brand-blue rounded-2xl flex items-center justify-center shrink-0 shadow-sm">
                    <i className="fab fa-whatsapp text-lg"></i>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">WhatsApp Plantão</p>
                    <p className="text-lg font-black text-brand-blue leading-none">(11) 98765-4321</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-outfit font-black text-brand-blue uppercase tracking-[0.2em] mb-10 text-xs">Horário Especial</h4>
              <div className="flex flex-col gap-6">
                {[
                  { d: "Segunda a Sexta", h: "08:30 - 19:00" },
                  { d: "Sábados", h: "09:00 - 16:00" },
                  { d: "Domingos", h: "Sob Agendamento" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm items-center border-b border-gray-50 pb-4">
                    <span className="font-bold text-gray-400">{item.d}</span>
                    <span className="font-black text-brand-blue bg-gray-50 px-3 py-1 rounded-lg">{item.h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="text-center pt-12 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em]">© 2024 Street Multimarcas - Elite Seminovos</p>
            <div className="flex gap-8 text-[10px] font-black text-brand-blue/30 uppercase tracking-widest">
              <a href="#" className="hover:text-brand-red transition-colors">Privacidade</a>
              <a href="#" className="hover:text-brand-red transition-colors">Termos</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal is global */}
      <AnimatePresence>
        {isModalOpen && (
          <CarModal 
            car={selectedCar} 
            isOpen={isModalOpen} 
            onClose={handleCloseDetails} 
            onSimulate={handleSimulate}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
