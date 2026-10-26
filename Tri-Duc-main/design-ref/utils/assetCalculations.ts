import { MedicalAsset, AssetStatus, RiskClass, DepartmentMetric, MaintenanceFilterOptions } from '../types/asset';

/**
 * Calculates maintenance urgency based on the scheduled next date.
 * Returns 'overdue' if past date, 'due_soon' if within 14 days, or 'ok'.
 */
export function calculateMaintenanceUrgency(
  nextDateStr: string,
  referenceDateStr: string = '2026-10-26'
): 'overdue' | 'due_soon' | 'ok' {
  if (!nextDateStr) return 'ok';
  
  const nextDate = new Date(nextDateStr).getTime();
  const refDate = new Date(referenceDateStr).getTime();
  
  const diffDays = Math.ceil((nextDate - refDate) / (1000 * 60 * 60 * 24));
  
  if (diffDays < 0) {
    return 'overdue';
  } else if (diffDays <= 14) {
    return 'due_soon';
  }
  return 'ok';
}

/**
 * Calculates overall uptime percentage across operational assets.
 */
export function calculateOverallUptime(assets: MedicalAsset[]): number {
  if (assets.length === 0) return 0;
  
  // Weights based on risk class: Class D and C have higher weight on uptime criticality
  let totalWeightedUptime = 0;
  let totalWeights = 0;

  for (const asset of assets) {
    const weight = asset.riskClass === 'D' ? 3 : asset.riskClass === 'C' ? 2 : 1;
    let effectiveUptime = 100;
    if (asset.status === 'under_repair') {
      effectiveUptime = 0;
    } else if (asset.status === 'maintenance_due' || asset.status === 'calibration') {
      effectiveUptime = 60;
    } else if (asset.status === 'standby') {
      effectiveUptime = 95;
    } else {
      effectiveUptime = asset.telemetry.utilizationRate > 0 ? 99.4 : 98.5;
    }

    totalWeightedUptime += effectiveUptime * weight;
    totalWeights += weight;
  }

  const result = totalWeightedUptime / totalWeights;
  return Math.round(result * 10) / 10;
}

/**
 * Aggregates statistics by hospital department.
 */
export function calculateDepartmentMetrics(assets: MedicalAsset[]): DepartmentMetric[] {
  const deptMap: { [key: string]: MedicalAsset[] } = {};

  for (const asset of assets) {
    if (!deptMap[asset.department]) {
      deptMap[asset.department] = [];
    }
    deptMap[asset.department].push(asset);
  }

  return Object.keys(deptMap).map(department => {
    const list = deptMap[department];
    const operational = list.filter(a => a.status === 'operational').length;
    const maintenanceDue = list.filter(a => a.status === 'maintenance_due' || a.status === 'under_repair').length;
    const critical = list.filter(a => a.riskClass === 'D').length;
    const uptime = list.length > 0 ? Math.round((operational / list.length) * 1000) / 10 : 0;

    return {
      department,
      totalAssets: list.length,
      operationalAssets: operational,
      maintenanceDueAssets: maintenanceDue,
      criticalAssets: critical,
      uptimePercentage: uptime
    };
  });
}

/**
 * Filters asset collection based on user queries, department, status, risk class, and urgency.
 */
export function filterAssets(assets: MedicalAsset[], filters: MaintenanceFilterOptions): MedicalAsset[] {
  return assets.filter(asset => {
    if (filters.searchQuery && filters.searchQuery.trim() !== '') {
      const q = filters.searchQuery.toLowerCase().trim();
      const matchName = asset.name.toLowerCase().includes(q) || asset.vietnameseName.toLowerCase().includes(q);
      const matchSerial = asset.serialNumber.toLowerCase().includes(q);
      const matchTag = asset.assetTag.toLowerCase().includes(q);
      const matchModel = asset.model.toLowerCase().includes(q);
      const matchManufacturer = asset.manufacturer.toLowerCase().includes(q);
      const matchRoom = asset.room.toLowerCase().includes(q);
      if (!matchName && !matchSerial && !matchTag && !matchModel && !matchManufacturer && !matchRoom) {
        return false;
      }
    }

    if (filters.department && filters.department !== 'all') {
      if (asset.department !== filters.department) {
        return false;
      }
    }

    if (filters.status && filters.status !== 'all') {
      if (asset.status !== filters.status) {
        return false;
      }
    }

    if (filters.riskClass && filters.riskClass !== 'all') {
      if (asset.riskClass !== filters.riskClass) {
        return false;
      }
    }

    if (filters.urgency && filters.urgency !== 'all') {
      const urgency = calculateMaintenanceUrgency(asset.nextMaintenanceDate);
      if (filters.urgency === 'overdue' && urgency !== 'overdue') return false;
      if (filters.urgency === 'due_soon' && urgency !== 'due_soon' && urgency !== 'overdue') return false;
    }

    return true;
  });
}

