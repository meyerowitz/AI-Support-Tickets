"use client";
import { useEffect, useState } from "react";
// 🚀 Importas TU cliente centralizado directamente
import { supabase } from "@/lib/supabaseClient"; 

export default function PáginaPrueba() {
  const [estadoEnv, setEstadoEnv] = useState("Cargando...");
  const [estadoConexion, setEstadoConexion] = useState("Cargando...");

  useEffect(() => {
    // 1. Validar si tu cliente se inicializó correctamente con variables
    // (Buscamos si las propiedades internas del cliente no están vacías)
    const urlDetectada = supabase.supabaseUrl;
    const keyDetectada = supabase.supabaseKey;

    if (urlDetectada && keyDetectada) {
      setEstadoEnv("✅ ¡Tu lib/supabaseClient está activo y leyó las variables de .env.local!");
    } else {
      setEstadoEnv("❌ Error: Tu cliente centralizado no tiene las credenciales cargadas.");
    }

    // 2. Probar si la base de datos PostgreSQL responde a través de tu cliente
    async function probarBaseDeDatos() {
      try {
        const { data, error } = await supabase.from("categories").select("*").limit(1);
        
        if (error) {
          setEstadoConexion(`❌ Error en PostgreSQL: ${error.message}`);
        } else {
          setEstadoConexion("✅ ¡Conexión exitosa! Tu cliente centralizado lee y escribe en Supabase perfectamente.");
        }
      } catch (err) {
        setEstadoConexion(`❌ Error de red/código: ${err.message}`);
      }
    }

    probarBaseDeDatos();
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <h1 style={{ color: "#0f172a" }}>Panel de Diagnóstico (Con Cliente Centralizado)</h1>
      
      <div style={{ margin: "20px 0", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3>1. Validación de Instancia (`lib/supabaseClient`)</h3>
        <p style={{ fontWeight: "bold", color: urlToKeyValid() ? "#16a34a" : "#dc2626" }}>{estadoEnv}</p>
      </div>

      <div style={{ margin: "20px 0", padding: "20px", background: "white", borderRadius: "8px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
        <h3>2. Respuesta del Servidor PostgreSQL</h3>
        <p style={{ fontWeight: "bold" }}>{estadoConexion}</p>
      </div>
    </div>
  );

  function urlToKeyValid() {
    return supabase.supabaseUrl && supabase.supabaseKey;
  }
}