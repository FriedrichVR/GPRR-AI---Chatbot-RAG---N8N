import WorkoutCards from './WorkoutCards';

export default function WorkoutsHub() {
  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header */}
      <div className="px-7 pt-4 pb-2 flex justify-between items-end z-20 shrink-0">
        <h1 className="text-3xl font-medium tracking-tight text-white">Workouts</h1>
        <div className="w-10 h-10 rounded-full bg-neutral-900/80 border border-white/10 flex items-center justify-center hover:bg-neutral-800 transition-colors cursor-pointer">
          <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Profile" className="w-full h-full rounded-full opacity-90 hover:opacity-100 transition-opacity" />
        </div>
      </div>

      {/* Scroll Content */}
      <div className="flex-1 overflow-y-auto px-7 pb-28 pt-4 space-y-6 no-scrollbar mask-gradient relative z-10">
        <WorkoutCards />
      </div>
    </div>
  );
}
