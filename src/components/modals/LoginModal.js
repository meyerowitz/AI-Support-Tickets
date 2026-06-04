"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; 
import { Eye, EyeOff, Shield } from "lucide-react";
import Image from "next/image";
import Image2 from "@/assets/image.webp";
import Image3 from "@/assets/image12.jpg";
// 🚀 Importamos tu cliente centralizado de Supabase
import { supabase } from "@/lib/supabaseClient"; 
import EmailConfirmationModal from "@/components/modals/EmailConfirmationModal"

export default function LoginModal({ isOpen, onClose, isRegister, setIsRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("client"); // Rol por defecto inicial seguro
  const [loading, setLoading] = useState(false); // 💡 Estado de feedback para peticiones asíncronas
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  // Estados para capturar los valores de los inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Captura errores de Supabase Auth

  const router = useRouter(); 

  if (!isOpen) return null;

  const handleFinalRedirect = () => {
  setIsConfirmOpen(false);
  router.push("/dashboard");   // Lo manda directo al sistema simulando la verificación
  router.refresh();
};

  // 🚀 LÓGICA DE ENVÍO CON SUPABASE AUTH REAL
  // 🚀 LÓGICA DE AUTENTICACIÓN INTELIGENTE Y CONTROL DE ERRORES REALES
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const emailValue = email.trim();
    const passwordValue = password;
    const nameValue = fullName.trim() || "Usuario Nuevo";

    try {
      if (isRegister) {
        // ─── CAMINO A: REGISTRO DE NUEVO USUARIO ───
        const { data, error } = await supabase.auth.signUp({
          email: emailValue,
          password: passwordValue,
          options: {
            data: {
              full_name: nameValue,
              role: selectedRole,
            },
          },
        });

        if (error) throw error;

        // 💡 COMPROBACIÓN INTELIGENTE:
        // Si Supabase devuelve 'session: null', la confirmación por email está ACTIVADA.
        if (!data?.session) {
          setIsConfirmOpen(true); // 🚀 Desplegamos el hermoso modal del cohete
        } else {
          // Si 'session' existe, la confirmación está DESACTIVADA. Va directo adentro.
          router.push("/dashboard");
          router.refresh();
          onClose();
        }

      } else {
        // ─── CAMINO B: INICIO DE SESIÓN TRADICIONAL ───
        const { data: loginData, error: loginError } = await supabase.auth.signInWithPassword({
          email: emailValue,
          password: passwordValue,
        });

        if (loginError) throw loginError;

        router.push("/dashboard");
        router.refresh(); 
        onClose(); 
      }

    } catch (error) {
      // ⚠️ Captura de errores reales (Ej: "User already registered", "Invalid login credentials")
      setErrorMessage(error.message || "Ocurrió un error inesperado.");
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      
      {/* CAPA DE CIERRE */}
      <div className="absolute inset-0" onClick={!loading ? onClose : undefined} />

      {/* CONTENEDOR PRINCIPAL DEL MODAL */}
      <div className="relative bg-white w-full max-w-4xl h-[610px] rounded-[32px] shadow-2xl overflow-hidden flex z-10 border border-gray-100">
        
        {/* BOTÓN DE CIERRE (X) */}
        {!loading && (
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-30 text-xl font-medium"
          >
            ✕
          </button>
        )}

        {/* ─── COLUMNA ANIMADA: IMAGEN ─── */}
        <div 
          className={`hidden md:block w-1/2 h-full p-4 transition-transform duration-500 ease-in-out z-20
            ${isRegister ? "translate-x-full" : "translate-x-0"}`}
        >
          <div className="w-full h-full bg-[#f3f4f6] rounded-[24px] overflow-hidden relative flex items-center justify-center">
            <Image 
              src={isRegister ? Image3 : Image2}
              alt="Join AI Support Registration" 
              fill
              className="object-cover opacity-90 filter contrast-125 mix-blend-multiply"
              priority 
            />
          </div>
        </div>

        {/* ─── COLUMNA ANIMADA: FORMULARIOS ─── */}
        <div 
          className={`w-full md:w-1/2 h-full flex flex-col justify-center px-8 sm:px-12 md:px-16 relative bg-white transition-transform duration-500 ease-in-out
            ${isRegister ? "md:-translate-x-full" : "translate-x-0"}`}
        >
          
          {/* Logo de la marca */}
          <div className="absolute top-10 flex items-center gap-2 text-[#050b24]">
            <div className="h-6 w-6 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-md rotate-12" />
            <span className="font-bold text-xl tracking-tight">AI Support.Tickets</span>
          </div>

          <div key={isRegister ? "register" : "login"} className="animate-[fadeIn_0.3s_ease-out] mt-6">
            
            {/* Encabezado Dinámico */}
            <div className="mb-5">
              <h2 className="text-3xl font-extrabold text-[#050b24] tracking-tight">
                {isRegister ? "Create Account" : "Login"}
              </h2>
              <p className="text-xs text-gray-400 mt-1.5">
                {isRegister ? "Join us and automate your workflows" : "Enter your credentials to access."}
              </p>
            </div>

            {/* Alerta de Error si la autenticación falla */}
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs px-3 py-2 rounded-xl mb-4 font-medium animate-pulse">
                ⚠️ {errorMessage}
              </div>
            )}

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo Nombre Completo (Solo registro) */}
              {isRegister && (
                <div className="relative border-b border-gray-200 focus-within:border-black transition-colors py-1">
                  <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Alex Mercer"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    disabled={loading}
                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 placeholder-gray-300 disabled:opacity-50"
                    required
                  />
                </div>
              )}

              {/* Input Email */}
              <div className="relative border-b border-gray-200 focus-within:border-black transition-colors py-1">
                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Email
                </label>
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                  className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 placeholder-gray-300 disabled:opacity-50"
                  required
                />
              </div>

              {/* Input Password */}
              <div className="relative border-b border-gray-200 focus-within:border-black transition-colors py-1">
                <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  Password
                </label>
                <div className="flex items-center justify-between">
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 tracking-widest placeholder-gray-300 disabled:opacity-50"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>


              {/* Opciones extras (Solo visibles en Modo Login) */}
              {!isRegister && (
                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 text-gray-500 cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      defaultChecked
                      className="rounded border-gray-300 text-black focus:ring-black accent-black w-3.5 h-3.5" 
                    />
                    <span>Remember me</span>
                  </label>
                  <a href="#" className="text-gray-400 hover:text-black transition-colors">
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Botón de Acción Principal */}
              <div className="pt-2">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-[#0d1117] hover:bg-black text-white font-medium py-3 rounded-full text-xs shadow-md transition-all active:scale-[0.98] disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : isRegister ? (
                    "Sign Up & Enter"
                  ) : (
                    "Log in & Enter"
                  )}
                </button>
              </div>

            </form>

            {/* Selector inferior para alternar de Modo */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-400">
                {isRegister ? "Already have an account? " : "Don't have an account? "}
                <button 
                  type="button"
                  onClick={() => {
                    if (!loading) {
                      setIsRegister(!isRegister);
                      setErrorMessage("");
                    }
                  }} 
                  className="text-black font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer inline disabled:opacity-50"
                  disabled={loading}
                >
                  {isRegister ? "Log In" : "Sign Up"}
                </button>
              </p>
            </div>

          </div>

        </div>

      </div>
      {/* ─── 🚀 AQUÍ ESTÁ ANIDADO COMO COMPONENTE LIMPIO ─── */}
      <EmailConfirmationModal 
        isOpen={isConfirmOpen}
        onClose={() => {
          setIsConfirmOpen(false);
          setIsRegister(false); // Cambia la vista interna a Login
        }}
        email={email}
        onConfirm={handleFinalRedirect}
      />
    </div>
  );
}