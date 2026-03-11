import { User, Code, Cpu, Box, ChevronRight } from 'lucide-react';

interface Profile {
  name: string;
  role: string;
  description: string;
  tags: string[];
  avatar?: string;
}

const team: Profile[] = [
  {
    name: "Federico Sastre Heer",
    role: "Desarrollador XR, IA y Simulación en INVAP",
    description: "Especialista en Unreal Engine 5.5 y Gemelos Digitales. Lidera el desarrollo de 'GPRR: The INVAP XR Experience', integrando física de neutrones con entornos inmersivos y arquitecturas RAG para asistentes inteligentes.",
    tags: ["UE 5.5", "RAG", "Digital Twins", "C++"],
  },
  {
    name: "Alén Eneas Geor",
    role: "Especialista en Arte Técnico, XR y Simulación",
    description: "Experto en entornos virtuales de alta fidelidad y mecánicas de interacción en entornos críticos. Responsable de la fidelidad visual (Lumen/Nanite) del reactor GPRR y la gamificación de procesos operativos complejos.",
    tags: ["Technical Art", "Lumen", "UX/UI", "Gamification"],
  },
  {
    name: "Juan Emanuel Venturelli",
    role: "Ingeniero Mecánico y Especialista en IA",
    description: "Nexo entre el cálculo estructural y la computación cognitiva. Lidera la implementación de IA Generativa y sistemas de lenguaje natural en simuladores, asegurando rigor físico y respuestas en tiempo real.",
    tags: ["Cálculo Estructural", "LLMs", "IA Generativa", "Rigor Físico"],
  }
];

export default function XRSection() {
  return (
    <div className="flex-1 flex flex-col h-full relative bg-[#050A08]">
      {/* Header */}
      <div className="h-16 px-6 flex items-center justify-between z-20 shrink-0 bg-[#030303]/80 backdrop-blur-md border-b border-white/5">
        <h1 className="text-xl font-bold tracking-tight text-white">Equipo XR</h1>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
          <span className="text-[9px] font-medium tracking-widest text-neutral-400 uppercase">Core Team</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 no-scrollbar">
        <div className="mb-4 px-2">
          <p className="text-xs text-neutral-500 uppercase tracking-widest font-semibold">Innovación y Simulación</p>
          <h2 className="text-white text-lg font-medium mt-1">Especialistas GPRR</h2>
        </div>

        {team.map((member, idx) => (
          <div 
            key={idx} 
            className="group relative bg-[#0A0D0C] border border-white/5 rounded-3xl p-5 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden"
          >
            {/* Background Accent */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[40px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
            
            <div className="relative z-10">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                    {idx === 0 ? <Code className="w-6 h-6" /> : idx === 1 ? <Box className="w-6 h-6" /> : <Cpu className="w-6 h-6" />}
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base tracking-tight">{member.name}</h3>
                    <p className="text-emerald-500 text-[11px] font-medium uppercase tracking-wider mt-0.5">{member.role}</p>
                  </div>
                </div>
              </div>

              <p className="text-neutral-400 text-sm leading-relaxed mt-4">
                {member.description}
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {member.tags.map((tag, tIdx) => (
                  <span 
                    key={tIdx} 
                    className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] text-neutral-500 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}

        {/* VR Gallery Section */}
        <div className="pt-2 px-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-base font-medium flex items-center gap-2">
              <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
              VR Experience Visuals
            </h3>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop" 
                alt="Immersive Simulation" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                <h4 className="text-white font-bold text-sm tracking-tight">Immersive Simulation</h4>
                <p className="text-neutral-400 text-[10px] mt-1">High-fidelity nuclear environment</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1592477976562-f55d3623f60c?q=80&w=800&auto=format&fit=crop" 
                alt="Interactive Controls" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                <h4 className="text-white font-bold text-sm tracking-tight">Interactive Controls</h4>
                <p className="text-neutral-400 text-[10px] mt-1">Precision manipulation mechanics</p>
              </div>
            </div>

            <div className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
              <img 
                src="https://images.unsplash.com/photo-1551288049-bbbda546697a?q=80&w=800&auto=format&fit=crop" 
                alt="Data Visualization" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                <h4 className="text-white font-bold text-sm tracking-tight">Data Visualization</h4>
                <p className="text-neutral-400 text-[10px] mt-1">Real-time physics monitoring</p>
              </div>
            </div>
          </div>
        </div>

        {/* Vision Footer */}
        <div className="pt-4 pb-8 px-2">
          <div className="p-5 rounded-3xl bg-emerald-950/10 border border-emerald-500/10">
            <h4 className="text-emerald-500 text-xs font-bold uppercase tracking-widest mb-2">Visión Estratégica</h4>
            <p className="text-neutral-400 text-xs leading-relaxed italic">
              "Democratizando el acceso a la ciencia compleja a través de herramientas inmersivas que reducen la barrera entre la ingeniería técnica y la comprensión global."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
