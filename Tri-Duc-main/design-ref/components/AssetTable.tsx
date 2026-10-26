import React, { useState } from 'react';
import { 
  QrCode, 
  Wrench, 
  ChevronRight, 
  Clock, 
  MapPin, 
  Calendar,
  AlertTriangle,
  CheckCircle2,
  Cpu
} from 'lucide-react';
import { MedicalAsset, AssetStatus } from '../types/asset';
import { 
  getStatusBadge, 
  getRiskClassBadge, 
  calculateMaintenanceUrgency 
} from '../utils/assetCalculations';

interface AssetTableProps {
  assets: MedicalAsset[];
  onSelectAsset: (asset: MedicalAsset) => void;
  onOpenMaintenanceModal: (asset: MedicalAsset) => void;
  onOpenQrModal: (asset: MedicalAsset) => void;
  onQuickStatusUpdate: (assetId: string, newStatus: AssetStatus) => void;
}

export const AssetTable: React.FC<AssetTableProps> = ({
  assets,
  onSelectAsset,
  onOpenMaintenanceModal,
  onOpenQrModal,
  onQuickStatusUpdate,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelectAll = () => {
    if (selectedIds.length === assets.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(assets.map(a => a.id));
    }
  };

  const toggleSelectOne = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (assets.length === 0) {
    return (
      <div className="bg-white rounded-lg p-12 text-center border border-[#e2e8f0] shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#f1f5f9] text-[#64748b] flex items-center justify-center mx-auto mb-3">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <h3 className="text-base font-semibold text-[#191c1e]">Không tìm thấy thiết bị y tế nào</h3>
        <p className="text-sm text-[#505f76] mt-1 max-w-md mx-auto">
          Không có kết quả khớp với điều kiện tìm kiếm hoặc bộ lọc hiện tại. Vui lòng thay đổi từ khóa hoặc đặt lại bộ lọc.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg border border-[#e2e8f0] shadow-xs overflow-hidden">
      {/* Table Toolbar if items selected */}
      {selectedIds.length > 0 && (
        <div className="bg-[#ddfbff] px-4 py-2 border-b border-[#98f0fb] flex items-center justify-between text-xs text-[#004f56]">
          <span className="font-medium">
            Đã chọn <strong>{selectedIds.length}</strong> thiết bị
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                alert(`Đã xuất danh sách ${selectedIds.length} thiết bị ra file kiểm kê.`);
              }}
              className="px-2.5 py-1 bg-white hover:bg-[#f1f5f9] rounded border border-[#0e7c86]/30 font-semibold"
            >
              Xuất danh sách đã chọn
            </button>
            <button
              type="button"
              onClick={() => setSelectedIds([])}
              className="text-[#0e7c86] hover:underline"
            >
              Bỏ chọn
            </button>
          </div>
        </div>
      )}

      {/* Desktop Table View */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#e2e8f0] text-[11px] font-semibold text-[#505f76] uppercase tracking-wider">
              <th scope="col" className="py-3 px-4 w-10">
                <input
                  type="checkbox"
                  checked={selectedIds.length === assets.length && assets.length > 0}
                  onChange={toggleSelectAll}
                  aria-label="Chọn tất cả thiết bị"
                  className="w-4 h-4 rounded border-[#cbd5e1] text-[#0e7c86] focus:ring-[#0e7c86]"
                />
              </th>
              <th scope="col" className="py-3 px-4 min-w-[260px]">
                Mã thẻ &amp; Thiết bị y tế
              </th>
              <th scope="col" className="py-3 px-4 min-w-[180px]">
                Khoa phòng &amp; Vị trí
              </th>
              <th scope="col" className="py-3 px-3 min-w-[90px] text-center">
                Cấp rủi ro
              </th>
              <th scope="col" className="py-3 px-4 min-w-[140px]">
                Trạng thái vận hành
              </th>
              <th scope="col" className="py-3 px-4 min-w-[140px]">
                Kỳ bảo trì kế tiếp
              </th>
              <th scope="col" className="py-3 px-4 min-w-[130px]">
                Đo từ xa (Telemetry)
              </th>
              <th scope="col" className="py-3 px-4 min-w-[130px] text-right">
                Thao tác
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#f1f5f9] text-xs">
            {assets.map((asset) => {
              const statusStyle = getStatusBadge(asset.status);
              const riskStyle = getRiskClassBadge(asset.riskClass);
              const urgency = calculateMaintenanceUrgency(asset.nextMaintenanceDate);
              const isSelected = selectedIds.includes(asset.id);

              return (
                <tr
                  key={asset.id}
                  onClick={() => onSelectAsset(asset)}
                  className={`hover:bg-[#f1f5f9] transition-colors cursor-pointer group ${
                    isSelected ? 'bg-[#f0f9fa]' : ''
                  }`}
                >
                  {/* Select Checkbox */}
                  <td 
                    className="py-3.5 px-4"
                    onClick={(e) => toggleSelectOne(asset.id, e)}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={() => {}}
                      aria-label={`Chọn thiết bị ${asset.assetTag}`}
                      className="w-4 h-4 rounded border-[#cbd5e1] text-[#0e7c86] focus:ring-[#0e7c86]"
                    />
                  </td>

                  {/* Asset Tag & Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 p-1.5 rounded-md bg-[#eceef0] text-[#0e7c86] group-hover:bg-[#ddfbff] transition">
                        <Cpu className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-semibold text-[#0e7c86] text-[11px] bg-[#ddfbff] px-1.5 py-0.5 rounded">
                            {asset.assetTag}
                          </span>
                          <span className="text-[11px] text-[#64748b] font-mono">
                            SN: {asset.serialNumber}
                          </span>
                        </div>
                        <h4 className="text-sm font-semibold text-[#191c1e] mt-0.5 group-hover:text-[#0e7c86] transition">
                          {asset.vietnameseName}
                        </h4>
                        <p className="text-[11px] text-[#505f76] mt-0.5 line-clamp-1">
                          {asset.name} &bull; <span className="font-medium">{asset.manufacturer}</span> ({asset.model})
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department & Room */}
                  <td className="py-3.5 px-4">
                    <div className="font-medium text-[#191c1e]">{asset.department}</div>
                    <div className="text-[11px] text-[#64748b] flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-[#0e7c86] shrink-0" />
                      <span className="truncate">{asset.room}</span>
                    </div>
                  </td>

                  {/* Risk Class (BYT) */}
                  <td className="py-3.5 px-3 text-center">
                    <span 
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${riskStyle.bg}`}
                      title={`${riskStyle.label}: ${riskStyle.description}`}
                    >
                      {riskStyle.shortLabel}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className={`w-2 h-2 rounded-full ${statusStyle.dotColor}`} />
                      <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${statusStyle.bg}`}>
                        {statusStyle.label}
                      </span>
                    </div>
                    <div className="text-[10px] text-[#64748b] mt-0.5 pl-3.5">
                      {statusStyle.vietnamese}
                    </div>
                  </td>

                  {/* Next Maintenance Date */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#64748b]" />
                      <span className="font-mono font-medium text-[#191c1e]">
                        {asset.nextMaintenanceDate}
                      </span>
                    </div>
                    {urgency === 'overdue' && (
                      <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] font-bold text-red-700 bg-red-100 px-1.5 py-0.5 rounded">
                        <AlertTriangle className="w-2.5 h-2.5" /> Quá hạn
                      </span>
                    )}
                    {urgency === 'due_soon' && (
                      <span className="inline-flex items-center gap-0.5 mt-1 text-[10px] font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                        <Clock className="w-2.5 h-2.5" /> Đến hạn trong 14 ngày
                      </span>
                    )}
                    {urgency === 'ok' && (
                      <span className="text-[10px] text-[#64748b] block mt-0.5">
                        Lần cuối: {asset.lastMaintenanceDate}
                      </span>
                    )}
                  </td>

                  {/* Telemetry */}
                  <td className="py-3.5 px-4 font-mono">
                    <div className="flex items-center justify-between text-[11px] mb-1">
                      <span className="text-[#64748b]">Tải vận hành:</span>
                      <strong className="text-[#191c1e]">{asset.telemetry.utilizationRate}%</strong>
                    </div>
                    <div className="w-full bg-[#e2e8f0] h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${
                          asset.telemetry.utilizationRate > 85 ? 'bg-[#0e7c86]' : 'bg-sky-500'
                        }`}
                        style={{ width: `${asset.telemetry.utilizationRate}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between text-[10px] text-[#64748b] mt-1">
                      <span>{asset.telemetry.operatingHours}h chạy</span>
                      <span className="flex items-center text-emerald-700 font-sans">
                        <CheckCircle2 className="w-2.5 h-2.5 mr-0.5" /> OK
                      </span>
                    </div>
                  </td>

                  {/* Row Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1" onClick={(e) => e.stopPropagation()}>
                      {/* Log Maintenance */}
                      <button
                        type="button"
                        onClick={() => onOpenMaintenanceModal(asset)}
                        className="p-1.5 text-[#505f76] hover:text-[#0e7c86] hover:bg-[#ddfbff] rounded-md transition"
                        title="Ghi phiếu bảo trì / Kiểm định"
                        aria-label={`Ghi phiếu bảo trì cho ${asset.assetTag}`}
                      >
                        <Wrench className="w-4 h-4" />
                      </button>

                      {/* Print QR Tag */}
                      <button
                        type="button"
                        onClick={() => onOpenQrModal(asset)}
                        className="p-1.5 text-[#505f76] hover:text-[#0e7c86] hover:bg-[#ddfbff] rounded-md transition"
                        title="Xem tem nhãn mã QR"
                        aria-label={`In tem mã QR cho ${asset.assetTag}`}
                      >
                        <QrCode className="w-4 h-4" />
                      </button>

                      {/* Detail Chevron */}
                      <button
                        type="button"
                        onClick={() => onSelectAsset(asset)}
                        className="p-1.5 text-[#64748b] hover:text-[#191c1e] hover:bg-gray-100 rounded-md transition"
                        aria-label={`Xem hồ sơ chi tiết ${asset.assetTag}`}
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Table Footer info */}
      <div className="bg-[#f8fafc] px-4 py-3 border-t border-[#e2e8f0] flex flex-col sm:flex-row items-center justify-between text-xs text-[#505f76] gap-2">
        <div className="flex items-center gap-2">
          <span>Hiển thị <strong>{assets.length}</strong> thiết bị y tế</span>
          <span>&bull;</span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500" /> Sẵn sàng
            <span className="w-2 h-2 rounded-full bg-amber-500 ml-2" /> Cần bảo trì
            <span className="w-2 h-2 rounded-full bg-blue-500 ml-2" /> Hiệu chuẩn
            <span className="w-2 h-2 rounded-full bg-rose-500 ml-2" /> Sửa chữa
          </span>
        </div>
        <div className="text-[11px] text-[#64748b]">
          Dữ liệu thời gian thực đồng bộ chuẩn HL7/FHIR &bull; Bộ Y tế Việt Nam
        </div>
      </div>
    </div>
  );
};
