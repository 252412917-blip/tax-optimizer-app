
import React, { useState } from 'react';
import TaxForm from './components/TaxForm.tsx';
import TaxResult from './components/TaxResult.tsx';
import { TaxInputs, OptimizationResult } from './types.ts';
import { optimizeTax } from './services/taxCalculator.ts';
import { ShieldCheck, Calculator, Sparkles } from 'lucide-react';

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
    <div className="min-h-screen bg-[#f8fafc] selection:bg-indigo-100 selection:text-indigo-900">
      {/* Subtle Background Pattern */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-100/50 blur-[120px]"></div>
        <div className="absolute bottom-[20%] right-[-5%] w-[30%] h-[30%] rounded-full bg-emerald-50/50 blur-[100px]"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        {/* Navigation / Header */}
        <header className="flex flex-col items-center mb-16 text-center">
          <div className="mb-8 p-1.5 bg-slate-200/50 backdrop-blur rounded-2xl inline-flex shadow-inner">
            <div className="px-4 py-2 bg-white rounded-xl shadow-sm flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Live Precision Model 2024</span>
            </div>
          </div>
          
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 scale-150"></div>
            <div className="relative bg-slate-900 text-white p-4 rounded-3xl shadow-2xl shadow-indigo-200 rotate-3 transform transition-transform hover:rotate-0 cursor-default">
              <Calculator className="w-10 h-10" />
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight mb-4 flex items-center justify-center">
            精算级<span className="text-indigo-600 ml-2">个税筹划</span>
            <Sparkles className="w-6 h-6 ml-2 text-indigo-400" />
          </h1>
          <p className="text-slate-500 max-w-lg text-lg leading-relaxed">
            输入您的年度收入及扣除数据，我们将通过算法为您计算出节税效果最好的年终奖分配方案
          </p>
        </header>

        {/* Tab Control */}
        {result && (
          <div className="flex justify-center mb-12">
            <div className="inline-flex p-1.5 bg-slate-200/50 backdrop-blur rounded-[1.5rem] shadow-inner">
              <button
                onClick={() => setActiveTab('form')}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'form' 
                    ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-950/5' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                配置中心
              </button>
              <button
                onClick={() => setActiveTab('result')}
                className={`px-8 py-3 rounded-2xl text-sm font-bold transition-all duration-300 ${
                  activeTab === 'result' 
                    ? 'bg-white text-indigo-600 shadow-md ring-1 ring-slate-950/5' 
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                精算报表
              </button>
            </div>
          </div>
        )}

        {/* Dynamic Viewport */}
        <div className="perspective-1000">
          <div className="transition-all duration-500 transform ease-out">
            {activeTab === 'form' ? (
              <div className="animate-fade-in">
                <TaxForm onCalculate={handleCalculate} />
              </div>
            ) : (
              result && <TaxResult result={result} />
            )}
          </div>
        </div>

        {/* Institutional Grade Page Footer */}
        <footer className="mt-24 border-t border-slate-200 pt-16 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white">
                  <Calculator size={18} />
                </div>
                <span className="font-black text-slate-900 tracking-tighter uppercase">TaxAlgo Engine</span>
              </div>
              <p className="text-xs text-slate-400 leading-loose mb-6 uppercase tracking-widest font-bold">
                Privacy-First Computing
              </p>
              <div className="flex items-center space-x-2 text-slate-400">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span className="text-[11px] font-medium tracking-wide">所有计算均在浏览器本地执行</span>
              </div>
            </div>

            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="bg-slate-100/50 p-6 rounded-3xl border border-slate-200/50">
                <h4 className="font-bold text-slate-800 mb-3 text-sm">税务合规声明</h4>
                <p className="text-xs text-slate-500 leading-relaxed italic">
                  本工具计算依据《中华人民共和国个人所得税法》及相关公告。筹划逻辑旨在合法合理利用政策空间，非避税软件。
                </p>
              </div>
              <div className="bg-slate-100/50 p-6 rounded-3xl border border-slate-200/50">
                <h4 className="font-bold text-slate-800 mb-3 text-sm">资产类别</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  目前覆盖：综合所得（工资薪金）、全年一次性奖金。
                  <br />
                  <span className="opacity-50">待开放：股权激励计税、离职补偿筹划。</span>
                </p>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-8 border-t border-slate-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em]">
              © 2024 Chinese Tax Optimizer Pro
            </p>
            <div className="flex space-x-6">
              <span className="text-[10px] font-bold text-slate-300 uppercase cursor-help hover:text-indigo-400 transition-colors">Documentation</span>
              <span className="text-[10px] font-bold text-slate-300 uppercase cursor-help hover:text-indigo-400 transition-colors">API Status</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
