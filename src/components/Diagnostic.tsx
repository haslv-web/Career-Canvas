import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  ChevronRight, 
  ChevronLeft, 
  Loader2, 
  Sparkles, 
  Check, 
  Target, 
  Heart, 
  Briefcase, 
  UserCircle 
} from "lucide-react";
import { UserDiagnosticData } from "../types";
import { cn } from "../lib/utils";

interface DiagnosticProps {
  onComplete: (data: UserDiagnosticData) => void;
  onCancel: () => void;
  isLoading: boolean;
  key?: string;
}

const STEPS = [
  { id: "interests", title: "관심사", subtitle: "당신의 열정은 무엇을 향하고 있나요?", icon: <Heart className="text-pink-500" size={20} /> },
  { id: "values", title: "직업 가치관", subtitle: "당신에게 가장 중요한 것은 무엇인가요?", icon: <Target className="text-amber-500" size={20} /> },
  { id: "skills", title: "보유 기술", subtitle: "당신이 기여할 수 있는 능력은 무엇인가요?", icon: <Briefcase className="text-blue-500" size={20} /> },
  { id: "style", title: "업무 스타일", subtitle: "당신은 어떤 환경에서 최고의 성과를 내나요?", icon: <UserCircle className="text-purple-500" size={20} /> },
  { id: "goals", title: "미래 비전", subtitle: "당신이 도달하고 싶은 곳은 어디인가요?", icon: <Sparkles className="text-primary" size={20} /> },
];

