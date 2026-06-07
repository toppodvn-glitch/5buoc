/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Award, Shield, CheckCircle, Youtube, Globe, Facebook, MessageCircle, ExternalLink } from 'lucide-react';

export default function TácGiảCard() {
  return (
    <div id="author-section" className="w-full glass-panel border border-slate-800 rounded-3xl p-6 md:p-8 gold-glow relative overflow-hidden">
      {/* Visual glowing backing */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold-500/5 rounded-full blur-3xl -z-10"></div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        
        {/* Avatar Area - Premium Real Image Portrait Card */}
        <div className="md:col-span-4 flex flex-col items-center">
          <div className="relative group">
            {/* Pulsating glowing outline */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-gold-500 to-amber-600 rounded-2xl blur opacity-35 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative w-48 h-56 rounded-2xl bg-slate-950 border border-brand-gold-400/30 overflow-hidden flex flex-col justify-end p-4 text-center">
              {/* Profile Image with high quality crop representation */}
              <img 
                src="https://i.postimg.cc/vHP9H9t7/nambds.jpg" 
                alt="Nguyễn Nam BĐS" 
                className="absolute inset-0 w-full h-full object-cover object-scale-down transform transition duration-500 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Dynamic elegant overlay for text readability */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/25 to-transparent"></div>
              
              <div className="relative z-10 bg-slate-950/90 backdrop-blur-sm p-2 rounded-xl border border-white/5">
                <h4 className="text-xs font-black font-display text-white tracking-wide uppercase">Nguyễn Nam BĐS</h4>
                <p className="text-[9px] text-brand-gold-400 font-mono mt-0.5">Giám Đốc Kinh Doanh</p>
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-col items-center text-center space-y-1">
            <span className="text-[10px] uppercase font-mono text-slate-500">Thành Phát Land</span>
            <div className="flex items-center gap-1.5 text-xs text-brand-gold-300 font-semibold bg-brand-gold-950/50 px-3 py-1 rounded-full border border-brand-gold-500/20">
              <Award className="w-3.5 h-3.5" />
              <span>8+ Năm Thực Chiến</span>
            </div>
          </div>
        </div>

        {/* Narrative bio content block */}
        <div className="md:col-span-8 space-y-5">
          <div className="space-y-2">
            <h3 className="text-2xl font-display font-black text-white tracking-tight">
              Nguyễn Nam BĐS
            </h3>
            <p className="text-xs text-brand-gold-300/90 font-mono italic">
              Giám đốc Kinh doanh tại Thành Phát Land
            </p>
          </div>

          <div className="space-y-3 text-slate-300 text-xs leading-relaxed font-sans">
            <p>
              Với hơn <strong>8 năm kinh nghiệm thực chiến</strong> trong lĩnh vực tư vấn tài chính và kinh doanh bất động sản, hiện đang điều hành định hướng dòng vốn tại Thành Phát Land, em thấu hiểu sâu sắc rằng một thương vụ thành đầu tư công không đơn giản chỉ nằm ở việc mua được giá rẻ hay chiết khấu hời từ chủ đầu tư.
            </p>
            <p>
              Thành công thực sự là sau khi đặt bút ký hợp đồng mua bán, <strong>anh/chị vẫn ngủ ngon giấc mỗi đêm</strong>, dòng tiền sinh hoạt của gia đình tiếp tục được duy trì bền vững và khối tài sản có một lộ trình gia tăng giá trị rõ ràng, vững chắc.
            </p>
            <p>
              Cuốn Ebook <span className="text-white font-semibold">Checklist 5 Bước Sống Còn</span> này cùng 2 bảng tính kinh tế Excel là những đúc kết dựa trên hàng trăm trường hợp thực tế em đồng hành cùng quý nhà đầu tư lớn nhỏ. Hy vọng bộ khung thẩm định này sẽ bảo vệ an toàn tối đa cho những quyết định tiền tỷ sắp tới của anh/chị!
            </p>
          </div>

          {/* Social Links Panel */}
          <div className="pt-4 border-t border-slate-800/80">
            <div className="text-xs font-bold text-slate-400 mb-3 uppercase tracking-wider">
              Kết nối trực tiếp qua các kênh truyền thông chính thức:
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {/* Zalo Cá Nhân */}
              <a
                href="http://zlcn.nambds.vn/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <MessageCircle className="w-4 h-4 text-blue-400 shrink-0" />
                <span className="truncate">Zalo Cá Nhân</span>
              </a>

              {/* Facebook Cá Nhân */}
              <a
                href="http://fbcn.nambds.vn/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <Facebook className="w-4 h-4 text-blue-500 shrink-0" />
                <span className="truncate">Facebook Cá Nhân</span>
              </a>

              {/* Fanpage */}
              <a
                href="https://page.nambds.vn/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <Facebook className="w-4 h-4 text-sky-400 shrink-0" />
                <span className="truncate">Fanpage Facebook</span>
              </a>

              {/* Youtube */}
              <a
                href="https://youtube.nambds.vn/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <Youtube className="w-4 h-4 text-red-500 shrink-0" />
                <span className="truncate">Kênh YouTube</span>
              </a>

              {/* Tiktok */}
              <a
                href="https://tiktok.nambds.vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <span className="w-4 h-4 bg-white text-black font-black text-[9px] rounded-full flex items-center justify-center shrink-0">🎵</span>
                <span className="truncate">TikTok Nam BĐS</span>
              </a>

              {/* Website */}
              <a
                href="http://nambds.vn"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 p-2 bg-slate-900 hover:bg-slate-800/80 border border-slate-800 rounded-xl text-[11px] text-slate-200 transition-colors cursor-pointer font-medium hover:text-white"
              >
                <Globe className="w-4 h-4 text-emerald-500 shrink-0" />
                <span className="truncate">Website NamBDS.vn</span>
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
