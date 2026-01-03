import React, { useState } from 'react';
import { TaxInputs } from '../types.ts';
import { Wallet, Landmark, HeartHandshake, BadgePercent, ArrowRightCircle } from 'lucide-react';

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

  const inputFields = [
    { 
      id: 'annualPreTaxIncome', 
      label: '预计全年税前总收入', 
      icon: <Wallet className="w-5 h-5 text-indigo-500" />, 
      hint: '包含月薪、季度奖、年终奖等所有应税现金所得',
      placeholder: '示例：500000',
      required: true
    },
    { 
      id: 'socialSecurity', 
      label: '年度个人社保公积金', 
      icon: <Landmark className="w-5 h-5 text-indigo-500" />, 
      hint: '填报年度内由个人承担缴纳部分的累计总额（示例：20000）',
      placeholder: '0'
    },
    { 
      id: 'specialAdditionalDeductions', 
      label: '年度专项附加扣除额', 
      icon: <HeartHandshake className="w-5 h-5 text-indigo-500" />, 
      hint: '子女教育、赡养老人、房贷利息等申报扣除项（示例：12000）',
      placeholder: '0'
    },
    { 
      id: 'otherExemptions', 
      label: '其他法定免税扣除', 
      icon: <BadgePercent className="w-5 h-5 text-indigo-500" />, 
      hint: '如大病医疗实际支出、符合条件的商业保险等',
      placeholder: '0'
    }
  ];

  return (
    <div className="bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-xl shadow-slate-200/50 border border-slate-100 relative overflow-hidden group">
      {/* 装饰线 */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500"></div>
      
      <div className="mb-12">
        <h3 className="text-2xl font-black text-slate-800 mb-2">财务数据录入</h3>
        <p className="text-slate-400 text-sm font-medium">请依据您的真实收入情况或财务计划如实填写，以便系统计算最优路径</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {inputFields.map((field) => (
            <div key={field.id} className="relative group/field">
              <div className="flex items-center mb-4">
                <div className="p-2 bg-slate-50 rounded-xl group-focus-within/field:bg-indigo-50 transition-colors mr-3 border border-slate-100 group-focus-within/field:border-indigo-100">
                  {field.icon}
                </div>
                <label className="text-sm font-bold text-slate-700 group-focus-within/field:text-indigo-600 transition-colors">
                  {field.label}
                  {field.required && <span className="text-rose-500 ml-1">*</span>}
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="number"
                  name={field.id}
                  required={field.required}
                  placeholder={field.placeholder}
                  className="w-full pl-6 pr-14 py-4 bg-slate-50 border-2 border-transparent rounded-[1.25rem] focus:bg-white focus:border-indigo-500/20 focus:ring-4 focus:ring-indigo-500/5 outline-none transition-all font-black text-xl text-slate-800 placeholder:text-slate-300"
                  onChange={handleChange}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col items-end">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">人民币</span>
                  <span className="text-xs font-bold text-slate-300">元</span>
                </div>
              </div>
              
              <div className="mt-3 ml-2 flex items-start space-x-2">
                <div className="w-1 h-1 rounded-full bg-slate-300 mt-1.5 flex-shrink-0"></div>
                <p className="text-[11px] text-slate-400 font-medium leading-relaxed italic">
                  {field.hint}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-10 flex flex-col items-center">
          <button
            type="submit"
            className="group relative w-full sm:w-auto min-w-[320px] bg-slate-900 hover:bg-indigo-600 text-white font-black py-5 px-10 rounded-[1.5rem] transition-all duration-300 shadow-2xl shadow-slate-900/20 hover:shadow-indigo-500/40 transform hover:-translate-y-1 flex items-center justify-center space-x-4"
          >
            <span className="text-lg tracking-tight">生成筹划方案</span>
            <ArrowRightCircle className="w-6 h-6 transform group-hover:translate-x-1 transition-transform" />
          </button>
          
          <div className="mt-10 flex items-center justify-center space-x-8 opacity-30 grayscale group-hover:grayscale-0 transition-all duration-700">
            <div className="h-6 flex items-center border-r border-slate-200 pr-8">
              <span className="text-[10px] font-black text-slate-400 tracking-[0.3em] uppercase">可信计算引擎</span>
            </div>
            <div className="flex space-x-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">安全</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">精准</span>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">高效</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default TaxForm;