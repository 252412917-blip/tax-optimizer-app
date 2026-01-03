
import React, { useState } from 'react';
import TaxForm from './components/TaxForm';
import TaxResult from './components/TaxResult';
import { TaxInputs, OptimizationResult } from './types';
import { optimizeTax } from './services/taxCalculator';

const App: React.FC = () => {
  const [result, setResult] = useState<OptimizationResult | null>(null);
  const [activeTab, setActiveTab] = useState<'form' | 'result'>('form');

  const handleCalculate = (inputs: TaxInputs) => {
    const optimizationResult = optimizeTax(inputs);
    setResult(optimizationResult);
    setActiveTab('result');
  };

  const resetForm = () => {
    setResult(null);
    setActiveTab('form');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-block p-2 px-4 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
          🇨🇳 2024 中国个税计税标准
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
          个税最优筹划工具
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          输入您的年度收入及扣除数据，我们将通过算法为您计算出节税效果最好的年终奖分配方案。
        </p>
      </header>

      {/* Main Content Area */}
      <main className="relative">
        {/* Navigation Tabs (Mobile Only style toggles or just visual cues) */}
        {result && (
          <div className="flex justify-center mb-8 bg-gray-100 p-1 rounded-xl w-fit mx-auto shadow-inner">
            <button
              onClick={() => setActiveTab('form')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'form' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              重新输入数据
            </button>
            <button
              onClick={() => setActiveTab('result')}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'result' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              查看筹划结果
            </button>
          </div>
        )}

        {/* View Switching */}
        <div className="transition-opacity duration-300">
          {activeTab === 'form' ? (
            <TaxForm onCalculate={handleCalculate} />
          ) : (
            result && <TaxResult result={result} />
          )}
        </div>
      </main>

      {/* Footer Info */}
      <footer className="mt-20 border-t border-gray-200 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="font-bold text-gray-900 mb-2">💡 什么是“税率陷阱”？</h4>
            <p className="text-sm text-gray-500 leading-relaxed">
              在年终奖单独计税方式下，当奖金总额超过某个临界点（如 36000 元）哪怕只有 1 元，
              其对应的税率可能会瞬间跳档。例如 36000 元税额为 1080 元，而 36001 元税额则暴增至 3390.1 元。
              我们的筹划工具会精确避开这些无效区间。
            </p>
          </div>
          <div>
            <h4 className="font-bold text-gray-900 mb-2">📖 使用说明</h4>
            <ol className="text-sm text-gray-500 space-y-2 list-decimal pl-4">
              <li>输入您预计的全年总收入（包含所有基本工资及计划发放的奖金总和）。</li>
              <li>填入年度扣除项：社保、公积金及专项附加扣除。</li>
              <li>点击计算，系统会自动给出“工资”和“奖金”的最优拆分金额。</li>
            </ol>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
