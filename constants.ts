
import { TaxBracket } from './types';

export const ANNUAL_EXEMPTION = 60000; // 年度免征额

/**
 * 表 1 个人所得税工资薪金所得年度累计税率表
 */
export const SALARY_TAX_BRACKETS: TaxBracket[] = [
  { limit: 36000, rate: 0.03, quickDeduction: 0 },
  { limit: 144000, rate: 0.10, quickDeduction: 2520 },
  { limit: 300000, rate: 0.20, quickDeduction: 16920 },
  { limit: 420000, rate: 0.25, quickDeduction: 31920 },
  { limit: 660000, rate: 0.30, quickDeduction: 52920 },
  { limit: 960000, rate: 0.35, quickDeduction: 85920 },
  { limit: Infinity, rate: 0.45, quickDeduction: 181920 }
];

/**
 * 表 2 全年一次性奖金单独计税月度税率表
 * 注：寻找税率时需用 奖金/12 的商。
 */
export const BONUS_TAX_BRACKETS: TaxBracket[] = [
  { limit: 3000, rate: 0.03, quickDeduction: 0 },
  { limit: 12000, rate: 0.10, quickDeduction: 210 },
  { limit: 25000, rate: 0.20, quickDeduction: 1410 },
  { limit: 35000, rate: 0.25, quickDeduction: 2660 },
  { limit: 55000, rate: 0.30, quickDeduction: 4410 },
  { limit: 80000, rate: 0.35, quickDeduction: 7160 },
  { limit: Infinity, rate: 0.45, quickDeduction: 15160 }
];
