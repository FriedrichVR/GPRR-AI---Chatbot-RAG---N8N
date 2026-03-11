import { LayoutGrid, Dumbbell, Utensils, MessageSquare } from 'lucide-react';
import { useState } from 'react';
import WorkoutsHub from './components/WorkoutsHub';
import ChatSection from './components/ChatSection';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'xr' | 'gprr' | 'ai'>('ai');

  return (
    <div className="min-h-screen md:p-12 flex justify-center items-center selection:bg-emerald-500/30 selection:text-emerald-200 bg-black">
      {/* Mobile Frame */}
      <div className="w-full h-[100dvh] md:h-[844px] md:max-w-[390px] bg-background-dark md:rounded-[3rem] md:border border-slate-800 relative overflow-hidden flex flex-col md:shadow-2xl md:shadow-black radial-glow">
        
        {/* Main Content Area */}
        <div className="flex-1 relative z-10 overflow-hidden flex flex-col">
          {activeTab === 'dashboard' && <WorkoutsHub />}
          {activeTab === 'ai' && <ChatSection />}
          {(activeTab === 'xr' || activeTab === 'gprr') && (
            <div className="flex-1 flex items-center justify-center text-slate-500">
              {activeTab.toUpperCase()} Placeholder
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="h-[88px] md:h-20 bg-background-dark border-t border-slate-800/50 flex justify-between items-center px-6 pb-8 md:pb-4 pt-2 z-50">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'dashboard' ? 'text-primary' : 'text-slate-500 hover:text-slate-400'}`}
          >
            <LayoutGrid className="w-6 h-6" />
            <span className="text-[10px] font-medium">Dashboard</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('xr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'xr' ? 'text-primary' : 'text-slate-500 hover:text-slate-400'}`}
          >
            <Dumbbell className="w-6 h-6" />
            <span className="text-[10px] font-medium">XR</span>
          </button>

          <button 
            onClick={() => setActiveTab('gprr')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'gprr' ? 'text-primary' : 'text-slate-500 hover:text-slate-400'}`}
          >
            <Utensils className="w-6 h-6" />
            <span className="text-[10px] font-medium">GPRR</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('ai')}
            className={`flex flex-col items-center gap-1 transition-colors ${activeTab === 'ai' ? 'text-primary' : 'text-slate-500 hover:text-slate-400'}`}
          >
            <div className="relative">
              <MessageSquare className={`w-6 h-6 ${activeTab === 'ai' ? 'fill-current' : ''}`} />
              {activeTab === 'ai' && (
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full border-2 border-background-dark"></div>
              )}
            </div>
            <span className={`text-[10px] ${activeTab === 'ai' ? 'font-bold' : 'font-medium'}`}>AI</span>
          </button>
        </div>
        
        {/* Home Indicator */}
        <div className="h-1.5 w-32 bg-slate-800 rounded-full mx-auto mb-2 shrink-0 hidden md:block"></div>
      </div>
    </div>
  );
}