export default function Diagnostic({ onComplete, onCancel, isLoading }: DiagnosticProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<UserDiagnosticData>(() => {
    const saved = localStorage.getItem("career-canvas-diagnostic-draft");
    return saved ? JSON.parse(saved) : {
      interests: [],
      values: [],
      skills: [],
      workingStyle: "",
      careerGoals: "",
    };
  });

  useEffect(() => {
    localStorage.setItem("career-canvas-diagnostic-draft", JSON.stringify(formData));
  }, [formData]);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(s => s + 1);
    } else {
      localStorage.removeItem("career-canvas-diagnostic-draft");
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(s => s - 1);
    } else {
      onCancel();
    }
  };

  const toggleItem = (field: keyof UserDiagnosticData, item: string) => {
    setFormData(prev => {
      const currentArr = prev[field] as string[];
      if (currentArr.includes(item)) {
        return { ...prev, [field]: currentArr.filter(i => i !== item) };
      }
      return { ...prev, [field]: [...currentArr, item] };
    });
  };

  const isStepValid = () => {
    const step = STEPS[currentStep].id;
    if (step === "interests") return formData.interests.length >= 2;
    if (step === "values") return formData.values.length >= 2;
    if (step === "skills") return formData.skills.length >= 2;
    if (step === "style") return formData.workingStyle.length > 5;
    if (step === "goals") return formData.careerGoals.length > 5;
    return false;
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center p-8">
        <div className="relative mb-8">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="text-primary animate-pulse" size={32} />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-4">당신의 잠재력을 분석하는 중...</h2>
        <p className="text-slate-500 max-w-sm">AI가 수천 가지 커리어 조합을 통해 당신만을 위한 맞춤형 로드맵을 구축하고 있습니다.</p>
        
        <div className="mt-12 w-full max-w-xs space-y-4">
          <SkeletonRow delay={0} />
          <SkeletonRow delay={0.2} />
          <SkeletonRow delay={0.4} />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-12">
      {/* Progress Bar */}
      <div className="mb-12 space-y-4">
        <div className="flex justify-between items-center text-sm font-medium text-slate-400">
          <span>{STEPS[currentStep].title}</span>
          <span>전체 {STEPS.length}단계 중 {currentStep + 1}단계</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
            className="h-full bg-primary"
          />
        </div>
      </div>

      {/* Form Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-8"
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
                {STEPS[currentStep].icon}
              </div>
              <h2 className="text-3xl font-bold">{STEPS[currentStep].title}</h2>
            </div>
            <p className="text-slate-500 text-lg">{STEPS[currentStep].subtitle}</p>
          </div>

          {/* Interests, Values, Skills (Multi-select) */}
          {["interests", "values", "skills"].includes(STEPS[currentStep].id) && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {OPTIONS[STEPS[currentStep].id as keyof typeof OPTIONS].map((option) => (
                <button
                  key={option}
                  onClick={() => toggleItem(STEPS[currentStep].id as keyof UserDiagnosticData, option)}
                  className={cn(
                    "p-5 rounded-2xl border text-xs font-bold transition-all text-left flex flex-col justify-between h-28",
                    formData[STEPS[currentStep].id as keyof UserDiagnosticData].includes(option)
                      ? "bg-primary/5 border-primary text-primary shadow-[0_0_20px_rgba(45,91,255,0.15)] ring-1 ring-primary/20"
                      : "bg-white border-primary/5 text-slate-500 hover:border-primary/30 shadow-sm"
                  )}
                >
                  <div className="w-6 h-6 rounded bg-slate-100 flex items-center justify-center">
                    {formData[STEPS[currentStep].id as keyof UserDiagnosticData].includes(option) ? <Check size={12} className="text-primary" /> : <div className="w-1 h-1 bg-slate-300 rounded-full" />}
                  </div>
                  <span>{option}</span>
                </button>
              ))}
            </div>
          )}

          {/* Working Style (Text) */}
          {STEPS[currentStep].id === "style" && (
            <textarea
              value={formData.workingStyle}
              onChange={(e) => setFormData(p => ({ ...p, workingStyle: e.target.value }))}
              placeholder="예: 저는 기술적 결정을 주도할 수 있는 빠른 템포의 원격 근무 환경을 선호합니다..."
              className="w-full h-48 p-6 rounded-3xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-lg"
            />
          )}

          {/* Career Goals (Text) */}
          {STEPS[currentStep].id === "goals" && (
            <textarea
              value={formData.careerGoals}
              onChange={(e) => setFormData(p => ({ ...p, careerGoals: e.target.value }))}
              placeholder="예: 5년 이내에 크리에이티브 산업에서 AI 도입을 진두지휘하고 싶습니다..."
              className="w-full h-48 p-6 rounded-3xl border border-slate-200 bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none text-lg"
            />
          )}

          <div className="flex gap-4 pt-8">
            <button 
              onClick={handleBack}
              className="px-8 py-4 rounded-xl border border-slate-200 font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2"
            >
              <ChevronLeft size={20} />
              이전
            </button>
            <button 
              disabled={!isStepValid()}
              onClick={handleNext}
              className={cn(
                "flex-1 px-8 py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all",
                isStepValid() 
                  ? "bg-primary text-white shadow-lg shadow-primary/20 hover:-translate-y-0.5" 
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              )}
            >
              {currentStep === STEPS.length - 1 ? "나의 캔버스 생성하기" : "계속하기"}
              <ChevronRight size={20} />
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function SkeletonRow({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, repeat: Infinity, duration: 1, repeatType: "reverse" }}
      className="h-10 w-full bg-slate-100 rounded-xl flex items-center gap-3 px-4"
    >
      <div className="w-4 h-4 rounded bg-slate-200" />
      <div className="h-2 w-3/4 bg-slate-200 rounded" />
    </motion.div>
  );
}

const OPTIONS = {
  interests: ["기술", "예술 및 디자인", "심리학", "경영", "과학", "교육", "보건의료", "글쓰기", "창업", "사회적 영향", "지속가능성", "미디어"],
  values: ["자유", "영향력", "성장", "안정성", "창의성", "협업", "사회적 지위", "워라밸", "도전", "목적의식", "지식", "청렴성"],
  skills: ["코딩", "디자인", "데이터 분석", "리더십", "대중 스피치", "문제 해결", "전략 수립", "교육", "마케팅", "고객 성공", "연구", "프로젝트 관리"],
};
