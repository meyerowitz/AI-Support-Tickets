"use client";
import { useState } from "react";
import { 
  Sparkles, 
  PlusCircle, 
  HelpCircle, 
  Ticket, 
  CheckCircle, 
  Users, 
  TrendingUp,
  Clock
} from "lucide-react";
// Importamos la gráfica mensual que hicimos para el admin
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import Client from "@/components/dashboard/pages/Dashs/Client"
import Agent from "@/components/dashboard/pages/Dashs/Agent"


// Mock de datos para la gráfica del Administrador
const MONTHLY_ACTIVITY = [
  { name: "Ene", consultas: 420 },
  { name: "Feb", consultas: 510 },
  { name: "Mar", consultas: 680 },
  { name: "Abr", consultas: 720 },
  { name: "May", consultas: 940 },
  { name: "Jun", consultas: 1050 },
];

export default function Admin() {

  return (
    <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
      <div>
        <h1 className="text-2xl font-bold text-[#050b24]">Panel de Control Global (Admin)</h1>
        <p className="text-gray-500 text-sm mt-0.5">Métricas globales y volumen de interacciones mensuales.</p>
      </div>

      {/* Grid KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-500/30 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Tickets Registrados</span>
            <h3 className="text-2xl font-bold text-[#050b24]">1,248</h3>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><Ticket size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-500/30 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Total Usuarios</span>
            <h3 className="text-2xl font-bold text-[#050b24]">842</h3>
          </div>
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Users size={20} /></div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-violet-500/30 transition-all duration-300">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-gray-400 uppercase">Tiempo Respuesta IA</span>
            <h3 className="text-2xl font-bold text-[#050b24]">18 min</h3>
          </div>
          <div className="p-3 bg-violet-50 text-violet-600 rounded-xl"><Clock size={20} /></div>
        </div>
      </div>

      {/* Gráfica */}
      <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
        <h3 className="text-sm font-bold text-[#050b24]">Volumen de Actividad Mensual</h3>
        <div className="w-full h-64 pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_ACTIVITY} margin={{ left: -20 }} barSize={24}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip cursor={{ fill: '#f8fafc' }} contentStyle={{ backgroundColor: '#050b24', borderRadius: '12px', color: '#fff', border: 'none', fontSize: '11px' }} />
              <Bar dataKey="consultas" fill="#2563eb" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}