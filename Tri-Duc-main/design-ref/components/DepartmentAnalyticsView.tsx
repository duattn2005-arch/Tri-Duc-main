import React from 'react';
import { 
  Building2, 
  Activity, 
  TrendingUp, 
  ShieldAlert, 
  DollarSign, 
  CheckCircle2, 
  AlertCircle,
  Cpu
} from 'lucide-react';
import { MedicalAsset } from '../types/asset';
import { calculateDepartmentMetrics, formatVND } from '../utils/assetCalculations';

interface DepartmentAnalyticsViewProps {
  assets: MedicalAsset[];
  onSelectDepartment: (dept: string) => void;
}

export const DepartmentAnalyticsView: React.FC<DepartmentAnalyticsViewProps> = ({
  assets,
  onSelectDepartment,
}) => {
  const deptMetrics = calculateDepartmentMetrics(assets);
  const totalValue = assets.reduce((acc, a) => acc + a.purchaseValueVND, 0);

  // Risk breakdown
  const riskCounts = {
    D: assets.filter(a => a.riskClass === 'D').length,
    C: assets.filter(a => a.riskClass === 'C').length,
    B: assets.filter(a => a.riskClass === 'B').length,
    A: assets.filter(a => a.riskClass === 'A').length,
  };

  // Status breakdown
  const statusCounts = {
    operational: assets.filter(a => a.status === 'operational').length,
    calibration: assets.filter(a => a.status === 'calibration').length,
    maintenance_due: assets.filter(a => a.status === 'maintenance_due').length,
    under_repair: assets.filter(a => a.status === 'under_repair').length,
    standby: assets.filter(a => a.status === 'standby').length,
  };

  return (
    <div className="space-y-6">
      {/* Top Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Risk Distribution Card */}
        <div className="bg-white rounded-lg p-5 border border-[#e2e8f0] shadow-xs">
          <h3 className="text-sm font-bold text-[#191c1e] mb-3 flex items-center justify-between">
            <span>Phân loại rủi ro thiết bị (BYT)</span>
            <span className="text-xs font-normal text-[#64748b]">Nghị định 98</span>
          </h3>
          <div className="space-y-2.5">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-red-700">Loại D (Hỗ trợ sự sống)</span>
                <span className="font-mono font-bold text-red-700">{riskCounts.D} thiết bị ({Math.round(riskCounts.D / assets.length * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-red-500 h-full rounded-full" style={{ width: `${(riskCounts.D / assets.length) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-amber-800">Loại C (Rủi ro cao)</span>
                <span className="font-mono font-bold text-amber-800">{riskCounts.C} thiết bị ({Math.round(riskCounts.C / assets.length * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${(riskCounts.C / assets.length) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-sky-800">Loại B (Rủi ro trung bình)</span>
                <span className="font-mono font-bold text-sky-800">{riskCounts.B} thiết bị ({Math.round(riskCounts.B / assets.length * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(riskCounts.B / assets.length) * 100}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="font-semibold text-emerald-800">Loại A (Rủi ro thấp)</span>
                <span className="font-mono font-bold text-emerald-800">{riskCounts.A} thiết bị ({Math.round(riskCounts.A / assets.length * 100)}%)</span>
              </div>
              <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(riskCounts.A / assets.length) * 100}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Operational Status Ratio */}
        <div className="bg-white rounded-lg p-5 border border-[#e2e8f0] shadow-xs">
          <h3 className="text-sm font-bold text-[#191c1e] mb-3 flex items-center justify-between">
            <span>Trạng thái sẵn sàng lâm sàng</span>
            <span className="text-xs text-[#0e7c86] font-semibold">Tỷ lệ: {Math.round(statusCounts.operational / assets.length * 100)}%</span>
          </h3>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg bg-[#e6f4ea] border border-[#ceead6]">
              <div className="text-[11px] text-[#137333] font-medium">Sẵn sàng vận hành</div>
              <div className="text-xl font-bold font-mono text-[#137333] mt-0.5">{statusCounts.operational}</div>
              <div className="text-[10px] text-[#137333]/80">phục vụ bệnh nhân</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#fef7e0] border border-[#feefc3]">
              <div className="text-[11px] text-[#b06000] font-medium">Đến hạn bảo dưỡng</div>
              <div className="text-xl font-bold font-mono text-[#b06000] mt-0.5">{statusCounts.maintenance_due}</div>
              <div className="text-[10px] text-[#b06000]/80">cần can thiệp</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#e8f0fe] border border-[#d2e3fc]">
              <div className="text-[11px] text-[#1967d2] font-medium">Đang hiệu chuẩn</div>
              <div className="text-xl font-bold font-mono text-[#1967d2] mt-0.5">{statusCounts.calibration}</div>
              <div className="text-[10px] text-[#1967d2]/80">đo lường định kỳ</div>
            </div>

            <div className="p-2.5 rounded-lg bg-[#fce8e6] border border-[#fad2cf]">
              <div className="text-[11px] text-[#c5221f] font-medium">Đang sửa chữa</div>
              <div className="text-xl font-bold font-mono text-[#c5221f] mt-0.5">{statusCounts.under_repair}</div>
              <div className="text-[10px] text-[#c5221f]/80">chờ phụ tùng</div>
            </div>
          </div>
        </div>

        {/* Investment & Capital Asset Value */}
        <div className="bg-white rounded-lg p-5 border border-[#e2e8f0] shadow-xs flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-[#191c1e] mb-1 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-[#0e7c86]" />
              <span>Giá trị tài sản công y tế</span>
            </h3>
            <p className="text-xs text-[#505f76]">
              Tổng nguyên giá danh mục thiết bị đang được quản lý
            </p>
            <div className="mt-4">
              <div className="text-3xl font-bold font-mono text-[#00626a]">
                {formatVND(totalValue)}
              </div>
              <p className="text-xs text-[#64748b] mt-1 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% tài sản đã có mã định danh &amp; tem QR</span>
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-[#f1f5f9] text-[11px] text-[#505f76]">
            Chu kỳ khấu hao: 5-10 năm theo Thông tư 23/2023/TT-BTC
          </div>
        </div>
      </div>

      {/* Department Breakdown Table */}
      <div className="bg-white rounded-lg border border-[#e2e8f0] shadow-xs overflow-hidden">
        <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-[#0e7c86]" />
            <h3 className="text-sm font-bold text-[#191c1e]">
              Chỉ Số Sẵn Sàng &amp; Phân Bổ Thiết Bị Theo Khoa Phòng
            </h3>
          </div>
          <span className="text-xs text-[#64748b]">
            {deptMetrics.length} khoa phòng trực thuộc
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-semibold text-[#505f76] uppercase">
                <th className="py-3 px-4">Khoa phòng</th>
                <th className="py-3 px-4 text-center">Tổng máy</th>
                <th className="py-3 px-4 text-center">Hoạt động tốt</th>
                <th className="py-3 px-4 text-center">Cần bảo trì</th>
                <th className="py-3 px-4 text-center">Loại D (Hỗ trợ sống)</th>
                <th className="py-3 px-4 min-w-[180px]">Tỷ lệ sẵn sàng</th>
                <th className="py-3 px-4 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#f1f5f9]">
              {deptMetrics.map((dm) => (
                <tr key={dm.department} className="hover:bg-[#f1f5f9] transition">
                  <td className="py-3.5 px-4 font-semibold text-[#191c1e]">
                    {dm.department}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold">
                    {dm.totalAssets}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-emerald-700 font-semibold">
                    {dm.operationalAssets}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    {dm.maintenanceDueAssets > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold">
                        {dm.maintenanceDueAssets}
                      </span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono">
                    {dm.criticalAssets > 0 ? (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-700 font-bold">
                        {dm.criticalAssets}
                      </span>
                    ) : (
                      <span className="text-gray-400">0</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            dm.uptimePercentage >= 90 ? 'bg-[#0e7c86]' : 'bg-amber-500'
                          }`}
                          style={{ width: `${dm.uptimePercentage}%` }}
                        />
                      </div>
                      <span className="font-mono font-semibold text-[11px] text-[#191c1e] w-12 text-right">
                        {dm.uptimePercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => onSelectDepartment(dm.department)}
                      className="text-xs text-[#0e7c86] hover:text-[#00626a] font-semibold hover:underline"
                    >
                      Lọc theo khoa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
