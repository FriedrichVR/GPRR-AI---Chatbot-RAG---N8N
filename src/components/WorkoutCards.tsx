import { Layers, Sparkles, Dumbbell, Play } from 'lucide-react';

export default function WorkoutCards() {
  return (
    <>
      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Build Split */}
        <div className="col-span-1 h-56 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-[#080808] border border-white/10 p-5 flex flex-col justify-between group cursor-pointer hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white tracking-tight leading-6">Build<br/>a Split</h2>
            <p className="text-[10px] font-medium text-neutral-500 mt-2 group-hover:text-emerald-400 transition-colors flex items-center gap-0.5">
              AI Powered <Sparkles className="w-2.5 h-2.5" />
            </p>
          </div>
        </div>

        {/* Build Workout */}
        <div className="col-span-1 h-56 rounded-[2rem] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group cursor-pointer hover:border-neutral-600 transition-all">
          <img src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=1469&auto=format&fit=crop" alt="Workout" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-2 border border-white/20">
              <Dumbbell className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-medium text-white tracking-tight leading-6">Single<br/>Session</h2>
          </div>
        </div>
      </div>

      {/* Library Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest">Library</h3>
          <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">View All</button>
        </div>
        
        <div className="space-y-3">
          {/* Card 1 */}
          <div className="glass-card p-4 rounded-[1.5rem] flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 to-transparent"></div>
              <span className="text-lg font-bold text-white z-10">PPL</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium text-white truncate">Push Pull Legs</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-neutral-500">6 Days</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                <span className="text-xs text-neutral-500">Hypertrophy</span>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]">
              <Play className="w-4 h-4 fill-black ml-0.5" />
            </button>
          </div>

          {/* Card 2 */}
          <div className="glass-card p-4 rounded-[1.5rem] flex items-center gap-4 group cursor-pointer hover:bg-white/5 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-neutral-900 flex items-center justify-center relative overflow-hidden border border-white/5">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 to-transparent"></div>
              <span className="text-lg font-bold text-white z-10">FB</span>
            </div>
            <div className="flex-1 min-w-0">
              <h4 className="text-base font-medium text-white truncate">Full Body A</h4>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-neutral-500">45 Min</span>
                <span className="w-1 h-1 rounded-full bg-neutral-700"></span>
                <span className="text-xs text-neutral-500">Strength</span>
              </div>
            </div>
            <button className="w-9 h-9 rounded-full bg-neutral-800 text-white border border-neutral-700 flex items-center justify-center hover:bg-emerald-500 hover:text-black hover:border-emerald-500 hover:shadow-[0_0_15px_rgba(16,185,129,0.4)] transition-all">
              <Play className="w-4 h-4 ml-0.5 fill-current" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
