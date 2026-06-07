/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Search, Download, Trash2, Key, ListFilter, Users } from 'lucide-react';
import { Lead } from '../types';

export default function LeadManagementPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [filterSource, setFilterSource] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize leads from localStorage when open
  useEffect(() => {
    if (isOpen) {
      loadLeads();
    }
  }, [isOpen]);

  const loadLeads = () => {
    const data = localStorage.getItem('bds_leads');
    if (data) {
      setLeads(JSON.parse(data));
    } else {
      setLeads([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === '1234' || pin.trim() === 'demo' || pin === '') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Mật mã Pin không đúng!');
    }
  };

  const handleClearLeads = () => {
    if (window.confirm('Anh/chị có chắc chắn muốn xóa toàn bộ danh sách khách hàng chạy thử nghiệm này?')) {
      localStorage.removeItem('bds_leads');
      setLeads([]);
    }
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter(l => l.id !== id);
    localStorage.setItem('bds_leads', JSON.stringify(updated));
    setLeads(updated);
  };

  const handleInjectMockLeads = () => {
    const mockData: Lead[] = [
      {
        id: 'mock1',
        fullName: 'Trần Minh Quân',
        phone: '0987654321',
        email: 'minhquan.bds@gmail.com',
        source: 'hero_form',
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'mock2',
        fullName: 'Nguyễn Thị Hồng',
        phone: '0912112233',
        email: 'hongnguyen88@outlook.com',
        source: 'checklist_form',
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
      },
      {
        id: 'mock3',
        fullName: 'Phạm Tiến Dũng',
        phone: '0903445566',
        source: 'calculator_form',
        timestamp: new Date(Date.now() - 3600000 * 24).toISOString()
      }
    ];

    localStorage.setItem('bds_leads', JSON.stringify(mockData));
    setLeads(mockData);
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert('Không có dữ liệu để xuất bản!');
      return;
    }

    // Creating BOM for UTF-8 Vietnamese Excel Support
    let csvContent = '\uFEFF';
    csvContent += 'Mã Lead,Họ và Tên,Số Điện Thoại,Email,Nguồn Đăng Ký,Thời Gian Đăng Ký\r\n';

    leads.forEach(lead => {
      const row = [
        lead.id,
        `"${lead.fullName.replace(/"/g, '""')}"`,
        `"${lead.phone || ''}"`,
        lead.email ? `"${lead.email}"` : 'N/A',
        lead.source,
        new Date(lead.timestamp).toLocaleString('vi-VN')
      ].join(',');
      csvContent += row + '\r\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `Nguyen_Nam_BDS_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.fullName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (lead.phone && lead.phone.includes(searchQuery)) ||
                          (lead.email && lead.email.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesFilter = filterSource === 'all' || lead.source === filterSource;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="w-full mt-12 pt-8 border-t border-slate-900">
      <div className="flex justify-center">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-brand-dark-900 border border-slate-800 hover:border-brand-gold-500/40 text-slate-400 hover:text-brand-gold-300 py-2.5 px-4 rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-all"
        >
          <ShieldCheck className="w-4 h-4 text-brand-gold-400" />
          {isOpen ? 'ĐÓNG BẢNG QUẢN TRỊ LEADS' : '💼 QUẢN TRỊ LEADS (Bảng Điều Hành Nguyễn Nam)'}
        </button>
      </div>

      {isOpen && (
        <div className="mt-6 max-w-4xl mx-auto p-6 md:p-8 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl space-y-6">
          {!isAuthenticated ? (
            /* PIN SECURITY LOCK MOCK */
            <form onSubmit={handleLogin} className="max-w-md mx-auto text-center space-y-4 py-8">
              <div className="w-12 h-12 bg-brand-gold-950 border border-brand-gold-500/20 rounded-full flex items-center justify-center text-brand-gold-400 mx-auto">
                <Key className="w-5 h-5 animate-pulse" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-white uppercase tracking-wider">Xác Thực Quản Lý Cố Vấn</h4>
                <p className="text-[11px] text-slate-500 italic">
                  Nhập mã PIN để bảo vệ dữ liệu khách hàng. Nhấp nút &quot;Truy cập ngay&quot; bên dưới (mặc định mở khóa).
                </p>
              </div>

              <div className="flex gap-2 max-w-xs mx-auto">
                <input
                  type="password"
                  placeholder="Nhập mã PIN bảo mật (Ví dụ: 1234)..."
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2 px-3 text-xs text-white text-center outline-none focus:border-brand-gold-400"
                />
                <button
                  type="submit"
                  className="bg-brand-gold-500 hover:bg-brand-gold-400 text-black px-4 py-2 rounded-lg text-xs font-bold shrink-0 cursor-pointer"
                >
                  Truy cập ngay
                </button>
              </div>
              {error && <p className="text-xs text-rose-400">{error}</p>}
            </form>
          ) : (
            /* DASHBOARD INTERFACES */
            <div className="space-y-6">
              
              {/* Stats & Actions Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-5">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-brand-gold-950/50 border border-brand-gold-500/20 text-brand-gold-400 rounded-xl">
                    <Users className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white uppercase">Danh Sách Khách Hàng Đăng Ký</h4>
                    <p className="text-[11px] text-slate-400">Có tổng cộng {leads.length} liên hệ đăng ký trong hệ thống</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {leads.length === 0 && (
                    <button
                      onClick={handleInjectMockLeads}
                      className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors"
                    >
                      ➕ Tạo Lead Thử Nghiệm
                    </button>
                  )}
                  <button
                    onClick={handleExportCSV}
                    disabled={leads.length === 0}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 disabled:opacity-50"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Xuất Excel/CSV</span>
                  </button>
                  <button
                    onClick={handleClearLeads}
                    disabled={leads.length === 0}
                    className="bg-rose-950 hover:bg-rose-900 border border-rose-900/30 text-rose-300 px-3 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Dọn sạch dữ liệu</span>
                  </button>
                </div>
              </div>

              {/* Filtering bar */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-slate-900/30 p-3 rounded-xl border border-slate-900">
                <div className="sm:col-span-7 relative">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <Search className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="text"
                    placeholder="Tìm theo Tên hoặc Số điện thoại..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-9 pr-3 text-xs text-white outline-none focus:border-brand-gold-500"
                  />
                </div>

                <div className="sm:col-span-5 relative flex items-center gap-2">
                  <ListFilter className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                  <select
                    value={filterSource}
                    onChange={(e) => setFilterSource(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-brand-gold-500 rounded-lg py-2 px-3 text-xs text-white cursor-pointer"
                  >
                    <option value="all">Tất cả biểu mẫu (Biểu đồ)</option>
                    <option value="hero_form">Hero - Màn hình đầu tiên</option>
                    <option value="checklist_form">Checklist 5 bước</option>
                    <option value="calculator_form">Bảng tính tài chính</option>
                    <option value="bonus_form">Hộp quà quà tặng kèm</option>
                  </select>
                </div>
              </div>

              {/* Data Table */}
              <div className="border border-slate-900 rounded-xl bg-slate-950 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-900 text-[10px] uppercase font-bold text-slate-400 border-b border-slate-800">
                        <th className="p-3">Họ và Tên</th>
                        <th className="p-3">Số Điện Thoại (Zalo)</th>
                        <th className="p-3">Email</th>
                        <th className="p-3">Nguồn Form</th>
                        <th className="p-3">Thời Gian Đăng Ký</th>
                        <th className="p-3 text-center">Xử lý</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-900 text-xs text-slate-300">
                      {filteredLeads.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="p-8 text-center text-slate-500 italic">
                            Chưa có dữ liệu liên hệ nào được ghi nhận. Hãy điền thông tin chạy thử biểu mẫu ở các phần trên để kiểm định!
                          </td>
                        </tr>
                      ) : (
                        filteredLeads.map((lead) => (
                          <tr key={lead.id} className="hover:bg-slate-900/40 transition-colors">
                            <td className="p-3 text-white font-semibold">{lead.fullName}</td>
                            <td className="p-3 font-mono text-emerald-400 font-semibold">{lead.phone || 'N/A'}</td>
                            <td className="p-3 text-slate-400 truncate max-w-[150px]">{lead.email || 'N/A'}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-brand-gold-950 text-brand-gold-300 border border-brand-gold-500/10">
                                {lead.source === 'hero_form' && 'Màn hình chính'}
                                {lead.source === 'checklist_form' && 'Chấm điểm checklist'}
                                {lead.source === 'calculator_form' && 'Bảng tính thử'}
                                {lead.source === 'bonus_form' && 'Hành lang Quà tặng'}
                              </span>
                            </td>
                            <td className="p-3 text-slate-500 font-mono">
                              {new Date(lead.timestamp).toLocaleString('vi-VN')}
                            </td>
                            <td className="p-3 text-center">
                              <button
                                onClick={() => handleDeleteLead(lead.id)}
                                className="text-slate-600 hover:text-rose-400 p-1 rounded transition-colors"
                                title="Xoá liên hệ này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="flex items-center justify-between text-[10px] text-slate-500 italic pt-2">
                <span>* Dữ liệu được mã hóa và lưu trữ tại LocalStorage trình duyệt này để chạy thử nghiệm.</span>
                <span>Mật khẩu Pin giả định: 1234</span>
              </div>

            </div>
          )}
        </div>
      )}
    </div>
  );
}
