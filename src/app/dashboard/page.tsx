"use client";
import { useState, useEffect, Suspense } from "react"; 
import { useSearchParams, useRouter } from "next/navigation"; 
import { supabase } from "@/lib/supabaseClient"; 
import Sidebar from "@/components/dashboard/Sidebar";
import UsersView from "@/components/dashboard/pages/UsersView";
import TicketsView from "@/components/dashboard/pages/TicketsView";
import NewTicketsView from "@/components/dashboard/pages/NewTicketsView";
import MainView from "@/components/dashboard/pages/MainView";
import { Session } from "@supabase/supabase-js"; 

export const dynamic = "force-dynamic";

function DashboardContent() {
  const [isMounted, setIsMounted] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [activeTab, setActiveTab] = useState("Dashboard");
  
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUserRole = searchParams.get("role") || "client";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session: currentSession }, error } = await supabase.auth.getSession();
        
        if (error) throw error;

        if (!currentSession) {
          router.push("/");
        } else {
          setSession(currentSession);
          setIsMounted(true); 
        }
      } catch (err) {
        console.error("💥 Error al conectar con el servidor de autenticación:", err);
        router.push("/");
      }
    };

    checkAuth();
  }, [router]);

  const renderContentView = () => {
    switch (activeTab) {
      case "Dashboard": return <MainView userRole={currentUserRole}/>;
      case "tickets": return <TicketsView />;
      case "MisTicket": return <NewTicketsView/>;
      case "users": return <UsersView />;
      default: return <MainView userRole={currentUserRole}/>;
    }
  };

  // 🔒 EL MURO DE SEGURIDAD INTERNO
  if (!isMounted || !session) {
    return (
      <div className="flex h-screen w-screen flex-col items-center justify-center bg-[#f8fafc] text-sm font-medium text-gray-500 gap-3">
        <span className="h-6 w-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        Estableciendo conexión segura...
      </div>
    );
  }

  // 💡 Extraemos la primera letra del email o nombre para el avatar
  const userEmail = session.user.email;
  const userInitial = userEmail ? userEmail.charAt(0).toUpperCase() : "U";

  return (
    <div className="flex h-screen w-screen bg-[#f8fafc] text-slate-800 overflow-hidden font-sans">
      <Sidebar userRole={currentUserRole} activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* ─── HEADER DINÁMICO CON DATOS DE SESIÓN ─── */}
        <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-8 z-10 flex-shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace / <span className="text-gray-700 font-bold">{activeTab}</span>
          </span>
          
          {/* Bloque del perfil de usuario activo */}
          <div className="flex items-center gap-3 bg-slate-50 border border-gray-100 py-1.5 px-3 rounded-full shadow-sm">
            {/* Avatar circular con inicial dinámica */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white font-bold text-xs uppercase shadow-sm">
              {userInitial}
            </div>
            
            {/* Información del correo electrónico de Supabase */}
            <div className="flex flex-col text-left">
              <span className="text-xs font-semibold text-gray-700 truncate max-w-[180px] sm:max-w-none">
                {userEmail}
              </span>
              <span className="text-[10px] font-medium text-gray-400 capitalize -mt-0.5">
                Rol: {currentUserRole}
              </span>
            </div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-8 bg-[#f8fafc]">
          <div className="max-w-5xl mx-auto w-full">
            {renderContentView()}
          </div>
        </section>
      </main>
    </div>
  );
}

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