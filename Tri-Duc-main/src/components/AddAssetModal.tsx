import React, { useState } from 'react';
import { X, Plus, Cpu, Building2, Tag, Calendar, DollarSign, CheckCircle2 } from 'lucide-react';
import { MedicalAsset, RiskClass, AssetStatus } from '../types/asset';
import { DEPARTMENTS } from '../data/mockAssets';

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAsset: (newAsset: MedicalAsset) => void;
}

export const AddAssetModal: React.FC<AddAssetModalProps> = ({
  isOpen,
  onClose,
  onAddAsset,
}) => {
  if (!isOpen) return null;

  const [assetTag, setAssetTag] = useState(`MED-DEV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [serialNumber, setSerialNumber] = useState('');
  const [vietnameseName, setVietnameseName] = useState('');
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Thiết bị Chẩn đoán & Điều trị');
  const [model, setModel] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [countryOfOrigin, setCountryOfOrigin] = useState('Việt Nam');
  const [department, setDepartment] = useState(DEPARTMENTS[1]);
  const [room, setRoom] = useState('');
  const [riskClass, setRiskClass] = useState<RiskClass>('C');
  const [status, setStatus] = useState<AssetStatus>('operational');
  const [purchaseDate, setPurchaseDate] = useState('2026-10-26');
  const [warrantyExpiry, setWarrantyExpiry] = useState('2028-10-26');
  const [nextMaintenanceDate, setNextMaintenanceDate] = useState('2027-04-26');
  const [purchaseValueVND, setPurchaseValueVND] = useState<string>('500000000');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!assetTag.trim()) {
      setErrorMsg('Vui lòng nhập Mã tài sản (Asset Tag).');
      return;
    }
    if (!serialNumber.trim()) {
      setErrorMsg('Vui lòng nhập số Serial của thiết bị.');
      return;
    }
    if (!vietnameseName.trim()) {
      setErrorMsg('Vui lòng nhập tên thiết bị tiếng Việt.');
      return;
    }
    if (!model.trim() || !manufacturer.trim()) {
      setErrorMsg('Vui lòng nhập Model và Hãng sản xuất.');
      return;
    }

    const newAsset: MedicalAsset = {
      id: `asset-${Date.now()}`,
      assetTag: assetTag.trim(),
      serialNumber: serialNumber.trim(),
      vietnameseName: vietnameseName.trim(),
      name: name.trim() || vietnameseName.trim(),
      category,
      model: model.trim(),
      manufacturer: manufacturer.trim(),
      countryOfOrigin: countryOfOrigin.trim(),
      department,
      room: room.trim() || 'Phòng tiếp nhận vật tư',
      riskClass,
      status,
      purchaseDate,
      warrantyExpiry,
      lastMaintenanceDate: purchaseDate,
      nextMaintenanceDate,
      purchaseValueVND: parseFloat(purchaseValueVND) || 0,
      telemetry: {
        operatingHours: 0,
        temperatureCelsius: 24.5,
        lastSelfTest: new Date().toISOString(),
        selfTestStatus: 'passed',
        utilizationRate: 50,
        powerCycleCount: 1
      },
      maintenanceHistory: [
        {
          id: `MNT-COMM-${Math.floor(100 + Math.random() * 900)}`,
          date: purchaseDate,
          type: 'commissioning',
          title: 'Nghiệm thu đưa vào khai thác sử dụng',
          technician: 'Hội đồng Khoa học Kỹ thuật BV',
          organization: 'Bệnh viện Đa khoa',
          result: 'passed',
          notes: 'Kiểm định ban đầu đạt tiêu chuẩn kỹ thuật nhà sản xuất và BYT.',
          nextDate: nextMaintenanceDate
        }
      ],
      notes: notes.trim()
    };

    onAddAsset(newAsset);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="add-asset-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden border border-[#e2e8f0]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#0e7c86] text-white flex items-center justify-center">
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </div>
            <div>
              <h3 id="add-asset-title" className="text-base font-bold text-[#191c1e]">
                Thêm Mới Thiết Bị Y Tế Vào Hệ Thống
              </h3>
              <p className="text-xs text-[#505f76]">
                Cấp mã thẻ định danh, thiết lập phân loại rủi ro &amp; chu kỳ bảo dưỡng
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#64748b] hover:text-[#191c1e] hover:bg-gray-200 rounded-lg transition"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Tag & Serial & Risk Class */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="asset-tag" className="font-semibold text-[#191c1e] block">
                Mã định danh (Asset Tag) <span className="text-red-500">*</span>
              </label>
              <input
                id="asset-tag"
                type="text"
                required
                value={assetTag}
                onChange={(e) => { setAssetTag(e.target.value); setErrorMsg(''); }}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg font-mono font-semibold text-[#0e7c86] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="serial-num" className="font-semibold text-[#191c1e] block">
                Số Serial (S/N) <span className="text-red-500">*</span>
              </label>
              <input
                id="serial-num"
                type="text"
                required
                value={serialNumber}
                onChange={(e) => { setSerialNumber(e.target.value); setErrorMsg(''); }}
                placeholder="VD: SN-2024-8841X"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg font-mono focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="risk-class" className="font-semibold text-[#191c1e] block">
                Phân loại rủi ro (BYT)
              </label>
              <select
                id="risk-class"
                value={riskClass}
                onChange={(e) => setRiskClass(e.target.value as RiskClass)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              >
                <option value="D">Loại D (Hỗ trợ sự sống - Nguy cấp)</option>
                <option value="C">Loại C (Rủi ro cao)</option>
                <option value="B">Loại B (Rủi ro trung bình)</option>
                <option value="A">Loại A (Rủi ro thấp)</option>
              </select>
            </div>
          </div>

          {/* Vietnamese Name & International Name */}
          <div className="space-y-1">
            <label htmlFor="vn-name" className="font-semibold text-[#191c1e] block">
              Tên thiết bị (Tiếng Việt) <span className="text-red-500">*</span>
            </label>
            <input
              id="vn-name"
              type="text"
              required
              value={vietnameseName}
              onChange={(e) => { setVietnameseName(e.target.value); setErrorMsg(''); }}
              placeholder="VD: Hệ thống máy thở cao cấp có monitor tích hợp"
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
            />
          </div>

          <div className="space-y-1">
            <label htmlFor="eng-name" className="font-semibold text-[#191c1e] block">
              Tên quốc tế (English Name / Description)
            </label>
            <input
              id="eng-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="VD: High-frequency ICU Ventilator"
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
            />
          </div>

          {/* Model & Manufacturer & Country */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="dev-model" className="font-semibold text-[#191c1e] block">
                Model / Dòng máy <span className="text-red-500">*</span>
              </label>
              <input
                id="dev-model"
                type="text"
                required
                value={model}
                onChange={(e) => { setModel(e.target.value); setErrorMsg(''); }}
                placeholder="VD: Servo-i / Primus"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="dev-maker" className="font-semibold text-[#191c1e] block">
                Hãng sản xuất <span className="text-red-500">*</span>
              </label>
              <input
                id="dev-maker"
                type="text"
                required
                value={manufacturer}
                onChange={(e) => { setManufacturer(e.target.value); setErrorMsg(''); }}
                placeholder="VD: GE Healthcare / Philips / Dräger"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="dev-country" className="font-semibold text-[#191c1e] block">
                Nước sản xuất
              </label>
              <input
                id="dev-country"
                type="text"
                value={countryOfOrigin}
                onChange={(e) => setCountryOfOrigin(e.target.value)}
                placeholder="VD: Đức, Mỹ, Nhật Bản"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
          </div>

          {/* Department & Room/Bed */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="dev-dept" className="font-semibold text-[#191c1e] block">
                Khoa phòng phân bổ
              </label>
              <select
                id="dev-dept"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              >
                {DEPARTMENTS.filter(d => d !== 'Tất cả khoa phòng').map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label htmlFor="dev-room" className="font-semibold text-[#191c1e] block">
                Phòng / Buồng / Vị trí đặt
              </label>
              <input
                id="dev-room"
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="VD: Phòng Hồi sức 02, Giường 05"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
          </div>

          {/* Financial & Warranty & Inspection schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1">
              <label htmlFor="dev-val" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#0e7c86]" /> Nguyên giá đầu tư (VNĐ)
              </label>
              <input
                id="dev-val"
                type="number"
                min="0"
                step="1000000"
                value={purchaseValueVND}
                onChange={(e) => setPurchaseValueVND(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="dev-warranty" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0e7c86]" /> Hạn bảo hành
              </label>
              <input
                id="dev-warranty"
                type="date"
                value={warrantyExpiry}
                onChange={(e) => setWarrantyExpiry(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="dev-next-mnt" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0e7c86]" /> Hạn kiểm định tới
              </label>
              <input
                id="dev-next-mnt"
                type="date"
                required
                value={nextMaintenanceDate}
                onChange={(e) => setNextMaintenanceDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="dev-notes" className="font-semibold text-[#191c1e] block">
              Ghi chú vận hành lâm sàng
            </label>
            <textarea
              id="dev-notes"
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Yêu cầu môi trường bảo quản, nguồn điện UPS, phụ kiện đi kèm..."
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#505f76] rounded-lg font-semibold transition"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu và đưa vào quản lý</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
