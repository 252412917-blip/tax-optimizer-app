import React from 'react';
import { OptimizationResult } from '../types.ts';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingDown, Info, CheckCircle2, AlertCircle } from 'lucide-react';

interface TaxResultProps {
  result: OptimizationResult;
}

const TaxResult: React.FC<TaxResultProps> = ({ result }) => {
  const { baseline, optimized, savings } = result;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('zh-CN', { 
      style: 'currency', 
      currency: 'CNY',
      maximumFractionDigits: 0 
    }).format(val);
  };

  const chartData = [
    { name: '到手净额', value: optimized.takeHomePay, color: '#6366f1' },
    { name: '个人所得税', value: optimized.totalTax, color: '#f43f5e' },
    { name: '其他扣除项', value: Math.max(0, (optimized.salaryAmount + optimized.bonusAmount) - optimized.takeHomePay - optimized.totalTax), color: '#94a3b8' }
  ];

  const ComparisonRow = ({ label, base, opt, isBold = false, isSavings = false }: { label: string, base: string | number, opt: string | number, isBold?: boolean, isSavings?: boolean }) => (
    <div className={`grid grid-cols-3 py-4 px-4 border-b border-slate-50 items-center transition-colors hover:bg-slate-50/50 ${isBold ? 'font-bold text-slate-900 bg-slate-50/30' : 'text-slate-600'}`}>
      <div className="text-sm">{label}</div>
      <div className="text-right text-sm font-medium">{typeof base === 'number' ? formatMoney(base) : base}</div>
      <div className={`text-right text-sm ${isSavings ? 'text-emerald-600 font-bold' : (isBold ? 'text-indigo-600' : 'text-slate-900')}`}>
        {typeof opt === 'number' ? formatMoney(opt) : opt}
      </div>
    </div>
  );

  return (
    <div className="space-y-8 animate-fade-in pb-12">
      {/* 顶部汇总 */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 p-8 sm:p-12 text-white shadow-2xl">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-indigo-600/20 blur-3xl"></div>
        <div className="absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-emerald-600/10 blur-3xl"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold tracking-wider text-emerald-400 border border-emerald-500/20 mb-6 uppercase">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>已锁定最优节税组合</span>
            </div>
            <h2 className="text-slate-400 text-sm font-semibold mb-2">预计为您节省税费</h2>
            <div className="text-6xl sm:text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-100 to-indigo-300">
              {formatMoney(savings)}
            </div>
            <p className="mt-6 text-slate-400 max-w-md text-sm leading-relaxed">
              通过对分配组合的穷举模拟，系统为您识别出了避开“年终奖税率陷阱”的最佳路径。
            </p>
          </div>

          <div className="w-full md:w-auto">
            <div className="glass-morphism rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-xl">
              <div className="space-y-6">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">建议奖金分配金额</div>
                  <div className="text-3xl font-black text-indigo-400">{formatMoney(optimized.bonusAmount)}</div>
                </div>
                <div className="h-px bg-white/10"></div>
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">建议工资分配金额</div>
                  <div className="text-2xl font-bold text-slate-200">{formatMoney(optimized.salaryAmount)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* 详细对比表 */}
        <div className="lg:col-span-8 bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
          <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-white">
            <h3 className="text-lg font-bold text-slate-800 flex items-center">
              <div className="w-1 h-5 bg-indigo-600 rounded-full mr-3"></div>
              资产分配与税负明细对比
            </h3>
          </div>
          
          <div className="bg-slate-50/50 grid grid-cols-3 py-3 px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100">
            <div>核算项目</div>
            <div className="text-right">基准方案 (全部合并)</div>
            <div className="text-right text-indigo-600">筹划方案 (拆分最优)</div>
          </div>

          <div className="divide-y divide-slate-50">
            <ComparisonRow label="工资薪金金额 (税前)" base={baseline.salaryAmount} opt={optimized.salaryAmount} />
            <ComparisonRow label="年终奖金金额 (税前)" base={baseline.bonusAmount} opt={optimized.bonusAmount} />
            <ComparisonRow label="工资部分对应税额" base={baseline.salaryTax} opt={optimized.salaryTax} />
            <ComparisonRow label="奖金部分对应税额" base={baseline.bonusTax} opt={optimized.bonusTax} />
            <ComparisonRow label="应缴个税总计" base={baseline.totalTax} opt={optimized.totalTax} isBold />
            <ComparisonRow label="税后到手总计" base={baseline.takeHomePay} opt={optimized.takeHomePay} isBold />
            <ComparisonRow label="节税收益" base="-" opt={`+ ${formatMoney(savings)}`} isSavings />
          </div>
          
          <div className="p-6 bg-slate-50/30">
            <div className="flex items-start space-x-3 text-[11px] text-slate-400">
              <Info className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>注：基准方案假设所有应税收入均按综合所得年度税率表计税。筹划方案通过合理利用一次性奖金政策，最大限度降低边际税率。</p>
            </div>
          </div>
        </div>

        {/* 构成分析 */}
        <div className="lg:col-span-4 flex flex-col space-y-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 flex-1">
            <h3 className="text-lg font-bold text-slate-800 mb-8">最优收益结构</h3>
            <div className="h-64 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={95}
                    paddingAngle={10}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                    formatter={(value: number) => formatMoney(value)}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">到手比例</span>
                <span className="text-2xl font-black text-slate-800">
                  {((optimized.takeHomePay / (optimized.salaryAmount + optimized.bonusAmount)) * 100).toFixed(1)}%
                </span>
              </div>
            </div>
            <div className="mt-8 space-y-3">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center justify-between p-3 rounded-2xl bg-slate-50">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-3 shadow-sm" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs font-bold text-slate-600">{item.name}</span>
                  </div>
                  <span className="text-xs font-black text-slate-800">{formatMoney(item.value)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-indigo-600 p-8 rounded-[2rem] shadow-xl shadow-indigo-200 text-white relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-10 transform group-hover:scale-110 transition-transform">
              <TrendingDown className="h-16 w-16" />
            </div>
            <h4 className="font-bold text-indigo-100 mb-2">优化洞察</h4>
            <p className="text-sm text-indigo-50 leading-relaxed">
              当前分配方案使您的资产组合恰好处于低税率临界区，有效规避了“多发1元多缴数千元”的跳档陷阱。
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 bg-slate-100 rounded-[2rem] border border-slate-200">
        <div className="flex items-center space-x-4">
          <div className="p-3 bg-white rounded-2xl text-amber-500 shadow-sm">
            <AlertCircle className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-800">政策依据</div>
            <div className="text-xs text-slate-500">《关于延续实施全年一次性奖金个人所得税政策的公告》</div>
          </div>
        </div>
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-white text-slate-800 font-bold text-sm rounded-2xl shadow-sm border border-slate-200 hover:bg-slate-50 transition-colors"
        >
          导出/打印报表
        </button>
      </div>
    </div>
  );
};

export default TaxResult;