import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-[#050b24]/70 backdrop-blur-md border-b border-white/5 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        {/* Logo de la marca */}
        <div className="flex items-center gap-2 text-white font-bold text-xl tracking-tight">
          <div className="h-6 w-6 bg-gradient-to-tr from-blue-500 to-indigo-400 rounded-md rotate-12" />
          <span>AI Support.Tickets</span>
        </div>

        {/* Menú de Navegación del Centro */}
        <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
          <Link href="#" className="hover:text-white transition-colors">Home</Link>
          <Link href="#" className="hover:text-white transition-colors">Features</Link>
          <Link href="#" className="hover:text-white transition-colors">How it Works</Link>
          <Link href="#" className="hover:text-white transition-colors">FAQ</Link>
        </div>

        {/* CTAs de Ingreso */}
        <div className="flex items-center gap-5 text-sm">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">
            Log In
          </Link>
          <Link href="/register" className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-full transition-all shadow-lg shadow-blue-600/20">
            Contact Us
          </Link>
        </div>
      </div>
    </nav>
  );
}