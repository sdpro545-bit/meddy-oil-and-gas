export default function Loading() {
  return (
    <div
      role="progressbar"
      aria-label="Loading page"
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-[#0B1E36] overflow-hidden pointer-events-none"
    >
      <div className="h-full w-1/3 bg-[#F69E28] animate-[meddy-loading_1s_ease-in-out_infinite]" />
      <style>{`
        @keyframes meddy-loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}</style>
    </div>
  );
}
