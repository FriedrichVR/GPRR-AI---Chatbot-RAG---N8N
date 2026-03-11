import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, Zap, Globe, Cpu } from 'lucide-react';

export default function GPRRInfoSection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const pillars = [
    { icon: Shield, title: "Transparencia Técnica", desc: "Convierte datos complejos de ingeniería en procesos intuitivos para cualquier stakeholder." },
    { icon: Zap, title: "Innovación Radical", desc: "Posiciona a los colaboradores en la vanguardia de la Industria 4.0 y la simulación inmersiva." },
    { icon: Cpu, title: "Escalabilidad", desc: "Un motor versátil con potencial de aplicación en áreas Espacial, Defensa y Energías." },
    { icon: Globe, title: "Impacto Global", desc: "Herramienta portátil lista para foros tecnológicos mundiales (AWE, IAEA, COP)." }
  ];

  return (
    <div className="h-full overflow-y-auto bg-[#050A08] text-neutral-200">
      {/* Hero Image */}
      <div className="relative w-full h-48 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1592659762303-90081d34b277?q=80&w=2080&auto=format&fit=crop" 
          alt="GPRR Experience" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A08] via-[#050A08]/50 to-transparent"></div>
        <div className="absolute bottom-4 left-6">
          <h1 className="text-2xl font-bold text-white tracking-tight">GPRR: The INVAP XR Experience</h1>
          <p className="text-sm text-emerald-400 font-medium">El Futuro de la Ingeniería Nuclear, Hoy.</p>
        </div>
      </div>

      <div className="px-6 relative z-10 space-y-6 -mt-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="text-neutral-400 leading-relaxed bg-[#0A0D0C] p-4 rounded-2xl border border-white/5 shadow-lg text-sm">
            <p>
              El GPRR (General Purpose Research Reactor) es el primer Gemelo Digital Estratégico de INVAP. 
              No es solo un visualizador 3D; es un ecosistema de Realidad Extendida (XR) diseñado para 
              transformar la complejidad nuclear en una experiencia sensorial interactiva y universal.
            </p>
            {isExpanded && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-3"
              >
                Este proyecto representa un salto cuántico en cómo comunicamos la ingeniería de alta complejidad. 
                Al combinar datos de ingeniería en tiempo real con visualizaciones de vanguardia, 
                permitimos a los usuarios explorar, analizar y comprender el reactor desde perspectivas 
                imposibles en el mundo físico.
              </motion.p>
            )}
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-emerald-500 text-xs font-medium mt-3 hover:text-emerald-400 transition-colors"
            >
              {isExpanded ? 'Ver menos' : 'Leer más...'}
            </button>
          </div>
        </motion.div>

      <div className="grid grid-cols-1 gap-4">
        <div className="p-6 rounded-3xl bg-[#0A0D0C] border border-white/5 flex flex-col justify-center">
          <h2 className="text-lg font-bold text-white mb-3">¿Qué es el GPRR?</h2>
          <p className="text-sm text-neutral-400 leading-relaxed">
            Un "Showroom Tecnológico" de alta fidelidad que utiliza un reactor genérico para demostrar 
            el liderazgo de INVAP sin comprometer propiedad intelectual sensible. Desarrollado en 
            Unreal Engine 5.5, integra simuladores físicos y asistencia por IA para permitir maniobras 
            complejas en un entorno seguro e inmersivo.
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-white mb-4">Pilares de la Plataforma</h2>
        <div className="grid grid-cols-2 gap-4">
          {pillars.map((pillar, i) => (
            <div key={i} className="p-5 rounded-2xl bg-[#0A0D0C] border border-white/5 flex flex-col items-center text-center gap-3 hover:border-emerald-500/20 transition-all duration-300 hover:bg-[#0D1110] aspect-square justify-center">
              <div className="p-3 rounded-xl bg-emerald-950/30 text-emerald-500">
                <pillar.icon className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">{pillar.title}</h4>
                <p className="text-xs text-neutral-400 mt-1.5 leading-relaxed line-clamp-3">{pillar.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <blockquote className="p-6 rounded-3xl bg-emerald-950/10 border border-emerald-500/10 italic text-neutral-300 text-center">
        "Con el GPRR, la ingeniería de INVAP se vuelve transparente, interactiva y universal. 
        La complejidad ya no es una barrera para la comunicación."
      </blockquote>

      <div className="pb-8 text-center">
        <a 
          href="mailto:FSastreHeer@invap.com.ar"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-900/20"
        >
          Contact Us
        </a>
        <p className="mt-3 text-xs text-neutral-500">FSastreHeer@invap.com.ar</p>
      </div>
      </div>
    </div>
  );
}
