import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Menu, 
  X,
  Twitter,
  Linkedin,
  Github,
  LayoutDashboard,
  BrainCircuit,
  Settings,
  Library,
  Compass
} from "lucide-react";
import { UserDiagnosticData, CareerCanvasData } from "./types";
import { generateCareerCuration } from "./services/gemini";
import { cn } from "./lib/utils";

// Views
import Home from "./components/Home";
import Diagnostic from "./components/Diagnostic";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [view, setView] = useState<"home" | "diagnostic" | "dashboard">("home");
  const [diagnosticData, setDiagnosticData] = useState<UserDiagnosticData | null>(() => {
    const saved = localStorage.getItem("career-canvas-diagnostic");
    return saved ? JSON.parse(saved) : null;
  });
  const [curationResult, setCurationResult] = useState<CareerCanvasData | null>(() => {
    const saved = localStorage.getItem("career-canvas-result");
    return saved ? JSON.parse(saved) : null;
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (diagnosticData) {
      localStorage.setItem("career-canvas-diagnostic", JSON.stringify(diagnosticData));
    }
  }, [diagnosticData]);

  useEffect(() => {
    if (curationResult) {
      localStorage.setItem("career-canvas-result", JSON.stringify(curationResult));
    }
  }, [curationResult]);

  const handleStartDiagnostic = () => setView("diagnostic");
  
  const handleDiagnosticComplete = async (data: UserDiagnosticData) => {
    setDiagnosticData(data);
    setIsLoading(true);
    try {
      const result = await generateCareerCuration(data);
      setCurationResult(result);
      setView("dashboard");
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("AI analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    if(confirm("Are you sure you want to reset your data?")) {
      localStorage.removeItem("career-canvas-diagnostic");
      localStorage.removeItem("career-canvas-result");
      setDiagnosticData(null);
      setCurationResult(null);
      setView("home");
    }
  };

  const isPlatformView = view === "dashboard" || view === "diagnostic";

  return (
    <div className={cn(
      "min-h-screen flex selection:bg-primary/20",
      isPlatformView ? "flex-row" : "flex-col"
    )}>
      {/* Sidebar for Platform Views */}
      {isPlatformView && (
        <aside className="hidden md:flex w-64 bg-white border-r border-primary/10 flex-col p-6 sticky top-0 h-screen">
          <div 
            className="flex items-center gap-2 mb-10 cursor-pointer group" 
            onClick={() => setView("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Career<span className="text-primary">Canvas</span></span>
          </div>

          <nav className="flex-1 space-y-1">
            <NavItem active={view === "dashboard"} onClick={() => curationResult && setView("dashboard")} icon={<LayoutDashboard size={18} />} label="대시보드" />
            <NavItem active={view === "diagnostic"} onClick={handleStartDiagnostic} icon={<BrainCircuit size={18} />} label="AI 역량 진단" />
            <NavItem icon={<Library size={18} />} label="직업 라이브러리" />
            <NavItem icon={<Compass size={18} />} label="로드맵" />
            <NavItem icon={<Settings size={18} />} label="설정" />
          </nav>

          <div className="mt-auto p-4 bg-slate-50 rounded-2xl border border-slate-100">
             <div className="text-[10px] font-bold text-slate-400 uppercase mb-2">분석 진행률</div>
             <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: curationResult ? '100%' : '35%' }} />
             </div>
             <div className="text-[10px] text-slate-400 mt-2 font-medium">{curationResult ? '동기화 완료' : '분석 중...'}</div>
          </div>
        </aside>
      )}

      {/* Navigation for Landing */}
      {!isPlatformView && (
        <nav className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/50 px-4 md:px-8 py-4 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer group" 
            onClick={() => setView("home")}
          >
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
              <Sparkles size={20} />
            </div>
            <span className="text-xl font-bold tracking-tight">Career<span className="text-primary">Canvas</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <button onClick={() => setView("home")} className="hover:text-primary transition-colors">홈</button>
            <button onClick={() => curationResult ? setView("dashboard") : setView("diagnostic")} className="hover:text-primary transition-colors">나의 로드맵</button>
            <button className="hover:text-primary transition-colors">직업 라이브러리</button>
            <button className="btn-primary" onClick={handleStartDiagnostic}>
              시작하기
            </button>
          </div>

          <button className="md:hidden p-2 text-slate-600" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      )}

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 overflow-y-auto">
        {/* Mobile Header for Platform Views */}
        {isPlatformView && (
          <div className="md:hidden p-4 flex items-center justify-between bg-white border-b border-slate-200 sticky top-0 z-40">
             <div className="flex items-center gap-2" onClick={() => setView("home")}>
               <Sparkles className="text-primary" size={20} />
               <span className="font-bold">CareerCanvas</span>
             </div>
             <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X /> : <Menu />}
             </button>
          </div>
        )}

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="fixed inset-x-0 top-[60px] md:top-[76px] z-40 bg-white border-b border-slate-200 p-6 flex flex-col gap-4 shadow-xl"
            >
              <button onClick={() => { setView("home"); setIsMenuOpen(false); }} className="text-left py-2 font-medium">홈</button>
              <button onClick={() => { curationResult ? setView("dashboard") : setView("diagnostic"); setIsMenuOpen(false); }} className="text-left py-2 font-medium">나의 로드맵</button>
              <button className="text-left py-2 font-medium">직업 라이브러리</button>
              <button 
                className="btn-primary w-full"
                onClick={() => { handleStartDiagnostic(); setIsMenuOpen(false); }}
              >
                시작하기
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <main className={cn(
          "flex-1 w-full",
          !isPlatformView && "max-w-7xl mx-auto"
        )}>
          <AnimatePresence mode="wait">
            {view === "home" && <Home key="home" onStart={handleStartDiagnostic} />}
            {view === "diagnostic" && (
              <Diagnostic 
                key="diagnostic" 
                onComplete={handleDiagnosticComplete} 
                isLoading={isLoading} 
                onCancel={() => setView("home")}
              />
            )}
            {view === "dashboard" && curationResult && (
              <Dashboard 
                key="dashboard" 
                data={curationResult} 
                onReset={handleReset}
              />
            )}
          </AnimatePresence>
        </main>

        {!isPlatformView && (
          <footer className="bg-slate-50 border-t border-slate-200 py-12 px-8">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="col-span-1 md:col-span-2 space-y-4">
                <div className="flex items-center gap-2">
                  <Sparkles className="text-primary" size={24} />
                  <span className="font-bold tracking-tight">CareerCanvas</span>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed max-w-sm">
                  AI 기반 인사이트로 당신의 미래를 큐레이팅하세요. 숨겨진 잠재력을 발견하고 당신이 꿈꾸는 커리어를 위한 시각적 로드맵을 구축합니다.
                </p>
                <div className="flex gap-4">
                  <button className="text-slate-400 hover:text-primary transition-colors"><Twitter size={18} /></button>
                  <button className="text-slate-400 hover:text-primary transition-colors"><Linkedin size={18} /></button>
                </div>
              </div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest col-span-1">플랫폼</div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-widest col-span-1">주식회사</div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all mb-1",
        active 
          ? "bg-primary/10 text-primary" 
          : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
      )}
    >
      {icon}
      {label}
    </button>
  );
}
