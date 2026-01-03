
export interface TaxInputs {
  annualPreTaxIncome: number;      // 全年税前工资总额
  socialSecurity: number;          // 全年个人社保公积金
  specialAdditionalDeductions: number; // 全年专项附加扣除
  otherExemptions: number;         // 全年其他免税扣除
}

export interface TaxBracket {
  limit: number;
  rate: number;
  quickDeduction: number;
}

export interface CalculationResult {
  salaryAmount: number;            // 归入工资薪金部分
  bonusAmount: number;             // 归入全年一次性奖金部分
  totalTax: number;                // 总纳税额
  takeHomePay: number;             // 到手收入
  salaryTax: number;               // 工资薪金税额
  bonusTax: number;                // 奖金税额
  taxableIncome: number;           // 总应纳税所得额
}

export interface OptimizationResult {
  baseline: CalculationResult;
  optimized: CalculationResult;
  savings: number;
}
