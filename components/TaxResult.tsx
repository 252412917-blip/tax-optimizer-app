import React from 'react';
import { OptimizationResult } from '../types.ts';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { CornerDownRight } from 'lucide-react';

interface TaxResultProps {
  result: OptimizationResult;
}

const TaxResult: React.FC<TaxResultProps> = ({ result }) => {
  const { baseline, optimized, savings } = result;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const chartData = [
    { name: '个税总额', value: optimized.totalTax, color: '#ef4444' },
    { name: '到手收入', value: optimized.takeHomePay, color: '#5249f3' },
    { name: '社保公积金', value: Math.max(0, (optimized.salaryAmount + optimized.bonusAmount) - optimized.takeHomePay - optimized.totalTax), color: '#94a3b8' }
  ];

  const takeHomePercent = ((optimized.takeHomePay / (optimized.salaryAmount + optimized.bonusAmount)) * 100).toFixed(1);

  return (
    <div className="space-y-10 animate-fade-in pb-20 max-w-6xl mx-auto">
      {/* 顶部汇总卡片 - 黑灰高级渐变 */}
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-800 via-slate-900 to-black p-8 sm:p-12 text-white shadow-2xl">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1">
            <h3 className="text-slate-400 text-base font-bold mb-2">筹划节税金额</h3>
            <div className="text-6xl sm:text-7xl font-black tracking-tighter mb-4">
              {formatMoney(savings)}
            </div>
            <p className="text-slate-400 text-sm font-medium">
              通过最优拆分方案，您可以比基准方案少交税 <span className="text-white">{formatMoney(savings)}</span>。
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[300px]">
            <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-3xl p-7 relative">
              <div className="text-slate-400 text-sm font-bold mb-1 opacity-80 uppercase tracking-widest">最优年终奖额度</div>
              <div className="text-4xl font-black text-white">{formatMoney(optimized.bonusAmount)}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 中间核心内容层：左右布局并列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
        {/* 左侧：对比表格 */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col transition-all hover:shadow-lg">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-1.5 h-6 bg-[#5249f3] rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">方案详细对比</h3>
          </div>

          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-slate-400 font-bold border-b border-slate-50 text-[11px] uppercase tracking-wider">
                  <th className="text-left py-4 px-2">项目</th>
                  <th className="text-right py-4 px-2">筹划前 (基准)</th>
                  <th className="text-right py-4 px-2 text-[#5249f3]">筹划后 (最优)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                <tr>
                  <td className="py-5 px-2 font-bold text-slate-600">工资薪金部分 (税前)</td>
                  <td className="text-right py-5 px-2 text-slate-500 font-medium">{formatMoney(baseline.salaryAmount)}</td>
                  <td className="text-right py-5 px-2 text-[#5249f3] font-black">{formatMoney(optimized.salaryAmount)}</td>
                </tr>
                <tr>
                  <td className="py-5 px-2 font-bold text-slate-600">年终奖部分 (税前)</td>
                  <td className="text-right py-5 px-2 text-slate-500 font-medium">{formatMoney(baseline.bonusAmount)}</td>
                  <td className="text-right py-5 px-2 text-[#5249f3] font-black">{formatMoney(optimized.bonusAmount)}</td>
                </tr>
                <tr className="bg-red-50/30">
                  <td className="py-5 px-2 font-black text-slate-800">个税总额</td>
                  <td className="text-right py-5 px-2 text-red-400 font-bold">{formatMoney(baseline.totalTax)}</td>
                  <td className="text-right py-5 px-2 text-red-500 font-black">{formatMoney(optimized.totalTax)}</td>
                </tr>
                <tr className="text-[11px] text-slate-400">
                  <td className="py-3 px-2 pl-6 flex items-center">
                    <CornerDownRight size={12} className="mr-1 opacity-50" />
                    工资部分税额
                  </td>
                  <td className="text-right py-3 px-2">{formatMoney(baseline.salaryTax)}</td>
                  <td className="text-right py-3 px-2">{formatMoney(optimized.salaryTax)}</td>
                </tr>
                <tr className="text-[11px] text-slate-400">
                  <td className="py-3 px-2 pl-6 flex items-center">
                    <CornerDownRight size={12} className="mr-1 opacity-50" />
                    奖金部分税额
                  </td>
                  <td className="text-right py-3 px-2">{formatMoney(baseline.bonusTax)}</td>
                  <td className="text-right py-3 px-2">{formatMoney(optimized.bonusTax)}</td>
                </tr>
                <tr className="bg-emerald-50/40">
                  <td className="py-6 px-2 font-black text-slate-800">最终到手收入</td>
                  <td className="text-right py-6 px-2 text-slate-500 font-bold">{formatMoney(baseline.takeHomePay)}</td>
                  <td className="text-right py-6 px-2 text-emerald-600 font-black">{formatMoney(optimized.takeHomePay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* 右侧：饼图占比 */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 flex flex-col transition-all hover:shadow-lg">
          <div className="flex items-center space-x-2 mb-8">
            <div className="w-1.5 h-6 bg-[#5249f3] rounded-full"></div>
            <h3 className="text-xl font-black text-slate-800 tracking-tight">最优方案收入占比</h3>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center pt-4">
            <div className="h-72 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    innerRadius={85}
                    outerRadius={115}
                    paddingAngle={6}
                    dataKey="value"
                    strokeWidth={0}
                    startAngle={90}
                    endAngle={-270}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">净值率</span>
                 <span className="text-4xl font-black text-slate-900 tracking-tighter">{takeHomePercent}%</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 mt-8">
              {chartData.map((item) => (
                <div key={item.name} className="flex items-center space-x-2.5">
                  <div className="w-3.5 h-3.5 rounded-sm shadow-sm" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm font-bold text-slate-500 tracking-tight">{item.name}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-50 w-full text-center">
              <p className="text-slate-400 font-bold text-sm">
                每 10,000 元总收入中约有 <span className="text-[#5249f3] text-lg font-black">{(parseFloat(takeHomePercent) * 100).toFixed(0)}</span> 元成功到手
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 底部逻辑说明 */}
      <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm border-l-[12px] border-l-[#5249f3]">
        <h4 className="text-[#5249f3] font-black text-xl mb-6 tracking-tight flex items-center">
          筹划逻辑说明
        </h4>
        <p className="text-slate-600 text-lg leading-relaxed font-medium">
          最优方案是通过算法遍历所有可能的分配比例得出的。系统将 <span className="font-black text-[#5249f3]">{formatMoney(optimized.bonusAmount)}</span> 划分为“全年一次性奖金”并使用月度税率表单独计税，剩余 <span className="font-black text-[#5249f3]">{formatMoney(optimized.salaryAmount)}</span> 按“工资薪金所得”计税。这种分配方式避开了年终奖“税率陷阱”的临界点，最大程度降低了整体税负。
        </p>
      </div>
    </div>
  );
};

export default TaxResult;