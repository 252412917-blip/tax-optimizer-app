
import React, { useState } from 'react';
import { TaxInputs } from '../types';

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
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCalculate(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl shadow-lg border border-gray-100">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">全年税前总收入 (元)</label>
          <input
            type="number"
            name="annualPreTaxIncome"
            required
            placeholder="例如：200000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-400">包含基本工资、奖金、津贴等总额</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">全年个人承担社保公积金 (元)</label>
          <input
            type="number"
            name="socialSecurity"
            placeholder="例如：24000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-400">即所谓的“五险一金”个人缴纳部分</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">全年专项附加扣除总额 (元)</label>
          <input
            type="number"
            name="specialAdditionalDeductions"
            placeholder="例如：12000"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-400">子女教育/赡养老人/房租/房贷等总扣除</p>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">全年其他免税扣除总额 (元)</label>
          <input
            type="number"
            name="otherExemptions"
            placeholder="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            onChange={handleChange}
          />
          <p className="text-xs text-gray-400">企业年金、商业健康保险等其他扣除项目</p>
        </div>
      </div>

      <div className="pt-4">
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md transform active:scale-95"
        >
          开始计算最优筹划
        </button>
      </div>
      
      <div className="text-center">
        <p className="text-xs text-gray-400 italic">请填写真实数据以获得准确结果。年度免征额 60,000 元已内置计算。</p>
      </div>
    </form>
  );
};

export default TaxForm;
