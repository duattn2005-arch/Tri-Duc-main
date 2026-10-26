import React, { useRef } from 'react';
import { X, Printer, ShieldCheck, Download, Activity, Hospital } from 'lucide-react';
import { MedicalAsset } from '../types/asset';
import { getRiskClassBadge } from '../utils/assetCalculations';

interface QrCodeTagModalProps {
  asset: MedicalAsset | null;
  onClose: () => void;
}

export const QrCodeTagModal: React.FC<QrCodeTagModalProps> = ({
  asset,
  onClose,
}) => {
  const printRef = useRef<HTMLDivElement>(null);

  if (!asset) return null;

  const riskBadge = getRiskClassBadge(asset.riskClass);

  const handlePrint = () => {
    window.print();
  };

  // Generate deterministic pseudo-random QR pattern dots based on assetTag string
  const generateQrDots = (text: string) => {
    const size = 21; // 21x21 QR Version 1 grid
    const dots: boolean[][] = [];
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = (hash << 5) - hash + text.charCodeAt(i);
      hash |= 0;
    }

    for (let r = 0; r < size; r++) {
      dots[r] = [];
      for (let c = 0; c < size; c++) {
        // Standard QR Finder patterns (top-left, top-right, bottom-left 7x7 corners)
        const isTopLeft = r < 7 && c < 7;
        const isTopRight = r < 7 && c >= size - 7;
        const isBottomLeft = r >= size - 7 && c < 7;

        if (isTopLeft || isTopRight || isBottomLeft) {
          // outer 7x7 box border
          const localR = isBottomLeft ? r - (size - 7) : r;
          const localC = isTopRight ? c - (size - 7) : c;
          if (localR === 0 || localR === 6 || localC === 0 || localC === 6) {
            dots[r][c] = true;
          } else if (localR >= 2 && localR <= 4 && localC >= 2 && localC <= 4) {
            dots[r][c] = true;
          } else {
            dots[r][c] = false;
          }
        } else {
          // Inner data patterns derived from text hash and coordinates
          const val = Math.sin((r + 1) * (c + 1) * (Math.abs(hash) % 100)) * 10000;
          dots[r][c] = (val - Math.floor(val)) > 0.45;
        }
      }
    }
    return { size, dots };
  };

  const { size, dots } = generateQrDots(asset.assetTag + asset.serialNumber);

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-[#e2e8f0]">
        {/* Header */}
        <div className="p-4 border-b border-[#e2e8f0] bg-[#f8fafc] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hospital className="w-5 h-5 text-[#0e7c86]" />
            <h3 id="qr-modal-title" className="text-sm font-bold text-[#191c1e]">
              Tem Nhãn Định Danh Thiết Bị (Asset QR Tag)
            </h3>
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

        {/* Printable Label Preview Area */}
        <div className="p-6 bg-[#f1f5f9] flex justify-center">
          <div 
            ref={printRef}
            className="w-full max-w-sm bg-white p-4 rounded-lg border-2 border-dashed border-[#0e7c86]/60 shadow-md relative"
          >
            {/* Tag Header */}
            <div className="border-b-2 border-[#0e7c86] pb-2 mb-3 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className="w-6 h-6 rounded bg-[#0e7c86] text-white flex items-center justify-center">
                  <Activity className="w-3.5 h-3.5" />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-[#0e7c86] uppercase tracking-wider">
                    BỆNH VIỆN ĐA KHOA QUỐC TẾ
                  </div>
                  <div className="text-[9px] text-[#64748b]">PHÒNG VẬT TƯ &amp; TRANG THIẾT BỊ Y TẾ</div>
                </div>
              </div>

              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${riskBadge.bg}`}>
                {riskBadge.shortLabel}
              </span>
            </div>

            {/* QR Code and Key Data */}
            <div className="flex items-center gap-3">
              {/* Scalable SVG QR Code */}
              <div className="p-1.5 bg-white border border-[#cbd5e1] rounded shrink-0 shadow-2xs">
                <svg
                  viewBox={`0 0 ${size} ${size}`}
                  className="w-24 h-24"
                  shapeRendering="crispEdges"
                >
                  <rect width={size} height={size} fill="#ffffff" />
                  {dots.map((row, r) =>
                    row.map((dot, c) =>
                      dot ? (
                        <rect
                          key={`${r}-${c}`}
                          x={c}
                          y={r}
                          width="1"
                          height="1"
                          fill="#00626a"
                        />
                      ) : null
                    )
                  )}
                </svg>
              </div>

              {/* Data Specifications */}
              <div className="text-[10px] space-y-1 flex-1 min-w-0">
                <div>
                  <span className="text-[#64748b] block text-[9px] uppercase">Mã tài sản:</span>
                  <span className="font-mono font-bold text-xs text-[#0e7c86] block truncate">
                    {asset.assetTag}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[9px] uppercase">Số Serial:</span>
                  <span className="font-mono font-semibold text-[#191c1e] block truncate">
                    {asset.serialNumber}
                  </span>
                </div>
                <div>
                  <span className="text-[#64748b] block text-[9px] uppercase">Khoa phòng:</span>
                  <span className="font-medium text-[#191c1e] block truncate">
                    {asset.department}
                  </span>
                </div>
              </div>
            </div>

            {/* Device Name Banner */}
            <div className="mt-3 pt-2 border-t border-[#e2e8f0]">
              <div className="text-[11px] font-bold text-[#191c1e] line-clamp-1">
                {asset.vietnameseName}
              </div>
              <div className="text-[9px] text-[#505f76] truncate">
                {asset.manufacturer} &bull; Model: {asset.model}
              </div>
            </div>

            {/* Next Inspection Strip */}
            <div className="mt-2.5 p-1.5 bg-[#f8fafc] rounded border border-[#e2e8f0] flex items-center justify-between text-[10px]">
              <span className="text-[#505f76] font-medium">HẠN KIỂM ĐỊNH KẾ TIẾP:</span>
              <strong className="font-mono text-[#ba1a1a] font-bold">
                {asset.nextMaintenanceDate}
              </strong>
            </div>

            {/* Simulated Barcode Stripe */}
            <div className="mt-2 pt-2 border-t border-dashed border-[#cbd5e1] text-center">
              <div className="h-5 flex items-stretch justify-center gap-[2px] opacity-80 overflow-hidden">
                {[2, 1, 3, 1, 2, 4, 1, 3, 2, 1, 3, 1, 4, 2, 1, 3, 1, 2, 3, 1, 2, 4, 1, 2, 3, 1, 2].map((w, i) => (
                  <span
                    key={i}
                    style={{ width: `${w}px` }}
                    className={i % 2 === 0 ? 'bg-black' : 'bg-transparent'}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono text-[#64748b] tracking-widest mt-0.5 block">
                *{asset.assetTag}*
              </span>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-white border-t border-[#e2e8f0] flex items-center justify-between text-xs">
          <div className="text-[11px] text-[#64748b] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0e7c86]" />
            <span>Kích thước tem chuẩn 50x35mm</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="px-4 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg font-semibold transition flex items-center gap-1.5 shadow-xs"
            >
              <Printer className="w-4 h-4" />
              <span>In tem nhãn</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
