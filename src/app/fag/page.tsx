"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Navbar from "@/components/landing/Navbar";

export default function FAQ() {
  // Estado para controlar qué pregunta está abierta (guarda el índice)
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How does the AI categorize tickets automatically?",
      answer: "Our platform utilizes advanced Natural Language Processing (NLP) models. The moment a user submits a ticket, the AI instantly analyzes the text semantic meaning, intent, and urgency to route it to the exact department without human intervention."
    },
    {
      question: "Is it secure to connect our industrial logs or database?",
      answer: "Absolutely. Security is our top priority. All data channels are fully encrypted in transit and at rest using AES-256 standards. We operate on enterprise-grade infrastructure and comply with global privacy regulations."
    },
    {
      question: "Can we customize the predictive routing constraints?",
      answer: "Yes, you have complete control over the automation rules. Through the dashboard, you can define custom thresholds for escalation, train the AI with your specific vocabulary, and override automated decisions whenever necessary."
    },
    {
      question: "What is the onboarding process for a engineering team?",
      answer: "Integration takes less than a day. Our API is developer-friendly, and we provide plug-and-play SDKs for the most common ticketing software. Your engineering team can connect and start monitoring live metrics right away."
    }
  ];

  return (
    <section className="bg-[#050b24] py-24 px-6 relative overflow-hidden border-t border-white/5">
      {/* Detalle de luz difusa en el fondo a la derecha */}
        <Navbar/>
      <div className="absolute top-[-10%] right-[-5%] w-[450px] h-[450px] bg-blue-600/5 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Encabezado */}
        <div className="text-center mb-16">
          <span className="text-xs font-bold tracking-wider uppercase bg-purple-500/10 text-purple-300 px-4 py-1.5 rounded-full border border-purple-500/20">
            Support
          </span>
          <h2 className="text-3xl font-bold text-white sm:text-5xl tracking-tight mt-4">
            Frequently Asked <br />
            <span className="bg-gradient-to-r from-blue-400 to-indigo-200 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="mt-4 text-gray-400 text-sm sm:text-base max-w-xl mx-auto">
            Can’t find what you’re looking for? Reach out to our tech support team for direct assistance.
          </p>
        </div>

        {/* Lista de Acordeones */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl overflow-hidden transition-colors duration-300 hover:bg-white/[0.07]"
              >
                {/* Botón de la Pregunta */}
                <button
                  onClick={() => {}}
                  className="w-full text-left p-6 flex justify-between items-center gap-4 focus:outline-none"
                >
                  <span className="text-sm sm:text-base font-semibold text-white tracking-wide">
                    {faq.question}
                  </span>
                  
                  {/* Icono de Flecha Animado */}
                  <div
                    className={`w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-gray-400 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-blue-400 bg-white/10" : ""
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Contenedor de la Respuesta con Animación de Altura */}
                <div
                  className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOpen ? "max-h-48 border-t border-white/5" : "max-h-0"
                  }`}
                >
                  <p className="p-6 text-xs sm:text-sm text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}