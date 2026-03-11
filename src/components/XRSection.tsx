import { useState } from 'react';
import { User, Code, Cpu, Box, ChevronRight, Plus, Calendar, AlertCircle } from 'lucide-react';

interface Profile {
  name: string;
  role: string;
  description: string;
  tags: string[];
  avatar?: string;
}

interface Task {
  text: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
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
  const [taskText, setTaskText] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = () => {
    if (taskText.trim()) {
      setTasks([...tasks, { text: taskText, priority, dueDate }]);
      setTaskText('');
      setDueDate('');
    }
  };

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
            className="group relative bg-[#0A0D0C] border border-white/10 rounded-3xl p-5 hover:border-emerald-500/30 transition-all duration-300 overflow-hidden shadow-[inset_0_0_20px_rgba(16,185,129,0.03)]"
          >
            {/* Background Accent */}
            <div className="absolute -top-16 -right-16 w-40 h-40 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-all"></div>
            
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
            {[
              { src: "https://images.unsplash.com/photo-1581092160607-ee22531d30c2?q=80&w=800&auto=format&fit=crop", title: "Immersive Simulation", desc: "High-fidelity nuclear environment" },
              { src: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=800&auto=format&fit=crop", title: "Interactive Controls", desc: "Precision manipulation mechanics" },
              { src: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop", title: "Data Visualization", desc: "Real-time physics monitoring" },
              { src: "https://images.unsplash.com/photo-1569012871812-f32ee6b8a5ff?q=80&w=800&auto=format&fit=crop", title: "Nuclear Core", desc: "Reactor core visualization" },
              { src: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?q=80&w=800&auto=format&fit=crop", title: "XR Interface", desc: "Advanced HUD systems" },
              { src: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop", title: "Reactor Control", desc: "Operational dashboard" }
            ].map((img, i) => (
              <div key={i} className="group relative rounded-3xl overflow-hidden border border-white/5 aspect-video">
                <img 
                  src={img.src} 
                  alt={img.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-5 flex flex-col justify-end">
                  <h4 className="text-white font-bold text-sm tracking-tight">{img.title}</h4>
                  <p className="text-neutral-400 text-[10px] mt-1">{img.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Task Input Section */}
        <div className="pt-6 px-2">
          <h3 className="text-white text-base font-medium mb-4 flex items-center gap-2">
            <span className="w-1 h-4 bg-emerald-500 rounded-full"></span>
            XR Tasks
          </h3>
          <div className="flex flex-col gap-2">
            <input 
              type="text"
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              placeholder="Add a new task..."
              className="w-full bg-[#111111] border border-white/10 rounded-full px-4 py-2 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/50"
            />
            <div className="flex gap-2">
              <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="bg-[#111111] border border-white/10 rounded-full px-4 py-2 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500/50"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
              <input 
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="bg-[#111111] border border-white/10 rounded-full px-4 py-2 text-sm text-neutral-300 focus:outline-none focus:border-emerald-500/50"
              />
              <button 
                onClick={addTask}
                className="flex-1 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>
          </div>
          <ul className="mt-4 space-y-2">
            {tasks.map((t, i) => (
              <li key={i} className="text-neutral-300 text-sm bg-[#111111] p-3 rounded-xl border border-white/5 flex justify-between items-center">
                <span>{t.text}</span>
                <div className="flex items-center gap-2 text-xs text-neutral-500">
                  <span className={`px-2 py-0.5 rounded-full ${t.priority === 'high' ? 'bg-red-950 text-red-400' : t.priority === 'medium' ? 'bg-yellow-950 text-yellow-400' : 'bg-blue-950 text-blue-400'}`}>
                    {t.priority}
                  </span>
                  {t.dueDate && <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {t.dueDate}</span>}
                </div>
              </li>
            ))}
          </ul>
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
