/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BookOpen, FileSpreadsheet, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function EbookMockup() {
  return (
    <div className="relative w-full max-w-md mx-auto aspect-square flex items-center justify-center py-6">
      
      {/* Dynamic ambient glowing circles behind the mockup items */}
      <div className="absolute -top-10 -left-10 w-48 h-48 bg-brand-gold-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
      
      {/* Complete mockup wrapper */}
      <div className="relative w-full h-full flex items-center justify-center">

        {/* MOCKUP EXCEL FILE 2 (Lying deep left background) */}
        <div className="absolute left-[5%] bottom-[15%] w-[68%] aspect-[4/3] bg-emerald-950/60 border border-emerald-500/30 rounded-xl p-3 shadow-2xl -rotate-12 transform hover:rotate-0 transition-transform duration-500 scale-95 backdrop-blur-md z-10">
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold border-b border-emerald-500/20 pb-1.5 mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Table_Lãi_Kép_Tất_Toán.xlsx</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 bg-emerald-500/10 rounded w-[85%]"></div>
            <div className="h-2 bg-emerald-500/10 rounded w-[60%]"></div>
            <div className="flex justify-between items-center bg-emerald-500/5 p-1 rounded border border-emerald-500/10 mt-3">
              <span className="text-[8px] text-emerald-300 font-mono">Tiết kiệm:</span>
              <span className="text-[9px] font-bold text-emerald-400 font-mono">~350 Triệu đ</span>
            </div>
          </div>
        </div>

        {/* MOCKUP EXCEL FILE 1 (Lying right background) */}
        <div className="absolute right-[5%] bottom-[20%] w-[68%] aspect-[4/3] bg-slate-900/80 border border-emerald-500/20 rounded-xl p-3 shadow-2xl rotate-6 transform hover:rotate-0 transition-transform duration-500 scale-95 backdrop-blur-md z-20">
          <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-bold border-b border-emerald-500/20 pb-1.5 mb-2">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Table_Tracung_No_NganHang.xlsx</span>
          </div>
          <div className="space-y-1.5">
            <div className="h-2 bg-slate-800 rounded w-[90%]"></div>
            <div className="h-2 bg-slate-800 rounded w-[50%]"></div>
            <div className="flex justify-between items-center bg-slate-950 p-1 rounded border border-slate-800 mt-3">
              <span className="text-[8px] text-rose-500 font-mono">Sốc Lãi Suất:</span>
              <span className="text-[9px] font-bold text-rose-400 font-mono">+12.4 Tr/tháng</span>
            </div>
          </div>
        </div>

        {/* MAIN PRODUCT 3D BOOK COVER (Overlapping the center front stage) */}
        <div className="absolute w-[62%] aspect-[3/4.2] bg-gradient-to-br from-brand-dark-900 to-slate-950 border-2 border-brand-gold-400/30 rounded-2xl shadow-2xl z-30 transform hover:-translate-y-3 duration-500 overflow-hidden flex flex-col justify-between p-4 md:p-5 gold-glow -translate-x-3 -rotate-3 text-left">
          
          {/* Top visual borders & sparkles */}
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-brand-gold-500 via-yellow-400 to-brand-gold-600"></div>
          
          <div className="flex justify-between items-center">
            <div className="text-[8px] font-bold font-mono text-brand-gold-400 border border-brand-gold-400/10 px-1.5 py-0.5 rounded uppercase tracking-widest bg-brand-gold-950/40">
              Ebook_Vip
            </div>
            <Sparkles className="w-3.5 h-3.5 text-brand-gold-400 animate-pulse" />
          </div>

          {/* Core Title Content */}
          <div className="space-y-2 py-4">
            <span className="text-[10px] text-brand-gold-300 font-black uppercase tracking-wider block font-mono">
              ★ TỔNG LƯU HÀNH NỘI BỘ ★
            </span>
            <h4 className="text-sm md:text-base font-display font-black text-white leading-tight uppercase tracking-tight">
              Checklist <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 via-amber-400 to-brand-gold-500 text-lg md:text-xl">
                5 Bước <br /> Sống Còn
              </span> <br />
              Đầu Tư Bất Động Sản!
            </h4>
            <div className="h-0.5 w-12 bg-brand-gold-500/50 my-1"></div>
            <p className="text-[9px] text-slate-400 leading-normal font-sans">
              Bí quyết an toàn vượt giông quy hoạch, kiểm soát dòng tiền, chống nợ sụp đổ.
            </p>
          </div>

          {/* Book Spine highlight overlay */}
          <div className="absolute left-0 top-0 bottom-0 w-2.5 bg-gradient-to-r from-white/10 via-black/20 to-transparent border-r border-white/5"></div>

          {/* Bottom Badge or Logo info */}
          <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[8px] font-mono text-slate-400">
            <div>
              <div className="text-[8px] font-bold text-white uppercase">TÁC GIẢ & CỐ VẤN</div>
              <div className="text-brand-gold-400 font-semibold font-sans mt-0.5">Nguyễn Nam BĐS</div>
            </div>
            <div className="shrink-0 bg-brand-gold-600 text-black px-1.5 py-0.5 rounded font-black text-[7px]">
              FREE
            </div>
          </div>

        </div>

        {/* Small floating counter on front stage */}
        <div className="absolute right-[4%] bottom-[12%] bg-brand-dark-950 border border-brand-gold-400/20 text-slate-200 px-3 py-1.5 rounded-xl flex items-center gap-1 z-40 shadow-xl text-[10px] gold-glow font-semibold select-none">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span>Đã gửi Zalo cho 1,420+ người</span>
        </div>

      </div>

    </div>
  );
}
