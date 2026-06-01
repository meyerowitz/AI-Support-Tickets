"use client";
import { useState } from "react";
import { 
  PlusCircle, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Tag, 
  Sparkles 
} from "lucide-react";

// ─── 📦 DATOS DE PRUEBA INICIALES (TUS TICKETS) ───
const INITIAL_MY_TICKETS = [
  {
    id: "TCK-9912",
    title: "Error al exportar reporte PDF",
    description: "Cuando intento descargar el reporte analítico del mes, la página se queda congelada y no inicia la descarga.",
    priority: "alta",
    status: "abierto",
    created_at: "2026-06-01T02:00:00.000Z"
  },
  {
    id: "TCK-9905",
    title: "Solicitud de aumento de cuota API",
    description: "Necesitamos ampliar el límite de peticiones mensuales de IA para el entorno de producción de la empresa.",
    priority: "media",
    status: "en-progreso",
    created_at: "2026-05-28T11:45:00.000Z"
  }
];

export default function NewTicketsView() {
  const [myTickets, setMyTickets] = useState(INITIAL_MY_TICKETS);
  const [filter, setFilter] = useState("todos");

  // Estados del Formulario
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("baja");

  // 🚀 MANEJADOR DE CREACIÓN DE TICKET (Simulación local)
  const handleCreateTicket = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    // Generamos un ID aleatorio temporal
    const newId = `TCK-${Math.floor(1000 + Math.random() * 9000)}`;

    const newTicket = {
      id: newId,
      title: title.trim(),
      description: description.trim(),
      priority,
      status: "abierto", // Todo ticket nuevo entra como abierto
      created_at: new Date().toISOString()
    };

    // Añadimos el ticket al inicio de la lista
    setMyTickets([newTicket, ...myTickets]);

    // Limpiamos los campos del formulario
    setTitle("");
    setDescription("");
    setPriority("baja");
  };

  // Filtrado de la lista en tiempo real
  const filteredTickets = myTickets.filter(ticket => 
    filter === "todos" || ticket.status === filter
  );

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* HEADER PRINCIPAL */}
      <div>
        <h1 className="text-2xl font-bold text-[#050b24]">Centro de Soporte</h1>
        <p className="text-gray-500 text-sm mt-0.5">Crea nuevas solicitudes de asistencia y sigue su progreso en tiempo real.</p>
      </div>

      {/* ─── CONTENEDOR GRID DE DOS COLUMNAS ─── */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
        
        {/* COLUMNA 1: FORMULARIO DE CREACIÓN (Ocupa 2 de 5 columnas) */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-5 sticky top-6">
          <div className="flex items-center gap-2 pb-2 border-b border-gray-50">
            <PlusCircle className="text-blue-600" size={20} />
            <h2 className="text-base font-bold text-[#050b24]">Nuevo Ticket</h2>
          </div>

          <form onSubmit={handleCreateTicket} className="space-y-4">
            {/* Título */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Asunto del problema
              </label>
              <input
                type="text"
                placeholder="Ej. Error de carga en pasarela..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={80}
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-[#050b24] outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-gray-400"
              />
            </div>

            {/* Descripción */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Descripción detallada
              </label>
              <textarea
                placeholder="Por favor, describe los pasos para reproducir el error o los detalles de tu solicitud..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                required
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-2.5 text-xs font-medium text-[#050b24] outline-none focus:border-blue-500 focus:bg-white transition-all placeholder-gray-400 resize-none leading-relaxed"
              />
            </div>

            {/* Prioridad */}
            <div className="space-y-1">
              <label className="block text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                Prioridad Estimada
              </label>
              <div className="grid grid-cols-3 gap-2">
                {["baja", "media", "alta"].map((prio) => (
                  <button
                    key={prio}
                    type="button"
                    onClick={() => setPriority(prio)}
                    className={`py-2 rounded-xl text-xs font-bold uppercase tracking-wider border transition-all
                      ${priority === prio 
                        ? "bg-slate-900 border-slate-900 text-white shadow-sm" 
                        : "bg-white border-gray-200 text-gray-500 hover:text-black hover:bg-slate-50"
                      }`}
                  >
                    {prio}
                  </button>
                ))}
              </div>
            </div>

            {/* Botón de Envío */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-xl text-xs shadow-md shadow-blue-600/10 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <Sparkles size={14} />
              <span>Enviar Solicitud</span>
            </button>
          </form>
        </div>


        {/* COLUMNA 2: HISTORIAL DE TICKETS (Ocupa 3 de 5 columnas) */}
        <div className="lg:col-span-3 space-y-4">
          
          {/* Header del historial + Filtros */}
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
              Mis Tickets Creados ({myTickets.length})
            </span>
            
            {/* Filtros rápidos */}
            <div className="flex bg-gray-100 p-0.5 rounded-lg w-fit self-start sm:self-auto">
              {["todos", "abierto", "en-progreso", "resuelto"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                    ${filter === status 
                      ? "bg-white text-[#050b24] shadow-sm" 
                      : "text-gray-400 hover:text-black"
                    }`}
                >
                  {status === "en-progreso" ? "Progreso" : status}
                </button>
              ))}
            </div>
          </div>

          {/* Lista de Tarjetas */}
          <div className="space-y-3">
            {filteredTickets.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-xs">
                No tienes solicitudes registradas en esta categoría.
              </div>
            ) : (
              filteredTickets.map((ticket) => (
                <div 
                  key={ticket.id}
                  className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:border-gray-200 transition-all flex flex-col gap-3 group"
                >
                  {/* Fila superior: ID y Estado */}
                  <div className="flex items-center justify-between gap-4">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md tracking-wider">
                      {ticket.id}
                    </span>
                    
                    {/* Badge de estado */}
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider
                      ${ticket.status === "abierto" ? "bg-red-50 text-red-600" : ""}
                      ${ticket.status === "en-progreso" ? "bg-amber-50 text-amber-600" : ""}
                      ${ticket.status === "resuelto" ? "bg-emerald-50 text-emerald-600" : ""}
                    `}>
                      {ticket.status === "abierto" && <AlertCircle size={10} />}
                      {ticket.status === "en-progreso" && <Clock size={10} />}
                      {ticket.status === "resuelto" && <CheckCircle2 size={10} />}
                      {ticket.status === "en-progreso" ? "En Progreso" : ticket.status}
                    </span>
                  </div>

                  {/* Cuerpo: Título y Contenido */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ticket.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {ticket.description}
                    </p>
                  </div>

                  {/* Fila Inferior: Metadata */}
                  <div className="border-t border-gray-50 pt-2.5 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Tag size={12} className="text-gray-300" />
                      Prioridad: <strong className="uppercase font-semibold text-gray-600">{ticket.priority}</strong>
                    </span>
                    
                    <span>
                      {new Date(ticket.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit"
                      })}
                    </span>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>

      </div>

    </div>
  );
}