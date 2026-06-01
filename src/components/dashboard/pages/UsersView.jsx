"use client";
import { useState } from "react";
import { UserPlus, RefreshCw, Trash2, Shield, Mail, Calendar } from "lucide-react";

// ─── 📦 DATOS DE PRUEBA (MOCK DATA) ───
const MOCK_USERS = [
  {
    id: "mock-1",
    full_name: "Alex Mercer",
    email: "alex.mercer@ai-support.com",
    role: "admin",
    created_at: "2026-03-15T10:00:00.000Z"
  },
  {
    id: "mock-2",
    full_name: "Sarah Connor",
    email: "s.connor@ai-support.com",
    role: "agent",
    created_at: "2026-04-02T14:22:00.000Z"
  },
  {
    id: "mock-3",
    full_name: "John Doe",
    email: "john.doe@client.com",
    role: "client",
    created_at: "2026-05-20T09:45:00.000Z"
  },
  {
    id: "mock-4",
    full_name: "Elena Rostova",
    email: "e.rostova@agent.com",
    role: "agent",
    created_at: "2026-05-28T18:12:00.000Z"
  }
];

export default function UsersView() {
  // Inicializamos directamente con el Mock Data y desactivamos la pantalla de carga
  const [users] = useState(MOCK_USERS);
  const [loading] = useState(false); 

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* HEADER DE LA VISTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl font-bold text-[#050b24]">Control de Usuarios</h1>
          <p className="text-gray-500 text-sm mt-0.5">Administra los accesos y roles asignados en el sistema.</p>
        </div>
        
        {/* Acciones del Header */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {}}
            disabled={loading}
            className="p-2.5 text-gray-500 hover:text-black bg-gray-50 hover:bg-gray-100 rounded-xl transition-all border border-gray-200 active:scale-95 disabled:opacity-50"
            title="Recargar datos (Desactivado)"
          >
            <RefreshCw size={16} />
          </button>
          
          <button className="bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-blue-600/10 active:scale-95">
            <UserPlus size={16} />
            <span>Nuevo Usuario</span>
          </button>
        </div>
      </div>

      {/* TABLA DE USUARIOS (MOCK DATA FIJO) */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 bg-gray-50/70 text-[11px] font-bold uppercase text-gray-400 tracking-wider">
                <th className="py-4 px-6">Usuario</th>
                <th className="py-4 px-6">Rol</th>
                <th className="py-4 px-6 hidden sm:table-cell">Fecha Registro</th>
                <th className="py-4 px-6 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                  
                  {/* Avatar, Nombre e Email */}
                  <td className="py-4 px-6 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-slate-100 to-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center border border-gray-200 uppercase">
                      {user.full_name ? user.full_name.substring(0, 2) : "??"}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{user.full_name || "Sin nombre"}</h4>
                      <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                        <Mail size={12} /> {user.email}
                      </span>
                    </div>
                  </td>

                  {/* Badge del Rol Dinámico */}
                  <td className="py-4 px-6 vertical-middle">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase tracking-wider
                      ${user.role === "admin" ? "bg-red-50 text-red-600 border border-red-100" : ""}
                      ${user.role === "agent" ? "bg-blue-50 text-blue-600 border border-blue-100" : ""}
                      ${user.role === "client" ? "bg-gray-100 text-gray-600 border border-gray-200" : ""}
                    `}>
                      <Shield size={12} />
                      {user.role || "client"}
                    </span>
                  </td>

                  {/* Fecha formateada */}
                  <td className="py-4 px-6 text-gray-400 text-xs hidden sm:table-cell vertical-middle">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {new Date(user.created_at).toLocaleDateString("es-ES", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric"
                      })}
                    </span>
                  </td>

                  {/* Botón de Borrado */}
                  <td className="py-4 px-6 text-right vertical-middle">
                    <button className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all md:opacity-0 group-hover:opacity-100 focus:opacity-100">
                      <Trash2 size={15} />
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}