"use client";
import { useState } from "react";
import { 
  Search, 
  Filter, 
  MessageSquare, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  User,
  ArrowUpRight 
} from "lucide-react";

// ─── 📦 DATOS DE PRUEBA (MOCK TICKETS) ───
const MOCK_TICKETS = [
  {
    id: "TCK-4821",
    title: "Error de conexión con la API de Supabase",
    description: "Al intentar hacer fetch de los perfiles de usuario arroja un error de timeout recurrente en el entorno de desarrollo.",
    user: "Alex Mercer",
    role: "admin",
    priority: "alta",
    status: "abierto",
    created_at: "2026-06-01T01:15:00.000Z"
  },
  {
    id: "TCK-4820",
    title: "Problema con la sincronización del Dashboard",
    description: "Los gráficos de barras no cargan los datos del último mes de manera fluida en dispositivos móviles.",
    user: "Sarah Connor",
    role: "agent",
    priority: "media",
    status: "en-progreso",
    created_at: "2026-05-31T18:22:00.000Z"
  },
  {
    id: "TCK-4819",
    title: "Fallo en la visualización de fuentes personalizadas",
    description: "Los títulos principales pierden el formato de la tipografía corporativa al colapsar el sidebar.",
    user: "John Doe",
    role: "client",
    priority: "baja",
    status: "resuelto",
    created_at: "2026-05-30T09:45:00.000Z"
  },
  {
    id: "TCK-4818",
    title: "No se envían los correos de validación",
    description: "Los nuevos clientes que se registran usando el modal no reciben el token de activación en su bandeja de entrada.",
    user: "Elena Rostova",
    role: "agent",
    priority: "alta",
    status: "abierto",
    created_at: "2026-05-28T14:10:00.000Z"
  }
];

export default function TicketsView() {
  const [tickets] = useState(MOCK_TICKETS);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [searchQuery, setSearchQuery] = useState("");

  // 🔄 Filtrado en tiempo real por estado y barra de búsqueda
  const filteredTickets = tickets.filter(ticket => {
    const matchesStatus = statusFilter === "todos" || ticket.status === statusFilter;
    const matchesSearch = ticket.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* HEADER DE LA VISTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#050b24]">Gestión de Tickets</h1>
          <p className="text-gray-500 text-sm mt-0.5">Monitorea y responde a las solicitudes de soporte técnico.</p>
        </div>
      </div>

      {/* ─── BARRA DE BÚSQUEDA Y FILTROS RÁPIDOS ─── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Pestañas de Filtro por Estado */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl w-fit self-start">
          {["todos", "abierto", "en-progreso", "resuelto"].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all
                ${statusFilter === status 
                  ? "bg-white text-[#050b24] shadow-sm" 
                  : "text-gray-500 hover:text-black"
                }`}
            >
              {status === "en-progreso" ? "En Progreso" : status}
            </button>
          ))}
        </div>

        {/* Input de Búsqueda */}
        <div className="relative flex-1 md:max-w-xs w-full">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Buscar por ID o título..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs font-medium text-[#050b24] outline-none focus:border-blue-500 transition-colors placeholder-gray-400 shadow-sm"
          />
        </div>

      </div>

      {/* ─── LISTADO DE TICKETS ─── */}
      <div className="space-y-4">
        {filteredTickets.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
            No se encontraron tickets con los filtros actuales.
          </div>
        ) : (
          filteredTickets.map((ticket) => (
            <div 
              key={ticket.id} 
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all group flex flex-col justify-between gap-4"
            >
              {/* Parte Superior: ID, Estado, Prioridad */}
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md tracking-wider">
                      {ticket.id}
                    </span>
                    <h3 className="text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ticket.title}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 line-clamp-2 md:line-clamp-1 pr-4">
                    {ticket.description}
                  </p>
                </div>

                {/* Badge de Estado del Ticket */}
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex-shrink-0
                  ${ticket.status === "abierto" ? "bg-red-50 text-red-600 border border-red-100" : ""}
                  ${ticket.status === "en-progreso" ? "bg-amber-50 text-amber-600 border border-amber-100" : ""}
                  ${ticket.status === "resuelto" ? "bg-emerald-50 text-emerald-600 border border-emerald-100" : ""}
                `}>
                  {ticket.status === "abierto" && <AlertCircle size={12} />}
                  {ticket.status === "en-progreso" && <Clock size={12} />}
                  {ticket.status === "resuelto" && <CheckCircle2 size={12} />}
                  {ticket.status === "en-progreso" ? "En Progreso" : ticket.status}
                </span>
              </div>

              {/* Separador Sutil */}
              <div className="border-t border-gray-50 pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-gray-400">
                
                {/* Meta Información: Creador y Fecha */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="flex items-center gap-1.5 font-medium text-gray-600">
                    <div className="w-5 h-5 bg-gray-100 text-gray-700 font-bold text-[9px] rounded-md flex items-center justify-center border border-gray-200 uppercase">
                      {ticket.user.substring(0, 2)}
                    </div>
                    {ticket.user} 
                    <span className="text-[10px] uppercase font-bold text-gray-400">({ticket.role})</span>
                  </span>
                  
                  <span className="w-1 h-1 bg-gray-300 rounded-full hidden sm:block" />
                  
                  <span className="flex items-center gap-1">
                    Recibido el {new Date(ticket.created_at).toLocaleDateString("es-ES", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit"
                    })}
                  </span>
                </div>

                {/* Prioridad y Acción */}
                <div className="flex items-center justify-between sm:justify-end gap-4">
                  <span className="flex items-center gap-1.5">
                    Prioridad: 
                    <strong className={`uppercase font-bold tracking-wide text-[11px]
                      ${ticket.priority === "alta" ? "text-red-500" : ""}
                      ${ticket.priority === "media" ? "text-amber-500" : ""}
                      ${ticket.priority === "baja" ? "text-slate-400" : ""}
                    `}>
                      {ticket.priority}
                    </strong>
                  </span>

                  <button className="flex items-center gap-1 font-bold text-blue-600 hover:text-blue-500 bg-blue-50/50 hover:bg-blue-50 px-3 py-1.5 rounded-xl transition-all">
                    <span>Atender</span>
                    <ArrowUpRight size={14} />
                  </button>
                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
}