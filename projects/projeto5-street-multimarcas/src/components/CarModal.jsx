import { motion, AnimatePresence } from 'framer-motion';

const CarModal = ({ car, isOpen, onClose, onSimulate }) => {
  if (!isOpen || !car) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-10 overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-brand-blue/95 backdrop-blur-xl"
        />
        
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="bg-white w-full max-w-7xl h-full md:h-auto md:max-h-[90vh] md:rounded-[60px] shadow-2xl relative z-10 overflow-hidden flex flex-col lg:grid lg:grid-cols-12"
        >
          <button 
            onClick={onClose}
            className="absolute top-8 right-8 w-14 h-14 bg-white/10 hover:bg-brand-red text-white backdrop-blur-md rounded-full flex items-center justify-center transition-all z-50 border border-white/20"
          >
            <i className="fas fa-times text-xl"></i>
          </button>

          {/* Left: Cinematic Image Section */}
          <div className="lg:col-span-7 h-[40vh] lg:h-auto relative overflow-hidden group">
            <img 
              src={car.image} 
              alt={car.model} 
              className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/80 via-transparent to-transparent"></div>
            <div className="absolute bottom-12 left-12 right-12">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-brand-red text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block shadow-2xl shadow-red-500/40 italic"
              >
                Pronta Entrega
              </motion.span>
              <h2 className="text-white text-5xl lg:text-7xl font-black font-outfit leading-none uppercase italic tracking-tighter">
                {car.brand} <br />
                <span className="text-brand-red not-italic">{car.model}</span>
              </h2>
            </div>
          </div>

          {/* Right: Premium Details Section */}
          <div className="lg:col-span-5 p-10 lg:p-16 overflow-y-auto bg-gray-50/30">
            <div className="flex justify-between items-end mb-12">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-2 font-inter">Preço de Repasse</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-black text-brand-blue/40 uppercase">R$</span>
                  <p className="text-5xl lg:text-6xl font-black text-brand-blue font-outfit tracking-tighter italic">
                    {car.price.toLocaleString('pt-BR')}
                  </p>
                </div>
              </div>
              <div className="bg-brand-blue text-white w-20 h-20 rounded-3xl flex flex-col items-center justify-center shadow-xl rotate-3">
                <span className="text-[10px] font-black uppercase text-white/50 leading-none mb-1">Ano</span>
                <span className="text-xl font-black leading-none">{car.year}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-12">
              {[
                { label: 'KM', value: car.km, icon: 'tachometer-alt', color: 'text-red-500' },
                { label: 'Câmbio', value: car.transmission, icon: 'cog', color: 'text-blue-500' },
                { label: 'Cor', value: car.color, icon: 'palette', color: 'text-gray-500' },
                { label: 'Motor', value: car.engine, icon: 'bolt', color: 'text-yellow-500' },
                { label: 'Flex', value: car.fuel, icon: 'gas-pump', color: 'text-green-500' }
              ].map(spec => (
                <div key={spec.label} className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm hover:border-brand-red/20 transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-8 h-8 rounded-xl bg-gray-50 flex items-center justify-center ${spec.color}`}>
                      <i className={`fas fa-${spec.icon} text-xs`}></i>
                    </div>
                    <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">{spec.label}</span>
                  </div>
                  <p className="font-black text-brand-blue text-sm uppercase truncate">{spec.value}</p>
                </div>
              ))}
            </div>

            <div className="mb-12">
              <h4 className="text-[10px] font-black text-brand-blue uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                <span className="w-8 h-[2px] bg-brand-red rounded-full"></span>
                Destaques do Veículo
              </h4>
              <p className="text-gray-500 leading-relaxed text-sm font-medium italic">
                {car.description}
              </p>
            </div>

            <div className="grid gap-4">
              <a 
                href={`https://wa.me/554799999999?text=Olá Caju! Tenho interesse no ${car.brand} ${car.model} (${car.year}) que vi no site de vocês.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-brand-red hover:bg-brand-blue text-white py-6 rounded-2xl flex items-center justify-center gap-4 font-black uppercase tracking-[0.2em] text-[11px] shadow-2xl shadow-red-500/20 transition-all hover:-translate-y-1 active:scale-95"
              >
                <i className="fab fa-whatsapp text-xl"></i>
                Falar com Consultor
              </a>
              <button 
                onClick={() => onSimulate(car.price)}
                className="w-full bg-brand-blue/5 text-brand-blue py-6 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] transition-all hover:bg-brand-blue/10"
              >
                Simular Financiamento
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default CarModal;

