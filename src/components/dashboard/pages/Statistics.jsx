"use client";
import { useState } from "react";
import { 
  Ticket, 
  Users, 
  Activity, 
  ArrowUpRight, 
  TrendingUp, 
  Clock 
} from "lucide-react";
// 🚀 Cambiamos los componentes de línea por componentes de Barras
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from "recharts";

// ─── 📦 DATOS DE PRUEBA MENSUALES (ÚLTIMO SEMESTRE) ───
const MONTHLY_ACTIVITY = [
  { name: "Ene", consultas: 420 },
  { name: "Feb", consultas: 510 },
  { name: "Mar", consultas: 680 },
  { name: "Abr", consultas: 720 },
  { name: "May", consultas: 940 }, // Crecimiento constante
  { name: "Jun", consultas: 1050 }, // Pico actual
];

export default function Statistics() {
  const stats = {
    totalTickets: 1248,
    activeUsers: 842,
    avgResolutionTime: "18 min",
  };

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      
      {/* HEADER DE BIENVENIDA */}
      <div>
        <h1 className="text-2xl font-bold text-[#050b24]">Panel de Control</h1>
        <p className="text-gray-500 text-sm mt-0.5">Métricas globales y volumen de interacciones mensuales.</p>
      </div>

      {/* GRID DE TARJETAS DE MÉTRICAS (KPIs) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* CARD 1: TICKETS REGISTRADOS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tickets Registrados</span>
            <h3 className="text-3xl font-bold text-[#050b24] tracking-tight">{stats.totalTickets}</h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp size={14} /> +12% este mes
            </span>
          </div>
          <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
            <Ticket size={24} />
          </div>
        </div>

        {/* CARD 2: TOTAL DE USUARIOS */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Usuarios</span>
            <h3 className="text-3xl font-bold text-[#050b24] tracking-tight">{stats.activeUsers}</h3>
            <span className="text-xs text-emerald-600 font-medium flex items-center gap-1">
              <TrendingUp size={14} /> +4.8% nuevos registros
            </span>
          </div>
          <div className="p-4 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
            <Users size={24} />
          </div>
        </div>

        {/* CARD 3: TIEMPO DE RESPUESTA */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-violet-500/30 transition-all duration-300 sm:col-span-2 lg:col-span-1">
          <div className="space-y-2">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Tiempo de Respuesta IA</span>
            <h3 className="text-3xl font-bold text-[#050b24] tracking-tight">{stats.avgResolutionTime}</h3>
            <span className="text-xs text-gray-400 font-medium flex items-center gap-1">
              <Clock size={14} /> Promedio de optimización
            </span>
          </div>
          <div className="p-4 bg-violet-50 text-violet-600 rounded-2xl group-hover:bg-violet-600 group-hover:text-white transition-all duration-300">
            <Activity size={24} />
          </div>
        </div>

      </div>

      {/* ─── SECCIÓN DE LA GRÁFICA MENSUAL ─── */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-[#050b24]">Volumen de Actividad Mensual</h3>
            <p className="text-xs text-gray-400">Promedio de consultas y tickets gestionados por los usuarios.</p>
          </div>
          <button className="text-xs font-semibold text-blue-600 hover:text-blue-500 flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg transition-colors">
            Ver histórico completo <ArrowUpRight size={14} />
          </button>
        </div>

        {/* Contenedor responsivo para Recharts */}
        <div className="w-full h-72 pt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={MONTHLY_ACTIVITY}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              barSize={32} // Ancho elegante para las barras
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis 
                dataKey="name" 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false} 
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              
              <Tooltip 
                cursor={{ fill: '#f8fafc' }} // Color sutil al pasar por encima de la columna
                contentStyle={{ 
                  backgroundColor: '#050b24', 
                  borderRadius: '12px', 
                  color: '#fff',
                  border: 'none',
                  fontSize: '12px'
                }} 
              />
              
              {/* 🚀 Barra con bordes redondeados premium en la parte superior [radius={[8, 8, 0, 0]}] */}
              <Bar 
                dataKey="consultas" 
                fill="#2563eb" 
                radius={[8, 8, 0, 0]} 
                className="hover:fill-blue-500 transition-colors duration-200"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}