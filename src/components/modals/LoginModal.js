"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // 🚀 Importamos el enrutador de Next.js
import { Eye, EyeOff, Shield } from "lucide-react";
import Image from "next/image";
import Image2 from "@/assets/image.jpg";
import Image3 from "@/assets/image12.jpg";

export default function LoginModal({ isOpen, onClose, isRegister, setIsRegister }) {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("admin"); // 💡 Rol por defecto para pruebas
  const router = useRouter(); // Inicializamos el enrutador

  // Si el modal no está activo, no renderiza nada
  if (!isOpen) return null;

  // 🚀 Manejador del envío del formulario (Login / Register)
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Aquí simularías tu lógica de Supabase Auth en el futuro.
    // Por ahora, redirigimos pasando el rol seleccionado como Query Parameter.
    router.push(`/dashboard?role=${selectedRole}`);
    
    onClose(); // Cierra el modal tras el login exitoso
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      
      {/* CAPA DE CIERRE */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* CONTENEDOR PRINCIPAL DEL MODAL */}
      <div className="relative bg-white w-full max-w-4xl h-[610px] rounded-[32px] shadow-2xl overflow-hidden flex z-10 border border-gray-100">
        
        {/* BOTÓN DE CIERRE (X) */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors z-30 text-xl font-medium"
        >
          ✕
        </button>

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
          
          {/* Logo de la marca fijo */}
          <div className="absolute top-10 flex items-center gap-2 text-[#050b24]">
            <div className="h-6 w-6 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-md rotate-12" />
            <span className="font-bold text-xl tracking-tight">AI Support.Tickets</span>
          </div>

          {/* Renderizado Condicional con Animación de Entrada */}
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

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Campo extra si es registro */}
              {isRegister && (
                <div className="relative border-b border-gray-200 focus-within:border-black transition-colors py-1">
                  <label className="block text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Full Name
                  </label>
                  <input 
                    type="text" 
                    placeholder="Alex Mercer"
                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 placeholder-gray-300"
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
                  defaultValue={isRegister ? "" : "hello.alex@gmail.com"}
                  placeholder={isRegister ? "your@email.com" : ""}
                  className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 placeholder-gray-300"
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
                    defaultValue={isRegister ? "" : "411"}
                    placeholder={isRegister ? "••••••••" : ""}
                    className="w-full bg-transparent border-none outline-none text-sm font-medium text-[#050b24] pt-1 pb-1 px-0 focus:ring-0 tracking-widest placeholder-gray-300"
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

              {/* 🛠️ SELECTOR DE ROL TEMPORAL PARA PRUEBAS (Simula el rol de DB) */}
              <div className="bg-gray-50 p-2.5 rounded-xl border border-gray-200 flex items-center justify-between gap-2 mt-2">
                <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
                  <Shield size={13} className="text-blue-500" />
                  Simular Rol:
                </span>
                <select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value)}
                  className="bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 py-1 px-2.5 outline-none cursor-pointer focus:border-blue-500"
                >
                  <option value="admin">Administrador</option>
                  <option value="agent">Agente de Soporte</option>
                  <option value="client">Cliente estándar</option>
                </select>
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
                  className="w-full bg-[#0d1117] hover:bg-black text-white font-medium py-3 rounded-full text-xs shadow-md transition-all active:scale-[0.98]"
                >
                  {isRegister ? "Sign Up & Enter" : "Log in & Enter"}
                </button>
              </div>

            </form>

            {/* Selector inferior para alternar de Modo */}
            <div className="mt-5 text-center">
              <p className="text-xs text-gray-400">
                {isRegister ? "Already have an account? " : "Don't have an account? "}
                <button 
                  type="button"
                  onClick={() => setIsRegister(!isRegister)} 
                  className="text-black font-semibold hover:underline bg-transparent border-none p-0 cursor-pointer inline"
                >
                  {isRegister ? "Log In" : "Sign Up"}
                </button>
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}