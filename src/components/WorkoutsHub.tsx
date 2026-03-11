import WorkoutCards from './WorkoutCards';

export default function WorkoutsHub() {
  return (
    <div className="flex-1 flex flex-col h-full relative bg-background-dark radial-glow">
      {/* Header */}
      <header className="flex items-center justify-between px-6 pt-12 pb-4 bg-background-dark/80 backdrop-blur-md sticky top-0 z-20">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
          <p className="text-xs text-slate-400 mt-1">GPRR Database Overview</p>
        </div>
        <div className="size-10 rounded-full bg-slate-900/80 border border-white/10 flex items-center justify-center hover:bg-slate-800 transition-colors cursor-pointer overflow-hidden">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity" referrerPolicy="no-referrer" />
        </div>
      </header>

      {/* Empty State / Placeholder */}
      <div className="flex-1 flex flex-col items-center justify-center px-7 text-center">
        <div className="size-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 border border-primary/20">
          <span className="material-symbols-outlined text-primary text-3xl">analytics</span>
        </div>
        <h2 className="text-lg font-semibold text-white">No data available</h2>
        <p className="text-sm text-slate-500 mt-2 max-w-[240px]">
          Dashboard data has been cleared. Connect your devices to start tracking.
        </p>
      </div>
    </div>
  );
}
