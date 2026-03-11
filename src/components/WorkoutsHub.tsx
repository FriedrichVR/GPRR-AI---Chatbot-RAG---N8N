import WorkoutCards from './WorkoutCards';

export default function WorkoutsHub() {
  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between z-20 shrink-0 bg-[#030303]/80 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white">INVAP XR</h1>
      </div>

      {/* Scroll Content */}
      <div className="flex-1 overflow-y-auto px-7 pb-28 pt-4 space-y-6 no-scrollbar mask-gradient relative z-10">
        <WorkoutCards />
      </div>
    </div>
  );
}
