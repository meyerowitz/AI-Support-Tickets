"use client";
import React from "react";

export default function EmailConfirmationModal({ isOpen, onClose, email, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative bg-[#f4f7ff] w-full max-w-sm rounded-[32px] p-8 text-center shadow-2xl border border-blue-50/50 flex flex-col items-center z-10 animate-[scaleUp_0.3s_ease-out]">
        
        {/* Ilustración del cohete */}
        <div className="w-full h-36 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-[24px] relative overflow-hidden flex items-center justify-center shadow-inner mb-6">
          <div className="absolute top-4 left-6 w-1 h-1 bg-white/60 rounded-full" />
          <div className="absolute top-8 right-12 w-1.5 h-1.5 bg-white/40 rounded-full" />
          <div className="absolute bottom-6 left-12 w-1 h-1 bg-white/50 rounded-full" />
          
          <div className="absolute bottom-[-10px] w-full flex justify-center items-end gap-1 opacity-95">
            <div className="w-20 h-10 bg-white rounded-full translate-y-3" />
            <div className="w-24 h-14 bg-white rounded-full translate-y-2 shadow-sm" />
            <div className="w-20 h-10 bg-white rounded-full translate-y-3" />
          </div>

          <div className="relative flex flex-col items-center mb-2 animate-bounce duration-1000">
            <div className="w-7 h-14 bg-white rounded-t-full relative flex flex-col items-center pt-3">
              <div className="w-3 h-3 bg-blue-400 rounded-full border border-white" />
              <div className="absolute bottom-0 left-[-6px] w-2 h-4 bg-blue-200 rounded-l-full" />
              <div className="absolute bottom-0 right-[-6px] w-2 h-4 bg-blue-200 rounded-r-full" />
            </div>
            <div className="w-2 h-6 bg-gradient-to-b from-orange-400 to-transparent rounded-b-full opacity-80" />
          </div>
        </div>

        <h3 className="text-2xl font-extrabold text-[#050b24] tracking-tight">Sent !</h3>
        
        <p className="text-xs text-gray-400 mt-2 max-w-[240px] leading-relaxed">
          Please understand and follow the instructions given. You're going to confirm your account to the enclosed E-mail:
        </p>

        <div className="mt-3 bg-blue-50 border border-blue-100 px-3 py-1.5 rounded-xl w-full">
          <span className="text-xs font-semibold text-blue-600 block truncate max-w-[240px] mx-auto">
            {email}
          </span>
        </div>

        <button
          onClick={onConfirm}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-full text-xs shadow-lg shadow-blue-600/20 transition-all active:scale-[0.98]"
        >
          Confirm Email & Enter
        </button>

        <button 
          onClick={onClose}
          className="mt-3.5 text-[11px] text-gray-400 hover:text-gray-600 font-medium transition-colors"
        >
          Check later
        </button>

      </div>
    </div>
  );
}