import React from 'react';
import { 
  Activity, 
  Plus, 
  QrCode, 
  Download, 
  LayoutDashboard, 
  CalendarClock, 
  BarChart3, 
  MapPin,
  ShieldAlert,
  Hospital
} from 'lucide-react';
import { MedicalAsset } from '../types/asset';
import { calculateOverallUptime } from '../utils/assetCalculations';

interface HeaderProps {
  assets: MedicalAsset[];
  activeView: 'inventory' | 'maintenance' | 'analytics' | 'ward_map';
  onViewChange: (view: 'inventory' | 'maintenance' | 'analytics' | 'ward_map') => void;
  onOpenAddModal: () => void;
  onOpenScanner: () => void;
  onExportReport: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  assets,
  activeView,
  onViewChange,
  onOpenAddModal,
  onOpenScanner,
  onExportReport,
}) => {
  const uptime = calculateOverallUptime(assets);
  const maintenanceDueCount = assets.filter(
    a => a.status === 'maintenance_due' || a.status === 'under_repair'
  ).length;

  return (
    <header className="sticky top-0 z-30 bg-white border-b border-[#e2e8f0] shadow-xs">
      {/* Top Banner / Hospital Identity */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 border-b border-[#f1f5f9] gap-3">
          {/* Logo & Brand Title */}
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-lg bg-[#0e7c86] flex items-center justify-center text-white shadow-xs">
              <Activity className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold tracking-tight text-[#191c1e] font-sans">
                  Clinical Asset Intelligence
                </h1>
                <span className="text-[11px] font-semibold bg-[#ddfbff] text-[#00626a] px-2 py-0.5 rounded-full border border-[#98f0fb]/50">
                  v3.4 PRO
                </span>
              </div>
              <p className="text-xs text-[#505f76] flex items-center gap-1.5 mt-0.5">
                <Hospital className="w-3.5 h-3.5 text-[#0e7c86]" />
                <span>Bệnh viện Đa khoa Quốc tế &bull; Hệ thống Quản trị Vận hành &amp; Bảo dưỡng Trang thiết bị Y tế</span>
              </p>
            </div>
          </div>

          {/* Quick Realtime System Status & Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* System Uptime Badge */}
            <div className="hidden sm:flex items-center px-3 py-1.5 bg-[#f8fafc] border border-[#e2e8f0] rounded-lg text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse mr-2" />
              <span className="text-[#505f76] mr-1">Uptime toàn viện:</span>
              <strong className="text-[#0e7c86] font-mono font-semibold">{uptime}%</strong>
            </div>

            {/* Overdue Alert Badge */}
            {maintenanceDueCount > 0 && (
              <button
                type="button"
                onClick={() => onViewChange('maintenance')}
                className="flex items-center px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-xs text-amber-800 transition font-medium"
                title="Xem các thiết bị cần bảo trì"
              >
                <ShieldAlert className="w-3.5 h-3.5 mr-1.5 text-amber-600" />
                <span>{maintenanceDueCount} thiết bị cần xử lý</span>
              </button>
            )}

            {/* Quick Barcode Scanner */}
            <button
              type="button"
              onClick={onOpenScanner}
              className="inline-flex items-center px-3 py-2 bg-white hover:bg-[#f1f5f9] text-[#505f76] border border-[#cbd5e1] rounded-lg text-xs font-semibold transition shadow-xs focus:ring-2 focus:ring-[#0e7c86]"
              aria-label="Quét mã vạch hoặc mã QR thiết bị"
            >
              <QrCode className="w-4 h-4 mr-1.5 text-[#0e7c86]" />
              <span>Quét QR / Barcode</span>
            </button>

            {/* Export Audit Report */}
            <button
              type="button"
              onClick={onExportReport}
              className="inline-flex items-center px-3 py-2 bg-white hover:bg-[#f1f5f9] text-[#505f76] border border-[#cbd5e1] rounded-lg text-xs font-semibold transition shadow-xs focus:ring-2 focus:ring-[#0e7c86]"
              aria-label="Xuất báo cáo kiểm kê thiết bị"
            >
              <Download className="w-4 h-4 mr-1.5 text-[#64748b]" />
              <span className="hidden lg:inline">Xuất kiểm kê</span>
            </button>

            {/* Add Asset Button */}
            <button
              type="button"
              onClick={onOpenAddModal}
              className="inline-flex items-center px-3.5 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg text-xs font-semibold shadow-xs transition focus:ring-2 focus:ring-offset-1 focus:ring-[#0e7c86]"
              aria-label="Thêm mới thiết bị y tế"
            >
              <Plus className="w-4 h-4 mr-1.5 stroke-[2.5]" />
              <span>Thêm thiết bị</span>
            </button>
          </div>
        </div>

        {/* View Switcher Tabs */}
        <nav className="flex space-x-1 sm:space-x-4 pt-2 overflow-x-auto" aria-label="Tabs điều hướng">
          <button
            type="button"
            onClick={() => onViewChange('inventory')}
            className={`flex items-center py-2.5 px-3 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeView === 'inventory'
                ? 'border-[#0e7c86] text-[#0e7c86] font-semibold'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e] hover:border-gray-300'
            }`}
          >
            <LayoutDashboard className="w-4 h-4 mr-2" />
            <span>Danh mục thiết bị ({assets.length})</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('maintenance')}
            className={`flex items-center py-2.5 px-3 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeView === 'maintenance'
                ? 'border-[#0e7c86] text-[#0e7c86] font-semibold'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e] hover:border-gray-300'
            }`}
          >
            <CalendarClock className="w-4 h-4 mr-2" />
            <span>Lịch bảo trì &amp; Kiểm định</span>
            {maintenanceDueCount > 0 && (
              <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-800 font-bold">
                {maintenanceDueCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => onViewChange('analytics')}
            className={`flex items-center py-2.5 px-3 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeView === 'analytics'
                ? 'border-[#0e7c86] text-[#0e7c86] font-semibold'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e] hover:border-gray-300'
            }`}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            <span>Phân tích &amp; Chỉ số Khoa</span>
          </button>

          <button
            type="button"
            onClick={() => onViewChange('ward_map')}
            className={`flex items-center py-2.5 px-3 border-b-2 text-xs sm:text-sm font-medium transition whitespace-nowrap ${
              activeView === 'ward_map'
                ? 'border-[#0e7c86] text-[#0e7c86] font-semibold'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e] hover:border-gray-300'
            }`}
          >
            <MapPin className="w-4 h-4 mr-2" />
            <span>Sơ đồ phân bổ buồng bệnh</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
