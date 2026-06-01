"use client";
import { useState } from "react";
import Link from "next/link";
import { 
  ChevronLeft, 
  Menu, 
  LayoutDashboard, 
  Ticket, 
  Users, 
  Settings, 
  HelpCircle,
  ShieldCheck,
  BarChart3
} from "lucide-react";

export default function Sidebar({ userRole = "client", activeTab, setActiveTab }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // 1. DEFINICIÓN DE TODAS LAS OPCIONES POSIBLES Y SUS ROLES PERMITIDOS
  const menuItems = [
    { 
      id: "Dashboard", 
      label: "Dashboard", 
      icon: LayoutDashboard, 
      roles: ["admin","agent","client"] // Todos lo ven
    },
    { 
      id: "tickets", 
      label: "Tickets", 
      icon: Ticket, 
      roles: ["admin"] // Todos lo ven
    },
    { 
      id: "users", 
      label: "Usuarios", 
      icon: Users, 
      roles: ["admin"] // Exclusivo de Administradores
    },
    { 
      id: "MisTicket", 
      label: "Mis tickets", 
      icon: Users, 
      roles: ["client"] 
    }
  ];

  // 2. FILTRADO EN TIEMPO REAL SEGÚN EL ROL ACTUAL
  const allowedItems = menuItems.filter(item => item.roles.includes(userRole));

  return (
    <aside 
      className={`bg-[#050b24] h-full flex flex-col justify-between p-4 relative transition-all duration-300 ease-in-out border-r border-white/5 z-30
        ${isCollapsed ? "w-20" : "w-64"}`}
    >
      {/* BOTÓN FLOTANTE PARA CONTRAER/EXPANDIR */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute top-7 -right-3 bg-blue-600 hover:bg-blue-500 text-white rounded-full p-1 shadow-md border border-white/10 hidden md:block transition-colors"
      >
        {isCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* PARTE SUPERIOR: LOGO & MENÚ FILTRADO */}
      <div>
        {/* Logo con retorno a Home */}
        <Link href="/" className="flex items-center gap-3 px-2 py-3 mt-1 mb-6 overflow-hidden group select-none">
          <div className="h-7 w-7 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-md rotate-12 flex-shrink-0 transition-all duration-300 ease-out group-hover:rotate-[6deg] group-hover:scale-110 group-hover:from-blue-400 group-hover:to-indigo-300 group-hover:shadow-lg group-hover:shadow-blue-500/40" />
          {!isCollapsed && (
            <span className="text-white font-bold text-lg tracking-tight whitespace-nowrap animate-[fadeIn_0.2s_ease-out]">
              AI Support
            </span>
          )}
        </Link>

        {/* INDICADOR DE ROL (Solo visible si está expandido) */}
        {!isCollapsed && (
          <div className="mx-2 mb-6 px-3 py-2 bg-white/5 border border-white/10 rounded-xl flex items-center gap-2 text-xs text-gray-300 animate-[fadeIn_0.2s_ease-out]">
            <ShieldCheck size={14} className="text-blue-400" />
            <span>Rol: <strong className="uppercase text-white font-semibold">{userRole}</strong></span>
          </div>
        )}

        {/* LISTA DE PESTAÑAS PERMITIDAS */}
        <nav className="space-y-1.5">
          {allowedItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative group
                  ${isActive 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/10" 
                    : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
              >
                <Icon size={18} className="flex-shrink-0" />
                
                {!isCollapsed ? (
                  <span className="animate-[fadeIn_0.2s_ease-out]">{item.label}</span>
                ) : (
                  /* Tooltip flotante al colapsar */
                  <div className="absolute left-24 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-40 shadow-xl">
                    {item.label}
                  </div>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* PARTE INFERIOR: AYUDA */}
      <div className="pt-4 border-t border-white/5">
        <button className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-white/5 hover:text-white transition-colors group relative">
          <HelpCircle size={18} className="flex-shrink-0" />
          {!isCollapsed ? (
            <span className="animate-[fadeIn_0.2s_ease-out]">Ayuda Soporte</span>
          ) : (
            <div className="absolute left-24 bg-gray-900 text-white text-xs px-2.5 py-1.5 rounded-md opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-40 shadow-xl">
              Ayuda Soporte
            </div>
          )}
        </button>
      </div>
    </aside>
  );
}