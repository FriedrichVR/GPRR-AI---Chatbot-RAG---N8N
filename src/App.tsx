import { LayoutGrid, Dumbbell, Utensils, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import WorkoutsHub from './components/WorkoutsHub';
import ChatSection from './components/ChatSection';
import XRSection from './components/XRSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'xr' | 'gprr' | 'ai'>('ai');

  return (
    <div className="h-[100dvh] flex justify-center bg-black selection:bg-emerald-500/30 selection:text-emerald-200 overflow-hidden">
      {/* Main Container - Full screen on mobile, centered max-width on desktop */}
      <div className="w-full md:max-w-md h-full bg-[#050A08] relative overflow-hidden flex flex-col shadow-2xl shadow-black md:border-x border-white/5">
        
        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && <WorkoutsHub />}
          {activeTab === 'ai' && <ChatSection />}
          {activeTab === 'xr' && <XRSection />}
          {activeTab === 'gprr' && (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
              GPRR Placeholder
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="h-20 bg-[#030303] border-t border-white/5 flex justify-between items-center px-6 pb-6 pt-2 z-50 shrink-0">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-white' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('xr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'xr' ? 'text-white' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-medium">XR</span>
          </button>

          <button 
            onClick={() => setActiveTab('gprr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'gprr' ? 'text-white' : 'text-neutral-500 hover:text-neutral-400'}`}
          >
            <Utensils className="w-6 h-6" />
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