/**
 * Format currency in Vietnamese Dong (VND).
 */
export function formatVND(amount: number): string {
  if (amount >= 1_000_000_000) {
    const val = (amount / 1_000_000_000).toFixed(1).replace('.0', '');
    return `${val} tỷ ₫`;
  }
  if (amount >= 1_000_000) {
    const val = Math.round(amount / 1_000_000);
    return `${val} tr ₫`;
  }
  return amount.toLocaleString('vi-VN') + ' ₫';
}

/**
 * Get visual styling parameters for risk classes according to MOH standards.
 */
export function getRiskClassBadge(riskClass: RiskClass) {
  switch (riskClass) {
    case 'D':
      return {
        label: 'Loại D (Cực kỳ nguy cấp)',
        shortLabel: 'Loại D',
        bg: 'bg-red-50 text-red-700 border-red-200',
        text: 'text-red-700',
        description: 'Thiết bị hỗ trợ duy trì sự sống'
      };
    case 'C':
      return {
        label: 'Loại C (Rủi ro cao)',
        shortLabel: 'Loại C',
        bg: 'bg-amber-50 text-amber-800 border-amber-200',
        text: 'text-amber-800',
        description: 'Rủi ro tiềm ẩn mức trung bình-cao'
      };
    case 'B':
      return {
        label: 'Loại B (Rủi ro trung bình)',
        shortLabel: 'Loại B',
        bg: 'bg-sky-50 text-sky-800 border-sky-200',
        text: 'text-sky-800',
        description: 'Rủi ro tiềm ẩn mức độ thấp'
      };
    case 'A':
    default:
      return {
        label: 'Loại A (Rủi ro thấp)',
        shortLabel: 'Loại A',
        bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
        text: 'text-emerald-800',
        description: 'Thiết bị thông thường'
      };
  }
}

/**
 * Get visual styling parameters for Asset status according to design system.
 */
export function getStatusBadge(status: AssetStatus) {
  switch (status) {
    case 'operational':
      return {
        label: 'Operational',
        vietnamese: 'Sẵn sàng / Hoạt động tốt',
        bg: 'bg-[#e6f4ea] text-[#137333] border-[#ceead6]',
        dotColor: 'bg-[#137333]',
        pillBg: 'bg-emerald-100 text-emerald-800'
      };
    case 'calibration':
      return {
        label: 'In Calibration',
        vietnamese: 'Đang hiệu chuẩn',
        bg: 'bg-[#e8f0fe] text-[#1967d2] border-[#d2e3fc]',
        dotColor: 'bg-[#1967d2]',
        pillBg: 'bg-blue-100 text-blue-800'
      };
    case 'maintenance_due':
      return {
        label: 'Maintenance Due',
        vietnamese: 'Đến hạn bảo dưỡng',
        bg: 'bg-[#fef7e0] text-[#b06000] border-[#feefc3]',
        dotColor: 'bg-[#b06000]',
        pillBg: 'bg-amber-100 text-amber-800'
      };
    case 'under_repair':
      return {
        label: 'Under Repair',
        vietnamese: 'Đang bảo trì / Sửa chữa',
        bg: 'bg-[#fce8e6] text-[#c5221f] border-[#fad2cf]',
        dotColor: 'bg-[#c5221f]',
        pillBg: 'bg-rose-100 text-rose-800'
      };
    case 'standby':
      return {
        label: 'Standby',
        vietnamese: 'Dự phòng sẵn sàng',
        bg: 'bg-[#f1f3f4] text-[#5f6368] border-[#dadce0]',
        dotColor: 'bg-[#5f6368]',
        pillBg: 'bg-slate-100 text-slate-700'
      };
    default:
      return {
        label: 'Unknown',
        vietnamese: 'Chưa xác định',
        bg: 'bg-gray-100 text-gray-700 border-gray-200',
        dotColor: 'bg-gray-400',
        pillBg: 'bg-gray-100 text-gray-700'
      };
  }
}
