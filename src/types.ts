/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Lead {
  id: string;
  fullName: string;
  phone?: string;
  email?: string;
  source: 'hero_form' | 'bonus_form' | 'footer_form' | 'calculator_form' | 'checklist_form';
  timestamp: string;
}

export interface DebtCalculatorInput {
  loanAmount: number; // in VNĐ (e.g. 2,000,000,000)
  preferentialRate: number; // in % (e.g. 6.5)
  preferentialMonths: number; // in months (e.g. 12)
  floatingRate: number; // in % (e.g. 10.5)
  loanTermYears: number; // in years (e.g. 25)
}

export interface DebtCalculationResult {
  monthlyPrincipal: number;
  monthlyInterestPreferential: number;
  monthlyTotalPreferential: number;
  monthlyInterestFloating: number;
  monthlyTotalFloating: number;
  differenceAmount: number;
  riskStatus: 'AN_TOAN' | 'CAN_NHAC' | 'NGUY_HIEM';
  recommendation: string;
}

export interface CompoundCalculatorInput {
  currentDebt: number; // in VNĐ
  interestRate: number; // in %
  additionalMonthlyPayment: number; // in VNĐ
  scheduledTermYears: number; // in years
}

export interface CompoundCalculationResult {
  yearsSaved: number;
  monthsSaved: number;
  interestSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  amortizationSchedule: {
    year: number;
    withExtraBalance: number;
    withoutExtraBalance: number;
  }[];
}

export interface ChecklistCriterion {
  id: string;
  step: number;
  title: string;
  question: string;
  score: number; // 0 to 10
  description: string;
}

export interface PropertyScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  status: 'DAT_CHUAN_AN_TOAN' | 'CAN_DE_PHONG' | 'NGUY_CO_CHON_VON';
  message: string;
}
