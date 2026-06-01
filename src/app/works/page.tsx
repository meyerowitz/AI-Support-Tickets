import { ArrowRight, Terminal, Brain, LayoutDashboard } from "lucide-react";
import Navbar
 from "@/components/landing/Navbar";
import Beams from "@/components/ui/Beams";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      title: "Connect Your Data Channels",
      description: "Integrate your user tickets, emails, or industrial logs into our secure pipeline in just a few clicks."
    },
    {
      number: "02",
      icon: <Brain className="w-5 h-5 text-indigo-400" />,
      title: "AI Analysis & Processing",
      description: "Our trained natural language processing models scan, classify, and predict critical anomalies or priorities instantly."
    },
    {
      number: "03",
      icon: <LayoutDashboard className="w-5 h-5 text-purple-400" />,
      title: "Explore the Dashboard",
      description: "Visualize automated resolutions, track costs, and handle operational metrics from a single automated interface."
    }
  ];

  return (
    <section className="bg-[#050b24] py-24 px-6 relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-35"> 
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#ffffff"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      {/* Detalle de luz ambiental difusa abajo a la izquierda */}
        <Navbar></Navbar>
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-xs font-bold tracking-wider uppercase bg-indigo-500/10 text-indigo-300 px-4 py-1.5 rounded-full border border-indigo-500/20">
            The Process
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-5xl tracking-tight mt-4">
            Three simple steps to <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
              automate your workflow
            </span>
          </h2>
        </div>

        {/* Contenedor de Pasos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
          
          {/* Línea conectora decorativa para pantallas grandes */}
          <div className="hidden md:block absolute top-1/4 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-blue-500/30 via-indigo-500/20 to-transparent z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left group">
              
              {/* Burbuja del número y el icono */}
              <div className="flex items-center justify-center mb-6 relative">
                {/* Número flotante de fondo */}
                <span className="absolute -top-7 text-6xl font-black text-white/[0.02] select-none group-hover:text-blue-500/[0.05] transition-colors duration-300">
                  {step.number}
                </span>
                
                {/* Círculo del Icono */}
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md shadow-xl group-hover:border-indigo-500/40 group-hover:bg-white/[0.08] transition-all duration-300">
                  {step.icon}
                </div>

                {/* Flecha indicadora entre pasos (solo en Desktop, excepto el último) */}
                {index < 2 && (
                  <div className="hidden md:block absolute left-20 top-1/2 -translate-y-1/2 text-white/10 group-hover:text-indigo-400/40 transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                )}
              </div>

              {/* Textos del Paso */}
              <h3 className="text-xl font-semibold text-white mt-2 group-hover:text-blue-300 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-gray-400 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}