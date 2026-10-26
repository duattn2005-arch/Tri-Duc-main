import React from 'react';
import { Search, X, Filter, AlertCircle } from 'lucide-react';
import { MaintenanceFilterOptions } from '../types/asset';
import { DEPARTMENTS } from '../data/mockAssets';

interface FilterBarProps {
  filters: MaintenanceFilterOptions;
  onFilterChange: (newFilters: Partial<MaintenanceFilterOptions>) => void;
  onResetFilters: () => void;
  totalResults: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalResults,
}) => {
  const hasActiveFilters = 
    (filters.searchQuery && filters.searchQuery.trim() !== '') ||
    (filters.department && filters.department !== 'all') ||
    (filters.status && filters.status !== 'all') ||
    (filters.riskClass && filters.riskClass !== 'all') ||
    (filters.urgency && filters.urgency !== 'all');

  return (
    <div className="bg-white rounded-lg p-4 border border-[#e2e8f0] shadow-xs mb-5 space-y-3">
      {/* Top row: Search input + Department select + Risk Class select */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
        {/* Search input */}
        <div className="md:col-span-5 relative">
          <label htmlFor="asset-search" className="sr-only">Tìm kiếm thiết bị</label>
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#64748b]">
            <Search className="w-4 h-4" />
          </div>
          <input
            id="asset-search"
            type="text"
            value={filters.searchQuery || ''}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Tìm theo mã thẻ, tên thiết bị, model, số serial, hãng..."
            className="w-full pl-9 pr-9 py-2 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-xs sm:text-sm text-[#191c1e] placeholder-[#94a3b8] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86] focus:border-transparent transition"
          />
          {filters.searchQuery && (
            <button
              type="button"
              onClick={() => onFilterChange({ searchQuery: '' })}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-[#94a3b8] hover:text-[#191c1e]"
              aria-label="Xóa từ khóa tìm kiếm"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Department select */}
        <div className="md:col-span-4">
          <label htmlFor="dept-filter" className="sr-only">Lọc theo khoa phòng</label>
          <select
            id="dept-filter"
            value={filters.department || 'all'}
            onChange={(e) => onFilterChange({ department: e.target.value })}
            className="w-full py-2 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-xs sm:text-sm text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86] transition"
          >
            {DEPARTMENTS.map(dept => (
              <option key={dept} value={dept === 'Tất cả khoa phòng' ? 'all' : dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Risk Class select (BYT) */}
        <div className="md:col-span-3">
          <label htmlFor="risk-filter" className="sr-only">Lọc theo cấp độ rủi ro</label>
          <select
            id="risk-filter"
            value={filters.riskClass || 'all'}
            onChange={(e) => onFilterChange({ riskClass: e.target.value })}
            className="w-full py-2 px-3 bg-[#f8fafc] border border-[#cbd5e1] rounded-lg text-xs sm:text-sm text-[#191c1e] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e7c86] transition"
          >
            <option value="all">Phân loại rủi ro (Tất cả)</option>
            <option value="D">Loại D - Cực kỳ nguy cấp (Hỗ trợ sự sống)</option>
            <option value="C">Loại C - Rủi ro cao</option>
            <option value="B">Loại B - Rủi ro trung bình</option>
            <option value="A">Loại A - Rủi ro thấp</option>
          </select>
        </div>
      </div>

      {/* Bottom row: Status Pills & Urgency Quick Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#f1f5f9]">
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-[#64748b] mr-1 flex items-center">
            <Filter className="w-3.5 h-3.5 mr-1" /> Trạng thái:
          </span>

          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'operational', label: 'Sẵn sàng' },
            { id: 'calibration', label: 'Hiệu chuẩn' },
            { id: 'maintenance_due', label: 'Đến hạn bảo dưỡng' },
            { id: 'under_repair', label: 'Sửa chữa' },
            { id: 'standby', label: 'Dự phòng' },
          ].map(statusTab => {
            const isActive = (filters.status || 'all') === statusTab.id;
            return (
              <button
                key={statusTab.id}
                type="button"
                onClick={() => onFilterChange({ status: statusTab.id })}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#0e7c86] text-white shadow-xs'
                    : 'bg-[#f1f5f9] text-[#505f76] hover:bg-[#e2e8f0]'
                }`}
              >
                {statusTab.label}
              </button>
            );
          })}
        </div>

        {/* Urgency Checkbox & Reset */}
        <div className="flex items-center gap-3">
          <label className="inline-flex items-center text-xs text-[#505f76] cursor-pointer select-none">
            <input
              type="checkbox"
              checked={filters.urgency === 'due_soon'}
              onChange={(e) => onFilterChange({ urgency: e.target.checked ? 'due_soon' : 'all' })}
              className="w-4 h-4 rounded border-[#cbd5e1] text-[#0e7c86] focus:ring-[#0e7c86] focus:ring-offset-0 mr-1.5"
            />
            <AlertCircle className="w-3.5 h-3.5 text-amber-600 mr-1" />
            <span>Cần bảo trì gấp (&le; 14 ngày)</span>
          </label>

          {hasActiveFilters && (
            <button
              type="button"
              onClick={onResetFilters}
              className="text-xs text-[#0e7c86] hover:text-[#00626a] font-medium underline underline-offset-2"
            >
              Đặt lại bộ lọc
            </button>
          )}

          <span className="text-xs font-mono font-medium text-[#64748b]">
            ({totalResults} thiết bị)
          </span>
        </div>
      </div>
    </div>
  );
};
