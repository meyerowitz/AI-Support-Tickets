"use client"

import Link from "next/link";
import LoginModal from "../modals/LoginModal";
import { useState } from "react";

export default function Navbar() {

  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegis, setIsRegis] = useState(false);

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
          <span className="before:content-[''] before:absolute before:w-full before:height-[2px] before:h-[2px] before:bg-gradient-to-r before:from-oraneg-500 before:to-cyan-400 before:top-[-5px] before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 before:ease-out after:content-[''] after:absolute after:w-full after:height-[2px] after:h-[2px]  after:bg-gradient-to-r after:from-orange-500 after:to-cyan-400  after:bottom-[-5px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100   ">
            AI Support.Tickets</span>
        </div>

        {/* Menú de Navegación del Centro */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="/" className="before:content-[''] before:absolute before:w-full before:height-[2px] before:h-[2px] before:bg-gradient-to-r before:from-oraneg-500 before:to-cyan-400 before:top-[-5px] before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 before:ease-out after:content-[''] after:absolute after:w-full after:height-[2px] after:h-[2px]  after:bg-gradient-to-r after:from-orange-500 after:to-cyan-400  after:bottom-[-5px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100   ">
                    Home</Link>
          <Link href="/features" className="before:content-[''] before:absolute before:w-full before:height-[2px] before:h-[2px] before:bg-gradient-to-r before:from-oraneg-500 before:to-cyan-400 before:top-[-5px] before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 before:ease-out after:content-[''] after:absolute after:w-full after:height-[2px] after:h-[2px]  after:bg-gradient-to-r after:from-orange-500 after:to-cyan-400  after:bottom-[-5px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100   ">
          Features</Link>
          <Link href="/works" className="before:content-[''] before:absolute before:w-full before:height-[2px] before:h-[2px] before:bg-gradient-to-r before:from-oraneg-500 before:to-cyan-400 before:top-[-5px] before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 before:ease-out after:content-[''] after:absolute after:w-full after:height-[2px] after:h-[2px]  after:bg-gradient-to-r after:from-orange-500 after:to-cyan-400  after:bottom-[-5px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100   ">
          How it Works</Link>
          <Link href="/fag" className="before:content-[''] before:absolute before:w-full before:height-[2px] before:h-[2px] before:bg-gradient-to-r before:from-oraneg-500 before:to-cyan-400 before:top-[-5px] before:left-0 before:scale-x-0 before:origin-left before:transition-transform before:duration-400 before:ease-out after:content-[''] after:absolute after:w-full after:height-[2px] after:h-[2px]  after:bg-gradient-to-r after:from-orange-500 after:to-cyan-400  after:bottom-[-5px] after:left-0 after:scale-x-0 after:origin-right after:transition-transform after:duration-400 after:ease-out hover:before:scale-x-100 hover:after:scale-x-100   ">
          FAQ</Link>
        </div>

        {/* CTAs de Ingreso */}
        <div className="flex items-center gap-5 text-sm">
          <button 
    onClick={()=>{ setIsRegis(false), setIsLoginOpen(true)}} 
    className="relative text-gray-300 hover:text-white transition-colors duration-300 font-medium focus:outline-none py-1
      after:content-[''] after:absolute after:w-full after:h-[1.5px] after:bg-blue-400 
      after:bottom-0 after:left-0 after:scale-x-0 hover:after:scale-x-100 
      after:transition-transform after:duration-300 after:ease-out after:origin-center"
  >
    Log In
  </button>
  
  {/* Botón Contact Us con micro-elevación y expansión de sombra */}
  <button
    onClick={()=>{ setIsRegis(true), setIsLoginOpen(true)}}
    className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-full 
      transition-all duration-300 transform hover:-translate-y-[2px] 
      shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-500/30 active:translate-y-0"
  >
    Register
  </button>
        </div>
      </div>
    </nav>
    <LoginModal 
        isOpen={isLoginOpen} 
        isRegister={isRegis}
        setIsRegister={setIsRegis}
        onClose={() => {setIsLoginOpen(false)}} // Si se cierra por dentro, resetea el estado a false
      />
    </>
  );
}