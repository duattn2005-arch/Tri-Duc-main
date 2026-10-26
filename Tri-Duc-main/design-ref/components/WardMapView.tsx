import React, { useState } from 'react';
import { MapPin, Activity, Cpu, ArrowUpRight, Bed, HeartPulse, ShieldAlert } from 'lucide-react';
import { MedicalAsset } from '../types/asset';
import { getStatusBadge, getRiskClassBadge } from '../utils/assetCalculations';

interface WardMapViewProps {
  assets: MedicalAsset[];
  onSelectAsset: (asset: MedicalAsset) => void;
}

export const WardMapView: React.FC<WardMapViewProps> = ({
  assets,
  onSelectAsset,
}) => {
  const [selectedZone, setSelectedZone] = useState<string>('all');

  const zones = [
    { id: 'all', name: 'Toàn Viện (Tất cả khu vực)' },
    { id: 'icu', name: 'Khu Hồi Sức Tích Cực (ICU / NICU)', deptMatch: 'Hồi sức tích cực' },
    { id: 'or', name: 'Khối Phòng Mổ & Gây Mê (Surgical Suite)', deptMatch: 'Phẫu thuật' },
    { id: 'er', name: 'Khoa Cấp Cứu (Emergency / Trauma)', deptMatch: 'Cấp cứu' },
    { id: 'rad', name: 'Chẩn Đoán Hình Ảnh (Radiology Center)', deptMatch: 'Chẩn đoán hình ảnh' },
    { id: 'dialysis', name: 'Khu Thận Nhân Tạo & Lọc Máu', deptMatch: 'Thận nhân tạo' },
  ];

  const filteredAssets = selectedZone === 'all'
    ? assets
    : assets.filter(a => {
        const zoneObj = zones.find(z => z.id === selectedZone);
        return zoneObj?.deptMatch ? a.department.includes(zoneObj.deptMatch) : true;
      });

  return (
    <div className="space-y-6">
      {/* Zone selection bar */}
      <div className="bg-white rounded-lg p-4 border border-[#e2e8f0] shadow-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#0e7c86]" />
          <div>
            <h3 className="text-sm font-bold text-[#191c1e]">
              Sơ Đồ Phân Bổ Vị Trí Thiết Bị Theo Buồng Bệnh &amp; Giường
            </h3>
            <p className="text-xs text-[#505f76]">
              Giám sát không gian thực địa trang thiết bị y tế lưu động và cố định
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {zones.map(z => (
            <button
              key={z.id}
              type="button"
              onClick={() => setSelectedZone(z.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                selectedZone === z.id
                  ? 'bg-[#0e7c86] text-white shadow-xs'
                  : 'bg-[#f1f5f9] text-[#505f76] hover:bg-[#e2e8f0]'
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of rooms and equipment stations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAssets.map(asset => {
          const status = getStatusBadge(asset.status);
          const risk = getRiskClassBadge(asset.riskClass);

          return (
            <div
              key={asset.id}
              onClick={() => onSelectAsset(asset)}
              className="bg-white rounded-lg border border-[#e2e8f0] p-4 shadow-xs hover:border-[#0e7c86] transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div>
                {/* Room location badge */}
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-1.5 text-xs font-bold text-[#0e7c86] bg-[#ddfbff] px-2.5 py-1 rounded-md">
                    <Bed className="w-3.5 h-3.5" />
                    <span>{asset.room}</span>
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${risk.bg}`}>
                    {risk.shortLabel}
                  </span>
                </div>

                <div className="text-[11px] font-mono text-[#64748b] mb-1">
                  {asset.department} &bull; <strong className="text-[#0e7c86]">{asset.assetTag}</strong>
                </div>

                <h4 className="text-sm font-bold text-[#191c1e] group-hover:text-[#0e7c86] transition">
                  {asset.vietnameseName}
                </h4>

                <p className="text-xs text-[#505f76] mt-1">
                  {asset.manufacturer} ({asset.model}) &bull; S/N: {asset.serialNumber}
                </p>
              </div>

              {/* Status and Telemetry strip */}
              <div className="mt-4 pt-3 border-t border-[#f1f5f9] flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full ${status.dotColor}`} />
                  <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${status.bg}`}>
                    {status.label}
                  </span>
                </div>

                <div className="flex items-center gap-1 font-mono text-[#0e7c86] font-semibold text-xs group-hover:underline">
                  <span>Hồ sơ kỹ thuật</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
