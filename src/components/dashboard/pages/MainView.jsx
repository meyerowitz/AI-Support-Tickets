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
import Admin from "@/components/dashboard/pages/Dashs/Admin"


// Mock de datos para la gráfica del Administrador
const MONTHLY_ACTIVITY = [
  { name: "Ene", consultas: 420 },
  { name: "Feb", consultas: 510 },
  { name: "Mar", consultas: 680 },
  { name: "Abr", consultas: 720 },
  { name: "May", consultas: 940 },
  { name: "Jun", consultas: 1050 },
];

export default function MainView({ userRole = "client"}) {
  
  // ─── 🎨 1. VISTA ADAPTADA PARA EL CLIENTE ───
  if (userRole === "client") {
    return (
      <Client/>
    );
  }

  // ─── 🏃‍♂️ 2. VISTA ADAPTADA PARA EL AGENTE DE SOPORTE ───
  if (userRole === "agent") {
    return (
      <Agent/>
    );
  }

  // ─── 📊 3. VISTA ADAPTADA PARA EL ADMINISTRADOR (Por defecto) ───
  return (
    <Admin/>
  );
}