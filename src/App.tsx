import { LayoutGrid, Dumbbell, MessageSquare, Cpu } from 'lucide-react';
import { useState } from 'react';
import WorkoutsHub from './components/WorkoutsHub';
import ChatSection from './components/ChatSection';
import XRSection from './components/XRSection';
import GPRRInfoSection from './components/GPRRInfoSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'xr' | 'gprr' | 'ai'>('ai');

  return (
    <div className="h-[100dvh] flex justify-center selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden bg-black">
      {/* Main Container - Full screen on mobile, centered max-width on desktop */}
      <div className="w-full md:max-w-md h-full relative overflow-hidden flex flex-col shadow-2xl shadow-black md:border-x border-white/5 bg-[#050A08]">
        
        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && <WorkoutsHub />}
          {activeTab === 'xr' && <XRSection />}
          {activeTab === 'gprr' && <GPRRInfoSection />}
          {activeTab === 'ai' && <ChatSection />}
        </div>

        {/* Bottom Navigation */}
        <div className="h-20 border-t border-white/5 flex justify-between items-center px-6 pb-6 pt-2 z-50 shrink-0 bg-[#030303]">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-emerald-500' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('xr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'xr' ? 'text-emerald-500' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-medium">XR</span>
          </button>

          <button 
            onClick={() => setActiveTab('gprr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'gprr' ? 'text-emerald-500' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <Cpu className="w-6 h-6" />
            <span className="text-[10px] font-medium">GPRR</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'ai' ? 'text-emerald-500' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <div className="relative">
              <MessageSquare className={`w-6 h-6 ${activeTab === 'ai' ? 'fill-current' : ''}`} />
              {activeTab === 'ai' && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-[#030303]"></div>
              )}
            </div>
            <span className="text-[10px] font-medium">AI</span>
          </button>
        </div>
      </div>
    </div>
  );
}
