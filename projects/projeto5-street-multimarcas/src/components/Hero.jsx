import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-blue">
      {/* Background with cinematic car image - Full Integration */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[20s] hover:scale-110"
          style={{ 
            backgroundImage: "url('/hero-bg.png')",
            filter: 'brightness(0.9)'
          }}
        ></div>
        
        {/* Overlays for depth and professional look (Stitch style) */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue via-brand-blue/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-brand-blue to-transparent"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 w-full">
        <div className="max-w-4xl p-6 lg:p-12 rounded-[40px] lg:rounded-[60px] bg-black/10 backdrop-blur-md border border-white/10 shadow-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 bg-brand-red text-white px-4 lg:px-6 py-2 rounded-full text-[9px] lg:text-[11px] font-black uppercase tracking-[0.3em] mb-6 lg:mb-8 shadow-xl">
              <i className="fas fa-star text-[10px]"></i>
              O carro dos seus sonhos está aqui
            </span>
            
            <h1 className="font-outfit text-4xl lg:text-7xl xl:text-8xl font-black text-white leading-none mb-6 lg:mb-8 tracking-tighter uppercase italic">
              Acelere sua <br />
              <span className="text-brand-red not-italic px-4 py-1 bg-white inline-block mt-2 lg:mt-0 lg:ml-2 rounded-2xl">liberdade</span>
            </h1>
            
            <p className="text-white/80 text-base lg:text-xl font-medium max-w-2xl leading-relaxed mb-8 lg:mb-12 drop-shadow-lg">
              A Street Multimarcas une a maior variedade de veículos de São Paulo-SP com a confiança que você merece. Sua nova jornada começa com a chave na mão.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href="#estoque" 
                className="bg-brand-red text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-2xl shadow-red-600/40 text-center"
              >
                Explorar Destaques
              </motion.a>
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/10 backdrop-blur-2xl border border-white/20 text-white px-10 py-5 rounded-xl font-black uppercase tracking-widest text-xs transition-all text-center hover:bg-white/20"
              >
                Agendar Test Drive
              </motion.button>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Decorative elements - Stitch Style */}
      <div className="absolute right-0 top-1/4 w-1/3 h-1/2 bg-brand-red/10 blur-[120px] rounded-full pointer-events-none"></div>
    </section>
  );
}

