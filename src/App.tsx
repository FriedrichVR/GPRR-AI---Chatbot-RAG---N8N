import { LayoutGrid, Dumbbell, Utensils, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import WorkoutsHub from './components/WorkoutsHub';
import ChatSection from './components/ChatSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'xr' | 'gprr' | 'ai'>('ai');

  return (
    <div className="min-h-screen p-6 md:p-12 flex justify-center items-start selection:bg-emerald-500/30 selection:text-emerald-200 bg-black">
      {/* Mobile Frame */}
      <div className="w-full max-w-[390px] h-[844px] bg-[#050A08] rounded-[3rem] border border-neutral-800 relative overflow-hidden flex flex-col shadow-2xl shadow-black ring-8 ring-neutral-900/50">
        
        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && <WorkoutsHub />}
          {activeTab === 'ai' && <ChatSection />}
          {(activeTab === 'xr' || activeTab === 'gprr') && (
            <div className="flex-1 flex items-center justify-center text-neutral-500">
              {activeTab.toUpperCase()} Placeholder
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="h-20 bg-[#030303] border-t border-white/5 flex justify-between items-center px-6 pb-4 pt-2 z-50">
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
        
        {/* Home Indicator */}
        <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 rounded-full z-50"></div>
      </div>
    </div>
  );
}
