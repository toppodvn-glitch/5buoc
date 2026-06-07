/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Calendar, Zap, FileSpreadsheet, ArrowDown } from 'lucide-react';
import { DebtCalculatorInput, CompoundCalculatorInput, CompoundCalculationResult } from '../types';

interface CompoundInterestCalculatorProps {
  onFormAnchorClick: () => void;
}

export default function CompoundInterestCalculator({ onFormAnchorClick }: CompoundInterestCalculatorProps) {
  // Inputs
  const [currentDebt, setCurrentDebt] = useState<number>(1000000000); // 1 Tỷ VNĐ
  const [interestRate, setInterestRate] = useState<number>(9.5); // 9.5%
  const [scheduledTermYears, setScheduledTermYears] = useState<number>(20); // 20 Năm
  const [additionalMonthlyPayment, setAdditionalMonthlyPayment] = useState<number>(10000000); // 10 Triệu VNĐ

  // Calculation outputs
  const [result, setResult] = useState<CompoundCalculationResult | null>(null);

  const formatVND = (value: number) => {
    if (value >= 1000000000) {
      return (value / 1000000000).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) + ' Tỷ';
    }
    return (value / 1000000).toLocaleString('vi-VN', { maximumFractionDigits: 0 }) + ' Triệu';
  };

  const formatVNDFull = (value: number) => {
    return value.toLocaleString('vi-VN') + ' đ';
  };

  useEffect(() => {
    const r = interestRate / 100 / 12; // monthly decimal-rate
    const originalN = scheduledTermYears * 12;
    
    // Constant Annuity payment formula (PMT)
    let pmtOriginal = 0;
    if (r > 0) {
      pmtOriginal = (currentDebt * r * Math.pow(1 + r, originalN)) / (Math.pow(1 + r, originalN) - 1);
    } else {
      pmtOriginal = currentDebt / originalN;
    }

    // 1. Original Schedule
    let balanceOriginal = currentDebt;
    let originalTotalInterest = 0;
    for (let month = 1; month <= originalN; month++) {
      const interest = balanceOriginal * r;
      originalTotalInterest += interest;
      const principalPaid = pmtOriginal - interest;
      balanceOriginal -= principalPaid;
      if (balanceOriginal <= 0) break;
    }

    // 2. Schedule with Extra Payment
    let balanceNew = currentDebt;
    let newTotalInterest = 0;
    let newMonthsCount = 0;
    const amortizationSchedule: CompoundCalculationResult['amortizationSchedule'] = [];

    // Run monthly simulation
    for (let month = 1; month <= originalN; month++) {
      if (balanceNew <= 0) break;

      const interest = balanceNew * r;
      newTotalInterest += interest;

      // Base amortization principal payment
      let principalPaid = pmtOriginal - interest;
      if (principalPaid < 0) principalPaid = 0;

      // Deduct regular payment and the EXTRA payload dedicated entirely to principal
      balanceNew -= (principalPaid + additionalMonthlyPayment);
      newMonthsCount = month;

      // Record structural visual points for year boundaries (up to 15 years max for chart visual density)
      if (month % 12 === 0 || balanceNew <= 0) {
        const yearNum = Math.ceil(month / 12);
        
        // Simulating the original parallel path for simple indexing
        let parallelOrigBalance = currentDebt;
        for (let m = 1; m <= month; m++) {
          const interestOrig = parallelOrigBalance * r;
          const princOrig = pmtOriginal - interestOrig;
          parallelOrigBalance -= princOrig;
        }

        amortizationSchedule.push({
          year: yearNum,
          withExtraBalance: Math.max(0, balanceNew),
          withoutExtraBalance: Math.max(0, parallelOrigBalance)
        });
      }

      if (balanceNew <= 0) {
        balanceNew = 0;
        break;
      }
    }

    // Savings Calculation
    const monthsSaved = Math.max(0, originalN - newMonthsCount);
    const yearsSaved = Math.floor(monthsSaved / 12);
    const remainingMonthsSaved = monthsSaved % 12;
    const interestSaved = Math.max(0, originalTotalInterest - newTotalInterest);

    setResult({
      yearsSaved,
      monthsSaved: remainingMonthsSaved,
      interestSaved,
      originalTotalInterest,
      newTotalInterest,
      amortizationSchedule: amortizationSchedule.slice(0, 10) // Limit display rows
    });

  }, [currentDebt, interestRate, scheduledTermYears, additionalMonthlyPayment]);

  return (
    <div id="compound-calculator" className="w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 gold-glow relative">
      <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1.5">
        <FileSpreadsheet className="w-3.5 h-3.5" />
        Bản Demo Lãi Kép Trực Tuyến
      </div>

      <div className="mb-6 max-w-xl">
        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight flex items-center gap-2">
          <span>🎁</span> Công cụ 2: Bảng Tính Lãi Kép & Tất Toán Nợ Sớm
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Bí mật lớn nhất của ngân hàng nằm ở lãi kép chồng dồn. Bằng cách trả thêm một số lượng tiền nhỏ trực tiếp vào nợ gốc mỗi tháng, anh/chị có thể tiết kiệm cả gia tài tiền lãi và cắt ngắn thời hạn vay cực kỳ ngoạn mục.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Sliders Input Panel */}
        <div className="lg:col-span-7 space-y-6 bg-slate-900/40 p-5 md:p-6 rounded-2xl border border-slate-800/80">
          
          {/* CURRENT DEBT */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold text-slate-300">
                Khoản Nợ Gốc Hiện Tại (VNĐ)
              </span>
              <span className="text-sm font-bold text-brand-gold-400 font-mono">
                {formatVND(currentDebt)} đ
              </span>
            </div>
            <input
              type="range"
              min={100000000} // 100 Triệu
              max={5000000000} // 5 Tỷ
              step={100000000} // 100 Triệu
              value={currentDebt}
              onChange={(e) => setCurrentDebt(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>100 Tr</span>
              <span>1.5 Tỷ</span>
              <span>3 Tỷ</span>
              <span>5 Tỷ</span>
            </div>
          </div>

          {/* INTEREST RATE & CURRENT MORTGAGE TERM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Lãi Suất Vay Bình Quân (%/Năm)
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.1"
                  min="3"
                  max="18"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white outline-none font-mono"
                />
                <div className="absolute inset-y-0 right-3 flex items-center text-slate-500 text-xs font-mono">%</div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Thời Hạn Vay Còn Lại Theo Hợp Đồng
              </label>
              <select
                value={scheduledTermYears}
                onChange={(e) => setScheduledTermYears(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white outline-none cursor-pointer"
              >
                <option value="5">5 năm</option>
                <option value="10">10 năm</option>
                <option value="15">15 năm</option>
                <option value="20">20 năm (Mặc định)</option>
                <option value="25">25 năm</option>
                <option value="30">30 năm</option>
              </select>
            </div>
          </div>

          {/* ADDITIONAL MONTHLY PRINCIPAL (THE MAGIC OF EXTRA SAVING PAYMENT) */}
          <div className="border-t border-slate-800/60 pt-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
                💰 Số Tiền Trả Nhẹ Thêm Hàng Tháng (Gửi thẳng vào giảm nợ gốc)
              </span>
              <span className="text-sm font-bold text-emerald-300 font-mono">
                +{formatVND(additionalMonthlyPayment)} đ
              </span>
            </div>
            <input
              type="range"
              min={0}
              max={50000000} // 50 Triệu
              step={1000000} // 1 Triệu
              value={additionalMonthlyPayment}
              onChange={(e) => setAdditionalMonthlyPayment(Number(e.target.value))}
              className="w-full cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>0 đ (Trả định kỳ)</span>
              <span>10 Triệu</span>
              <span>25 Triệu</span>
              <span>50 Triệu</span>
            </div>
            <p className="text-[10px] text-slate-500 mt-2 italic">
              * Đây là số tiền nhàn rỗi anh/chị cân đối gom góp từ thu nhập dư dả mỗi tháng để thực hiện kế hoạch xóa nợ sớm nhằm chặn lãi kép hoành hành.
            </p>
          </div>

        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full gap-5">
          {result && (
            <div className="space-y-4">
              
              {/* SHAVED/SAVED YEARS HERO STATISTICS CARD */}
              <div className="grid grid-cols-2 gap-3">
                
                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center">
                  <Calendar className="w-5 h-5 text-brand-gold-400 mb-1.5 animate-pulse" />
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Rút Ngắn Được</span>
                  <div className="text-lg md:text-xl font-black font-display text-white mt-0.5">
                    {result.yearsSaved > 0 
                      ? `${result.yearsSaved} năm ${result.monthsSaved > 0 ? `${result.monthsSaved} th` : ''}`
                      : `${result.monthsSaved} tháng`
                    }
                  </div>
                  <span className="text-[9px] text-emerald-400 font-mono mt-1 bg-emerald-950/45 px-2 py-0.5 rounded-full">
                    Sớm hơn hẹn định
                  </span>
                </div>

                <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-center">
                  <TrendingUp className="w-5 h-5 text-emerald-400 mb-1.5" />
                  <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider">Tiền Lãi Tiết Kiệm</span>
                  <div className="text-lg md:text-xl font-black font-display text-emerald-400 mt-0.5">
                    {formatVND(result.interestSaved)} đ
                  </div>
                  <span className="text-[9px] text-emerald-300 font-mono mt-1 bg-emerald-950/45 px-2 py-0.5 rounded-full">
                    Không phải trả Bank
                  </span>
                </div>

              </div>

              {/* SIMULATION VISUAL TRAIL TABLE */}
              <div className="p-4 rounded-2xl border border-slate-800 bg-slate-950/80">
                <div className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1">
                  <Zap className="w-3.5 h-3.5 text-brand-gold-400" />
                  Dự báo giảm gốc từng mốc năm (Dò sương mù tài chính):
                </div>
                <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                  {additionalMonthlyPayment === 0 ? (
                    <div className="text-[11px] text-slate-500 py-6 text-center italic">
                      Vui lòng kéo tăng &quot;Số Tiền Trả Nhẹ Hàng Tháng&quot; để quan sát thấy sự chênh lệch xóa nợ thực tế.
                    </div>
                  ) : (
                    result.amortizationSchedule.map((row) => (
                      <div key={row.year} className="flex justify-between items-center text-[11px] py-1 border-b border-slate-900 last:border-0">
                        <span className="text-slate-400 font-semibold font-mono">Cuối Năm {row.year}</span>
                        <div className="flex gap-4 items-center">
                          <span className="text-slate-600 line-through">
                            {formatVND(row.withoutExtraBalance)} đ
                          </span>
                          <span className="text-emerald-400 font-bold font-mono">
                            {row.withExtraBalance === 0 ? "HẾT NỢ! 🎉" : `${formatVND(row.withExtraBalance)} đ`}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* INSIGHT MESSAGE */}
              <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-300 leading-relaxed">
                🚀 <span className="font-semibold text-brand-gold-300">Biện pháp đòn bẩy chống đòn roi:</span> Bảng tính Excel độc quyền sẽ phân tích chuyên sâu cho anh/chị chính xác lịch xả nợ tối ưu đến từng ngày lẻ dựa theo hạn mức vay bất kỳ. Hãy đăng ký Zalo nhận file hoàn chỉnh.
              </div>

              {/* HIGH CONVERT CALL BACK */}
              <div className="pt-1">
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
