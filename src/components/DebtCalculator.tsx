/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FileSpreadsheet, Percent, Calendar, ShieldCheck, AlertTriangle, ArrowUpRight, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { DebtCalculatorInput, DebtCalculationResult } from '../types';

interface DebtCalculatorProps {
  onFormAnchorClick: () => void;
}

export default function DebtCalculator({ onFormAnchorClick }: DebtCalculatorProps) {
  // Input states
  const [loanAmount, setLoanAmount] = useState<number>(2000000000); // 2 Tỷ VNĐ
  const [preferentialRate, setPreferentialRate] = useState<number>(6.5); // 6.5%
  const [preferentialMonths, setPreferentialMonths] = useState<number>(12); // 12 Tháng
  const [floatingRate, setFloatingRate] = useState<number>(10.5); // 10.5%
  const [loanTermYears, setLoanTermYears] = useState<number>(25); // 25 Năm
  const [monthlyIncome, setMonthlyIncome] = useState<number>(60000000); // 60 Triệu VNĐ

  // Calculation outcome
  const [result, setResult] = useState<DebtCalculationResult | null>(null);

  // Formatting helpers
  const formatVND = (value: number) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toLocaleString('vi-VN', { maximumFractionDigits: 2 }) + ' Tỷ';
    }
    return (value / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 0 }) + ' Triệu';
  };

  const formatVNDFull = (value: number) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  useEffect(() => {
    const totalMonths = loanTermYears * 12;
    const monthlyPrincipal = loanAmount / totalMonths;
    
    // Preferential phase
    const monthlyInterestPreferential = (loanAmount * (preferentialRate / 100)) / 12;
    const monthlyTotalPreferential = monthlyPrincipal + monthlyInterestPreferential;

    // Floating phase
    const monthlyInterestFloating = (loanAmount * (floatingRate / 100)) / 12;
    const monthlyTotalFloating = monthlyPrincipal + monthlyInterestFloating;

    const differenceAmount = monthlyTotalFloating - monthlyTotalPreferential;

    // Risk benchmarking based on monthly household income
    // If debt payment takes > 50% of household income -> NGUY HIỂM (Danger)
    // If debt payment takes 35% - 50% of household income -> CAN_NHAC (Warning)
    // If debt payment takes < 35% -> AN_TOAN (Safe)
    const ratio = (monthlyTotalFloating / monthlyIncome) * 100;
    
    let riskStatus: DebtCalculationResult['riskStatus'] = 'AN_TOAN';
    let recommendation = '';

    if (ratio > 50) {
      riskStatus = 'NGUY_HIEM';
      recommendation = `⚠️ Cảnh Báo Đỏ! Số tiền trả nợ chiếm tới ${ratio.toFixed(0)}% thu nhập của anh/chị hàng tháng sau khi thả nổi. Chỉ cần hạ tầng chậm trễ hoặc hết thời hạn ưu đãi lãi suất, anh/chị sẽ ngay lập tức đối diện nguy cơ 'gãy cánh dòng tiền', buộc phải bán tháo cắt lỗ. Hãy tải ngay checklist 5 bước để thiết lập đường lui khẩn cấp.`;
    } else if (ratio > 35) {
      riskStatus = 'CAN_NHAC';
      recommendation = `⚠️ Cần Cẩn Trọng! Khoản nợ chiếm khoảng ${ratio.toFixed(0)}% thu nhập hàng tháng. Đây là ngưỡng nhạy cảm nhấp nhô dòng tiền. Nếu xảy ra việc gối lãi suất ngân hàng thả nổi tăng thêm dập dồn, cuộc sống gia đình hoặc dòng tiền kinh doanh sẽ chịu áp lực cực lớn. Hãy xem xét phương án tất toán nợ sớm hoặc cấu trúc khoản vay kỹ hơn.`;
    } else {
      riskStatus = 'AN_TOAN';
      recommendation = `✅ Ngưỡng an toàn tối đa! Tổng chi trả hàng tháng chỉ chiếm ${ratio.toFixed(0)}% thu nhập. Dòng tiền của gia đình anh/chị rất bền bỉ, dễ dàng phòng thủ dài hạn trong lúc chờ chính sách hạ tầng bứt phá lên đỉnh giá trị mới.`;
    }

    setResult({
      monthlyPrincipal,
      monthlyInterestPreferential,
      monthlyTotalPreferential,
      monthlyInterestFloating,
      monthlyTotalFloating,
      differenceAmount,
      riskStatus,
      recommendation
    });
  }, [loanAmount, preferentialRate, preferentialMonths, floatingRate, loanTermYears, monthlyIncome]);

  return (
    <div id="debt-calculator" className="w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 gold-glow relative">
      <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5">
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Bản Demo Excel Trực Tuyến
      </div>

      <div className="mb-6 max-w-xl">
        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
          <span>📊</span> Công cụ 1: Tính Lịch Trả Nợ & Thử Nghiệm Gãy Dòng Tiền
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Thử nghiệm kịch bản lãi suất thay đổi đột ngột sau thời kỳ ân hạn lãi suất. Hãy điền các thông số thực tế khoản vay dự kiến của anh/chị để kiểm nghiệm sức công phá của dòng tiền.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/40 p-5 md:p-6 rounded-2xl border border-slate-800/80">
          
          {/* LOAN AMOUNT */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                Tổng Số Tiền Cần Vay
              </span>
              <span className="text-sm font-bold text-brand-gold-400 font-mono">
                {formatVND(loanAmount)} đ
              </span>
            </div>
            <input
              type="range"
              min={200000000} // 200 Triệu
              max={15000000000} // 15 Tỷ
              step={100000000} // 100 Triệu
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>200 Tr</span>
              <span>5 Tỷ</span>
              <span>10 Tỷ</span>
              <span>15 Tỷ</span>
            </div>
          </div>

          {/* INTEREST TERM & RATE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lãi Suất Đại Ngộ Ưu Đãi (%/Năm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  max="15"
                  value={preferentialRate}
                  onChange={(e) => setPreferentialRate(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white placeholder-slate-600 outline-none font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs font-mono">%</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Thời Hạn Ưu Đãi Lãi Suất (Tháng)
              </label>
              <select
                value={preferentialMonths}
                onChange={(e) => setPreferentialMonths(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white outline-none cursor-pointer"
              >
                <option value="6">6 tháng</option>
                <option value="12">12 tháng (1 năm)</option>
                <option value="18">18 tháng</option>
                <option value="24">24 tháng (2 năm)</option>
              </select>
            </div>
          </div>

          {/* FLOATING INTEREST RATE & TERMS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-800/60 pt-4">
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-xs font-semibold text-slate-300 flex items-center gap-1">
                  Lãi Suất Thả Nổi Thực Tế (%/Năm)
                  <HelpCircle className="w-3 h-3 text-slate-500" title="Là mức lãi suất cơ sở + biên độ (thường dao động 10.5% - 12.5% tuỳ ngân hàng)" />
                </label>
              </div>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="5"
                  max="20"
                  value={floatingRate}
                  onChange={(e) => setFloatingRate(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-950 border-red-950 border focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-rose-300 placeholder-slate-600 outline-none font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-rose-500 text-xs font-mono">%</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Thời Hạn Vay Vốn (Năm)
              </label>
              <select
                value={loanTermYears}
                onChange={(e) => setLoanTermYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white outline-none cursor-pointer"
              >
                <option value="10">10 năm</option>
                <option value="15">15 năm</option>
                <option value="20">20 năm</option>
                <option value="25">25 năm</option>
                <option value="30">30 năm</option>
              </select>
            </div>
          </div>

          {/* MONTHLY HOUSEHOLD INCOME (CRUCIAL FOR SAFE CALCULATION) */}
          <div className="border-t border-slate-800/60 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                Tổng Thu Nhập Hàng Tháng Dự Kiến (Tích lũy từ hộ gia đình)
              </span>
              <span className="text-sm font-bold text-emerald-400 font-mono">
                {formatVND(monthlyIncome)} đ
              </span>
            </div>
            <input
              type="range"
              min={15000000} // 15 Triệu
              max={250000000} // 250 Triệu
              step={5000000} // 5 Triệu
              value={monthlyIncome}
              onChange={(e) => setMonthlyIncome(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>15 Tr</span>
              <span>100 Tr</span>
              <span>180 Tr</span>
              <span>250 Tr</span>
            </div>
          </div>

        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 flex flex-col h-full justify-between gap-6">
          {result && (
            <div className="space-y-4">
              
              {/* STAGE COMPARISON TABLE */}
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden divide-y divide-slate-900 shadow-inner">
                
                {/* Title */}
                <div className="p-4 bg-slate-900/50 flex justify-between items-center">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Thời Kỳ Chi Trả</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Số Tiền Trả / Tháng</span>
                </div>

                {/* Preferential Row */}
                <div className="p-4 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-400 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Giai Đoạn Ưu Đãi</div>
                      <div className="text-[10px] text-slate-500">{preferentialMonths} tháng đầu • LS {preferentialRate}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono">T.Gốc: {formatVNDFull(Math.round(result.monthlyPrincipal))}</div>
                    <div className="text-xs font-bold text-emerald-400 font-mono">
                      + {formatVNDFull(Math.round(result.monthlyTotalPreferential))}
                    </div>
                  </div>
                </div>

                {/* Floating Row */}
                <div className="p-4 flex justify-between items-center bg-red-950/5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-rose-500 shrink-0" />
                    <div>
                      <div className="text-xs font-semibold text-slate-200">Giai Đoạn Thả Nổi</div>
                      <div className="text-[10px] text-slate-500">Từ tháng tiếp theo • LS {floatingRate}%</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-400 font-mono">T.Gốc: {formatVNDFull(Math.round(result.monthlyPrincipal))}</div>
                    <div className="text-xs font-bold text-rose-400 font-mono">
                      + {formatVNDFull(Math.round(result.monthlyTotalFloating))}
                    </div>
                  </div>
                </div>

                {/* Shock/Difference Value */}
                <div className="p-4 flex justify-between items-center bg-red-950/20 text-rose-300">
                  <div className="flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-semibold text-rose-200">Biên độ tăng thêm (Sốc Lãi Suất)</span>
                  </div>
                  <div className="text-right font-mono font-black text-sm flex items-center gap-0.5 text-rose-400">
                    <ArrowUpRight className="w-4 h-4" />
                    +{formatVNDFull(Math.round(result.differenceAmount))} / tháng
                  </div>
                </div>

              </div>

              {/* RISK METER BANNER */}
              <div className={`p-4 rounded-xl border ${
                result.riskStatus === 'NGUY_HIEM' 
                  ? 'bg-rose-950/20 border-rose-500/30 text-rose-200' 
                  : result.riskStatus === 'CAN_NHAC' 
                  ? 'bg-amber-950/20 border-amber-500/30 text-amber-200' 
                  : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-200'
              }`}>
                <div className="flex items-center gap-2 mb-2 font-display font-black text-xs uppercase tracking-wider">
                  {result.riskStatus === 'NGUY_HIEM' && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse"></span>
                      <span className="text-rose-400">CỐ VẤN ĐÁNH GIÁ: NGUY HIỂM GÃY DÒNG TIỀN</span>
                    </>
                  )}
                  {result.riskStatus === 'CAN_NHAC' && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                      <span className="text-amber-400">CỐ VẤN ĐÁNH GIÁ: CẦN CÂN ĐỐI LẠI</span>
                    </>
                  )}
                  {result.riskStatus === 'AN_TOAN' && (
                    <>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                      <span className="text-emerald-400">CỐ VẤN ĐÁNH GIÁ: AN TOÀN TUYỆT ĐỐI</span>
                    </>
                  )}
                </div>
                <p className="text-[11px] text-slate-300 leading-relaxed font-sans">
                  {result.recommendation}
                </p>
              </div>

              {/* HIGH CONVERT CALL BACK */}
              <div className="pt-2">
                <button
                  onClick={onFormAnchorClick}
                  className="w-full bg-slate-900 hover:bg-slate-800 border border-brand-gold-500/30 text-brand-gold-300 py-3 rounded-xl font-bold text-xs uppercase cursor-pointer flex items-center justify-center gap-1.5 tracking-wider transition-all"
                >
                  📥 Nhận Trọn Bộ Bảng Tính Excel Thẩm Định & Ebook Qua Zalo
                </button>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}
