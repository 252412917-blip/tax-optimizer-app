
import React from 'react';
import { OptimizationResult } from '../types';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

interface TaxResultProps {
  result: OptimizationResult;
}

const TaxResult: React.FC<TaxResultProps> = ({ result }) => {
  const { baseline, optimized, savings } = result;

  const formatMoney = (val: number) => {
    return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY' }).format(val);
  };

  const chartData = [
    { name: '到手收入', value: optimized.takeHomePay, color: '#4F46E5' },
    { name: '个税总额', value: optimized.totalTax, color: '#EF4444' },
    { name: '社保公积金', value: (baseline.salaryAmount + baseline.bonusAmount) - baseline.takeHomePay - baseline.totalTax, color: '#9CA3AF' }
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Summary Card */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div>
            <h2 className="text-xl opacity-90 mb-1">筹划节税金额</h2>
            <div className="text-5xl font-extrabold">{formatMoney(savings)}</div>
            <p className="mt-2 text-indigo-100 italic">
              通过最优拆分方案，您可以比基准方案少交税 {formatMoney(savings)}。
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
            <div className="text-sm opacity-80 mb-1">最优年终奖额度</div>
            <div className="text-3xl font-bold">{formatMoney(optimized.bonusAmount)}</div>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Detail Table */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 flex items-center">
            <span className="w-2 h-6 bg-indigo-500 rounded mr-2"></span>
            方案详细对比
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-500 uppercase">
                  <th className="p-3 text-left font-semibold">项目</th>
                  <th className="p-3 text-right font-semibold">筹划前 (基准)</th>
                  <th className="p-3 text-right font-semibold">筹划后 (最优)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr>
                  <td className="p-3 text-gray-600">工资薪金部分 (税前)</td>
                  <td className="p-3 text-right font-medium">{formatMoney(baseline.salaryAmount)}</td>
                  <td className="p-3 text-right font-bold text-indigo-600">{formatMoney(optimized.salaryAmount)}</td>
                </tr>
                <tr>
                  <td className="p-3 text-gray-600">年终奖部分 (税前)</td>
                  <td className="p-3 text-right font-medium">{formatMoney(baseline.bonusAmount)}</td>
                  <td className="p-3 text-right font-bold text-indigo-600">{formatMoney(optimized.bonusAmount)}</td>
                </tr>
                <tr className="bg-red-50/50">
                  <td className="p-3 text-gray-700 font-semibold">个税总额</td>
                  <td className="p-3 text-right text-red-500 font-medium">{formatMoney(baseline.totalTax)}</td>
                  <td className="p-3 text-right text-red-600 font-extrabold">{formatMoney(optimized.totalTax)}</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs text-gray-400 pl-8">↳ 工资部分税额</td>
                  <td className="p-2 text-right text-xs text-gray-400">{formatMoney(baseline.salaryTax)}</td>
                  <td className="p-2 text-right text-xs text-gray-400">{formatMoney(optimized.salaryTax)}</td>
                </tr>
                <tr>
                  <td className="p-2 text-xs text-gray-400 pl-8">↳ 奖金部分税额</td>
                  <td className="p-2 text-right text-xs text-gray-400">{formatMoney(baseline.bonusTax)}</td>
                  <td className="p-2 text-right text-xs text-gray-400">{formatMoney(optimized.bonusTax)}</td>
                </tr>
                <tr className="bg-green-50/50">
                  <td className="p-3 text-gray-700 font-semibold">最终到手收入</td>
                  <td className="p-3 text-right text-gray-700 font-medium">{formatMoney(baseline.takeHomePay)}</td>
                  <td className="p-3 text-right text-green-600 font-extrabold">{formatMoney(optimized.takeHomePay)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Chart Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col items-center">
          <h3 className="text-lg font-bold mb-4 border-b pb-2 w-full flex items-center">
            <span className="w-2 h-6 bg-purple-500 rounded mr-2"></span>
            最优方案收入占比
          </h3>
          <div className="w-full h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value: number) => formatMoney(value)} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 text-sm text-gray-500 text-center">
            到手收入占比约 <strong>{((optimized.takeHomePay / (optimized.salaryAmount + optimized.bonusAmount)) * 100).toFixed(1)}%</strong>
          </div>
        </div>
      </div>

      {/* Logic Note */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
        <h4 className="font-bold text-blue-800 text-sm mb-1">筹划逻辑说明</h4>
        <p className="text-xs text-blue-700 leading-relaxed">
          最优方案是通过算法遍历所有可能的分配比例得出的。系统将 <strong>{formatMoney(optimized.bonusAmount)}</strong> 划分为“全年一次性奖金”并使用月度税率表单独计税，剩余 <strong>{formatMoney(optimized.salaryAmount)}</strong> 按“工资薪金所得”计税。这种分配方式避开了年终奖“税率陷阱”的临界点，最大程度降低了整体税负。
        </p>
      </div>
      
      <div className="text-center text-xs text-gray-400 pb-8">
        注：本计算结果仅供参考，实际纳税额以税务机关核定为准。计算基于 2024 年度现行个税政策执行。
      </div>
    </div>
  );
};

export default TaxResult;
