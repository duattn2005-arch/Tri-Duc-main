export type AssetStatus = 
  | 'operational'      // Hoạt động tốt / Sẵn sàng
  | 'calibration'      // Đang hiệu chuẩn
  | 'maintenance_due'  // Đến hạn bảo trì
  | 'under_repair'     // Đang sửa chữa
  | 'standby';         // Dự phòng

export type RiskClass = 'A' | 'B' | 'C' | 'D'; // Phân loại rủi ro theo BYT (A: Thấp, B: Trung bình thấp, C: Trung bình cao, D: Cao/Hỗ trợ sự sống)

export interface MaintenanceEvent {
  id: string;
  date: string;
  type: 'preventive' | 'calibration' | 'repair' | 'commissioning' | 'inspection';
  title: string;
  technician: string;
  organization: string;
  result: 'passed' | 'pending' | 'failed' | 'in_progress';
  notes: string;
  cost?: number;
  nextDate?: string;
}

export interface TelemetryData {
  operatingHours: number;
  temperatureCelsius?: number;
  batteryLevel?: number; // percentage if portable
  lastSelfTest: string; // ISO date
  selfTestStatus: 'passed' | 'warning' | 'error';
  utilizationRate: number; // 0-100%
  powerCycleCount: number;
}

export interface MedicalAsset {
  id: string;
  assetTag: string; // e.g. MED-ICU-2024-001
  serialNumber: string;
  name: string;
  vietnameseName: string;
  category: string;
  model: string;
  manufacturer: string;
  countryOfOrigin: string;
  department: string;
  room: string;
  riskClass: RiskClass;
  status: AssetStatus;
  purchaseDate: string;
  warrantyExpiry: string;
  lastMaintenanceDate: string;
  nextMaintenanceDate: string;
  purchaseValueVND: number;
  telemetry: TelemetryData;
  maintenanceHistory: MaintenanceEvent[];
  notes?: string;
}

export interface DepartmentMetric {
  department: string;
  totalAssets: number;
  operationalAssets: number;
  maintenanceDueAssets: number;
  criticalAssets: number;
  uptimePercentage: number;
}

export interface MaintenanceFilterOptions {
  searchQuery?: string;
  department?: string;
  status?: string;
  riskClass?: string;
  urgency?: 'all' | 'due_soon' | 'overdue';
}
