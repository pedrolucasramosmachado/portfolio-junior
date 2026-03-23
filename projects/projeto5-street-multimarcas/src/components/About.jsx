import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="sobre-nós" className="py-32 bg-white overflow-hidden relative">
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-24">
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative group"
          >
            <div className="absolute -top-12 -left-12 w-40 h-40 bg-brand-red/5 rounded-full blur-3xl group-hover:bg-brand-red/10 transition-colors"></div>
            <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl"></div>
            
            <div className="relative rounded-[60px] overflow-hidden shadow-2xl transform transition-transform duration-700 hover:scale-[1.02]">
              <img 
                src="https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&q=80&w=1200" 
                alt="Showroom Caju Multimarcas" 
                className="w-full object-cover h-[600px] brightness-90 group-hover:brightness-100 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/60 to-transparent"></div>
              
              <div className="absolute bottom-10 left-10 right-10 bg-white/10 backdrop-blur-2xl p-8 rounded-[40px] border border-white/20 shadow-2xl">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-brand-red rounded-3xl flex items-center justify-center text-white text-2xl shadow-xl">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-xl">Transparência Total</h4>
                    <p className="text-white/70 text-sm font-medium">Cada carro tem sua história documentada.</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <span className="inline-block bg-brand-red/10 text-brand-red font-black uppercase tracking-[0.4em] text-[10px] mb-8 border border-brand-red/20 px-4 py-2 rounded-lg italic">
              Nossa Essência
            </span>
            <h2 className="font-outfit text-5xl lg:text-7xl font-black text-brand-blue leading-[1] mb-10 tracking-tighter uppercase italic">
              Não vendemos carros, <br />
              <span className="text-brand-red not-italic px-4 bg-gray-50 rounded-2xl block mt-4">entregamos conquistas.</span>
            </h2>
            <p className="text-gray-500 text-xl leading-relaxed mb-12 font-medium italic">
              A <strong>Street Multimarcas</strong> nasceu em São Paulo-SP com uma missão clara: tornar o sonho do carro novo uma jornada segura, leve e prazerosa.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-10 mb-14">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red transform -rotate-12 group-hover:rotate-0 transition-all">
                  <i className="fas fa-certificate text-xl"></i>
                </div>
                <h5 className="font-black text-brand-blue text-lg uppercase tracking-tight">Perícia Cautelar</h5>
                <p className="text-gray-400 text-sm leading-relaxed">100% dos nossos veículos são aprovados em laudos rigorosos antes de chegarem até você.</p>
              </div>
              <div className="space-y-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center text-brand-red transform rotate-6 group-hover:rotate-0 transition-all">
                  <i className="fas fa-shield-alt text-xl"></i>
                </div>
                <h5 className="font-black text-brand-blue text-lg uppercase tracking-tight">Garantia Real</h5>
                <p className="text-gray-400 text-sm leading-relaxed">Suporte pós-venda que você realmente pode confiar. Estamos aqui para o que precisar.</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-6 pt-6 border-t border-gray-100">
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-brand-blue">15+</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Anos de <br />Experiência</span>
              </div>
              <div className="w-px h-10 bg-gray-100"></div>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-black text-brand-blue">5k+</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Sonhos <br />Realizados</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

