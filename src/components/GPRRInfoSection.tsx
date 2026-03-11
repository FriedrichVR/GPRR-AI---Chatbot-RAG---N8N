import { motion } from 'motion/react';
import { Sparkles, Shield, Zap, Globe, Cpu } from 'lucide-react';

export default function GPRRInfoSection() {
  const pillars = [
    { icon: Shield, title: "Transparencia Técnica", desc: "Convierte datos complejos de ingeniería en procesos intuitivos para cualquier stakeholder." },
    { icon: Zap, title: "Innovación Radical", desc: "Posiciona a los colaboradores en la vanguardia de la Industria 4.0 y la simulación inmersiva." },
    { icon: Cpu, title: "Escalabilidad", desc: "Un motor versátil con potencial de aplicación en áreas Espacial, Defensa y Energías." },
    { icon: Globe, title: "Impacto Global", desc: "Herramienta portátil lista para foros tecnológicos mundiales (AWE, IAEA, COP)." }
  ];

  return (
    <div className="space-y-8 p-6 bg-[#050A08] text-neutral-200">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <h1 className="text-3xl font-bold text-white tracking-tight">GPRR: The INVAP XR Experience</h1>
        <p className="text-xl text-emerald-400 font-medium">El Futuro de la Ingeniería Nuclear, Hoy.</p>
        <p className="text-neutral-400 leading-relaxed">
          El GPRR (General Purpose Research Reactor) es el primer Gemelo Digital Estratégico de INVAP. 
          No es solo un visualizador 3D; es un ecosistema de Realidad Extendida (XR) diseñado para 
          transformar la complejidad nuclear en una experiencia sensorial interactiva y universal.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-[#0A0D0C] border border-white/5">
          <h2 className="text-lg font-bold text-white mb-3">¿Qué es el GPRR?</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Un "Showroom Tecnológico" de alta fidelidad que utiliza un reactor genérico para demostrar 
            el liderazgo de INVAP sin comprometer propiedad intelectual sensible. Desarrollado en 
            Unreal Engine 5.5, integra simuladores físicos y asistencia por IA para permitir maniobras 
            complejas en un entorno seguro e inmersivo.
          </p>
        </div>
        <div className="relative rounded-3xl overflow-hidden h-48 w-full border border-white/10 shadow-lg">
          <img 
            src="https://images.unsplash.com/photo-1773194473562-5f9480fb8e98?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
            alt="GPRR Tech" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-emerald-950/20"></div>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Pilares de la Plataforma</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <div key={i} className="p-4 rounded-2xl bg-[#0A0D0C] border border-white/5 flex gap-4">
              <div className="p-2 rounded-xl bg-emerald-950/30 text-emerald-500 h-fit">
                <pillar.icon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-neutral-400 mt-1">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="p-6 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 italic text-neutral-300 text-center">
        "Con el GPRR, la ingeniería de INVAP se vuelve transparente, interactiva y universal. 
        La complejidad ya no es una barrera para la comunicación."
      </blockquote>
    </div>
  );
}
