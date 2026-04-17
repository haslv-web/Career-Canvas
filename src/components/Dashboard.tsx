import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell
} from "recharts";
import { motion } from "motion/react";
import { 
  Trophy, 
  TrendingUp, 
  Briefcase, 
  CheckCircle2, 
  ArrowRight,
  BookOpen,
  Download,
  RefreshCw,
  UserCircle,
  Sparkles
} from "lucide-react";
import { CareerCanvasData } from "../types";
import { cn } from "../lib/utils";

interface DashboardProps {
  data: CareerCanvasData;
  onReset: () => void;
  key?: string;
}

export default function Dashboard({ data, onReset }: DashboardProps) {
  const { report, recommendations, roadmap } = data;

  return (
    <div className="p-4 md:p-8 space-y-6">
      {/* Bento Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight">나의 커리어 캔버스 대시보드</h1>
          <p className="text-xs text-slate-500 font-medium flex items-center gap-1.5 mt-1">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            프로필에 대한 AI 분석이 완료되었습니다
          </p>
        </div>
        <div className="flex gap-2">
          <button className="btn-secondary px-4 py-2 text-xs flex items-center gap-2" onClick={onReset}>
            <RefreshCw size={14} />
            다시 하기
          </button>
          <div className="flex items-center gap-3 bg-white px-3 py-1.5 rounded-full border border-primary/10 shadow-sm">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent" />
            <span className="text-sm font-bold">사용자</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 auto-rows-[minmax(180px,auto)] gap-5">
        
        {/* Radar Analysis Card - Bento Box 1 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="md:col-span-4 md:row-span-3 glass-card p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">분석 뷰</h3>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">AI 리포트</span>
          </div>
          
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-full h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={report.competencyAnalysis}>
                  <PolarGrid stroke="#e2e8f0" strokeDasharray="3 3" />
                  <PolarAngleAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 10, fontWeight: 600 }} />
                  <Radar
                    name="Competency"
                    dataKey="value"
                    stroke="#2D5BFF"
                    fill="#2D5BFF"
                    fillOpacity={0.15}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="text-center mt-4">
              <h3 className="text-lg font-bold text-primary">잠재력 마스터</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                전략적 사고와 시각화 능력에서 상위 3%의 뛰어난 역량을 보이고 있습니다.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Roadmap Summary Card - Bento Box 2 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:col-span-8 md:row-span-1 glass-card p-6"
        >
          <div className="flex justify-between items-start mb-6">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">로드맵 타임라인</h3>
            <span className="text-[10px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded uppercase">Vision</span>
          </div>
          
          <div className="flex justify-between items-start relative px-4">
            <div className="absolute top-[11px] left-8 right-8 h-0.5 bg-slate-100 -z-0" />
            {roadmap.slice(0, 4).map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-3">
                <div className={cn(
                  "w-6 h-6 rounded-full border-4 border-white shadow-sm transition-colors",
                  i === 0 ? "bg-primary scale-110 shadow-primary/30" : "bg-slate-200"
                )} />
                <div className="text-center">
                  <div className={cn("text-[11px] font-bold", i === 0 ? "text-primary" : "text-slate-600")}>{step.title}</div>
                  <div className="text-[9px] text-slate-400 mt-0.5">{i === 0 ? "현재" : step.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Job Matching - Bento Box 3 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="md:col-span-5 md:row-span-2 glass-card p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">AI 직업 매칭</h3>
            <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">CONNECT</span>
          </div>
          
          <div className="flex-1 space-y-3">
            {recommendations.slice(0, 3).map((job, i) => (
              <div key={i} className="flex items-center justify-between p-3.5 bg-white border border-slate-100 rounded-xl hover:shadow-sm transition-all group">
                <div>
                  <h4 className="text-sm font-bold text-slate-800">{job.title}</h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">{job.growthPotential} · 높은 성장세</p>
                </div>
                <div className="text-right">
                  <div className="text-lg font-black text-primary leading-none">{job.matchScore}<span className="text-[10px] opacity-60 ml-0.5">%</span></div>
                  <div className="text-[9px] font-bold uppercase tracking-tight text-slate-300 group-hover:text-primary transition-colors cursor-pointer">상세 보기</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Learning / Summary - Bento Box 4 */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="md:col-span-3 md:row-span-2 glass-card p-6 flex flex-col"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest">추천 학습 큐레이션</h3>
            <span className="text-[10px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded">CURATION</span>
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 border border-primary/5">
              <span className="text-[10px] font-bold text-accent uppercase tracking-widest mb-2 block">기술 역량</span>
              <p className="text-xs font-bold leading-relaxed text-slate-700">UX 아키텍트를 위한 딥러닝 입문</p>
            </div>
            <div className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/5">
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-2 block">리더십</span>
              <p className="text-xs font-bold leading-relaxed text-slate-700">디자인 분야의 전략적 의사결정</p>
            </div>
          </div>
        </motion.div>

        {/* Stat Card - Bento Box 5 */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="md:col-span-8 md:row-span-1 glass-card p-5 flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center font-bold text-sm">
              AI
            </div>
            <div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                실시간 트렌드 엔진
              </div>
              <div className="text-sm font-bold text-slate-800">당신을 위해 4,291개 이상의 글로벌 커리어 경로를 분석 중입니다</div>
            </div>
          </div>
          <button className="btn-primary flex items-center gap-2 text-xs">
            전체 리포트 받기
            <ArrowRight size={14} />
          </button>
        </motion.div>

      </div>
      
      {/* Detailed Analysis Section (Kept from original app but styled to fit) */}
      <section className="mt-8 space-y-6">
        <h2 className="text-xl font-bold px-1">인사이트 및 성향 분석</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="glass-card p-6">
             <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">핵심 인성 및 성향</h4>
             <div className="h-64">
               <ResponsiveContainer width="100%" height="100%">
                 <BarChart data={report.personalityTraits} layout="vertical" margin={{ left: 10, right: 30 }}>
                   <XAxis type="number" hide />
                   <YAxis dataKey="name" type="category" width={80} tick={{ fill: "#64748b", fontSize: 11, fontWeight: 600 }} axisLine={false} tickLine={false} />
                   <Tooltip 
                     cursor={{ fill: "transparent" }}
                     contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px rgba(0,0,0,0.05)", fontSize: "11px" }}
                   />
                   <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={16}>
                     {report.personalityTraits.map((_, index) => (
                       <Cell key={`cell-${index}`} fill={index % 2 === 0 ? "#2D5BFF" : "#8A4FFF"} fillOpacity={0.8} />
                     ))}
                   </Bar>
                 </BarChart>
               </ResponsiveContainer>
             </div>
          </div>
          <div className="glass-card p-6 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">분석 요약</h4>
            <p className="text-sm italic text-slate-600 leading-relaxed border-l-4 border-primary/20 pl-4">
              "{report.summary}"
            </p>
            <div className="pt-4 grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-primary uppercase">강점</span>
                <div className="flex flex-wrap gap-1.5">
                  {report.strengths.slice(0, 3).map(s => <span key={s} className="text-[10px] bg-primary/5 text-primary px-2 py-1 rounded-md font-medium">{s}</span>)}
                </div>
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-accent uppercase">포커스</span>
                <div className="flex flex-wrap gap-1.5">
                  {report.areasForGrowth.slice(0, 3).map(s => <span key={s} className="text-[10px] bg-accent/5 text-accent px-2 py-1 rounded-md font-medium">{s}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
