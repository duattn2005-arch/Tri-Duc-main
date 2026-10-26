import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  QrCode, 
  ShieldCheck, 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  FileText, 
  Activity, 
  Thermometer, 
  Battery, 
  Building2, 
  Globe, 
  Tag, 
  History,
  CheckCircle,
  Plus
} from 'lucide-react';
import { MedicalAsset, AssetStatus } from '../types/asset';
import { 
  getStatusBadge, 
  getRiskClassBadge, 
  calculateMaintenanceUrgency, 
  formatVND 
} from '../utils/assetCalculations';

interface AssetDetailModalProps {
  asset: MedicalAsset | null;
  onClose: () => void;
  onOpenMaintenanceModal: (asset: MedicalAsset) => void;
  onOpenQrModal: (asset: MedicalAsset) => void;
  onStatusUpdate: (assetId: string, status: AssetStatus) => void;
}

export const AssetDetailModal: React.FC<AssetDetailModalProps> = ({
  asset,
  onClose,
  onOpenMaintenanceModal,
  onOpenQrModal,
  onStatusUpdate,
}) => {
  const [activeTab, setActiveTab] = useState<'timeline' | 'specs' | 'telemetry'>('timeline');

  if (!asset) return null;

  const statusStyle = getStatusBadge(asset.status);
  const riskStyle = getRiskClassBadge(asset.riskClass);
  const urgency = calculateMaintenanceUrgency(asset.nextMaintenanceDate);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="asset-modal-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden border border-[#e2e8f0]">
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-[#0e7c86] bg-[#ddfbff] px-2 py-0.5 rounded border border-[#98f0fb]">
                {asset.assetTag}
              </span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${riskStyle.bg}`}>
                {riskStyle.label}
              </span>
              <span className="text-xs font-mono text-[#505f76]">
                S/N: {asset.serialNumber}
              </span>
            </div>
            <h2 id="asset-modal-title" className="text-lg sm:text-xl font-bold text-[#191c1e]">
              {asset.vietnameseName}
            </h2>
            <p className="text-xs text-[#505f76] mt-0.5">
              {asset.name} &bull; <span className="font-semibold">{asset.manufacturer}</span> ({asset.model})
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenQrModal(asset)}
              className="p-2 text-[#505f76] hover:text-[#0e7c86] hover:bg-[#ddfbff] rounded-lg border border-[#cbd5e1] transition"
              title="Xem tem mã QR"
              aria-label="Xem tem mã QR của thiết bị"
            >
              <QrCode className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-[#64748b] hover:text-[#191c1e] hover:bg-gray-200 rounded-lg transition"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Quick Status Bar & Actions */}
        <div className="px-4 sm:px-6 py-3 bg-white border-b border-[#f1f5f9] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <span className="text-[#64748b]">Trạng thái:</span>
              <select
                value={asset.status}
                onChange={(e) => onStatusUpdate(asset.id, e.target.value as AssetStatus)}
                className={`py-1 px-2.5 rounded-full font-semibold border ${statusStyle.bg} focus:outline-none focus:ring-2 focus:ring-[#0e7c86] cursor-pointer`}
                aria-label="Cập nhật trạng thái thiết bị"
              >
                <option value="operational">Operational (Sẵn sàng)</option>
                <option value="calibration">In Calibration (Đang hiệu chuẩn)</option>
                <option value="maintenance_due">Maintenance Due (Đến hạn bảo trì)</option>
                <option value="under_repair">Under Repair (Đang sửa chữa)</option>
                <option value="standby">Standby (Dự phòng)</option>
              </select>
            </div>

            <div className="hidden sm:flex items-center gap-1 text-[#505f76]">
              <MapPin className="w-3.5 h-3.5 text-[#0e7c86]" />
              <span>{asset.department} &bull; {asset.room}</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onOpenMaintenanceModal(asset)}
              className="inline-flex items-center px-3 py-1.5 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg font-semibold transition shadow-xs"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>Ghi phiếu bảo trì</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-[#e2e8f0] px-4 sm:px-6 bg-[#f8fafc]">
          <button
            type="button"
            onClick={() => setActiveTab('timeline')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'timeline'
                ? 'border-[#0e7c86] text-[#0e7c86]'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e]'
            }`}
          >
            <History className="w-4 h-4" />
            <span>Vòng đời &amp; Lịch sử bảo trì ({asset.maintenanceHistory.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('specs')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'specs'
                ? 'border-[#0e7c86] text-[#0e7c86]'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e]'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Hồ sơ kỹ thuật &amp; Pháp lý</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telemetry')}
            className={`py-3 px-4 text-xs font-semibold border-b-2 flex items-center gap-1.5 transition ${
              activeTab === 'telemetry'
                ? 'border-[#0e7c86] text-[#0e7c86]'
                : 'border-transparent text-[#64748b] hover:text-[#191c1e]'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>Đo từ xa &amp; Telemetry</span>
          </button>
        </div>

        {/* Tab Contents (Scrollable body) */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: MAINTENANCE LIFECYCLE TIMELINE TRACKER */}
          {activeTab === 'timeline' && (
            <div className="space-y-6">
              {/* Next Scheduled Inspection Callout */}
              <div className={`p-4 rounded-lg border ${
                urgency === 'overdue' 
                  ? 'bg-red-50 border-red-200' 
                  : urgency === 'due_soon' 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-[#ddfbff]/50 border-[#98f0fb]'
              }`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <Calendar className={`w-5 h-5 ${
                      urgency === 'overdue' ? 'text-red-600' : urgency === 'due_soon' ? 'text-amber-600' : 'text-[#0e7c86]'
                    }`} />
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#191c1e]">
                        Kỳ bảo dưỡng &amp; Kiểm định định kỳ tiếp theo
                      </h4>
                      <div className="text-base font-bold font-mono text-[#191c1e] mt-0.5">
                        {asset.nextMaintenanceDate}
                      </div>
                    </div>
                  </div>

                  <div>
                    {urgency === 'overdue' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-200">
                        Cảnh báo: Đã quá hạn kiểm định!
                      </span>
                    )}
                    {urgency === 'due_soon' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                        Sắp đến hạn (&le; 14 ngày)
                      </span>
                    )}
                    {urgency === 'ok' && (
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        Đang trong hạn kiểm định hợp lệ
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Status Timeline Tracker */}
              <div>
                <h3 className="text-sm font-bold text-[#191c1e] mb-4 flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-[#0e7c86]" />
                  <span>Dòng thời gian sự kiện kỹ thuật &amp; bảo trì</span>
                </h3>

                <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#cbd5e1]">
                  {asset.maintenanceHistory.map((item, idx) => (
                    <div key={item.id || idx} className="relative group">
                      {/* Timeline dot */}
                      <div className="absolute -left-6 sm:-left-8 top-1 w-5 h-5 rounded-full bg-white border-2 border-[#0e7c86] flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-[#0e7c86]" />
                      </div>

                      {/* Timeline Card */}
                      <div className="bg-[#f8fafc] rounded-lg p-3.5 border border-[#e2e8f0] shadow-2xs hover:border-[#0e7c86]/40 transition">
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-semibold text-[#0e7c86] bg-[#ddfbff] px-2 py-0.5 rounded">
                              {item.id}
                            </span>
                            <span className="text-xs font-bold text-[#191c1e]">
                              {item.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono text-[#505f76] flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" /> {item.date}
                            </span>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                              {item.result === 'passed' ? 'Đạt chuẩn' : item.result}
                            </span>
                          </div>
                        </div>

                        <p className="text-xs text-[#505f76] leading-relaxed mb-2">
                          {item.notes}
                        </p>

                        <div className="flex flex-wrap items-center justify-between text-[11px] text-[#64748b] pt-2 border-t border-[#eceef0] gap-2">
                          <span>
                            Người thực hiện: <strong className="text-[#191c1e]">{item.technician}</strong> ({item.organization})
                          </span>
                          {item.cost && item.cost > 0 && (
                            <span className="font-mono">
                              Chi phí: <strong className="text-[#0e7c86]">{formatVND(item.cost)}</strong>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TECHNICAL SPECIFICATIONS & COMPLIANCE */}
          {activeTab === 'specs' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#505f76] flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-[#0e7c86]" /> Thông tin nhận dạng
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Mã tài sản (Asset Tag):</span>
                      <span className="font-mono font-bold text-[#0e7c86]">{asset.assetTag}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Số Serial:</span>
                      <span className="font-mono font-medium text-[#191c1e]">{asset.serialNumber}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Model / Phiên bản:</span>
                      <span className="font-medium text-[#191c1e]">{asset.model}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Hãng sản xuất:</span>
                      <span className="font-medium text-[#191c1e]">{asset.manufacturer}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#64748b]">Xuất xứ:</span>
                      <span className="font-medium text-[#191c1e]">{asset.countryOfOrigin}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#505f76] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#0e7c86]" /> Vị trí &amp; Tài chính
                  </h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Khoa quản lý:</span>
                      <span className="font-semibold text-[#191c1e]">{asset.department}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Phòng / Vị trí đặt:</span>
                      <span className="font-medium text-[#191c1e]">{asset.room}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Ngày mua / Bàn giao:</span>
                      <span className="font-mono text-[#191c1e]">{asset.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#f1f5f9]">
                      <span className="text-[#64748b]">Hạn bảo hành chính hãng:</span>
                      <span className="font-mono text-[#191c1e]">{asset.warrantyExpiry}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span className="text-[#64748b]">Nguyên giá đầu tư:</span>
                      <span className="font-mono font-bold text-[#0e7c86]">{formatVND(asset.purchaseValueVND)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Regulatory classification callout */}
              <div className="p-4 rounded-lg bg-[#f1f5f9] border border-[#cbd5e1] text-xs space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#191c1e]">
                  <ShieldCheck className="w-4 h-4 text-[#0e7c86]" />
                  <span>Tuân thủ Quy định Quản lý Trang thiết bị Y tế (Nghị định 98/2021/NĐ-CP &amp; BYT)</span>
                </div>
                <p className="text-[#505f76] leading-relaxed">
                  Thiết bị được xếp hạng <strong>{riskStyle.label}</strong>. Yêu cầu kiểm định định kỳ tối thiểu 12 tháng/lần, dán tem kiểm định hợp chuẩn và lưu trữ nhật ký vận hành kỹ thuật số.
                </p>
                {asset.notes && (
                  <p className="text-[#191c1e] italic bg-white p-2 rounded border border-[#e2e8f0]">
                    Ghi chú lâm sàng: &ldquo;{asset.notes}&rdquo;
                  </p>
                )}
              </div>
            </div>
          )}

          {/* TAB 3: TELEMETRY & LIVE MONITORING */}
          {activeTab === 'telemetry' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] text-center">
                  <div className="text-xs text-[#505f76] mb-1">Thời gian vận hành tích lũy</div>
                  <div className="text-2xl font-bold font-mono text-[#191c1e]">
                    {asset.telemetry.operatingHours.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-[#64748b] mt-1">giờ hoạt động liên tục</div>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] text-center">
                  <div className="text-xs text-[#505f76] mb-1">Tải sử dụng lâm sàng</div>
                  <div className="text-2xl font-bold font-mono text-[#0e7c86]">
                    {asset.telemetry.utilizationRate}%
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1 font-medium">Hiệu suất tối ưu</div>
                </div>

                <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] text-center">
                  <div className="text-xs text-[#505f76] mb-1">Chu kỳ khởi động / Bật nguồn</div>
                  <div className="text-2xl font-bold font-mono text-[#191c1e]">
                    {asset.telemetry.powerCycleCount}
                  </div>
                  <div className="text-[11px] text-[#64748b] mt-1">lần khởi động</div>
                </div>
              </div>

              {/* Hardware diagnostics */}
              <div className="bg-[#f8fafc] p-4 rounded-lg border border-[#e2e8f0] space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#505f76] flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5 text-[#0e7c86]" /> Chẩn đoán tự động phần cứng (Self-Test)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-white rounded border border-[#e2e8f0] flex items-center justify-between">
                    <span className="text-[#64748b]">Tự kiểm tra lần cuối:</span>
                    <span className="font-mono text-[#191c1e]">
                      {new Date(asset.telemetry.lastSelfTest).toLocaleString('vi-VN')}
                    </span>
                  </div>
                  <div className="p-3 bg-white rounded border border-[#e2e8f0] flex items-center justify-between">
                    <span className="text-[#64748b]">Kết quả Self-Test:</span>
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" /> ĐẠT CHUẨN
                    </span>
                  </div>
                  {asset.telemetry.temperatureCelsius !== undefined && (
                    <div className="p-3 bg-white rounded border border-[#e2e8f0] flex items-center justify-between">
                      <span className="text-[#64748b] flex items-center gap-1">
                        <Thermometer className="w-3.5 h-3.5 text-[#0e7c86]" /> Nhiệt độ lõi:
                      </span>
                      <span className="font-mono font-bold text-[#191c1e]">
                        {asset.telemetry.temperatureCelsius}°C (Bình thường)
                      </span>
                    </div>
                  )}
                  {asset.telemetry.batteryLevel !== undefined && (
                    <div className="p-3 bg-white rounded border border-[#e2e8f0] flex items-center justify-between">
                      <span className="text-[#64748b] flex items-center gap-1">
                        <Battery className="w-3.5 h-3.5 text-emerald-600" /> Dung lượng pin dự phòng:
                      </span>
                      <span className="font-mono font-bold text-emerald-700">
                        {asset.telemetry.batteryLevel}% (Sẵn sàng)
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#f8fafc] border-t border-[#e2e8f0] flex items-center justify-between text-xs">
          <span className="text-[#64748b]">
            ID: <span className="font-mono text-[#191c1e]">{asset.id}</span>
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#505f76] rounded-lg font-semibold transition"
            >
              Đóng hồ sơ
            </button>
            <button
              type="button"
              onClick={() => onOpenMaintenanceModal(asset)}
              className="px-4 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg font-semibold transition shadow-xs"
            >
              Thêm phiếu bảo dưỡng
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
