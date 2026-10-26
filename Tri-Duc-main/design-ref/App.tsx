/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { INITIAL_ASSETS } from './data/mockAssets';
import { MedicalAsset, MaintenanceEvent, AssetStatus, MaintenanceFilterOptions } from './types/asset';
import { filterAssets } from './utils/assetCalculations';
import { Header } from './components/Header';
import { MetricCards } from './components/MetricCards';
import { FilterBar } from './components/FilterBar';
import { AssetTable } from './components/AssetTable';
import { AssetDetailModal } from './components/AssetDetailModal';
import { AddAssetModal } from './components/AddAssetModal';
import { MaintenanceTicketModal } from './components/MaintenanceTicketModal';
import { BarcodeScannerModal } from './components/BarcodeScannerModal';
import { QrCodeTagModal } from './components/QrCodeTagModal';
import { DepartmentAnalyticsView } from './components/DepartmentAnalyticsView';
import { WardMapView } from './components/WardMapView';
import { CheckCircle, AlertCircle, CalendarClock, ShieldCheck } from 'lucide-react';

export default function App() {
  const [assets, setAssets] = useState<MedicalAsset[]>(() => {
    const saved = localStorage.getItem('clinical_assets_v1');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return INITIAL_ASSETS;
      }
    }
    return INITIAL_ASSETS;
  });

  const [activeView, setActiveView] = useState<'inventory' | 'maintenance' | 'analytics' | 'ward_map'>('inventory');
  
  const [filters, setFilters] = useState<MaintenanceFilterOptions>({
    searchQuery: '',
    department: 'all',
    status: 'all',
    riskClass: 'all',
    urgency: 'all'
  });

  const [selectedAsset, setSelectedAsset] = useState<MedicalAsset | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [maintenanceModalAsset, setMaintenanceModalAsset] = useState<MedicalAsset | null>(null);
  const [qrModalAsset, setQrModalAsset] = useState<MedicalAsset | null>(null);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'info' } | null>(null);

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem('clinical_assets_v1', JSON.stringify(assets));
    } catch {
      // localStorage error fallback
    }
  }, [assets]);

  // Keep selectedAsset in sync when assets list updates
  useEffect(() => {
    if (selectedAsset) {
      const updated = assets.find(a => a.id === selectedAsset.id);
      if (updated) setSelectedAsset(updated);
    }
  }, [assets]);

  // Toast auto-dismiss
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const showToast = (text: string, type: 'success' | 'info' = 'success') => {
    setToastMessage({ text, type });
  };

  const handleFilterChange = (newFilters: Partial<MaintenanceFilterOptions>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      department: 'all',
      status: 'all',
      riskClass: 'all',
      urgency: 'all'
    });
  };

  // Add new asset
  const handleAddAsset = (newAsset: MedicalAsset) => {
    setAssets(prev => [newAsset, ...prev]);
    showToast(`Đã thêm thiết bị mới thành công: ${newAsset.assetTag} (${newAsset.vietnameseName})`);
  };

  // Add maintenance ticket
  const handleAddMaintenanceEvent = (
    assetId: string,
    event: MaintenanceEvent,
    newStatus?: AssetStatus,
    nextMaintenanceDate?: string
  ) => {
    setAssets(prev => prev.map(asset => {
      if (asset.id !== assetId) return asset;

      const updatedHistory = [event, ...asset.maintenanceHistory];
      return {
        ...asset,
        status: newStatus || asset.status,
        lastMaintenanceDate: event.date,
        nextMaintenanceDate: nextMaintenanceDate || asset.nextMaintenanceDate,
        maintenanceHistory: updatedHistory,
      };
    }));

    showToast(`Đã lưu biên bản kiểm định & cập nhật hồ sơ kỹ thuật ${event.id}`);
  };

  // Quick status update
  const handleStatusUpdate = (assetId: string, status: AssetStatus) => {
    setAssets(prev => prev.map(a => a.id === assetId ? { ...a, status } : a));
    showToast('Đã cập nhật trạng thái thiết bị thành công');
  };

  // Export CSV
  const handleExportReport = () => {
    const headers = [
      'Mã tài sản (Asset Tag)',
      'Tên thiết bị (Tiếng Việt)',
      'Model',
      'Hãng sản xuất',
      'Khoa phòng',
      'Vị trí',
      'Phân loại rủi ro (BYT)',
      'Trạng thái',
      'Kỳ kiểm định tới',
      'Nguyên giá (VND)'
    ];

    const rows = assets.map(a => [
      `"${a.assetTag}"`,
      `"${a.vietnameseName.replace(/"/g, '""')}"`,
      `"${a.model}"`,
      `"${a.manufacturer}"`,
      `"${a.department}"`,
      `"${a.room}"`,
      `"Loại ${a.riskClass}"`,
      `"${a.status}"`,
      `"${a.nextMaintenanceDate}"`,
      a.purchaseValueVND
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Kiem_ke_Thiet_bi_Y_te_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Đã xuất file kiểm kê thiết bị thành công (CSV UTF-8)');
  };

  // Filtered assets
  const filteredAssets = useMemo(() => {
    if (activeView === 'maintenance') {
      // In maintenance view, show assets that need maintenance or calibration by default
      return filterAssets(assets, {
        ...filters,
        status: filters.status !== 'all' ? filters.status : undefined
      });
    }
    return filterAssets(assets, filters);
  }, [assets, filters, activeView]);

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] flex flex-col font-sans">
      {/* Toast Notification */}
      {toastMessage && (
        <div 
          className="fixed bottom-5 right-5 z-50 bg-[#191c1e] text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2.5 text-xs font-medium border border-[#3e494a] animate-in slide-in-from-bottom-3"
          role="status"
        >
          <CheckCircle className="w-4 h-4 text-[#98f0fb]" />
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Main App Header */}
      <Header
        assets={assets}
        activeView={activeView}
        onViewChange={(view) => {
          setActiveView(view);
          if (view === 'maintenance') {
            setFilters(prev => ({ ...prev, status: 'all', urgency: 'due_soon' }));
          } else {
            setFilters(prev => ({ ...prev, urgency: 'all' }));
          }
        }}
        onOpenAddModal={() => setIsAddModalOpen(true)}
        onOpenScanner={() => setIsScannerOpen(true)}
        onExportReport={handleExportReport}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* KPI Strip */}
        <MetricCards
          assets={assets}
          onSelectQuickFilter={(statusKey) => {
            setActiveView('inventory');
            setFilters(prev => ({ ...prev, status: statusKey, urgency: 'all' }));
          }}
          selectedStatusFilter={filters.status || 'all'}
        />

        {/* Dynamic Views */}
        {activeView === 'inventory' && (
          <div className="space-y-4">
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredAssets.length}
            />

            <AssetTable
              assets={filteredAssets}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onOpenMaintenanceModal={(asset) => setMaintenanceModalAsset(asset)}
              onOpenQrModal={(asset) => setQrModalAsset(asset)}
              onQuickStatusUpdate={handleStatusUpdate}
            />
          </div>
        )}

        {activeView === 'maintenance' && (
          <div className="space-y-4">
            {/* Maintenance Planning Banner */}
            <div className="bg-[#fef7e0] border border-[#feefc3] p-4 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#b06000] text-white flex items-center justify-center shrink-0">
                  <CalendarClock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#b06000]">
                    Kế Hoạch &amp; Lịch Trình Kiểm Định - Bảo Dưỡng Dự Phòng
                  </h3>
                  <p className="text-[#505f76] mt-0.5">
                    Hiển thị các thiết bị đã quá hạn hoặc đến hạn bảo dưỡng trong 14 ngày tới theo tiêu chuẩn Bộ Y tế.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, urgency: prev.urgency === 'overdue' ? 'all' : 'overdue' }))}
                  className={`px-3 py-1.5 rounded-lg font-bold border transition ${
                    filters.urgency === 'overdue'
                      ? 'bg-red-600 text-white border-red-700'
                      : 'bg-white text-red-700 border-red-200 hover:bg-red-50'
                  }`}
                >
                  Chỉ xem Quá Hạn
                </button>
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, urgency: 'due_soon' }))}
                  className="px-3 py-1.5 bg-white text-[#b06000] border border-[#feefc3] rounded-lg font-bold hover:bg-amber-100 transition"
                >
                  Đến hạn trong 14 ngày
                </button>
              </div>
            </div>

            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalResults={filteredAssets.length}
            />

            <AssetTable
              assets={filteredAssets}
              onSelectAsset={(asset) => setSelectedAsset(asset)}
              onOpenMaintenanceModal={(asset) => setMaintenanceModalAsset(asset)}
              onOpenQrModal={(asset) => setQrModalAsset(asset)}
              onQuickStatusUpdate={handleStatusUpdate}
            />
          </div>
        )}

        {activeView === 'analytics' && (
          <DepartmentAnalyticsView
            assets={assets}
            onSelectDepartment={(deptName) => {
              setFilters(prev => ({ ...prev, department: deptName }));
              setActiveView('inventory');
            }}
          />
        )}

        {activeView === 'ward_map' && (
          <WardMapView
            assets={assets}
            onSelectAsset={(asset) => setSelectedAsset(asset)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-[#e2e8f0] py-4 text-xs text-[#64748b]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-[#191c1e]">Clinical Asset Intelligence</span>
            <span>&bull;</span>
            <span>Phân hệ Quản lý Trang thiết bị Y tế &amp; Vận hành Lâm sàng</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 text-emerald-700">
              <ShieldCheck className="w-3.5 h-3.5" /> Chuẩn ISO 13485:2016
            </span>
            <span>&bull;</span>
            <span>Hỗ trợ HL7 FHIR API</span>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <AssetDetailModal
        asset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
        onOpenMaintenanceModal={(asset) => {
          setSelectedAsset(null);
          setMaintenanceModalAsset(asset);
        }}
        onOpenQrModal={(asset) => {
          setQrModalAsset(asset);
        }}
        onStatusUpdate={handleStatusUpdate}
      />

      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddAsset={handleAddAsset}
      />

      <MaintenanceTicketModal
        asset={maintenanceModalAsset}
        onClose={() => setMaintenanceModalAsset(null)}
        onSubmit={handleAddMaintenanceEvent}
      />

      <BarcodeScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        assets={assets}
        onAssetFound={(asset) => {
          setSelectedAsset(asset);
        }}
      />

      <QrCodeTagModal
        asset={qrModalAsset}
        onClose={() => setQrModalAsset(null)}
      />
    </div>
  );
}
