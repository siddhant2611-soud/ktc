export function Logo() {
  return (
    <div className="flex items-center justify-center shrink-0">
      <img src="/Logo.png" alt="KTC Kaushik Transport Company" className="h-12 sm:h-14 w-auto object-contain fallback-logo" onError={(e) => {
        // Fallback if image fails to load
        (e.target as HTMLImageElement).style.display = 'none';
        const nextSibling = (e.target as HTMLImageElement).nextElementSibling as HTMLElement;
        if (nextSibling) nextSibling.style.display = 'flex';
      }} />
      <div className="hidden flex-col items-center justify-center select-none scale-90 sm:scale-100 origin-left">
        <div className="flex items-center">
          <span className="text-[#1D4ED8] font-black italic text-4xl tracking-tighter drop-shadow-md">K</span>
          <span className="text-[#4B5563] font-black italic text-4xl tracking-tighter drop-shadow-md">T</span>
          <span className="text-[#1D4ED8] font-black italic text-4xl tracking-tighter drop-shadow-md -ml-1">C</span>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <div className="w-3 h-0.5 bg-[#4B5563] opacity-60"></div>
          <span className="text-[#1D4ED8] font-bold text-sm tracking-[0.2em] uppercase">Kaushik</span>
          <div className="w-3 h-0.5 bg-[#4B5563] opacity-60"></div>
        </div>
        <span className="text-[#94A3B8] font-medium text-[8px] tracking-[0.3em] uppercase mt-0.5">
          Transport Company
        </span>
      </div>
    </div>
  );
}
