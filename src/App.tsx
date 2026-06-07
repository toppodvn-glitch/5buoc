/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { 
  BookOpen, 
  FileSpreadsheet, 
  Gift, 
  User, 
  ShieldAlert, 
  HeartHandshake, 
  CheckCircle2, 
  ArrowRight, 
  Check, 
  HelpCircle, 
  Lock, 
  Award, 
  Star 
} from 'lucide-react';
import EbookMockup from './components/EbookMockup';
import LeadCaptureForm from './components/LeadCaptureForm';
import TácGiảCard from './components/TácGiảCard';
import LeadManagementPanel from './components/LeadManagementPanel';

export default function App() {
  const [showThankYou, setShowThankYou] = React.useState(false);

  // Function to scroll smoothly to the primary form anchoring point
  const scrollToForm = () => {
    const target = document.getElementById('lead-capture-hero_form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  if (showThankYou) {
    return (
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans select-text">
        <main className="flex-grow flex flex-col items-center py-6 md:py-8 px-4">
          <div className="max-w-7xl w-full text-center space-y-6 md:space-y-8">
            <div className="space-y-2">
              <h1 className="text-5xl md:text-7xl font-black text-[#E11D48] tracking-tighter uppercase leading-none">ĐÃ GỬI EMAIL!</h1>
              <p className="text-lg md:text-xl text-gray-500 font-bold italic">Hãy làm theo hướng dẫn bên dưới</p>
            </div>

            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 items-stretch">
                <div className="flex flex-col group h-full">
                  <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col">
                    <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                      <img alt="Check Inbox" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" src="https://i.postimg.cc/GmP1Y4KN/Bu_o_c_1.png" referrerPolicy="no-referrer" />
                    </div>
                    <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                      <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl">Kiểm tra hộp thư <span className="text-[#E11D48]">Inbox (Chính)</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col group h-full">
                  <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col">
                    <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                      <img alt="Check Promotions" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" src="https://i.postimg.cc/XYK0FrLt/Bu_o_c_2.png" referrerPolicy="no-referrer" />
                    </div>
                    <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                      <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl">Kiểm tra tab <span className="text-[#E11D48]">Thư rác (Spam)</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col group h-full">
                  <div className="bg-white rounded-[2rem] p-2 md:p-3 w-full h-full border border-gray-100 shadow-xl hover:shadow-red-50 transition-all duration-300 flex flex-col border-b-[8px] border-b-red-500">
                    <div className="rounded-[1.5rem] overflow-hidden mb-3 flex items-center justify-center bg-gray-50 aspect-[4/5] w-full shadow-inner">
                      <img alt="Check Spam" className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700" src="https://i.postimg.cc/wvh1tXMV/Bu-o_c_3-new.png" referrerPolicy="no-referrer" />
                    </div>
                    <div className="mt-auto px-2 mb-4 min-h-[50px] flex items-center justify-center text-center">
                      <p className="text-gray-900 font-extrabold leading-tight text-lg md:text-xl uppercase">BẤM <span className="text-[#E11D48]">"NOT SPAM"</span> ĐỂ NHẬN TÀI LIỆU</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mx-auto w-full space-y-4">
              <div className="bg-white border border-blue-50 rounded-[2rem] shadow-lg overflow-hidden text-left">
                <div className="p-6 md:p-8 space-y-6">
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">1</div>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed pt-1">Kiểm tra hộp thư <span className="font-bold text-gray-900">Inbox (Hộp thư đến)</span> hoặc tab <span className="font-bold text-gray-900">Promotions (Quảng cáo)</span>.</p>
                  </div>
                  <div className="h-px bg-gray-50 w-full"></div>
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">2</div>
                    <p className="text-gray-700 text-lg md:text-xl leading-relaxed pt-1">Nếu không thấy, vui lòng kiểm tra mục <span className="font-bold text-gray-900">Spam (Thư rác)</span>.</p>
                  </div>
                  <div className="h-px bg-gray-50 w-full"></div>
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="w-10 h-10 rounded-full bg-[#F43F5E] text-white flex items-center justify-center font-bold text-xl flex-shrink-0 shadow-md">3</div>
                    <div className="space-y-2 pt-1">
                      <p className="text-[#F43F5E] font-black text-xl md:text-2xl uppercase tracking-tight">QUAN TRỌNG:</p>
                      <p className="text-gray-700 text-lg md:text-xl leading-relaxed">Nếu mail nằm trong Spam, hãy bấm nút <span className="font-bold text-gray-900">"Report not spam"</span> để đảm bảo bạn nhận được tài liệu từ Nguyễn Nam.</p>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-gray-400 text-base md:text-lg italic font-bold text-center">* Email tự động có thể mất 30s để đến hộp thư của bạn.</p>
            </div>

            <div className="pt-4 flex flex-col items-center gap-4">
              <button
                onClick={() => {
                  setShowThankYou(false);
                  window.scrollTo({ top: 0, behavior: 'instant' });
                }}
                className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-600 transition-colors font-bold text-xl cursor-pointer hover:underline"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left w-6 h-6"><path d="m12 19-7-7 7-7"></path><path d="M19 12H5"></path></svg>Quay lại trang chính
              </button>
              <div className="flex items-center gap-2 text-[12px] text-gray-300 font-bold uppercase tracking-[0.4em]">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-shield-check w-5 h-5"><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path><path d="m9 12 2 2 4-4"></path></svg>BẢO MẬT &amp; HỖ TRỢ 24/7
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d0f12] text-slate-100 flex flex-col font-sans select-text">
      
      {/* HEADER BAR */}
      <header className="sticky top-0 z-50 bg-[#0d0f12]/80 backdrop-blur-md border-b border-slate-900/60 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo Brand Title */}
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-gold-500 to-amber-700 flex items-center justify-center text-sm font-black text-black">
              NN
            </span>
            <div>
              <div className="text-xs font-black font-display text-white uppercase tracking-wider">Nguyen Nam BĐS</div>
              <div className="text-[9px] text-brand-gold-400 font-mono">Thành Phát Land • Tư vấn tận tâm</div>
            </div>
          </div>

          {/* Hot CTA Button Header */}
          <button
            onClick={scrollToForm}
            className="text-[10px] md:text-xs font-bold text-black bg-gradient-to-r from-brand-gold-400 to-brand-gold-500 hover:from-brand-gold-300 hover:to-brand-gold-400 py-1.5 px-3 md:px-4 rounded-full transition-all cursor-pointer shadow-md focus:outline-none"
          >
            👉 Tải Bản Ebook Miễn Phí
          </button>
        </div>
      </header>

      {/* DETAILED CONTENT LAYOUT */}
      <main className="flex-grow space-y-20 pb-16">

        {/* =========================================================
            PHẦN 1: HERO SECTION - MÀN HÌNH ĐẦU TIÊN KHI TRUY CẬP 
            ========================================================= */}
        <section className="relative overflow-hidden pt-12 md:pt-16 pb-6 border-b border-slate-900/40">
          
          {/* Elegant ambient light flare in background coordinates */}
          <div className="absolute top-[10%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-brand-gold-500/10 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* LEFT SIDE: Visual mockups (Ebook + 2 Excel files) */}
              <div className="lg:col-span-5 text-center order-2 lg:order-1">
                <EbookMockup />
                <p className="text-[11px] text-slate-500 mt-2 font-mono">
                  * Trọn bộ gồm 1 Ebook hướng dẫn thực địa + 2 File tính năng Excel dòng tiền ngân hàng và lãi kép chuyên sâu.
                </p>
              </div>

              {/* RIGHT SIDE: Headlines and lead-collection form */}
              <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
                
                {/* H1 Headline - Bold and elegant */}
                <h1 className="text-3xl md:text-4xl xl:text-5xl font-display font-black text-white tracking-tight leading-tight uppercase">
                  Mua Sớm Hay Chờ <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold-300 via-brand-gold-400 to-brand-gold-500">Hạ Tầng Xong?</span> <br />
                  Đừng Xuống Tiền Nếu Chưa Đọc Checklist Này!
                </h1>

                {/* H2 Subheadline */}
                <h2 className="text-sm md:text-base leading-relaxed text-slate-300 border-l-4 border-brand-gold-500 pl-4 py-1">
                  Bộ tài liệu <strong className="text-white">&quot;5 Bước Sống Còn&quot;</strong> giúp anh/chị tránh mua theo cảm xúc, chống &quot;chôn vốn&quot; và không bao giờ bị gãy dòng tiền khi đầu tư Bất Động Sản.
                </h2>

                {/* Quick high conversion visual bullet badges */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">Gửi tự động ngay lập tức</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">Thẩm định thực chiến</span>
                  </div>
                  <div className="flex items-center gap-2 bg-slate-900/50 p-2 rounded-lg border border-slate-800/60">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-300">Biểu mẫu miễn phí 100%</span>
                  </div>
                </div>

                {/* Primary lead generation capture form */}
                <div className="pt-4">
                  <LeadCaptureForm 
                    source="hero_form" 
                    title="ĐĂNG KÝ NHẬN EBOOK & FILE EXCEL MIỄN PHÍ NGAY"
                    subtitle="Hệ thống tự động gửi tài liệu qua Email ngay lập tức"
                    buttonText="Nhận miễn phí ngay"
                    onSuccess={() => setShowThankYou(true)}
                  />
                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =========================================================
            PHẦN 2: NỖI ĐAU CỦA KHÁCH HÀNG - TẠI SAO HỌ CẦN TÀI LIỆU NÀY?
            ========================================================= */}
        <section className="bg-brand-dark-900/90 border-y border-slate-900/60 py-16 relative">
          <div className="absolute top-0 right-10 w-96 h-96 bg-red-900/5 rounded-full blur-[100px] -z-10"></div>
          
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-8">
            
            {/* Header statement */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-widest bg-rose-950/40 px-3 py-1 rounded-full border border-rose-500/20">
                ⚠️ Ranh giới mong manh giữa cơ hội và sạt nghiệp
              </span>
              <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-snug">
                Ranh giới giữa &quot;Đón sóng hạ tầng&quot; và &quot;Bị chôn vốn&quot; vô cùng mong manh!
              </h3>
            </div>

            <p className="text-xs md:text-sm text-slate-300 leading-relaxed text-left md:text-center max-w-2xl mx-auto">
              Anh/chị đang đứng trước một cơ hội đầu tư hấp dẫn quanh các khu vực sắp triển khai đường vành đai, xây cầu, hoặc sân bay? Mua sớm thì được giá tốt, nhưng hãy cảnh giác trước những cạm bẫy tiềm bàng...
            </p>

            {/* Pain point detailed block bullet grid with high visual precision */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left pt-4">
              
              {/* Pain Point 1 */}
              <div className="p-5 bg-slate-950 border-2 border-red-950 rounded-2xl space-y-4 shadow-lg hover:border-red-900/40 transition-colors">
                <div className="w-10 h-10 bg-rose-950/60 border border-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                  01
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  Sợ hạ tầng chậm tiến độ, dự án đắp chiếu biến thành bãi chăn trâu. Tiền thì kẹt cứng mà lãi gốc ngân hàng vẫn phải oằn lưng gánh xiết nợ mỗi tháng?
                </p>
              </div>

              {/* Pain Point 2 */}
              <div className="p-5 bg-slate-950 border-2 border-red-950 rounded-2xl space-y-4 shadow-lg hover:border-red-900/40 transition-colors">
                <div className="w-10 h-10 bg-rose-950/60 border border-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                  02
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  Lo lắng chốt mua nhầm dự án &quot;bánh vẽ&quot;, chủ đầu tư cam kết lợi nhuận trên giấy tờ hào nhoáng nhưng bàn giao nhà chậm vô kì hạn, pháp lý rủi ro?
                </p>
              </div>

              {/* Pain Point 3 */}
              <div className="p-5 bg-slate-950 border-2 border-red-950 rounded-2xl space-y-4 shadow-lg hover:border-red-900/40 transition-colors">
                <div className="w-10 h-10 bg-rose-950/60 border border-rose-500/20 rounded-full flex items-center justify-center text-rose-400 text-sm font-bold">
                  03
                </div>
                <p className="text-xs text-slate-200 leading-relaxed font-semibold">
                  Mù mờ hoàn toàn về công thức dòng tiền? Không biết tính toán cụ thể dòng tiền dự phòng an toàn khi hết thời hạn ưu đãi lãi suất, rơi thẳng vào bẫy thả nổi?
                </p>
              </div>

            </div>

            <div className="p-5 bg-amber-950/20 border border-amber-500/20 rounded-2xl max-w-xl mx-auto flex items-center gap-3 text-left">
              <ShieldAlert className="w-6 h-6 text-amber-400 shrink-0" />
              <p className="text-xs text-amber-300 leading-normal font-sans">
                Đó chính là nguyên nhân tiên quyết anh/chị <strong>bắt buộc phải có kịch bản và bộ khung thẩm định tài chính thực địa</strong> trước khi xuống tiền đặt cọc cho bất kỳ tài sản nào!
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            PHẦN 3: GIẢI PHÁP - KHÁCH HÀNG NHẬN ĐƯỢC GÌ? (CHECKLIST BƯỚC)
            ========================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-4 mb-12">
            <span className="text-xs font-bold text-brand-gold-300 font-mono bg-brand-gold-950 px-3 py-1 rounded-full border border-brand-gold-500/10">
              💎 Nội dung tinh tuyển thực tế
            </span>
            <h3 className="text-2xl md:text-3xl font-display font-black text-white tracking-tight leading-snug">
              Bên Trong Cuốn Ebook &quot;Checklist 5 Bước Sống Còn&quot; Này Có Gì?
            </h3>
            <p className="text-xs md:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
              Tài liệu được thiết kế cô đọng, thực chiến cao, giúp anh/chị có thể bỏ túi - mang theo đọc và đối chiếu trực tiếp khi xem đất đai tại hiện trường:
            </p>
          </div>

          <div className="space-y-4">
            
            {/* Step 1 */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-brand-gold-500/20 transition-all flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm font-mono mt-0.5">
                ✅
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  Bước 1: Chuẩn bị &quot;đường lui&quot; an toàn
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Xây dựng kịch bản tài chính sinh tồn để giữ tài sản an toàn, không bị áp lực bán tháo cắt lỗ nếu hạ tầng quy hoạch bị chậm trễ từ 2-3 năm.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-brand-gold-500/20 transition-all flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm font-mono mt-0.5">
                ✅
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  Bước 2: Bộ lọc uy tín Chủ Đầu Tư thực chiến
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Bí quyết điều tra lịch sử pháp lý và bàn giao dự án cũ của CĐT, phân tích rủi ro bẫy cam kết lợi nhuận bánh vẽ của thị trường.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-brand-gold-500/20 transition-all flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm font-mono mt-0.5">
                ✅
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  Bước 3: Phương pháp Khảo sát thực địa thông minh
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Cách bóc tách các điểm bất lợi trên khu đất thực tế, chấm dứt việc bị mê hoặc bởi hệ thống sa bàn hào nhoáng hay phối cảnh 3D không thực tế.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-brand-gold-500/20 transition-all flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm font-mono mt-0.5">
                ✅
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  Bước 4: Bài toán dòng tiền phòng thủ tối ưu
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Công thức quản trị dòng tiền để bất động sản tự sinh hoạt bền bỉ &quot;tự nuôi&quot; được chính nó trong giai đoạn đợi sóng tăng chu kỳ từ hạ tầng.
                </p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="p-5 bg-slate-900/40 border border-slate-800 rounded-2xl hover:border-brand-gold-500/20 transition-all flex gap-4 items-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-sm font-mono mt-0.5">
                ✅
              </div>
              <div>
                <h4 className="text-sm md:text-base font-bold text-white uppercase tracking-wide">
                  Bước 5: Quản trị khoản vay dốc ngân hàng
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed mt-1">
                  Bức tranh tổng quan ngân nợ khi hết thời gian ưu đãi lãi suất, đo đếm ngưỡng gánh vác nợ tránh để xảy ra tình trạng bán tống bán tháo rủi ro.
                </p>
              </div>
            </div>

          </div>

          <div className="mt-8 bg-brand-gold-950/20 border border-brand-gold-500/30 p-4 rounded-2xl text-center">
            <span className="text-xs text-brand-gold-300 font-bold block">
              🌟 ĐẶC BIỆT KÈM THEO: Danh sách 10 dấu hiệu cảnh báo &quot;quay xe&quot; lập tức & Bảng chấm điểm quyết định mua ngay tại hiện trường.
            </span>
          </div>
        </section>

        {/* =========================================================
            PHẦN 4: QUÀ TẶNG BONUS (TẠO TÍNH KHAN HIẾM & GIÁ TRỊ)
            ========================================================= */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="bg-gradient-to-br from-brand-dark-800 to-slate-950 border-2 border-brand-gold-400/40 rounded-3xl p-6 md:p-8 relative overflow-hidden gold-glow">
            
            {/* Corner glowing pattern */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-brand-gold-500/20 rounded-full blur-2xl"></div>
            
            <div className="flex flex-col md:flex-row gap-6 md:items-center">
              
              <div className="w-16 h-16 bg-brand-gold-500/10 border border-brand-gold-500/20 text-brand-gold-300 rounded-2xl flex items-center justify-center shrink-0 mx-auto md:mx-0">
                <Gift className="w-8 h-8 text-brand-gold-400" />
              </div>

              <div className="space-y-2 text-center md:text-left flex-grow">
                <div className="text-[11px] font-bold text-amber-400 uppercase tracking-wider font-mono">
                  🎁 ƯU ĐÃI ĐẶC QUYỀN KHAN HIẾM
                </div>
                <h4 className="text-lg md:text-xl font-display font-black text-white tracking-tight">
                  QUÀ TẶNG KÈM ĐỘC QUYỀN CHỈ DÀNH CHO NGƯỜI ĐĂNG KÝ HÔM NAY:
                </h4>
                <p className="text-xs text-slate-300 leading-normal">
                  Ngoài Ebook, em sẽ gửi trực tiếp qua số Zalo của anh/chị 2 công cụ tính toán kinh tế Excel mạnh mẽ:
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 border-t border-slate-800/80 pt-6">
              
              {/* Excel bonus 1 */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 flex gap-3.5 items-start">
                <FileSpreadsheet className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-tight">
                    1. Bảng tính lịch trả nợ ngân hàng (Excel)
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Tự động tính chênh lệch số gốc và lãi phải trả hàng tháng trước và sau khi thả nổi. Nhận diện ngay khoản vay có nằm ngoài tầm kiểm toán trước khi quá muộn!
                  </p>
                </div>
              </div>

              {/* Excel bonus 2 */}
              <div className="bg-slate-950/80 p-4 rounded-2xl border border-slate-900 flex gap-3.5 items-start">
                <FileSpreadsheet className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h5 className="text-xs font-bold text-white uppercase tracking-tight">
                    2. Bảng tính lãi kép tích lũy tất toán nợ sớm
                  </h5>
                  <p className="text-[11px] text-slate-400 leading-relaxed mt-1">
                    Tự thiết lập kịch bản dòng tiền nhàn rỗi nhỏ hàng tháng gối trực tiếp nợ gốc để bóp nghẹt lãi kép, bôi trơn kế hoạch tất nợ gốc ngân hàng sớm nhất.
                  </p>
                </div>
              </div>

            </div>

            {/* Simulated scarcity tag */}
            <div className="text-center mt-6 text-[11px] text-slate-500 font-mono italic">
              * Tải miễn phí giới hạn hôm nay trước khi hệ thống chuyển sang dạng trả phí cố vấn.
            </div>

          </div>
        </section>


        {/* =========================================================
            PHẦN 5: THÔNG ĐIỆP TỪ NGƯỜI TẶNG - XÂY DỰNG NHÂN HIỆU (ANH NAM)
            ========================================================= */}
        <section className="max-w-5xl mx-auto px-4 sm:px-6">
          <TácGiảCard />
        </section>


        {/* =========================================================
            PHẦN 6: FORM THU THẬP DATA TIỂU BIỂU & CHÂN TRANG
            ========================================================= */}
        <section id="form-data-footer" className="max-w-xl mx-auto px-4 sm:px-6">
          <div className="text-center space-y-3 mb-6">
            <h3 className="text-xl md:text-2xl font-display font-black text-white tracking-tight">
              Sở Hữu Trọn Bộ Tài Liệu Thực Chiến Ngay!
            </h3>
            <p className="text-xs text-slate-400">
              Nhập chính xác Email của anh/chị để hệ thống tự động gửi file PDF chất lượng cao cùng 2 bảng tính Excel.
            </p>
          </div>

          <LeadCaptureForm 
            source="bonus_form"
            title="ĐĂNG KÝ NHẬN NHANH QUÀ TẶNG BẢN ĐẶC QUYỀN"
            subtitle="Định dạng file chất lượng cao gửi lập tức qua hòm thư điện tử"
            buttonText="Nhận miễn phí ngay"
            onSuccess={() => setShowThankYou(true)}
          />
        </section>

        {/* ADMIN MANAGEMENT PANEL COLLAPSED BY DEFAULT */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <LeadManagementPanel />
        </section>

      </main>

      {/* FOOTER AREA */}
      <footer className="bg-slate-950 border-t border-slate-900 py-12 text-xs text-slate-500 font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-slate-300 font-display">Nguyễn Nam BĐS - Giám Đốc Kinh Doanh Thành Phát Land</h4>
              <p className="text-slate-500 max-w-md leading-relaxed">
                Tư vấn tận tâm - Đầu tư an toàn. Chúng tôi đồng hành bảo vệ toàn vẹn lợi ích tài chính và sinh hoạt bền vững cho nhà đầu tư Việt Nam.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-slate-400 font-semibold font-mono">
              <a href="https://nambds.vn/" target="_blank" rel="noreferrer" className="hover:text-brand-gold-300 transition-colors">Trang Chủ</a>
              <span className="text-slate-800">•</span>
              <a href="https://youtube.com/@nguyennambdstuyendung?si=AAwDKLGxxYzugdjY" target="_blank" rel="noreferrer" className="hover:text-brand-gold-300 transition-colors">Youtube</a>
              <span className="text-slate-800">•</span>
              <a href="https://www.tiktok.com/@namtuyendung?_r=1&_t=ZS-93Q3PmFDmbM" target="_blank" rel="noreferrer" className="hover:text-brand-gold-300 transition-colors">TikTok</a>
              <span className="text-slate-800">•</span>
              <a href="https://www.facebook.com/share/1ECmmf8ipx/?mibextid=wwXIfr" target="_blank" rel="noreferrer" className="hover:text-brand-gold-300 transition-colors">Facebook</a>
            </div>

          </div>

          <div className="pt-6 border-t border-slate-900 space-y-3 leading-relaxed text-slate-500">
            <p>
              Tài liệu mang tính chất tham khảo thực chiến cao, giúp anh/chị trang bị một trục khung tư duy chuẩn xác tại thực tế hiện trường trước khi thực hiện giao dịch bất động sản có rủi ro lớn. Chúng tôi không thu bất kỳ khoản tổn phí tham khảo nào của quý khách đầu tư.
            </p>
            <div className="flex flex-col sm:flex-row justify-between gap-2 text-[11px] text-slate-600 font-mono">
              <p>© 2026 Nguyễn Nam BĐS • Thành Phát Land. All Rights Reserved.</p>
              <div className="flex items-center gap-1.5 justify-end">
                <Lock className="w-3.5 h-3.5" />
                <span>Mã hóa SSL bảo mật đầu cuối</span>
              </div>
            </div>
          </div>

        </div>
      </footer>

    </div>
  );
}
