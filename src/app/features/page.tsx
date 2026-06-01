"use client"
import { Shield, Zap, BarChart3 } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

export default function Features() {
  const featuresList = [
    {
      icon: <Zap className="w-6 h-6 text-blue-400" />,
      title: "Real-Time Classification",
      description: "Automate and categorize incoming user requests instantly with our advanced machine learning models."
    },
    {
      icon: <Shield className="w-6 h-6 text-indigo-400" />,
      title: "Predictive Escalation",
      description: "Detect critical risks and prevent SLA breaches before they happen using smart internal risk monitors."
    },
    {
      icon: <BarChart3 className="w-6 h-6 text-purple-400" />,
      title: "Intelligent Analytics",
      description: "Track automated resolutions, precision metrics, and performance overheads in a seamless dashboard."
    }
  ];

  return (
    <section className="bg-[#050b24] py-24 px-6 relative overflow-hidden">
      {/* Luces de fondo sutiles para dar continuidad al Hero */}
        <Navbar/>
      <div className="absolute top-[20%] right-[10%] w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Cabecera de la Sección */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full border border-blue-500/20">
            Core Features
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-5xl tracking-tight mt-4 leading-tight">
            Everything you need to <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
              scale your support AI
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-base sm:text-lg">
            Our platform integrates automated solutions designed to save time, reduce operational costs, and secure accurate routing.
          </p>
        </div>

        {/* Cuadrícula de Tarjetas (Features Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {featuresList.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white/5 border border-white/10 backdrop-blur-md p-8 rounded-3xl transition-all duration-300 hover:bg-white/[0.08] hover:border-white/20 hover:-translate-y-1 flex flex-col justify-between"
            >
              <div>
                {/* Contenedor del Icono */}
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 group-hover:border-blue-500/30 transition-all duration-300 mb-6">
                  {feature.icon}
                </div>
                
                {/* Título y Descripción */}
                <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="mt-3 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              {/* Pequeño enlace decorativo */}
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-gray-400 group-hover:text-white transition-colors duration-300 cursor-pointer">
                <span>Learn more</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}