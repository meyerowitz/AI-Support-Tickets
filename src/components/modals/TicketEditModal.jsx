"use client";
import { useState, useEffect } from "react";
import { X, FileText, Heading, Save, Loader2 } from "lucide-react";

export default function TicketEditModal({ ticket, onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isSaving, setIsSaving] = useState(false); // 🔄 Estado para controlar la carga del guardado

  // Sincronizar el estado interno cuando el ticket cambia o se abre
  useEffect(() => {
    if (ticket) {
      setTitle(ticket.title);
      setDescription(ticket.description);
      setIsSaving(false); // Reseteamos el estado de carga al cambiar de ticket
    }
  }, [ticket]);

  if (!ticket) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert("Por favor, rellena todos los campos.");
      return;
    }

    try {
      setIsSaving(true);
      // Ejecuta la función onSave que maneja la persistencia en Supabase
      await onSave(ticket.id, { title, description });
    } catch (error) {
      console.error("Error al guardar desde el modal:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={isSaving ? null : onClose} // Bloquea el cierre si está guardando
    >
      <div 
        className="bg-white w-full max-w-xl rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()} // Previene el cierre al hacer clic adentro
      >
        {/* Header del Modal */}
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md tracking-wider uppercase">
              Modificar Ticket
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Editar {ticket.display_id || `TCK-${ticket.id.toString().slice(0, 4)}`}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            disabled={isSaving}
            className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all shadow-sm disabled:opacity-50"
          >
            <X size={16} />
          </button>
        </div>

        {/* Formulario / Cuerpo */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {/* Campo: Título */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <Heading size={12} /> Título de la incidencia
            </label>
            <input
              type="text"
              disabled={isSaving}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Error al procesar el pago"
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all font-medium disabled:opacity-60"
            />
          </div>

          {/* Campo: Descripción */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
              <FileText size={12} /> Detalles del problema
            </label>
            <textarea
              rows={5}
              disabled={isSaving}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe detalladamente lo que ocurre..."
              className="w-full text-xs text-slate-800 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-50 transition-all leading-relaxed font-medium resize-none disabled:opacity-60"
            />
          </div>

          {/* Footer de Acciones del Formulario */}
          <div className="border-t border-gray-50 pt-4 flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-xl transition-all shadow-sm disabled:opacity-50"
            >
              Cancelar
            </button>
            
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-blue-100 flex items-center gap-1.5 disabled:bg-blue-400"
            >
              {isSaving ? (
                <>
                  <Loader2 size={12} className="animate-spin" />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={12} />
                  Guardar Cambios
                </>
              )}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}