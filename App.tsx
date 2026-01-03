import React, { useState } from 'react';
import TaxForm from './components/TaxForm.tsx';
import TaxResult from './components/TaxResult.tsx';
import { TaxInputs, OptimizationResult } from './types.ts';
import { optimizeTax } from './services/taxCalculator.ts';
import { ShieldCheck, Calculator, Lightbulb, BookOpen, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'result'>('form');

  const handleCalculate = (inputs: TaxInputs) => {
    const optimizationResult = optimizeTax(inputs);
    setResult(optimizationResult);
    setActiveTab('result');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900 font-sans antialiased">
      {/* 极简动效渐变背景 */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] rounded-full bg-gradient-to-br from-indigo-100/30 to-purple-100/30 blur-[140px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-gradient-to-tr from-blue-100/30 to-emerald-100/30 blur-[140px] animate-pulse" style={{ animationDuration: '10s', animationDelay: '1s' }}></div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* 顶部标题区域 */}
        <header className="flex flex-col items-center mb-16 text-center">
          <div className="mb-6 p-1 px-4 bg-white/60 backdrop-blur-md border border-indigo-100/50 rounded-full inline-flex items-center shadow-sm">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">CN 2024 中国个税计税标准</span>
          </div>
          
          {/* 缩小字号后的标题样式 */}
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-6 flex items-center justify-center flex-wrap gap-x-3">
            <span className="text-[#5249f3]">个税最优</span>
            <span className="text-[#121826] flex items-center">
              筹划工具
              <Sparkles className="w-8 h-8 ml-2 text-[#5249f3] opacity-60" />
            </span>
          </h1>
          
          <p className="text-slate-500 max-w-2xl text-lg leading-relaxed font-medium">
            输入您的年度收入及扣除数据，我们将通过算法为您计算出节税效果最好的年终奖分配方案。
          </p>
        </header>

        {/* 选项卡切换 */}
        {result && (
          <div className="flex justify-center mb-16">
            <div className="inline-flex p-1.5 bg-slate-200/40 backdrop-blur-xl rounded-[1.8rem] shadow-inner border border-white/50">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-12 py-3.5 rounded-[1.4rem] text-sm font-bold transition-all duration-500 ${
                  activeTab === 'form' 
                    ? 'bg-white text-indigo-600 shadow-xl ring-1 ring-slate-100' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                参数配置
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`px-12 py-3.5 rounded-[1.4rem] text-sm font-bold transition-all duration-500 ${
                  activeTab === 'result' 
                    ? 'bg-white text-indigo-600 shadow-xl ring-1 ring-slate-100' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                筹划报表
              </button>
            </div>
          </div>
        )}

        {/* 核心内容容器 */}
        <div className="animate-fade-in">
          {activeTab === 'form' ? (
            <div className="space-y-20">
              <TaxForm onCalculate={handleCalculate} />
              
              {/* 底部功能说明板块 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-indigo-500/5 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2.5 bg-amber-50 rounded-2xl group-hover:scale-110 transition-transform">
                      <Lightbulb className="w-6 h-6 text-amber-500" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 tracking-tight">什么是“税率陷阱”？</h4>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">
                    在年终奖单独计税方式下，当奖金总额超过某个临界点（如 36000 元）哪怕只有 1 元，其对应的税率可能会瞬间跳档。例如 36000 元税额为 1080 元，而 36001 元税额则暴增至 3390.1 元。我们的筹划工具会精确避开这些无效区间。
                  </p>
                </div>
                
                <div className="group bg-white/40 backdrop-blur-md p-10 rounded-[3rem] border border-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] transition-all hover:shadow-indigo-500/5 hover:-translate-y-1">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="p-2.5 bg-indigo-50 rounded-2xl group-hover:scale-110 transition-transform">
                      <BookOpen className="w-6 h-6 text-indigo-500" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 tracking-tight">使用说明</h4>
                  </div>
                  <ul className="text-sm text-slate-500 space-y-5 font-medium">
                    <li className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black mr-4 mt-0.5 border border-indigo-100/50">1</span>
                      <span>输入您预计的全年总收入（包含所有基本工资及计划发放的奖金总和）。</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black mr-4 mt-0.5 border border-indigo-100/50">2</span>
                      <span>填入年度扣除项：社保、公积金及专项附加扣除。</span>
                    </li>
                    <li className="flex items-start">
                      <span className="w-6 h-6 flex items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 text-[10px] font-black mr-4 mt-0.5 border border-indigo-100/50">3</span>
                      <span>点击计算，系统会自动给出“工资”和“奖金”的最优拆分金额。</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            result && <TaxResult result={result} />
          )}
        </div>

        {/* 极简页脚 */}
        <footer className="mt-40 pt-16 border-t border-slate-200/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center space-x-4 group cursor-default">
              <div className="p-2 bg-emerald-50 rounded-xl group-hover:bg-emerald-100 transition-colors">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              </div>
              <span className="text-[11px] font-black text-slate-400 tracking-widest uppercase">隐私加密 · 纯本地逻辑计算</span>
            </div>
            <div className="flex flex-col items-center md:items-end">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em]">
                © 2024 个税最优筹划工具 · 专业版
              </p>
              <div className="mt-2 h-0.5 w-12 bg-indigo-100 rounded-full"></div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;