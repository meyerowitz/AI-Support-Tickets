export default function PestanaDivider() {
  return (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20 pointer-events-none select-none translate-y-[50px]">
      <svg
        viewBox="0 0 1440 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto relative"
        // Asegura que mantenga la proporción correcta a lo ancho
        preserveAspectRatio="none" 
      >
        <path
          // 💡 Este 'd' dibuja exactamente la forma de la pestaña de tu imagen con bordes curvos
          d="M0 120 
             C0 120, 0 90, 30 90 
             L420 90 
             C460 90, 520 0, 570 0 
             L870 0 
             C920 0, 980 90, 1020 90 
             L1410 90 
             C1440 90, 1440 120, 1440 120 
             L1440 200 L0 200 Z"
          className="fill-gray-50" 
        />
      </svg>
    </div>
  );
}