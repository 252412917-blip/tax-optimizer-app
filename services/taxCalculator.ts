
import { 
  TaxInputs, 
  CalculationResult, 
  OptimizationResult, 
  TaxBracket 
} from '../types';
import { 
  ANNUAL_EXEMPTION, 
  SALARY_TAX_BRACKETS, 
  BONUS_TAX_BRACKETS 
} from '../constants';

/**
 * 计算工资薪金部分的税额
 * @param taxableIncome 工资部分的应纳税所得额
 */
export const calculateSalaryTax = (taxableIncome: number): number => {
  if (taxableIncome <= 0) return 0;
  
  const bracket = SALARY_TAX_BRACKETS.find(b => taxableIncome <= b.limit) || SALARY_TAX_BRACKETS[SALARY_TAX_BRACKETS.length - 1];
  return taxableIncome * bracket.rate - bracket.quickDeduction;
};

/**
 * 计算全年一次性奖金单独计税的税额
 * @param bonus 奖金总额
 */
export const calculateBonusTax = (bonus: number): number => {
  if (bonus <= 0) return 0;
  
  const monthlyAvg = bonus / 12;
  const bracket = BONUS_TAX_BRACKETS.find(b => monthlyAvg <= b.limit) || BONUS_TAX_BRACKETS[BONUS_TAX_BRACKETS.length - 1];
  return bonus * bracket.rate - bracket.quickDeduction;
};

/**
 * 执行个税筹划核心算法
 */
export const optimizeTax = (inputs: TaxInputs): OptimizationResult => {
  const { 
    annualPreTaxIncome, 
    socialSecurity, 
    specialAdditionalDeductions, 
    otherExemptions 
  } = inputs;

  // 1. 计算总的应纳税所得额
  // 总额 - 免征额 - 社保 - 专项 - 其他
  const totalTaxableBase = annualPreTaxIncome - ANNUAL_EXEMPTION - socialSecurity - specialAdditionalDeductions - otherExemptions;

  // 2. 基准方案 (Baseline): 全部计入工资薪金
  const baselineTax = calculateSalaryTax(totalTaxableBase);
  const baselineResult: CalculationResult = {
    salaryAmount: annualPreTaxIncome,
    bonusAmount: 0,
    salaryTax: baselineTax,
    bonusTax: 0,
    totalTax: baselineTax,
    takeHomePay: annualPreTaxIncome - socialSecurity - baselineTax,
    taxableIncome: Math.max(0, totalTaxableBase)
  };

  if (totalTaxableBase <= 0) {
    return { baseline: baselineResult, optimized: baselineResult, savings: 0 };
  }

  // 3. 筹划方案 (Optimized): 遍历拆分
  // 核心逻辑：遍历 0 到 totalTaxableBase，步长 100 寻找最低值。
  // 注意：奖金金额不能超过总收入，且由于是筹划，我们假设是在税前总额中划出一部分作为“年终奖”
  
  let bestResult = baselineResult;
  let minTax = baselineTax;

  // 步长建议：为了精确处理临界点，步长可以设小一点。
  // 特别注意年终奖临界值：36000, 144000, 300000, 420000, 660000, 960000
  const criticalPoints = [0, 36000, 144000, 300000, 420000, 660000, 960000];
  
  // 我们在 0 到 totalTaxableBase 范围内进行搜索
  // 方案 A: 奖金单独计税 + 剩余合并
  // 方式 B: 全部合并 (已在基准中计算)
  
  for (let b = 0; b <= totalTaxableBase; b += 100) {
    checkAndSave(b);
  }

  // 为了极度精准，检查所有的临界点
  criticalPoints.forEach(p => {
    if (p <= totalTaxableBase) checkAndSave(p);
  });

  function checkAndSave(bonusAmount: number) {
    const salaryTaxable = totalTaxableBase - bonusAmount;
    const sTax = calculateSalaryTax(salaryTaxable);
    const bTax = calculateBonusTax(bonusAmount);
    const currentTotalTax = sTax + bTax;

    // 如果当前税额更低，或者税额相同但奖金更高（满足用户需求）
    if (currentTotalTax < minTax || (currentTotalTax === minTax && bonusAmount > bestResult.bonusAmount)) {
      minTax = currentTotalTax;
      bestResult = {
        salaryAmount: annualPreTaxIncome - bonusAmount,
        bonusAmount: bonusAmount,
        salaryTax: sTax,
        bonusTax: bTax,
        totalTax: currentTotalTax,
        takeHomePay: annualPreTaxIncome - socialSecurity - currentTotalTax,
        taxableIncome: totalTaxableBase
      };
    }
  }

  return {
    baseline: baselineResult,
    optimized: bestResult,
    savings: baselineResult.totalTax - bestResult.totalTax
  };
};
