"use client";
import { useState, useEffect } from "react"; // 🚀 Corregido: Se añade useEffect
import { 
  Sparkles, 
  PlusCircle, 
  HelpCircle, 
  X, 
  Send,
  Loader2 // 💡 Usado para la animación de carga del envío
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";

export default function Client() {
  // 1. Estados de control de interfaz y sesión
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [userId, setUserId] = useState(null); 

  // 2. Recuperar el ID del usuario autenticado de forma segura al montar
  useEffect(() => {
    const getUser = async () => {
      
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUserId(session.user.id);
      }
    };
    getUser();
  }, []);

  // 3. Estado exclusivo de los campos del formulario (Se elimina la prioridad)
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // 🚀 LÓGICA DE INSERCIÓN EN LA BASE DE DATOS
  const handleSubmit2 = async (e) => {
    e.preventDefault(); 
    if (!userId) {
      alert("Error: No se pudo identificar tu sesión de usuario. Intenta iniciar sesión nuevamente.");
      return;
    }
    setIsSubmitting(true);
    try {
      // Mapeamos las columnas exactas requeridas por tu DER en Supabase
      const { error } = await supabase
        .from("tickets")
        .insert([
          {
            title: formData.title,
            description: formData.description,
            status: "en-progreso", // Estado inicial por defecto
            user_id: userId,    // Relación estructural FK con profiles.id
            display_id: `TCK-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`
          }
        ])
        .select()
        .single();
      if (error) throw error;
      setIsModalOpen(false); // Cerramos el modal
      setFormData({ title: "", description: "" }); // Reseteamos inputs     
    } catch (err) {
      console.error("💥 Error al crear el ticket:", err.message);
      alert(`No se pudo crear el ticket: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault(); 
  if (!userId) {
    alert("Error: No se pudo identificar tu sesión de usuario. Intenta iniciar sesión nuevamente.");
    return;
  }
  setIsSubmitting(true);
  try {
    // 1. Guardamos el resultado del insert en la constante 'data'
    const { data, error } = await supabase
      .from("tickets")
      .insert([
        {
          title: formData.title,
          description: formData.description,
          status: "en-progreso", // Estado inicial por defecto
          user_id: userId,    // Relación estructural FK con profiles.id
          display_id: `TCK-${Date.now().toString().slice(-4)}${Math.floor(10 + Math.random() * 90)}`
        }
      ])
      .select()
      .single();

    if (error) throw error;

    // 2. ¡DISPARO INMEDIATO A N8N! Si la base de datos devolvió el ticket con éxito:
    if (data) {
      // ⚠️ REEMPLAZA ESTA URL POR LA "TEST URL" O "PRODUCTION URL" DE TU WEBHOOK DE N8N
      const N8N_WEBHOOK_URL = "https://rebecaa.app.n8n.cloud/webhook/v1/process-ticket"; 

      // Enviamos el ID real, el título y la descripción en formato JSON
      fetch(N8N_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          ticket_id: data.id,
          title: data.title,
          description: data.description
        }),
      }).catch(err => console.error("⚠️ Error al despertar a n8n:", err));
    }

    setIsModalOpen(false); // Cerramos el modal
    setFormData({ title: "", description: "" }); // Reseteamos inputs     
  } catch (err) {
    console.error("💥 Error al crear el ticket:", err.message);
    alert(`No se pudo crear el ticket: ${err.message}`);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <div className="max-w-3xl mx-auto text-center space-y-8 py-10 animate-[fadeIn_0.5s_ease-out]">
      
      {/* ─── CARD DE BIENVENIDA ─── */}
      <div className="relative bg-gradient-to-tr from-slate-900 to-blue-950 p-8 rounded-[32px] text-white overflow-hidden shadow-xl shadow-blue-950/10">
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-2xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-indigo-500/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 space-y-3">
          <div className="inline-flex p-3 bg-white/10 backdrop-blur-md rounded-2xl text-blue-400 animate-bounce mb-2">
            <Sparkles size={28} />
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">¡Hola de nuevo!</h1>
          <p className="text-blue-200/80 text-sm max-w-md mx-auto leading-relaxed">
            Bienvenido al centro de soporte automatizado con IA. ¿Qué podemos sugerencias podemos dar por ti el día de hoy?
          </p>
        </div>
      </div>

      {/* ─── ACCIONES PRINCIPALES ─── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        
        {/* Botón que despliega el Modal */}
        <button 
          onClick={() => setIsModalOpen(true)}
          className="p-6 bg-white border border-gray-100 hover:border-blue-500 rounded-2xl shadow-sm text-left transition-all duration-300 group hover:-translate-y-1"
        >
          <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors mb-4">
            <PlusCircle size={20} />
          </div>
          <h3 className="font-bold text-gray-900 text-sm">Reportar una Incidencia</h3>
          <p className="text-xs text-gray-400 mt-1 leading-relaxed">Abre un nuevo ticket y nuestra IA procesará y evaluará la prioridad del caso al instante.</p>
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

      {/* ─── MODAL COMPONENT OPTIMIZADO ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[99] flex items-center justify-center p-4">
          
          {/* Capa de desenfoque de fondo */}
          <div 
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
            onClick={!isSubmitting ? () => setIsModalOpen(false) : undefined} 
          />

          {/* Tarjeta del cuerpo del Modal */}
          <div className="relative bg-white w-full max-w-lg rounded-[28px] shadow-2xl overflow-hidden animate-[zoomIn_0.3s_ease-out]">
            
            {/* Header del Modal */}
            <div className="bg-slate-50 px-8 py-6 flex items-center justify-between border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 text-white rounded-lg">
                  <PlusCircle size={18} />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900">Crear Nuevo Ticket</h2>
                  <p className="text-[11px] text-slate-400 font-medium">La IA calculará la urgencia en base a tu descripción</p>
                </div>
              </div>
              {!isSubmitting && (
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-gray-200 rounded-full transition-colors text-slate-400"
                >
                  <X size={20} />
                </button>
              )}
            </div>

            {/* Formulario de Solicitud */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              
              {/* Campo Asunto */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Asunto / Título</label>
                <input 
                  type="text"
                  required
                  disabled={isSubmitting}
                  placeholder="Ej: Caída del servicio en producción o error de login"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all disabled:opacity-50"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                />
              </div>

              {/* Campo Descripción Detallada */}
              <div className="space-y-1.5 text-left">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-1">Descripción detallada</label>
                <textarea 
                  required
                  disabled={isSubmitting}
                  rows={5}
                  placeholder="Por favor, describe el inconveniente de la forma más detallada posible. Nuestro modelo de IA analizará este texto para clasificar el nivel de criticidad del caso."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none disabled:opacity-50"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              {/* Botón de Envío con Estado de Carga */}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl text-sm shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2 group active:scale-95 disabled:bg-blue-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Analizando y resguardando...</span>
                  </>
                ) : (
                  <>
                    <span>Enviar Reporte Técnico</span>
                    <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}