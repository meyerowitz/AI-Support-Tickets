"use client";
import { useState, useEffect, useRef } from "react";
import { 
  Clock, CheckCircle2, AlertCircle,  Tag,  Sparkles, Loader2,Cpu, Database, BrainCircuit,Pause, Play,XCircle, Eye, MoreVertical, Edit2,Trash2, RefreshCw,Shield 
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import TicketDetailModal from "@/components/modals/TicketDetailModal"; 
import TicketEditModal from "@/components/modals/TicketEditModal"; 

export default function NewTicketsView() {
  const [myTickets, setMyTickets] = useState([]); // 📂 Inicia vacío esperando los datos de Supabase
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("todos");
  const [refreshingTicketId, setRefreshingTicketId] = useState(null); 
  const [userId, setUserId] = useState(null); // 👤 ID del usuario autenticado

  // Estados de simulación de la IA
  const [simulatingStep, setSimulatingStep] = useState(null);
  const [activeSimulationId, setActiveSimulationId] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Estados para menús y modales
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedTicket, setSelectedTicket] = useState(null); 
  const [editingTicket, setEditingTicket] = useState(null);   
  const [expandedTicketId, setExpandedTicketId] = useState(null);

  const progressRef = useRef(0); 
  const timerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔄 CARGA INICIAL: Autenticación y obtención de Tickets desde Supabase
  useEffect(() => {
    const initSessionAndFetchTickets = async () => {
      try {
        setLoading(true);
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;

        if (session?.user) {
          const currentUserId = session.user.id;
          setUserId(currentUserId);

          const { data: tickets, error: ticketsError } = await supabase
            .from("tickets")
            .select("*")
            .eq("user_id", currentUserId)
            .order("created_at", { ascending: false });

          if (ticketsError) throw ticketsError;

          setMyTickets(tickets || []);
        }
      } catch (err) {
        console.error("Error al inicializar datos desde Supabase:", err);
      } finally {
        setLoading(false);
      }
    };

    initSessionAndFetchTickets();
  }, []);

  // 🤖 PIPELINE DE SIMULACIÓN AUTOMÁTICA CON GUARDADO EN BD
  
  useEffect(() => {
    if (loading || refreshingTicketId) return;

    // Busca un ticket en progreso que aún no tenga resumen asignado
    const ticketToProcess = myTickets.find(
      (t) => t.status === "en-progreso" && !t.ai_summary && t.id !== activeSimulationId
    );

    if (ticketToProcess && !activeSimulationId) {
      setActiveSimulationId(ticketToProcess.id);
      setSimulatingStep(1);
      progressRef.current = 0;
      setIsPaused(false);
    }

    if (activeSimulationId && !isPaused) {
      timerRef.current = setInterval(async () => {
        progressRef.current += 100;

        if (progressRef.current === 2500) {
          setSimulatingStep(2);
        }

        // 🏁 Fin del proceso (Pasa a paso 3 de Auditoría / Guardado)
        if (progressRef.current >= 5500) {
  
  // 1. Consultamos el estado real en Supabase
  const { data: ticket, error } = await supabase
    .from("tickets")
    .select("status, ai_summary, ai_suggestions, ai_risk_level, priority")
    .eq("id", activeSimulationId)
    .single();

  // 2. Verificamos si n8n ya procesó el ticket (status diferente a 'en-progreso')
  if (!error && ticket && ticket.status !== "en-progreso") {
    
    // ✅ CASO ÉXITO: n8n ya actualizó la BD, detenemos el timer y aplicamos los datos
    clearInterval(timerRef.current);
    
    setMyTickets((prevTickets) =>
      prevTickets.map((t) => {
        if (t.id === activeSimulationId) {
          const updated = { ...t, ...ticket };
          if (selectedTicket?.id === t.id) {
            setSelectedTicket(updated);
          }
          return updated;
        }
        return t;
      })
    );
    
    setActiveSimulationId(null);
    setSimulatingStep(null);
    progressRef.current = 0; // Reset para futuros tickets

  } else {
    // 🔄 CASO ESPERA: n8n sigue trabajando, reiniciamos el ciclo visual (bucle)
    progressRef.current = 0;
    setSimulatingStep(1); 
    console.log("Esperando respuesta de n8n...");
  }
}
      }, 100);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [myTickets, loading, activeSimulationId, isPaused, selectedTicket, refreshingTicketId]);




  const handleTogglePause = () => setIsPaused(!isPaused);

  const handleCancelSimulation = async () => {
    if (timerRef.current) clearInterval(timerRef.current);
    const targetId = activeSimulationId;

    setActiveSimulationId(null);
    setSimulatingStep(null);
    setIsPaused(false);
    progressRef.current = 0;

    // Al cancelar, lo marcamos directamente como "fallido" en la base de datos
    try {
      const updatedFields = { status: "fallido", ai_summary: "El proceso fue cancelado manualmente por el usuario." };
      await supabase.from("tickets").update(updatedFields).eq("id", targetId);
      setMyTickets(prev => prev.map(t => t.id === targetId ? { ...t, ...updatedFields } : t));
    } catch (e) {
      console.error(e);
    }
  };

  const handleRetrySimulation = async (ticketId) => {
    try {
      const resetFields = { ai_summary: null, priority: null, status: "en-progreso" };
      
      // Reiniciar en Supabase antes de volver a meterlo al loop del pipeline
      await supabase.from("tickets").update(resetFields).eq("id", ticketId);

      setMyTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, ...resetFields } : t))
      );
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket((prev) => ({ ...prev, ...resetFields }));
      }
      setActiveSimulationId(null);
    } catch (err) {
      console.error("Error al reiniciar ticket:", err);
    }
  };

  // 🔄 RECARGAR UN TICKET ESPECÍFICO (Fuerza el reintento de simulación)
  const handleRefreshSingleTicket = async (ticketId) => {
    setRefreshingTicketId(ticketId);
    
    if (activeSimulationId === ticketId) {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    try {
      const { data, error } = await supabase
        .from("tickets")
        .select("*")
        .eq("id", ticketId)
        .single();
      
      if (!error && data) {
        setMyTickets(prev => prev.map(t => t.id === ticketId ? data : t));
      }
    } catch (e) {
      console.error("Error al refrescar ticket:", e);
    }

    setTimeout(() => {
      handleRetrySimulation(ticketId);
      setRefreshingTicketId(null);
    }, 500);
  };

  // ⚙️ GUARDAR CAMBIOS MANUALES DESDE EL MODAL
  const handleSaveFields = async (ticketId, updatedFields) => {
    try {
      const { error } = await supabase
        .from("tickets")
        .update(updatedFields)
        .eq("id", ticketId);

      if (error) throw error;

      setMyTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, ...updatedFields } : t))
      );
      if (selectedTicket?.id === ticketId) {
        setSelectedTicket((prev) => ({ ...prev, ...updatedFields }));
      }
      setEditingTicket(null); 
    } catch (err) {
      console.error("Error al actualizar el ticket en Supabase:", err.message);
      alert("No se pudieron guardar los cambios.");
    }
  };

  // 🗑️ ELIMINAR TICKET DE SUPABASE (¡Totalmente funcional!)
  const handleDeleteTicket = async (ticketId) => {
    
      try {
        console.log("Intentando borrar el ticket con ID:", ticketId);
        
        // 1. Intentar borrar en la base de datos primero
        //alert(ticketId)
        const { error } = await supabase
          .from("tickets")
          .delete()
          .eq("id", ticketId);

        // 🚨 SI SUPABASE DEVUELVE UN ERROR, SE LANZA AQUÍ
        if (error) {
          throw new Error(error.message || error.details);
        }

        console.log("¡Borrado exitoso en Supabase!");

        // 2. SOLO si la base de datos aceptó el borrado, lo quitamos de la pantalla
        setMyTickets((prev) => prev.filter((t) => t.id !== ticketId));
        if (selectedTicket?.id === ticketId) setSelectedTicket(null);
        
        setOpenMenuId(null);
      } catch (err) {
        console.error("Error real de Supabase al eliminar:", err);
        // Te mostrará exactamente por qué Supabase dijo que NO
        alert(`Supabase rechazó el borrado: ${err.message}`);
      }
    
  };

  const filteredTickets = myTickets.filter(ticket => 
    filter === "todos" || ticket.status === filter
  );

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-3">
        <Loader2 size={32} className="animate-spin text-blue-600" />
        <p className="text-xs text-gray-400 font-medium tracking-wide">Cargando tus solicitudes desde Supabase...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out] max-w-4xl mx-auto pb-12 relative">
      
      {/* HEADER PRINCIPAL */}
      <div>
        <h1 className="text-2xl font-bold text-[#050b24]">Centro de Soporte</h1>
        <p className="text-gray-500 text-sm mt-0.5">Visualiza tus solicitudes de asistencia y gestiona los flujos de automatización.</p>
      </div>

      {/* HISTORIAL DE TICKETS */}
      <div className="space-y-4">
        
        {/* Barra de Filtros Rápidos */}
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider px-2">
            Mis Tickets Creados ({myTickets.length})
          </span>
          
          <div className="flex bg-gray-100 p-0.5 rounded-lg flex-wrap gap-1 w-fit self-start sm:self-auto">
            {["todos", "en-progreso", "resuelto", "fallido"].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setFilter(status)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all
                  ${filter === status ? "bg-white text-[#050b24] shadow-sm" : "text-gray-400 hover:text-black"}`}
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
            filteredTickets.map((ticket) => {
              const isAIProcessing = ticket.id === activeSimulationId;
              const isMenuOpen = openMenuId === ticket.id;
              const isTicketRefreshing = refreshingTicketId === ticket.id;
              const isFailedOrCancelled = ticket.status === "fallido" || (ticket.status === "en-progreso" && !ticket.ai_summary && !isAIProcessing);

              return (
                <div 
                  key={ticket.id}
                  className={`bg-white p-5 rounded-2xl border transition-all flex flex-col gap-3 group relative ${
                    isAIProcessing ? "border-blue-400 shadow-md shadow-blue-50/50" : "border-gray-100 shadow-sm hover:border-gray-200"
                  }`}
                >
                  {isAIProcessing && !isPaused && (
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-400 animate-[shimmer_2s_infinite] rounded-t-2xl" />
                  )}

                  {/* Fila superior */}
                  <div className="flex items-center justify-between gap-4 z-10">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md tracking-wider">
                        {ticket.display_id || `TCK-${ticket.id.toString().slice(0, 4)}`}
                      </span>
                      {isAIProcessing && (
                        <span className={`inline-flex items-center gap-1 text-[9px] font-bold px-2 py-0.5 rounded-md transition-all ${
                          isPaused ? "bg-amber-50 text-amber-600" : "bg-indigo-50 text-indigo-600 animate-pulse"
                        }`}>
                          <Cpu size={10} className={isPaused ? "" : "animate-spin"} /> 
                          {isPaused ? "PIPELINE PAUSADO" : "PROCESANDO TAREITAS"}
                        </span>
                      )}
                    </div>
                    
                    {/* Controles Dinámicos del Ticket */}
                    <div className="flex items-center gap-1.5 relative">
                      {isAIProcessing && (
                        <>
                          <button
                            onClick={handleTogglePause}
                            className={`p-1.5 rounded-lg border transition-all ${
                              isPaused ? "bg-emerald-50 text-emerald-600 border-emerald-200 hover:bg-emerald-100" : "bg-amber-50 text-amber-600 border-amber-200 hover:bg-amber-100"
                            }`}
                          >
                            {isPaused ? <Play size={12} fill="currentColor" /> : <Pause size={12} fill="currentColor" />}
                          </button>

                          <button
                            onClick={handleCancelSimulation}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all"
                          >
                            <XCircle size={12} />
                          </button>
                        </>
                      )}

                      {/* 🔄 RECARGAR / REINTENTAR INDIVIDUAL */}
                      {!isFailedOrCancelled && !isAIProcessing && (
                        <button
                          type="button"
                          onClick={() => handleRefreshSingleTicket(ticket.id)}
                          disabled={isTicketRefreshing}
                          className="p-1.5 bg-gray-50 text-gray-500 border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-gray-950 disabled:opacity-50 transition-all flex items-center justify-center shadow-sm group/btn"
                          title="Reiniciar/Recargar flujo del ticket"
                        >
                          <RefreshCw 
                            size={12} 
                            className={`${isTicketRefreshing ? "animate-spin text-blue-600" : "group-hover/btn:rotate-180 transition-transform duration-500"}`} 
                          />
                        </button>
                      )}

                      {isFailedOrCancelled && (
                        <button
                          onClick={() => handleRefreshSingleTicket(ticket.id)}
                          className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100 transition-all flex items-center gap-1 text-[10px] font-bold px-2"
                        >
                          <RefreshCw size={12} className={isTicketRefreshing ? "animate-spin" : ""} />
                          <span>Reintentar</span>
                        </button>
                      )}

                      {/* Botón Detalle */}
                      <button
                        onClick={() => setSelectedTicket(ticket)}
                        className="p-1.5 rounded-lg bg-gray-50 text-gray-500 border border-gray-200 hover:bg-gray-100 hover:text-gray-900 transition-all flex items-center gap-1 text-[10px] font-semibold px-2"
                      >
                        <Eye size={12} />
                        <span className="hidden sm:inline">Detalle</span>
                      </button>

                      {/* Menú Tres Puntos (Modificar y Borrar funcional) */}
                      {!isAIProcessing && (
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenuId(isMenuOpen ? null : ticket.id)}
                            className={`p-1.5 rounded-lg border transition-all ${
                              isMenuOpen ? "bg-gray-200 text-black border-gray-300" : "bg-white text-gray-400 border-gray-200 hover:text-gray-700 hover:bg-gray-50"
                            }`}
                          >
                            <MoreVertical size={12} />
                          </button>

                          {isMenuOpen && (
                            <div 
                              ref={menuRef}
                              className="absolute right-0 mt-1.5 w-32 bg-white rounded-xl border border-gray-100 shadow-lg py-1.5 z-20"
                            >
                              <button
                                onClick={() => { setEditingTicket(ticket); setOpenMenuId(null); }}
                                className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-gray-600 hover:bg-gray-50 hover:text-blue-600 flex items-center gap-2 transition-colors"
                              >
                                <Edit2 size={12} /> Modificar
                              </button>
                              <div className="border-t border-gray-50 my-1" />
                              <button
                                onClick={() => handleDeleteTicket(ticket.id)}
                                className="w-full text-left px-3 py-1.5 text-[11px] font-bold text-red-500 hover:bg-red-50 flex items-center gap-2 transition-colors"
                              >
                                <Trash2 size={12} /> Borrar
                              </button>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Pill de Estado Estilizado */}
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ml-1
                        ${ticket.status === "abierto" ? "bg-blue-50 text-blue-600" : ""}
                        ${ticket.status === "en-progreso" ? "bg-amber-50 text-amber-600" : ""}
                        ${ticket.status === "resuelto" ? "bg-emerald-50 text-emerald-600" : ""}
                        ${ticket.status === "fallido" ? "bg-red-50 text-red-600" : ""}
                      `}>
                        {ticket.status === "en-progreso" ? "En Progreso" : ticket.status}
                      </span>
                    </div>
                  </div>

                  {/* Cuerpo */}
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {ticket.title}
                    </h4>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {ticket.description}
                    </p>
                        {/* SECCIÓN DESPLEGABLE CON PROTAGONISMO DE IA */}
{ticket.status === "resuelto" && ticket.ai_summary && (
  <div className="mt-4 pt-4 border-t border-gray-100">
    <button
      onClick={() => setExpandedTicketId(expandedTicketId === ticket.id ? null : ticket.id)}
      className="flex items-center gap-2 w-full text-[11px] font-bold text-slate-500 hover:text-blue-600 transition-colors group"
    >
      <BrainCircuit size={14} className={expandedTicketId === ticket.id ? "text-blue-600" : ""} />
      {expandedTicketId === ticket.id ? "Ocultar Análisis IA" : "Ver Análisis Inteligente"}
      <span className={`ml-auto transition-transform ${expandedTicketId === ticket.id ? "rotate-180" : ""}`}>
        ▼
      </span>
    </button>

    {expandedTicketId === ticket.id && (
      <div className="mt-4 space-y-4 animate-in slide-in-from-top-4 duration-500">
        
        {/* RECOMENDACIONES (Protagonista principal: ocupa todo el ancho) */}
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border border-indigo-100 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Sparkles size={18} />
            </div>
            <div>
              <h5 className="text-[10px] font-black text-blue-800 uppercase tracking-widest">Sugerencias IA</h5>
              <p className="text-[10px] text-blue-600 font-bold opacity-70">Acciones recomendadas para ti</p>
            </div>
          </div>
          <p className="text-[13px] text-slate-700 leading-relaxed font-medium">
            {ticket.ai_suggestions || "No se detectaron sugerencias específicas para este caso."}
          </p>
        </div>

        {/* RESUMEN Y RIESGO (Fila secundaria) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Resumen */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm">
             <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
               <Eye size={10} /> Resumen del Caso
             </h5>
             <p className="text-[11px] text-slate-600 italic leading-relaxed line-clamp-3">
               "{ticket.ai_summary}"
             </p>
          </div>

          {/* Riesgo */}
          <div className="bg-white border border-slate-100 rounded-xl p-4 shadow-sm flex items-center justify-between">
            <div>
              <h5 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Nivel de Riesgo</h5>
              <div className={`flex items-center gap-2 font-black text-[14px] uppercase 
                ${ticket.ai_risk_level === 'alto' ? 'text-red-500' : 'text-emerald-500'}`}>
                <AlertCircle size={18} />
                {ticket.ai_risk_level || "Bajo"}
              </div>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center opacity-10 
              ${ticket.ai_risk_level === 'alto' ? 'bg-red-500' : 'bg-emerald-500'}`}>
              <Shield size={24} />
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
)}
                  </div>
                  

                  {/* Stepper de Procesamiento IA */}
                  {isAIProcessing && (
                    <div className="bg-slate-50 rounded-xl p-3.5 mt-1 border border-slate-100 space-y-3">
                      <div className="grid grid-cols-3 gap-2 text-center text-[9px] font-bold uppercase tracking-wide text-gray-400">
                        <div className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border ${simulatingStep === 1 ? "bg-white border-blue-200 text-blue-600" : "bg-emerald-50 text-emerald-600"}`}>
                          <span>1. Webhook n8n</span>
                        </div>
                        <div className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border ${simulatingStep === 2 ? "bg-white border-indigo-200 text-indigo-600" : "opacity-40"}`}>
                          <span>2. Claude IA</span>
                        </div>
                        <div className="flex flex-col items-center gap-1 p-1.5 opacity-40">
                          <span>3. Auditoría</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Metadata Inferior */}
                  <div className="border-t border-gray-50 pt-2.5 flex items-center justify-between text-[11px] text-gray-400">
                    <span className="flex items-center gap-1">
                      <Tag size={12} /> Prioridad IA: <strong className="uppercase font-bold text-gray-600">{ticket.priority || "Evaluando..."}</strong>
                    </span>
                    <span>{ticket.created_at ? new Date(ticket.created_at).toLocaleDateString("es-ES") : ""}</span>
                  </div>

                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Modales Reactivos */}
      <TicketDetailModal 
        ticket={selectedTicket} 
        onClose={() => setSelectedTicket(null)} 
        isAIProcessing={selectedTicket?.id === activeSimulationId}
        onRetry={handleRefreshSingleTicket}
      />

      <TicketEditModal 
        ticket={editingTicket}
        onClose={() => setEditingTicket(null)}
        onSave={handleSaveFields}
      />

    </div>
  );
}