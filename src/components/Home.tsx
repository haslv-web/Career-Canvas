import { motion } from "motion/react";
import { Sparkles, ArrowRight, CheckCircle2, Star, Zap, Users } from "lucide-react";
import { cn } from "../lib/utils";

interface HomeProps {
  onStart: () => void;
  key?: string;
}

export default function Home({ onStart }: HomeProps) {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 px-6 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute -bottom-10 -left-20 w-80 h-80 bg-accent/20 rounded-full blur-[80px]" />
        
        <div className="relative z-10 text-center space-y-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
              <Zap size={14} />
              AI 기반 커리어 큐레이션
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              미래를 큐레이팅하고, <br />
              <span className="text-gradient">잠재력을 그리세요</span>
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
              데이터 기반의 여정을 통해 당신의 진정한 잠재력을 발견하세요.
              AI와 함께 커리어 로드맵을 시각화하고 당신의 재능에 완벽한 직업을 찾으세요.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <button 
              onClick={onStart}
              className="btn-primary flex items-center gap-2 px-8 py-4 text-lg w-full sm:w-auto overflow-hidden group"
            >
              <span className="relative z-10 flex items-center gap-2">
                나의 커리어 캔버스 시작하기
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
            <button className="btn-secondary px-8 py-4 text-lg w-full sm:w-auto">
              로드맵 샘플 보기
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="pt-12 flex items-center justify-center gap-8 text-slate-400 grayscale opacity-70"
          >
            <div className="flex items-center gap-2 font-bold text-lg"><Users size={20} /> Fortune 500</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Star size={20} /> TechStars</div>
            <div className="flex items-center gap-2 font-bold text-lg"><Zap size={20} /> RapidScale</div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-slate-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">작동 방식</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">논리와 창의성을 연결하는 끊김 없는 잠재력 발견 여정을 경험하세요.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {[
              {
                icon: <Sparkles className="text-primary" size={32} />,
                title: "AI 진단",
                desc: "창의적인 평가를 통해 당신의 관심사와 잠재력을 깊이 있게 탐구합니다.",
                span: "md:col-span-8"
              },
              {
                icon: <Zap className="text-accent" size={32} />,
                title: "다차원 분석",
                desc: "독보적인 프로필을 모델링합니다.",
                span: "md:col-span-4"
              },
              {
                icon: <Users className="text-blue-500" size={32} />,
                title: "커뮤니티",
                desc: "성과를 내는 인재들과 함께하세요.",
                span: "md:col-span-4"
              },
              {
                icon: <CheckCircle2 className="text-green-500" size={32} />,
                title: "캔버스 시각화",
                desc: "로드맵이 포함된 대시보드를 제공합니다.",
                span: "md:col-span-8"
              }
            ].map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className={cn("glass-card p-10 rounded-3xl", f.span)}
              >
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Stats */}
      <section className="py-24 px-6">
        <div className="glass-card max-w-5xl mx-auto rounded-[2.5rem] py-16 px-8 flex flex-col md:flex-row items-center justify-around gap-12 text-center bg-gradient-to-br from-white to-slate-50">
          <div>
            <div className="text-5xl font-extrabold text-primary mb-2">98%</div>
            <div className="text-slate-500 font-medium">매칭 정확도</div>
          </div>
          <div className="w-px h-16 bg-slate-200 hidden md:block" />
          <div>
            <div className="text-5xl font-extrabold text-accent mb-2">12k+</div>
            <div className="text-slate-500 font-medium">시작된 커리어</div>
          </div>
          <div className="w-px h-16 bg-slate-200 hidden md:block" />
          <div>
            <div className="text-5xl font-extrabold text-primary mb-2">4.9/5</div>
            <div className="text-slate-500 font-medium">사용자 평점</div>
          </div>
        </div>
      </section>
      
      {/* Final CTA */}
      <section className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-8">
          <h2 className="text-4xl font-extrabold">당신의 미래를 큐레이팅할 준비가 되었나요?</h2>
          <p className="text-slate-600">자신의 진정한 소명을 찾은 수천 명의 전문가들과 함께 하세요.</p>
          <button 
            onClick={onStart}
            className="btn-primary px-10 py-5 text-xl rounded-2xl shadow-xl shadow-primary/20"
          >
            지금 바로 여정 시작하기
          </button>
        </div>
      </section>
    </div>
  );
}
