"use client";
import { useState, Suspense } from "react"; // 1. Mantenemos el Suspense importado
import { useSearchParams } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import UsersView from "@/components/dashboard/pages/UsersView";
import TicketsView from "@/components/dashboard/pages/TicketsView";
import NewTicketsView from "@/components/dashboard/pages/NewTicketsView";
import MainView from "@/components/dashboard/pages/MainView";

// ─── 🛠️ COMPONENTE INTERNO (MUEVE TU LÓGICA AQUÍ) ───
// Renombramos la función a "DashboardContent"
function DashboardContent() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const searchParams = useSearchParams();
  
  // Captura el rol de la URL (?role=admin), si no viene ninguno usa "client" por defecto [cite: 150]
  const currentUserRole = searchParams.get("role") || "client";

  // 🚀 FUNCIÓN DE RENDERIZADO DINÁMICO
  const renderContentView = () => {
    switch (activeTab) {
      case "Dashboard":
        return <MainView userRole={currentUserRole}/>;
      case "tickets":
        return <TicketsView />;
      case "MisTicket":
        return <NewTicketsView />;
      case "users":
        return <UsersView />;
      default:
        return <MainView userRole={currentUserRole}/>;
    }
  };

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      
      {/* SIDEBAR MODULAR */}
      <Sidebar 
        userRole={currentUserRole} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
      />

      {/* COMPONENTE CENTRAL / CONTENEDOR PRINCIPAL */}
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* HEADER SUPERIOR */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 z-10 flex-shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace / <span className="text-gray-700 font-bold">{activeTab}</span>
          </span>
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xs uppercase">
              AD
            </div>
            <span className="text-xs font-medium text-gray-600 hidden sm:inline">Administrador</span>
          </div>
        </header>

        {/* ESPACIO DE TRABAJO DINÁMICO */}
        <section className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto w-full">
            {renderContentView()}
          </div>
        </section>

      </main>
    </div>
  );
}

// ─── 🚀 EXPORTACIÓN POR DEFECTO (EL CONTENEDOR MAESTRO) ───
// Este es el componente que Next.js buscará al compilar la página de producción[cite: 91, 143].
export default function DashboardPage() {
  return (
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-[#f8fafc] text-sm font-medium text-gray-500">
        Cargando espacio de trabajo...
      </div>
    }>
      <DashboardContent />
    </Suspense>
  );
}