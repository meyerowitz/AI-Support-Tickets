import Link from "next/link";
import Beams from "@/components/ui/Beams"; // Ajusta la ruta si es necesario
import Fondo from "@/assets/fondo.jpg";

export default function Hero() {
  return (
    <section 
      style={{ backgroundImage: `url(${Fondo.src})` }} 
      className="bg-cover bg-center relative min-h-screen bg-no-repeat pt-32 pb-24 overflow-hidden px-6 flex flex-col items-center justify-center"
    >
      
      {/* CONTENEDOR DE BEAMS TRANSPARENTE EN EL FONDO 
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
      */}
      {/* Luces y Efectos de Gradiente de Fondo originales */}
      <div className="absolute top-[-20%] left-[10%] w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[10%] right-[-10%] w-[500px] h-[500px] bg-indigo-500/10 blur-[130px] rounded-full pointer-events-none z-0" />

      {/* CONTENIDO PRINCIPAL DE LA UI */}
      <div className="relative mx-auto max-w-7xl w-full text-center flex flex-col items-center z-10">
        
        {/* Píldora Promocional Superior */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs text-blue-300 backdrop-blur-sm">
          <span>Resolve Faster With AI Support.Ai</span>
        </div>

        {/* Título Principal Estilo AirLume */}
        <h1 className="max-w-4xl text-4xl font-extrabold tracking-tight text-white sm:text-6xl md:text-7xl leading-[1.1]">
          Save Time & Money <br />
          <span className="bg-gradient-to-r from-blue-400 via-indigo-200 to-white bg-clip-text text-transparent">
            On Every Ticket
          </span>
        </h1>

        <p className="mt-6 max-w-xl text-base text-gray-400 sm:text-lg">
          Automate classifications, predict escalations, and handle user requests effortlessly with our intelligent platform.
        </p>

        {/* Botón Central de Búsqueda/Acción */}
        <div className="mt-10">
          <Link href="/dashboard" className="inline-flex items-center gap-3 bg-white hover:bg-gray-100 text-[#050b24] font-semibold px-8 py-4 rounded-full transition-all shadow-xl text-sm">
            <span>Explore Dashboard Now</span>
            <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs">→</div>
          </Link>
        </div>

        {/* GRUPO DE TARJETAS FLOTANTES */}
        <div className="mt-20 w-full grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-5xl">
          {/* ... Tus 3 hermosas tarjetas se quedan exactamente igual ... */}
          {/* Tarjeta 1, Tarjeta 2 y Tarjeta 3 */}
          <div className="bg-white text-left p-6 rounded-3xl shadow-2xl flex flex-col justify-between border border-gray-100 transform -rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Contenido tarjeta 1 */}
            <div>
              <span className="text-xs font-bold text-indigo-900 tracking-wider uppercase">Auto-Resolved</span>
              <h3 className="text-4xl font-black text-[#050b24] mt-2">13,200</h3>
              <p className="text-xs text-gray-400 mt-1">Tickets answered instantly</p>
            </div>
            <div className="mt-8 h-20 w-full bg-gray-50 border border-dashed border-gray-200 rounded-xl flex items-center justify-center text-xs text-gray-400">
              [ Placeholder: Gráfico de Líneas ]
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl shadow-2xl border border-gray-100 text-left flex flex-col justify-between transform md:translate-y-6 transition-transform duration-300">
            {/* Contenido tarjeta 2 */}
            <div>
              <span className="inline-block bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                AI Smart Routing
              </span>
              <h4 className="text-lg font-bold text-[#050b24] mt-3">Scanning Incidents In Real-Time</h4>
              <p className="text-xs text-gray-500 mt-1">94% precision accuracy in categorization</p>
            </div>
            <div className="mt-6 h-36 w-full bg-gray-100 rounded-2xl overflow-hidden relative border border-gray-200 flex items-center justify-center text-xs text-gray-400">
              [ Placeholder: Imagen Principal ]
            </div>
          </div>

          <div className="bg-white/10 text-left p-6 rounded-3xl border border-white/10 backdrop-blur-md flex flex-col justify-between transform rotate-1 hover:rotate-0 transition-transform duration-300">
            {/* Contenido tarjeta 3 */}
            <div>
              <span className="text-xs text-blue-300 font-medium">Critical Risk Detector</span>
              <h3 className="text-xl font-bold text-white mt-3">High Priority Detected</h3>
              <p className="text-xs text-gray-400 mt-1">Saves up to 28% SLA breaches using predictions</p>
            </div>
            <div className="mt-12 h-24 w-full bg-white/5 border border-dashed border-white/10 rounded-xl flex items-center justify-center text-xs text-gray-400">
              [ Placeholder: Vista de Detalle ]
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}