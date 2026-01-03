import React, { useState } from 'react';
import { TaxInputs } from '../types.ts';

interface TaxFormProps {
  onCalculate: (inputs: TaxInputs) => void;
}

const TaxForm: React.FC<TaxFormProps> = ({ onCalculate }) => {
  const [formData, setFormData] = useState<TaxInputs>({
    annualPreTaxIncome: 0,
    socialSecurity: 0,
    specialAdditionalDeductions: 0,
    otherExemptions: 0
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Math.abs(parseFloat(value)) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.annualPreTaxIncome <= 0) {
      alert('请至少输入预计全年税前总收入');
      return;
    }
    onCalculate(formData);
  };

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[3.5rem] p-10 sm:p-16 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.08)] border border-white relative overflow-hidden group">
      {/* 顶部质感渐变条 */}
      <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-slate-900 via-indigo-600 to-slate-900"></div>

      <form onSubmit={handleSubmit} className="space-y-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
          {/* 全年税前总收入 */}
          <div className="space-y-4">
            <label className="block text-[15px] font-bold text-slate-800 tracking-tight ml-1">
              全年税前总收入 (元)
            </label>
            <div className="relative">
              <input
                type="number"
                name="annualPreTaxIncome"
                required
                placeholder="例如: 200000"
                className="w-full px-8 py-5.5 bg-slate-50/50 border-2 border-slate-100/80 rounded-[1.8rem] focus:bg-white focus:border-indigo-500/20 focus:ring-[6px] focus:ring-indigo-500/5 outline-none transition-all font-bold text-xl text-slate-900 placeholder:text-slate-300 shadow-sm"
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium ml-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2"></span>
              包含基本工资、奖金、津贴等总额
            </p>
          </div>

          {/* 全年个人承担社保公积金 */}
          <div className="space-y-4">
            <label className="block text-[15px] font-bold text-slate-800 tracking-tight ml-1">
              全年个人承担社保公积金 (元)
            </label>
            <div className="relative">
              <input
                type="number"
                name="socialSecurity"
                placeholder="例如: 24000"
                className="w-full px-8 py-5.5 bg-slate-50/50 border-2 border-slate-100/80 rounded-[1.8rem] focus:bg-white focus:border-indigo-500/20 focus:ring-[6px] focus:ring-indigo-500/5 outline-none transition-all font-bold text-xl text-slate-900 placeholder:text-slate-300 shadow-sm"
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium ml-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2"></span>
              即所谓的“五险一金”个人缴纳部分
            </p>
          </div>

          {/* 全年专项附加扣除总额 */}
          <div className="space-y-4">
            <label className="block text-[15px] font-bold text-slate-800 tracking-tight ml-1">
              全年专项附加扣除总额 (元)
            </label>
            <div className="relative">
              <input
                type="number"
                name="specialAdditionalDeductions"
                placeholder="例如: 12000"
                className="w-full px-8 py-5.5 bg-slate-50/50 border-2 border-slate-100/80 rounded-[1.8rem] focus:bg-white focus:border-indigo-500/20 focus:ring-[6px] focus:ring-indigo-500/5 outline-none transition-all font-bold text-xl text-slate-900 placeholder:text-slate-300 shadow-sm"
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium ml-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2"></span>
              子女教育/赡养老人/房租/房贷等总扣除
            </p>
          </div>

          {/* 全年其他免税扣除总额 */}
          <div className="space-y-4">
            <label className="block text-[15px] font-bold text-slate-800 tracking-tight ml-1">
              全年其他免税扣除总额 (元)
            </label>
            <div className="relative">
              <input
                type="number"
                name="otherExemptions"
                placeholder="0"
                className="w-full px-8 py-5.5 bg-slate-50/50 border-2 border-slate-100/80 rounded-[1.8rem] focus:bg-white focus:border-indigo-500/20 focus:ring-[6px] focus:ring-indigo-500/5 outline-none transition-all font-bold text-xl text-slate-900 placeholder:text-slate-300 shadow-sm"
                onChange={handleChange}
              />
            </div>
            <p className="text-xs text-slate-400 font-medium ml-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-300 mr-2"></span>
              企业年金、商业健康保险等其他扣除项目
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col items-center">
          <button
            type="submit"
            className="w-full max-w-2xl bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 hover:from-slate-900 hover:to-black text-white font-black py-7 rounded-[2rem] transition-all duration-500 shadow-2xl shadow-slate-900/10 active:scale-[0.98] text-xl tracking-tight"
          >
            开始计算最优筹划
          </button>
          
          <div className="mt-8 flex items-center justify-center space-x-2 text-[13px] text-slate-400 font-bold italic opacity-80">
            <span>精准测算</span>
            <span className="w-1 h-1 rounded-full bg-slate-300"></span>
            <span>年度免征额 60,000 元已内置</span>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaxForm;