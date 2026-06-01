"use client";

import Link from "next/link";
import LoginModal from "../modals/LoginModal";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient"; // 🚀 Importamos tu cliente de Supabase
import { useRouter } from "next/navigation"; // 🚀 Importamos para poder redirigir al cerrar sesión

export default function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegis, setIsRegis] = useState(false);
  const [session, setSession] = useState(null); // 💡 Estado para controlar si hay usuario logueado
  
  const router = useRouter();

  // 🛡️ ESCUCHADOR DE SESIÓN EN TIEMPO REAL
  useEffect(() => {
    // 1. Validamos la sesión inicial en cuanto se monta el componente
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
    });

    // 2. Nos suscribimos a cualquier cambio en la autenticación (login, logout, registro)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
      setSession(currentSession);
    });

    // Limpiamos la suscripción cuando el componente se desmonte
    return () => subscription.unsubscribe();
  }, []);

  // 🚪 FUNCIÓN PARA CERRAR SESIÓN
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/"); // Lo mandamos a la landing page
    router.refresh(); // Limpia cachés de Next.js
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-[#050b24]/70 backdrop-blur-md border-b border-white/5 px-6 py-4 rounded-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          
          {/* Logo de la marca */}
          <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
            <div className="h-6 w-6 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-md rotate-12 transition-all duration-300 ease-out
                hover:rotate-[6deg] 
                hover:scale-110 
              hover:from-blue-400 hover:to-indigo-300
                hover:shadow-lg hover:shadow-blue-500/40" />
            <span className="relative hover:before:scale-x-100 hover:after:scale-x-100">
              AI Support.Tickets
            </span>
          </div>

          {/* Menú de Navegación del Centro */}
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link href="/" className="relative hover:before:scale-x-100 hover:after:scale-x-100">Home</Link>
            <Link href="/features" className="relative hover:before:scale-x-100 hover:after:scale-x-100">Features</Link>
            <Link href="/works" className="relative hover:before:scale-x-100 hover:after:scale-x-100">How it Works</Link>
            <Link href="/fag" className="relative hover:before:scale-x-100 hover:after:scale-x-100">FAQ</Link>
          </div>

          {/* ─── CTAs DE INGRESO DINÁMICOS O CONDICIONALES ─── */}
          <div className="flex items-center gap-5 text-sm">
            {session ? (
              // ✅ CASO: USUARIO LOGUEADO -> Mostramos Dashboard y Cerrar Sesión
              <>
                <Link 
                  href="/dashboard"
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium focus:outline-none py-1
                    after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-blue-400 
                    after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 
                    after:transition-transform after:duration-300 after:ease-out after:origin-center"
                >
                  Ir al Dashboard
                </Link>
                
                <button
                  onClick={handleLogout}
                  className="bg-red-600/20 hover:bg-red-600 text-red-200 hover:text-white border border-red-500/30 font-medium px-5 py-2.5 rounded-full 
                    transition-all duration-300 transform hover:-translate-y-[2px] 
                    shadow-lg shadow-red-600/10 hover:shadow-xl hover:shadow-red-500/20 active:translate-y-0"
                >
                  Sign Out
                </button>
              </>
            ) : (
              // ❌ CASO: SIN SESIÓN -> Mostramos botones tradicionales de Log In y Register
              <>
                <button 
                  onClick={() => { setIsRegis(false); setIsLoginOpen(true); }} 
                  className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium focus:outline-none py-1
                    after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-blue-400 
                    after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 
                    after:transition-transform after:duration-300 after:ease-out after:origin-center"
                >
                  Log In
                </button>
                
                <button
                  onClick={() => { setIsRegis(true); setIsLoginOpen(true); }}
                  className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-full 
                    transition-all duration-300 transform hover:-translate-y-[2px] 
                    shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
                >
                  Register
                </button>
              </>
            )}
          </div>

        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginOpen} 
        isRegister={isRegis}
        setIsRegister={setIsRegis}
        onClose={() => { setIsLoginOpen(false); }} 
      />
    </>
  );
}