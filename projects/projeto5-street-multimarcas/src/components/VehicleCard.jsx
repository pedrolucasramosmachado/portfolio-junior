import { motion } from 'framer-motion';

export default function VehicleCard({ car, onOpenDetails, onSimulate }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group bg-white rounded-[40px] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-brand-blue/10 transition-all duration-500 flex flex-col h-full"
    >
      {/* Image Container */}
      <div 
        className="relative h-64 lg:h-72 overflow-hidden cursor-pointer shrink-0"
        onClick={() => onOpenDetails(car)}
      >
        <img 
          src={car.image} 
          alt={`${car.brand} ${car.model}`} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        
        {/* Floating Badges */}
        <div className="absolute top-6 left-6 flex flex-col gap-3">
          {car.highlight && (
            <span className="bg-brand-red text-white text-[9px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-xl shadow-xl shadow-red-500/30">
              Destaque
            </span>
          )}
          <span className="bg-white/90 backdrop-blur-xl text-brand-blue px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
            {car.year}
          </span>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-brand-blue/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
          <button className="bg-white text-brand-blue w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transform scale-0 group-hover:scale-100 transition-transform duration-500 delay-100">
            <i className="fas fa-plus text-xl"></i>
          </button>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-8 flex flex-col flex-1">
        <div className="mb-6">
          <div className="flex justify-between items-start mb-2">
            <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">{car.brand}</span>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <i className="fas fa-palette text-brand-blue text-[8px]"></i>
                <span className="text-[9px] font-black text-gray-500 uppercase">{car.color}</span>
              </div>
              <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                <i className="fas fa-gas-pump text-brand-red text-[8px]"></i>
                <span className="text-[9px] font-black text-gray-500 uppercase">{car.fuel}</span>
              </div>
            </div>
          </div>
          <h3 className="font-outfit text-2xl font-black text-brand-blue leading-tight group-hover:text-brand-red transition-colors uppercase italic tracking-tighter">
            {car.model}
          </h3>
        </div>
        
        <div className="flex items-center gap-6 mb-8 py-4 border-y border-gray-50">
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Quilometragem</span>
            <span className="text-xs font-black text-brand-blue">{car.km} KM</span>
          </div>
          <div className="w-px h-8 bg-gray-100"></div>
          <div className="flex flex-col">
            <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mb-1">Câmbio</span>
            <span className="text-xs font-black text-brand-blue uppercase">{car.transmission}</span>
          </div>
        </div>

        <div className="mt-auto">
          <div className="flex justify-between items-end mb-8">
            <div>
              <p className="text-[9px] font-black text-gray-400 uppercase tracking-[0.3em] mb-1">Preço à vista</p>
              <p className="text-3xl font-black text-brand-blue tracking-tighter">
                <span className="text-sm align-top mr-1">R$</span>
                {car.price.toLocaleString('pt-BR')}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => onOpenDetails(car)}
              className="bg-gray-100 hover:bg-gray-200 text-brand-blue py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all active:scale-95"
            >
              Ver Detalhes
            </button>
            <button 
              onClick={() => onSimulate(car.price)}
              className="bg-brand-blue hover:bg-brand-red text-white py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all shadow-xl hover:shadow-red-500/20 active:scale-95"
            >
              Simular
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

