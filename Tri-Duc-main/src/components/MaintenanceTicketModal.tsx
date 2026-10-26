import React, { useState } from 'react';
import { X, Wrench, Calendar, User, Building, DollarSign, CheckCircle2 } from 'lucide-react';
import { MedicalAsset, MaintenanceEvent, AssetStatus } from '../types/asset';

interface MaintenanceTicketModalProps {
  asset: MedicalAsset | null;
  onClose: () => void;
  onSubmit: (assetId: string, event: MaintenanceEvent, newStatus?: AssetStatus, nextMaintenanceDate?: string) => void;
}

export const MaintenanceTicketModal: React.FC<MaintenanceTicketModalProps> = ({
  asset,
  onClose,
  onSubmit,
}) => {
  if (!asset) return null;

  const [title, setTitle] = useState('');
  const [type, setType] = useState<MaintenanceEvent['type']>('preventive');
  const [date, setDate] = useState('2026-10-26');
  const [technician, setTechnician] = useState('');
  const [organization, setOrganization] = useState('Phòng Vật tư & Thiết bị Y tế BV');
  const [result, setResult] = useState<MaintenanceEvent['result']>('passed');
  const [notes, setNotes] = useState('');
  const [cost, setCost] = useState<string>('0');
  const [nextDate, setNextDate] = useState('2027-04-26');
  const [updateStatusToOperational, setUpdateStatusToOperational] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Vui lòng nhập tiêu đề phiếu bảo dưỡng / kiểm định.');
      return;
    }
    if (!technician.trim()) {
      setErrorMsg('Vui lòng nhập tên kỹ sư / cán bộ kỹ thuật thực hiện.');
      return;
    }

    const eventId = `MNT-2026-${Math.floor(100 + Math.random() * 900)}`;
    const newEvent: MaintenanceEvent = {
      id: eventId,
      date,
      type,
      title: title.trim(),
      technician: technician.trim(),
      organization: organization.trim(),
      result,
      notes: notes.trim() || 'Hoàn tất quy trình kiểm tra theo danh mục chuẩn kiểm định y tế.',
      cost: parseFloat(cost) || 0,
      nextDate: nextDate || undefined
    };

    const newStatus: AssetStatus | undefined = updateStatusToOperational && result === 'passed' 
      ? 'operational' 
      : (result === 'in_progress' ? 'under_repair' : undefined);

    onSubmit(asset.id, newEvent, newStatus, nextDate);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mnt-modal-title"
    >
      <div className="bg-white rounded-xl shadow-xl w-full max-w-xl overflow-hidden border border-[#e2e8f0]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-[#ddfbff] text-[#0e7c86] flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 id="mnt-modal-title" className="text-base font-bold text-[#191c1e]">
                Ghi Phiếu Bảo Trì &amp; Kiểm Định Kỹ Thuật
              </h3>
              <p className="text-xs text-[#505f76] font-mono">
                {asset.assetTag} &bull; {asset.vietnameseName}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-[#64748b] hover:text-[#191c1e] hover:bg-gray-200 rounded-lg transition"
            aria-label="Đóng cửa sổ"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 text-xs">
          {errorMsg && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
              {errorMsg}
            </div>
          )}

          {/* Title & Type */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2 space-y-1">
              <label htmlFor="mnt-title" className="font-semibold text-[#191c1e] block">
                Tiêu đề công việc <span className="text-red-500">*</span>
              </label>
              <input
                id="mnt-title"
                type="text"
                required
                value={title}
                onChange={(e) => { setTitle(e.target.value); setErrorMsg(''); }}
                placeholder="VD: Bảo dưỡng định kỳ 6 tháng & Kiểm định sai số"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mnt-type" className="font-semibold text-[#191c1e] block">
                Phân loại hình thức
              </label>
              <select
                id="mnt-type"
                value={type}
                onChange={(e) => setType(e.target.value as MaintenanceEvent['type'])}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              >
                <option value="preventive">Bảo dưỡng định kỳ</option>
                <option value="calibration">Hiệu chuẩn đo lường</option>
                <option value="repair">Sửa chữa sự cố</option>
                <option value="inspection">Kiểm định an toàn</option>
                <option value="commissioning">Nghiệm thu lắp đặt</option>
              </select>
            </div>
          </div>

          {/* Date & Result */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="mnt-date" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0e7c86]" /> Ngày thực hiện
              </label>
              <input
                id="mnt-date"
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mnt-result" className="font-semibold text-[#191c1e] block">
                Kết quả kiểm định
              </label>
              <select
                id="mnt-result"
                value={result}
                onChange={(e) => setResult(e.target.value as MaintenanceEvent['result'])}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              >
                <option value="passed">ĐẠT CHUẨN (Passed - Cấp tem kiểm định)</option>
                <option value="in_progress">ĐANG XỬ LÝ (In Progress)</option>
                <option value="pending">CHỜ DUYỆT (Pending Evaluation)</option>
                <option value="failed">KHÔNG ĐẠT (Failed - Cần sửa chữa)</option>
              </select>
            </div>
          </div>

          {/* Technician & Organization */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="mnt-tech" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#0e7c86]" /> Kỹ sư / Cán bộ phụ trách <span className="text-red-500">*</span>
              </label>
              <input
                id="mnt-tech"
                type="text"
                required
                value={technician}
                onChange={(e) => { setTechnician(e.target.value); setErrorMsg(''); }}
                placeholder="VD: Ks. Nguyễn Hoàng Nam"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mnt-org" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <Building className="w-3.5 h-3.5 text-[#0e7c86]" /> Đơn vị thực hiện
              </label>
              <input
                id="mnt-org"
                type="text"
                value={organization}
                onChange={(e) => setOrganization(e.target.value)}
                placeholder="VD: Đại diện hãng / Trung tâm kiểm định"
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
          </div>

          {/* Cost & Next Scheduled Date */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <label htmlFor="mnt-cost" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-[#0e7c86]" /> Chi phí thực hiện (VNĐ)
              </label>
              <input
                id="mnt-cost"
                type="number"
                min="0"
                step="500000"
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>

            <div className="space-y-1">
              <label htmlFor="mnt-next-date" className="font-semibold text-[#191c1e] block flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#0e7c86]" /> Hạn kiểm định kế tiếp
              </label>
              <input
                id="mnt-next-date"
                type="date"
                required
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
                className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
          </div>

          {/* Notes */}
          <div className="space-y-1">
            <label htmlFor="mnt-notes" className="font-semibold text-[#191c1e] block">
              Nội dung biên bản kỹ thuật &amp; Ghi chú chi tiết
            </label>
            <textarea
              id="mnt-notes"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Ghi nhận tình trạng trước và sau bảo dưỡng, linh kiện thay thế, chỉ số đo lường..."
              className="w-full px-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
            />
          </div>

          {/* Status update checkbox */}
          <div className="pt-2">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={updateStatusToOperational}
                onChange={(e) => setUpdateStatusToOperational(e.target.checked)}
                className="w-4 h-4 rounded border-[#cbd5e1] text-[#0e7c86] focus:ring-[#0e7c86]"
              />
              <span className="text-[#191c1e] font-medium">
                Tự động chuyển trạng thái thiết bị sang <strong>&ldquo;Operational / Sẵn sàng&rdquo;</strong> nếu kiểm định đạt chuẩn
              </span>
            </label>
          </div>

          {/* Footer buttons */}
          <div className="pt-3 border-t border-[#f1f5f9] flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-[#cbd5e1] hover:bg-[#f1f5f9] text-[#505f76] rounded-lg font-semibold transition"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg font-semibold transition shadow-xs flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Lưu biên bản bảo trì</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
