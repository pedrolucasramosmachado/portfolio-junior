import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const FinancingSimulator = ({ initialValue }) => {
  const [carValue, setCarValue] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [installments, setInstallments] = useState(48);

  useEffect(() => {
    if (initialValue) {
      setCarValue(initialValue);
      // Adjust down payment to be 20% by default if value is set from outside
      setDownPayment(Math.floor(initialValue * 0.2));
    }
  }, [initialValue]);

  const calculateInstallment = () => {
    const amountToFinance = carValue - downPayment;
    if (amountToFinance <= 0) return 0;
    
    // Simple interest rate for simulation (approx 1.5% per month)
    const monthlyRate = 0.015;
    const payment = (amountToFinance * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -installments));
    return payment.toFixed(2);
  };

  const installmentValue = calculateInstallment();

  return (
    <section id="financiamento" className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-[40px] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100">
          
          {/* Form Side */}
          <div className="p-10 md:p-16 flex-1">
            <span className="inline-block bg-brand-red/10 text-brand-red font-black uppercase tracking-[0.4em] text-[10px] mb-6 px-4 py-2 rounded-lg italic">
              Simulador de Crédito
            </span>
            <h2 className="font-outfit text-4xl font-black text-brand-blue mb-8 tracking-tighter uppercase italic leading-[1]">
              Simule seu <br />
              <span className="text-brand-red not-italic px-3 bg-gray-50 rounded-xl inline-block mt-2">financiamento.</span>
            </h2>

            <div className="space-y-8">
              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Valor do Veículo (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                  <input 
                    type="number" 
                    value={carValue}
                    onChange={(e) => setCarValue(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-red/20 focus:bg-white rounded-2xl py-4 pl-12 pr-6 outline-none transition-all font-bold text-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Valor da Entrada (R$)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-gray-400">R$</span>
                  <input 
                    type="number" 
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full bg-gray-50 border-2 border-transparent focus:border-brand-red/20 focus:bg-white rounded-2xl py-4 pl-12 pr-6 outline-none transition-all font-bold text-brand-blue"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">Plano de Parcelas</label>
                <div className="grid grid-cols-3 gap-3">
                  {[12, 24, 36, 48, 60].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setInstallments(opt)}
                      className={`py-3 rounded-xl font-black text-xs transition-all border-2 ${
                        installments === opt 
                        ? 'bg-brand-blue border-brand-blue text-white shadow-lg' 
                        : 'bg-white border-gray-100 text-gray-400 hover:border-gray-200'
                      }`}
                    >
                      {opt}x
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="md:w-[400px] bg-brand-blue p-10 md:p-16 flex flex-col justify-center relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-red/20 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 text-center">
              <p className="text-white/60 font-black uppercase tracking-[0.3em] text-[10px] mb-4">Parcelas estimadas de</p>
              <div className="text-white mb-2">
                <span className="text-2xl font-bold align-top mt-2 inline-block">R$</span>
                <span className="text-6xl lg:text-7xl font-black italic tracking-tighter">{installmentValue}</span>
              </div>
              <div className="w-12 h-1 bg-brand-red mx-auto my-8 rounded-full"></div>
              
              <div className="space-y-4 mb-10">
                <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  <span>Financiado:</span>
                  <span className="text-white">R$ {(carValue - downPayment).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center text-[10px] font-bold text-white/40 uppercase tracking-widest">
                  <span>Taxa mensal:</span>
                  <span className="text-white">~1.5% a.m.</span>
                </div>
              </div>

              <a 
                href="https://wa.me/554799999999" 
                target="_blank"
                className="block w-full bg-brand-red hover:bg-white hover:text-brand-blue text-white py-5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-xl shadow-black/20"
              >
                Solicitar Aprovação
              </a>
              <p className="mt-6 text-[8px] text-white/30 uppercase font-bold tracking-widest">
                * valor aproximado sujeito a análise de crédito
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FinancingSimulator;
