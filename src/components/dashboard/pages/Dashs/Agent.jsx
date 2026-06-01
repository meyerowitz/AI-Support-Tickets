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

// Mock de datos para la gráfica del Administrador
const MONTHLY_ACTIVITY = [
  { name: "Ene", consultas: 420 },
  { name: "Feb", consultas: 510 },
  { name: "Mar", consultas: 680 },
  { name: "Abr", consultas: 720 },
  { name: "May", consultas: 940 },
  { name: "Jun", consultas: 1050 },
];

export default function Agent() {
  
    return (
      <div className="space-y-6 animate-[fadeIn_0.3s_ease-out]">
        <div>
          <h1 className="text-2xl font-bold text-[#050b24]">Espacio de Trabajo del Agente</h1>
          <p className="text-gray-500 text-sm mt-0.5">Mantén tu cola de soporte limpia. Esto es lo asignado para hoy.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase">Tickets Asignados</span>
              <h3 className="text-3xl font-extrabold text-[#050b24]">8</h3>
            </div>
            <div className="p-4 bg-amber-50 text-amber-600 rounded-2xl"><Ticket size={24} /></div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-400 uppercase">Resueltos Hoy</span>
              <h3 className="text-3xl font-extrabold text-[#050b24]">14</h3>
            </div>
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-2xl"><CheckCircle size={24} /></div>
          </div>
        </div>

        <div className="p-6 bg-slate-900 text-white rounded-2xl text-center space-y-3">
          <p className="text-xs font-semibold text-blue-400 uppercase tracking-wider">Sugerencia del sistema</p>
          <h3 className="text-base font-bold">¿Tienes unos minutos libres?</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">Hay 4 tickets críticos en la bandeja global esperando respuesta de un agente humano.</p>
          <button 
            onClick={() => setActiveTab("tickets")}
            className="mt-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all"
          >
            Ir a la cola de Tickets
          </button>
        </div>
      </div>
    );
  

}