import React from 'react';
import { 
  Server, 
  Activity, 
  AlertTriangle, 
  HeartPulse, 
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';
import { MedicalAsset } from '../types/asset';
import { calculateOverallUptime, formatVND } from '../utils/assetCalculations';

interface MetricCardsProps {
  assets: MedicalAsset[];
  onSelectQuickFilter: (status: string) => void;
  selectedStatusFilter: string;
}

export const MetricCards: React.FC<MetricCardsProps> = ({
  assets,
  onSelectQuickFilter,
  selectedStatusFilter,
}) => {
  const totalAssets = assets.length;
  const operationalCount = assets.filter(a => a.status === 'operational').length;
  const calibrationCount = assets.filter(a => a.status === 'calibration').length;
  const maintenanceDueCount = assets.filter(a => a.status === 'maintenance_due').length;
  const underRepairCount = assets.filter(a => a.status === 'under_repair').length;
  const classDCount = assets.filter(a => a.riskClass === 'D').length;

  const totalValue = assets.reduce((acc, curr) => acc + curr.purchaseValueVND, 0);
  const uptime = calculateOverallUptime(assets);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {/* Total Assets & Capital Value */}
      <div 
        onClick={() => onSelectQuickFilter('all')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-xs hover:border-[#0e7c86]/60 ${
          selectedStatusFilter === 'all' ? 'border-[#0e7c86] ring-1 ring-[#0e7c86]' : 'border-[#e2e8f0]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#505f76] uppercase tracking-wider">
            Tổng tài sản thiết bị
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#ddfbff] text-[#0e7c86] flex items-center justify-center">
            <Server className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums text-[#191c1e]">{totalAssets}</span>
          <span className="text-xs text-[#505f76]">thiết bị quản lý</span>
        </div>
        <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#505f76]">
          <span>Tổng giá trị danh mục:</span>
          <span className="font-semibold text-[#191c1e] tabular-nums">{formatVND(totalValue)}</span>
        </div>
      </div>

      {/* Operational Uptime */}
      <div 
        onClick={() => onSelectQuickFilter('operational')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-xs hover:border-[#0e7c86]/60 ${
          selectedStatusFilter === 'operational' ? 'border-[#0e7c86] ring-1 ring-[#0e7c86]' : 'border-[#e2e8f0]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#505f76] uppercase tracking-wider">
            Tỷ lệ sẵn sàng vận hành
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#e6f4ea] text-[#137333] flex items-center justify-center">
            <Activity className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums text-[#00626a]">{uptime}%</span>
          <span className="text-xs text-emerald-700 font-medium flex items-center gap-0.5">
            <TrendingUp className="w-3 h-3" /> Chuẩn ISO 13485
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#505f76]">
          <span>Đang hoạt động tốt:</span>
          <span className="font-semibold text-emerald-700 tabular-nums">
            {operationalCount}/{totalAssets} máy
          </span>
        </div>
      </div>

      {/* Maintenance & Repair Alerts */}
      <div 
        onClick={() => onSelectQuickFilter('maintenance_due')}
        className={`bg-white rounded-lg p-4 border transition-all cursor-pointer shadow-xs hover:border-amber-400 ${
          selectedStatusFilter === 'maintenance_due' ? 'border-amber-500 ring-1 ring-amber-500' : 'border-[#e2e8f0]'
        }`}
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#505f76] uppercase tracking-wider">
            Cần bảo trì &amp; Hiệu chuẩn
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#fef7e0] text-[#b06000] flex items-center justify-center">
            <AlertTriangle className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums text-[#b06000]">
            {maintenanceDueCount + underRepairCount}
          </span>
          <span className="text-xs text-amber-700 font-medium flex items-center gap-0.5">
            <Clock className="w-3 h-3" /> Cần can thiệp
          </span>
        </div>
        <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#505f76]">
          <span>Quá hạn: <strong className="text-red-700">{maintenanceDueCount}</strong></span>
          <span>Sửa chữa: <strong className="text-amber-800">{underRepairCount}</strong></span>
          <span>Hiệu chuẩn: <strong className="text-blue-700">{calibrationCount}</strong></span>
        </div>
      </div>

      {/* Life Support Devices (Risk Class D) */}
      <div 
        className="bg-white rounded-lg p-4 border border-[#e2e8f0] shadow-xs"
      >
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#505f76] uppercase tracking-wider">
            Thiết bị duy trì sự sống (Loại D)
          </span>
          <div className="w-8 h-8 rounded-lg bg-[#fce8e6] text-[#ba1a1a] flex items-center justify-center">
            <HeartPulse className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-2xl font-bold font-mono text-[#ba1a1a]">{classDCount}</span>
          <span className="text-xs text-[#505f76]">máy thở, lọc máu, sốc tim</span>
        </div>
        <div className="mt-2 pt-2 border-t border-[#f1f5f9] flex items-center justify-between text-xs text-[#505f76]">
          <span>Giám sát thời gian thực:</span>
          <span className="text-emerald-700 font-semibold flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% An toàn
          </span>
        </div>
      </div>
    </div>
  );
};
