import React, { useState } from 'react';
import { X, QrCode, Search, CheckCircle, AlertTriangle, ArrowRight, Volume2, VolumeX } from 'lucide-react';
import { MedicalAsset } from '../types/asset';

interface BarcodeScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  assets: MedicalAsset[];
  onAssetFound: (asset: MedicalAsset) => void;
}

export const BarcodeScannerModal: React.FC<BarcodeScannerModalProps> = ({
  isOpen,
  onClose,
  assets,
  onAssetFound,
}) => {
  if (!isOpen) return null;

  const [inputCode, setInputCode] = useState('');
  const [matchedAsset, setMatchedAsset] = useState<MedicalAsset | null>(null);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [scanState, setScanState] = useState<'scanning' | 'found' | 'not_found'>('scanning');

  const playBeep = () => {
    if (!soundEnabled) return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, audioCtx.currentTime); // High pitch crisp scanner beep
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.12);
    } catch {
      // AudioContext fallback
    }
  };

  const handleLookup = (codeToLookup: string) => {
    const code = codeToLookup.trim().toLowerCase();
    if (!code) return;

    const found = assets.find(
      a => a.assetTag.toLowerCase() === code || 
           a.serialNumber.toLowerCase() === code ||
           a.assetTag.toLowerCase().includes(code)
    );

    if (found) {
      playBeep();
      setMatchedAsset(found);
      setScanState('found');
    } else {
      setMatchedAsset(null);
      setScanState('not_found');
    }
  };

  const handleSelectMatched = () => {
    if (matchedAsset) {
      onAssetFound(matchedAsset);
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-150"
      role="dialog"
      aria-modal="true"
      aria-labelledby="scanner-modal-title"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden border border-[#e2e8f0]">
        {/* Header */}
        <div className="p-4 bg-[#191c1e] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#0e7c86] text-white flex items-center justify-center">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 id="scanner-modal-title" className="text-sm font-bold tracking-tight">
                Quét Mã Vạch / QR Code Thiết Bị Y Tế
              </h3>
              <p className="text-[11px] text-gray-400">
                Optical Barcode &amp; Matrix Code Diagnostic Scanner
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-1.5 text-gray-400 hover:text-white rounded-md transition"
              title={soundEnabled ? 'Tắt âm thanh quét' : 'Bật âm thanh quét'}
              aria-label={soundEnabled ? 'Tắt âm thanh quét' : 'Bật âm thanh quét'}
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-md transition"
              aria-label="Đóng máy quét"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scanner Viewport (Simulated Camera with reticle) */}
        <div className="relative bg-[#0b1c30] p-6 flex flex-col items-center justify-center min-h-[220px] overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-15 bg-[linear-gradient(to_right,#0e7c86_1px,transparent_1px),linear-gradient(to_bottom,#0e7c86_1px,transparent_1px)] bg-[size:16px_16px]" />

          {/* Scanner Reticle Frame */}
          <div className="relative w-56 h-36 border-2 border-[#0e7c86]/60 rounded-lg flex items-center justify-center p-2 shadow-[0_0_20px_rgba(14,124,134,0.3)]">
            {/* Corner brackets */}
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-[#98f0fb]" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-[#98f0fb]" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-[#98f0fb]" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-[#98f0fb]" />

            {/* Red laser line with CSS animation */}
            <div className="absolute left-2 right-2 h-0.5 bg-red-500 shadow-[0_0_8px_#ef4444] animate-pulse" />

            <div className="text-center z-10">
              <QrCode className="w-12 h-12 text-[#98f0fb]/40 mx-auto" />
              <span className="text-[11px] text-[#ddfbff] font-mono tracking-wider mt-1 block">
                ĐANG DÒ MÃ QUANG HỌC...
              </span>
            </div>
          </div>

          <p className="text-[11px] text-gray-400 mt-3 text-center z-10">
            Đặt tem nhãn mã vạch hoặc mã QR vào khung ngắm để nhận diện tự động
          </p>
        </div>

        {/* Quick Simulation Barcode Triggers */}
        <div className="p-4 bg-[#f8fafc] border-b border-[#e2e8f0] text-xs">
          <div className="text-[#505f76] font-semibold mb-2">
            Mô phỏng quét nhanh tem thiết bị trong kho:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {assets.slice(0, 6).map((asset) => (
              <button
                key={asset.id}
                type="button"
                onClick={() => {
                  setInputCode(asset.assetTag);
                  handleLookup(asset.assetTag);
                }}
                className="px-2 py-1 bg-white hover:bg-[#ddfbff] hover:text-[#00626a] border border-[#cbd5e1] rounded font-mono text-[11px] text-[#0e7c86] transition"
              >
                {asset.assetTag}
              </button>
            ))}
          </div>
        </div>

        {/* Manual Code Input Bar */}
        <div className="p-4 space-y-3">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleLookup(inputCode);
            }}
            className="flex gap-2"
          >
            <div className="relative flex-1">
              <input
                type="text"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
                placeholder="Nhập mã thẻ định danh hoặc số Serial..."
                className="w-full pl-3 pr-3 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-xs font-mono text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86]"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-lg text-xs font-semibold flex items-center gap-1 transition"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Tra cứu</span>
            </button>
          </form>

          {/* Result Card */}
          {scanState === 'found' && matchedAsset && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center justify-between text-xs animate-in fade-in">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="font-mono font-bold text-[#0e7c86]">{matchedAsset.assetTag}</div>
                  <div className="font-bold text-[#191c1e] line-clamp-1">{matchedAsset.vietnameseName}</div>
                  <div className="text-[11px] text-[#505f76]">{matchedAsset.department} &bull; {matchedAsset.room}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSelectMatched}
                className="px-3 py-1.5 bg-[#0e7c86] hover:bg-[#00626a] text-white rounded-md font-semibold text-xs flex items-center gap-1 transition shrink-0 ml-2 shadow-xs"
              >
                <span>Mở hồ sơ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {scanState === 'not_found' && (
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-center gap-2 text-xs text-amber-800">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Không tìm thấy thiết bị nào khớp với mã &ldquo;{inputCode}&rdquo;. Vui lòng kiểm tra lại.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
