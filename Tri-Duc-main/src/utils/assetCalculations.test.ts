import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateMaintenanceUrgency,
  calculateOverallUptime,
  filterAssets,
  formatVND,
  getRiskClassBadge,
  getStatusBadge
} from './assetCalculations';
import { MedicalAsset } from '../types/asset';

const mockAssets: MedicalAsset[] = [
  {
    id: 'asset-1',
    assetTag: 'MED-ICU-001',
    serialNumber: 'SN-99214A',
    name: 'Mechanical Ventilator Servo-u',
    vietnameseName: 'Máy thở đa năng Servo-u',
    category: 'Life Support',
    model: 'Servo-u v4',
    manufacturer: 'Getinge',
    countryOfOrigin: 'Sweden',
    department: 'Hồi sức tích cực (ICU)',
    room: 'Phòng ICU-02, Giường 04',
    riskClass: 'D',
    status: 'operational',
    purchaseDate: '2023-05-15',
    warrantyExpiry: '2026-05-15',
    lastMaintenanceDate: '2026-04-10',
    nextMaintenanceDate: '2026-10-30', // within 14 days from 2026-10-26
    purchaseValueVND: 1250000000,
    telemetry: {
      operatingHours: 4210,
      temperatureCelsius: 36.8,
      lastSelfTest: '2026-10-25T08:00:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 85,
      powerCycleCount: 124
    },
    maintenanceHistory: []
  },
  {
    id: 'asset-2',
    assetTag: 'MED-RAD-002',
    serialNumber: 'SN-XR-5002',
    name: 'Mobile Digital X-Ray Optima XR220',
    vietnameseName: 'Hệ thống X-quang di động kỹ thuật số',
    category: 'Diagnostic Imaging',
    model: 'Optima XR220amx',
    manufacturer: 'GE Healthcare',
    countryOfOrigin: 'USA',
    department: 'Chẩn đoán hình ảnh',
    room: 'Phòng Chụp X-quang Cấp cứu',
    riskClass: 'C',
    status: 'maintenance_due',
    purchaseDate: '2022-01-10',
    warrantyExpiry: '2024-01-10',
    lastMaintenanceDate: '2026-03-01',
    nextMaintenanceDate: '2026-10-20', // past due relative to 2026-10-26
    purchaseValueVND: 2800000000,
    telemetry: {
      operatingHours: 6890,
      lastSelfTest: '2026-10-26T06:00:00Z',
      selfTestStatus: 'warning',
      utilizationRate: 60,
      powerCycleCount: 310
    },
    maintenanceHistory: []
  },
  {
    id: 'asset-3',
    assetTag: 'MED-SUR-003',
    serialNumber: 'SN-OR-900',
    name: 'Electrosurgical Generator ForceTriad',
    vietnameseName: 'Dao mổ điện cao tần ForceTriad',
    category: 'Surgical',
    model: 'ForceTriad Energy Platform',
    manufacturer: 'Medtronic',
    countryOfOrigin: 'USA',
    department: 'Phẫu thuật gây mê',
    room: 'Phòng mổ số 3 (OR-03)',
    riskClass: 'C',
    status: 'under_repair',
    purchaseDate: '2021-08-20',
    warrantyExpiry: '2023-08-20',
    lastMaintenanceDate: '2026-02-15',
    nextMaintenanceDate: '2026-12-15',
    purchaseValueVND: 750000000,
    telemetry: {
      operatingHours: 3120,
      lastSelfTest: '2026-10-22T09:00:00Z',
      selfTestStatus: 'error',
      utilizationRate: 0,
      powerCycleCount: 420
    },
    maintenanceHistory: []
  }
];

test('calculateMaintenanceUrgency detects overdue and due_soon accurately', () => {
  assert.equal(calculateMaintenanceUrgency('2026-10-20', '2026-10-26'), 'overdue');
  assert.equal(calculateMaintenanceUrgency('2026-10-30', '2026-10-26'), 'due_soon');
  assert.equal(calculateMaintenanceUrgency('2026-12-01', '2026-10-26'), 'ok');
});

test('calculateOverallUptime computes weighted uptime based on risk and status', () => {
  const uptime = calculateOverallUptime(mockAssets);
  assert.ok(uptime > 0 && uptime <= 100);
});

test('filterAssets filters by department, status, and search query', () => {
  // Test department filter
  const icuAssets = filterAssets(mockAssets, { department: 'Hồi sức tích cực (ICU)' });
  assert.equal(icuAssets.length, 1);
  assert.equal(icuAssets[0].id, 'asset-1');

  // Test status filter
  const dueAssets = filterAssets(mockAssets, { status: 'maintenance_due' });
  assert.equal(dueAssets.length, 1);
  assert.equal(dueAssets[0].id, 'asset-2');

  // Test search query by serial
  const searched = filterAssets(mockAssets, { searchQuery: '99214A' });
  assert.equal(searched.length, 1);
  assert.equal(searched[0].assetTag, 'MED-ICU-001');

  // Test search query by Vietnamese name
  const searchedVN = filterAssets(mockAssets, { searchQuery: 'dao mổ' });
  assert.equal(searchedVN.length, 1);
  assert.equal(searchedVN[0].id, 'asset-3');
});

test('formatVND formats Vietnamese Dong currencies into billion and million units', () => {
  assert.match(formatVND(1250000000), /tỷ/);
  assert.match(formatVND(750000000), /tr/);
});

test('getRiskClassBadge and getStatusBadge return correct styles', () => {
  const badgeD = getRiskClassBadge('D');
  assert.equal(badgeD.shortLabel, 'Loại D');
  
  const statusOp = getStatusBadge('operational');
  assert.equal(statusOp.label, 'Operational');
});
