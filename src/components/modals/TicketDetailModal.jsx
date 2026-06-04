"use client";
import { 
  X, 
  Calendar, 
  FileText, 
  Tag, 
  Sparkles, 
  Loader2, 
  AlertCircle, 
  RefreshCw 
} from "lucide-react";

export default function TicketDetailModal({ 
  ticket, 
  onClose, 
  isAIProcessing, 
  onRetry 
}) {
  if (!ticket) return null;

  // Detecta si fue cancelado o quedó a mitad de camino sin procesar
  const isFailedOrCancelled = ticket.status === "en-progreso" && !ticket.ai_summary && !isAIProcessing;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div 
        className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[90vh] animate-[slideUp_0.25s_ease-out]"
        onClick={(e) => e.stopPropagation()} // Evita cerrar si clickeas dentro
      >
        {/* Header del Modal */}
        <div className="p-6 border-b border-gray-100 bg-slate-50/50 flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-md tracking-wider">
                {ticket.display_id}
              </span>
              <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                ${ticket.status === 'abierto' ? 'bg-red-50 text-red-600' : ''}
                ${ticket.status === 'en-progreso' ? 'bg-amber-50 text-amber-600' : ''}
                ${ticket.status === 'resuelto' ? 'bg-emerald-50 text-emerald-600' : ''}
              `}>
                {ticket.status === 'en-progreso' ? "En progreso" : ticket.status}
              </span>
              {isAIProcessing && (
                <span className="text-[9px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md animate-pulse">
                  IA Procesando
                </span>
              )}
            </div>
            <h3 className="text-lg font-bold text-slate-900 mt-1">
              {ticket.title}
            </h3>
          </div>
          
          <button 
            onClick={onClose}
            className="p-1.5 rounded-xl border border-gray-200 text-gray-400 hover:text-slate-900 hover:bg-gray-100 transition-all shadow-sm"
          >
            <X size={16} />
          </button>
        </div>

        {/* Cuerpo del Modal */}
        <div className="p-6 overflow-y-auto space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            
            {/* Columna Izquierda: Descripción */}
            <div className="md:col-span-2 space-y-2">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                <FileText size={12} /> Descripción de la Incidencia
              </span>
              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100 whitespace-pre-wrap">
                {ticket.description}
              </p>
            </div>

            {/* Columna Derecha: Metadatos */}
            <div className="bg-slate-50/50 border border-slate-100 rounded-xl p-4 space-y-3 h-fit text-xs">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                Detalles del Ticket
              </span>
              
              <div className="space-y-2.5 pt-1">
                <div>
                  <span className="text-gray-400 block text-[10px]">Fecha de creación:</span>
                  <div className="flex items-center gap-1.5 font-medium text-slate-700 mt-0.5">
                    <Calendar size={12} className="text-gray-400" />
                    {new Date(ticket.created_at).toLocaleString("es-ES")}
                  </div>
                </div>

                <div>
                  <span className="text-gray-400 block text-[10px]">Prioridad Asignada:</span>
                  <div className="flex items-center gap-1.5 font-bold mt-0.5">
                    <Tag size={12} className="text-gray-400" />
                    <span className={`uppercase tracking-wide ${
                      ticket.priority === 'alta' ? 'text-red-500' : ticket.priority === 'media' ? 'text-amber-500' : 'text-slate-500'
                    }`}>
                      {ticket.priority || "Evaluando..."}
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Bloque Destacado: Análisis de IA */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider flex items-center gap-1">
              <Sparkles size={12} /> Resumen de Inteligencia Artificial
            </span>

            {ticket.ai_summary ? (
              <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/30 border border-blue-100 rounded-xl p-4 shadow-inner">
                <p className="text-xs italic text-slate-700 leading-relaxed font-medium">
                  "{ticket.ai_summary}"
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 text-center py-6 text-xs text-gray-400 flex flex-col items-center gap-2">
                {isAIProcessing ? (
                  <>
                    <Loader2 size={16} className="animate-spin text-indigo-500" />
                    <span>Claude está analizando la solicitud en este momento...</span>
                  </>
                ) : (
                  <>
                    <AlertCircle size={16} className="text-amber-500" />
                    <span>No hay un resumen disponible. El pipeline fue interrumpido.</span>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Footer del Modal */}
        <div className="p-4 bg-slate-50 border-t border-gray-100 flex justify-end gap-2">
          {isFailedOrCancelled && (
            <button
              onClick={() => onRetry(ticket.id)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-100 flex items-center gap-1.5"
            >
              <RefreshCw size={12} />
              Reintentar Flujo IA
            </button>
          )}
          
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-200 text-gray-600 hover:bg-gray-50 text-xs font-bold rounded-xl transition-all shadow-sm"
          >
            Cerrar Vista
          </button>
        </div>

      </div>
    </div>
  );
}