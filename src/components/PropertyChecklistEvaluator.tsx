/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldAlert, CheckCircle2, AlertTriangle, PlayCircle, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { ChecklistCriterion, PropertyScoreResult } from '../types';

interface PropertyChecklistEvaluatorProps {
  onFormAnchorClick: () => void;
}

export default function PropertyChecklistEvaluator({ onFormAnchorClick }: PropertyChecklistEvaluatorProps) {
  // Criteria database inside the Ebook
  const initialCriteria: ChecklistCriterion[] = [
    {
      id: 'step1',
      step: 1,
      title: "Chuẩn bị đường lui (Chống trọc phú kẹt hạ tầng)",
      question: "Nếu hạ tầng dự kiến (đường, cầu, sân bay...) bị chậm tiến độ 3-5 năm, gia đình anh/chị có đủ dòng tiền gồng gánh lãi suất và sinh hoạt bình thường không?",
      score: 5,
      description: "Đánh giá mức độ kẹt vốn nếu hạ tầng quy hoạch đắp chiếu dài hạn."
    },
    {
      id: 'step2',
      step: 2,
      title: "Bộ lọc độ tin cậy của Chủ Đầu Tư",
      question: "Anh/chị đã thẩm định thực tế ít nhất 3 dự án cũ của CĐT này để đánh giá tốc độ ra sổ hồng, chất lượng quản lý bàn giao, hay chỉ tin vào cam kết lời hứa?",
      score: 5,
      description: "Đánh giá uy tín thực chứng, tránh mua bánh vẽ."
    },
    {
      id: 'step3',
      step: 3,
      title: "Khảo sát thực địa vạch sa bàn",
      question: "Đã trực tiếp đến tận hiện trường xem đất ban ngày & ban đêm, ghi lại mật độ dân cư thực tế, thay vì nghe nhạc du dương ngắm sa bàn máy lạnh ở phòng bán hàng?",
      score: 5,
      description: "Thẩm định độ ấm thị trường thực tế."
    },
    {
      id: 'step4',
      step: 4,
      title: "Bài toán khai thác dòng tiền phòng thủ",
      question: "Nếu mua xong không tăng giá ngay, tài sản này có thể cho thuê tạo ra dòng tiền ròng tối thiểu 3% - 4% một năm, hay phải bỏ hoang cỏ mọc um tùm?",
      score: 5,
      description: "Đánh giá tỷ lệ tự khai thác dòng tiền giữ vốn."
    },
    {
      id: 'step5',
      step: 5,
      title: "Quản trị rủi ro gác lãi suất thả nổi",
      question: "Đã có sẵn một quỹ khẩn cấp tương đương 12-24 tháng tiền gốc + lãi để phòng vệ khi ngân hàng thả nổi lãi suất kịch trần hay thị trường bị đóng băng?",
      score: 5,
      description: "Đánh giá chiếc phao cứu sinh dòng tiền vay mượn."
    }
  ];

  const [criteria, setCriteria] = useState<ChecklistCriterion[]>(initialCriteria);
  const [result, setResult] = useState<PropertyScoreResult | null>(null);

  const handleScoreChange = (id: string, newScore: number) => {
    setCriteria(prev => prev.map(c => c.id === id ? { ...c, score: newScore } : c));
  };

  useEffect(() => {
    const totalScore = criteria.reduce((sum, item) => sum + item.score, 0);
    const maxScore = criteria.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let status: PropertyScoreResult['status'] = 'NGUY_CO_CHON_VON';
    let message = '';

    if (percentage >= 80) {
      status = 'DAT_CHUAN_AN_TOAN';
      message = '🎉 CHÚC MỪNG: Dự án đạt chuẩn an toàn cao! Đây là một cơ hội đầu tư có chỉ số phòng vệ cực kỳ vững chắc. Lộ trình pháp lý, năng lực CĐT, và tính hữu dụng thực địa đều ổn định. Anh/chị hoàn toàn có thể cân nhắc giải ngân theo giai đoạn giãn dòng tiền.';
    } else if (percentage >= 50) {
      status = 'CAN_DE_PHONG';
      message = '⚠️ CẢNH BÁO: Dự án nằm ở vùng xám nhạy cảm! Có rủi ro tiềm ẩn ở ít nhất 2 bước trong checklist. Mua sớm lúc này có thể gặp sương mù quy hoạch, hạ tầng chậm trễ hoặc dòng tiền khi hết ưu đãi lãi suất sẽ bóp nghẹt thu nhập gia đình. Hãy nghiên cứu kỹ phương án kịch bản phòng ngự.';
    } else {
      status = 'NGUY_CO_CHON_VON';
      message = '🚨 NGUY HIỂM: Rủi ro chôn vốn cực kỳ cao! Các chỉ số bảo vệ gần như bằng không. Đầu tư tài sản này lúc này chẳng khác nào đánh bạc với dòng tiền của gia đình. Đề xuất anh/chị xem xét dừng giao dịch ngay lập tức để rà soát dòng tiền phòng thủ.';
    }

    setResult({
      totalScore,
      maxScore,
      percentage,
      status,
      message
    });
  }, [criteria]);

  return (
    <div id="property-evaluator" className="w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 gold-glow">
      <div className="mb-6">
        <span className="text-xs text-brand-gold-300 font-bold uppercase tracking-widest bg-brand-gold-950 px-3 py-1 rounded-full border border-brand-gold-500/20">
          🔥 Thử nghiệm nhanh trước khi xuống tiền
        </span>
        <h3 className="text-xl md:text-2xl font-display font-bold text-white tracking-tight mt-3">
          📋 Công cụ 3: Chấm Điểm Thẩm Định Bất Động Sản (Reviewer)
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
          Hãy chấm thử điểm tài sản anh/chị đang nhắm tới dựa trên 5 chiều kích sinh tồn của cuốn Ebook. Kéo các thanh điểm dưới đây từ 0 (Hoàn toàn bỏ ngỏ) đến 10 (Hoàn toàn vững chắc).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        {/* Rating questions */}
        <div className="lg:col-span-7 space-y-5">
          {criteria.map((item) => (
            <div key={item.id} className="p-4 rounded-xl border border-slate-800/80 bg-slate-900/30 space-y-2 hover:border-slate-800 transition-colors">
              <div className="flex justify-between items-start gap-3">
                <div className="text-xs font-bold text-slate-200">
                  <span className="text-brand-gold-400 font-mono text-xs font-black mr-1 bg-brand-gold-950 px-2 py-0.5 rounded border border-brand-gold-400/20">
                    Bước {item.step}
                  </span>
                  {item.title}
                </div>
                <span className="text-xs font-black font-mono text-brand-gold-400 shrink-0 bg-slate-950 px-2 py-1 rounded">
                  {item.score}/10 Điểm
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-sans">{item.question}</p>
              
              <div className="pt-2 flex items-center gap-4">
                <span className="text-[10px] text-rose-500 font-semibold uppercase font-mono">Bất an (0)</span>
                <input
                  type="range"
                  min="0"
                  max="10"
                  step="1"
                  value={item.score}
                  onChange={(e) => handleScoreChange(item.id, Number(e.target.value))}
                  className="w-full cursor-pointer h-1.5 bg-slate-800 rounded-lg appearance-none"
                />
                <span className="text-[10px] text-emerald-500 font-semibold uppercase font-mono">Vững chắc (10)</span>
              </div>
            </div>
          ))}
        </div>

        {/* Live Diagnostics Card */}
        <div className="lg:col-span-5 flex flex-col justify-between p-6 bg-slate-950 border border-slate-800/80 rounded-2xl h-full shadow-inner relative overflow-hidden">
          <div className="absolute top-0 right-0 left-0 h-1.5 bg-gradient-to-r from-brand-gold-400 to-amber-700"></div>

          {result && (
            <div className="space-y-4">
              <div className="text-center pb-4 border-b border-slate-900">
                <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">ĐIỂM SỐ KHẢ DỤNG</div>
                <div className="text-3xl md:text-4xl font-black font-display text-white mt-1">
                  {result.totalScore} <span className="text-lg text-slate-500">/ {result.maxScore}</span>
                </div>
                <div className="text-xs text-brand-gold-400 font-mono mt-0.5 font-bold">
                  (Độ an toàn: {result.percentage.toFixed(0)}%)
                </div>
              </div>

              {/* Status Graphic & Diagnosis text */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  {result.status === 'DAT_CHUAN_AN_TOAN' && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-full">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>ĐẠT CHUẨN ĐẦU TƯ AN TOÀN</span>
                    </div>
                  )}

                  {result.status === 'CAN_DE_PHONG' && (
                    <div className="bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-full">
                      <AlertTriangle className="w-4 h-4" />
                      <span>CẦN ĐỀ PHÒNG SƯƠNG MÙ</span>
                    </div>
                  )}

                  {result.status === 'NGUY_CO_CHON_VON' && (
                    <div className="bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 w-full">
                      <ShieldAlert className="w-4 h-4 animate-bounce" />
                      <span>NGUY CƠ CHÔN VỐN CỰC CAO</span>
                    </div>
                  )}
                </div>

                <p className="text-[11px] text-slate-300 leading-relaxed font-sans p-3 bg-slate-900 rounded-lg">
                  {result.message}
                </p>
              </div>

              <div className="bg-brand-gold-950/20 border border-brand-gold-500/20 p-3.5 rounded-xl text-center space-y-2">
                <div className="text-xs font-bold text-brand-gold-300 flex items-center justify-center gap-1">
                  <BookOpen className="w-3.5 h-3.5 text-brand-gold-400" />
                  Bạn muốn mở khóa đáp án chi tiết?
                </div>
                <p className="text-[10px] text-slate-400 leading-normal">
                  Nhập thông tin Zalo để tải chi tiết <span className="text-white font-semibold">"Khung Chấm Điểm Thẩm Định Hiện Trường"</span>, giúp ghi chép trực quan tại thực địa và đối chiếu cảnh báo tức thì.
                </p>
              </div>

              {/* Call to action anchor button */}
              <button
                onClick={onFormAnchorClick}
                className="w-full bg-gradient-to-r from-brand-gold-500 to-brand-gold-600 hover:from-brand-gold-400 hover:to-brand-gold-500 text-black font-bold py-3 px-4 rounded-xl text-xs uppercase cursor-pointer transition-all tracking-wider text-center flex items-center justify-center gap-1.5"
              >
                👉 Nhận Khung Chấm Điểm Qua Zalo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
