import { Cpu, Sparkles, Box, Play, Camera, Activity } from 'lucide-react';

export default function WorkoutCards() {
  return (
    <>
      {/* Stats Row */}
      <div className="grid grid-cols-3 gap-3 mb-2">
        <div className="bg-[#0A0D0C] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
          <Activity className="w-4 h-4 text-emerald-500 mb-1" />
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">Latencia</span>
          <span className="text-sm font-bold text-white">12ms</span>
        </div>
        <div className="bg-[#0A0D0C] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
          <Cpu className="w-4 h-4 text-blue-500 mb-1" />
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">IA Load</span>
          <span className="text-sm font-bold text-white">24%</span>
        </div>
        <div className="bg-[#0A0D0C] border border-white/5 rounded-2xl p-3 flex flex-col items-center justify-center">
          <Box className="w-4 h-4 text-purple-500 mb-1" />
          <span className="text-[10px] text-neutral-500 uppercase font-bold tracking-tighter">FPS</span>
          <span className="text-sm font-bold text-white">90</span>
        </div>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* AI Simulation */}
        <div className="col-span-1 h-56 rounded-[2rem] bg-gradient-to-br from-neutral-900 to-[#080808] border border-white/10 p-5 flex flex-col justify-between group cursor-pointer hover:border-emerald-500/30 transition-all duration-300 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[40px] rounded-full group-hover:bg-emerald-500/20 transition-all"></div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform duration-300">
            <Cpu className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-medium text-white tracking-tight leading-6">Asistente<br/>IA RAG</h2>
            <p className="text-[10px] font-medium text-neutral-500 mt-2 group-hover:text-emerald-400 transition-colors flex items-center gap-0.5">
              Procesamiento Local <Sparkles className="w-2.5 h-2.5" />
            </p>
          </div>
        </div>

        {/* VR Experience */}
        <div className="col-span-1 h-56 rounded-[2rem] bg-[#0a0a0a] border border-white/10 relative overflow-hidden group cursor-pointer hover:border-neutral-600 transition-all">
          <img src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop" alt="VR" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent"></div>
          <div className="absolute inset-0 p-5 flex flex-col justify-end">
            <div className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white mb-2 border border-white/20">
              <Box className="w-4 h-4" />
            </div>
            <h2 className="text-lg font-medium text-white tracking-tight leading-6">Simulación<br/>Inmersiva</h2>
          </div>
        </div>
      </div>

      {/* Gallery Section */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-neutral-400 uppercase tracking-widest flex items-center gap-2">
            <Camera className="w-4 h-4" /> GPRR Gallery
          </h3>
          <button className="text-xs text-emerald-500 hover:text-emerald-400 font-medium">Ver todas</button>
        </div>
        
        <div className="space-y-4">
          {/* Photo 1 */}
          <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1773194473562-5f9480fb8e98?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Reactor GPRR" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
              <h4 className="text-white font-bold text-sm">Núcleo del Reactor</h4>
              <p className="text-neutral-400 text-[10px] mt-1">Visualización de alta fidelidad - UE 5.5</p>
            </div>
          </div>

          {/* Photo 2 */}
          <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1773194396493-6c9502eea26f?q=80&w=1340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
              alt="Control Room" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
              <h4 className="text-white font-bold text-sm">Sala de Control</h4>
              <p className="text-neutral-400 text-[10px] mt-1">Gemelo Digital en tiempo real</p>
            </div>
          </div>

          {/* Photo 3 */}
          <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
            <img 
              src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop" 
              alt="VR Tech" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
              <h4 className="text-white font-bold text-sm">Hardware XR</h4>
              <p className="text-neutral-400 text-[10px] mt-1">Integración Varjo / Meta Quest 3</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
