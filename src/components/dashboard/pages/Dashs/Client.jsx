"use client";
import { useState } from "react";
import { 
  Sparkles, 
  PlusCircle, 
  HelpCircle, 
  X, 
  Send,
  AlertCircle
} from "lucide-react";

export default function Client() {
  // 1. Estado para abrir/cerrar el modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // 2. Estado para los campos del ticket
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "media"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Ticket creado:", formData);
    // Aquí iría tu lógica de Firebase o API
    alert("¡Ticket enviado con éxito!");
    setIsModalOpen(false); // Cerrar al terminar
    setFormData({ title: "", description: "", priority: "media" }); // Limpiar
  };

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 py-10 animate-[fadeIn_0.5s_ease-out]">
      
      {/* --- CARD DE BIENVENIDA --- */}
      <div className="relative bg-gradient-to-tr from-slate-900 to-blue-950 p-8 rounded-[32px] text-white overflow-hidden shadow-xl shadow-blue-950/10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl text-blue-400 animate-bounce mb-2">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">¡Hola de nuevo!</h1>
          <p className="text-blue-200/80 text-sm max-w-md mx-auto leading-relaxed">
            Bienvenido al centro de soporte automatizado con IA. ¿Qué podemos solucionar por ti el día de hoy?
          </p>
        </div>
      </div>

      {/* --- ACCIONES PRINCIPALES --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* BOTÓN QUE ABRE EL MODAL */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 bg-white border border-gray-100 hover:border-blue-500 rounded-2xl shadow-sm text-left transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
            <PlusCircle size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Reportar una Incidencia</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">Abre un nuevo ticket y nuestra IA lo asignará al equipo correcto de inmediato.</p>
        </button>

        <button 
          onClick={() => alert("Próximamente: Base de Conocimientos con IA")}
          className="p-6 bg-white border border-gray-100 hover:border-indigo-500 rounded-2xl shadow-sm text-left transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors mb-4">
            <HelpCircle size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Centro de Ayuda Inteligente</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">Resuelve tus dudas al instante consultando nuestra documentación interactiva.</p>
        </button>
      </div>


      {/* ─── MODAL COMPONENT ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
          {/* Backdrop (Fondo oscuro con desenfoque) */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={() => setIsModalOpen(false)} 
          />

          {/* Contenedor del Modal */}
          <div className="relative bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden animate-[zoomIn_0.3s_ease-out]">
            
            {/* Header del Modal */}
            <div className="bg-slate-50 px-8 py-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <PlusCircle size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Crear Nuevo Ticket</h2>
                  <p className="text-[11px] text-slate-400 font-medium">Completa los detalles de tu solicitud</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors text-slate-400"
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              
              {/* Campo Título */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Asunto</label>
                <input 
                  type="text"
                  required
                  placeholder="Ej: Problema con el inicio de sesión"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              {/* Campo Prioridad */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Prioridad</label>
                <div className="grid grid-cols-3 gap-2">
                  {['baja', 'media', 'alta'].map((prio) => (
                    <button
                      key={prio}
                      type="button"
                      onClick={() => setFormData({...formData, priority: prio})}
                      className={`py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider transition-all border ${
                        formData.priority === prio 
                        ? "bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/20" 
                        : "bg-white border-slate-200 text-slate-400 hover:border-slate-300"
                      }`}
                    >
                      {prio}
                    </button>
                  ))}
                </div>
              </div>

              {/* Campo Descripción */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Descripción detallada</label>
                <textarea 
                  required
                  rows={4}
                  placeholder="Cuéntanos más detalles para poder ayudarte mejor..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Botón de envío */}
              <button 
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Enviar Reporte</span>
                <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}