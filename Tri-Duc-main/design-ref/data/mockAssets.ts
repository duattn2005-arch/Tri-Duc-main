import { MedicalAsset } from '../types/asset';

export const INITIAL_ASSETS: MedicalAsset[] = [
  {
    id: 'asset-icu-01',
    assetTag: 'MED-ICU-2023-0104',
    serialNumber: 'SN-SVU-882103',
    name: 'Servo-u Advanced Mechanical Ventilator',
    vietnameseName: 'Máy thở xâm nhập & không xâm nhập đa chức năng Servo-u',
    category: 'Thiết bị Hồi sức & Cấp cứu (Life Support)',
    model: 'Servo-u Neonatal/Pediatric/Adult v4.2',
    manufacturer: 'Getinge / Maquet',
    countryOfOrigin: 'Thụy Điển (Sweden)',
    department: 'Hồi sức tích cực (ICU)',
    room: 'Khu cách ly ICU-A, Giường số 03',
    riskClass: 'D',
    status: 'operational',
    purchaseDate: '2023-06-12',
    warrantyExpiry: '2026-06-12',
    lastMaintenanceDate: '2026-08-15',
    nextMaintenanceDate: '2026-11-15',
    purchaseValueVND: 1450000000,
    telemetry: {
      operatingHours: 6420,
      temperatureCelsius: 36.2,
      lastSelfTest: '2026-10-26T04:15:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 94,
      powerCycleCount: 182
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-081',
        date: '2026-08-15',
        type: 'preventive',
        title: 'Bảo dưỡng định kỳ Quý III & Thay màng O2 sensor',
        technician: 'Kỹ sư Nguyễn Hoàng Nam',
        organization: 'Getinge Vietnam Technical Support',
        result: 'passed',
        notes: 'Đã thay mới cảm biến O2, kiểm tra rò rỉ khí áp lực cao, hiệu chỉnh thể tích lưu thông VT. Đạt chuẩn IEC 60601-1.',
        cost: 18500000,
        nextDate: '2026-11-15'
      },
      {
        id: 'MNT-2026-052',
        date: '2026-05-10',
        type: 'calibration',
        title: 'Hiệu chuẩn áp lực PEEP và cảm biến lưu lượng',
        technician: 'Ths. Lê Quốc Hùng',
        organization: 'Trung tâm Đo lường & Kiểm định Y tế Quốc gia',
        result: 'passed',
        notes: 'Hiệu chuẩn theo quy chuẩn QCVN 01:2020/BYT. Sai số < 1.5%. Đã cấp tem kiểm định có hiệu lực 12 tháng.',
        cost: 8500000
      },
      {
        id: 'MNT-2023-001',
        date: '2023-06-15',
        type: 'commissioning',
        title: 'Lắp đặt bàn giao, kiểm định ban đầu & Đào tạo vận hành',
        technician: 'Ks. Trần Minh Tuấn',
        organization: 'Công ty CP Thiết bị Y tế Tân Triều',
        result: 'passed',
        notes: 'Nghiệm thu đạt 100% chỉ số kỹ thuật, cấp chứng chỉ sử dụng cho 12 bác sĩ và điều dưỡng trưởng ICU.'
      }
    ],
    notes: 'Thiết bị ưu tiên 1 cho bệnh nhân suy hô hấp cấp ARDS tại khoa ICU.'
  },
  {
    id: 'asset-rad-02',
    assetTag: 'MED-RAD-2022-0042',
    serialNumber: 'SN-REV-774921',
    name: 'Revolution CT 256-Slice Scanner',
    vietnameseName: 'Hệ thống chụp cắt lớp vi tính 256 lát Revolution CT',
    category: 'Chẩn đoán hình ảnh (Imaging)',
    model: 'Revolution CT Apex Edition',
    manufacturer: 'GE Healthcare',
    countryOfOrigin: 'Mỹ (USA)',
    department: 'Chẩn đoán hình ảnh (Radiology)',
    room: 'Phòng CT Scanner số 01, Tầng 1 Nhà C',
    riskClass: 'C',
    status: 'operational',
    purchaseDate: '2022-03-20',
    warrantyExpiry: '2025-03-20',
    lastMaintenanceDate: '2026-07-28',
    nextMaintenanceDate: '2026-10-28', // due in 2 days!
    purchaseValueVND: 38500000000,
    telemetry: {
      operatingHours: 14890,
      temperatureCelsius: 22.4,
      lastSelfTest: '2026-10-26T05:00:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 88,
      powerCycleCount: 520
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-074',
        date: '2026-07-28',
        type: 'preventive',
        title: 'Bảo trì hệ thống làm mát bằng dầu & hiệu chuẩn đầu dò Detectors',
        technician: 'GE Field Service Engineer',
        organization: 'GE Healthcare Vietnam Service',
        result: 'passed',
        notes: 'Nhiệt độ bóng phát tia X ổn định ở 22.4°C. Độ phân giải không gian đạt 0.23 mm.',
        cost: 65000000,
        nextDate: '2026-10-28'
      }
    ],
    notes: 'Phục vụ chụp mạch vành tim, đột quỵ não cấp cứu và tầm soát ung thư.'
  },
  {
    id: 'asset-surg-03',
    assetTag: 'MED-OR-2023-0089',
    serialNumber: 'SN-PRIM-441290',
    name: 'Primus Anesthesia Workstation',
    vietnameseName: 'Hệ thống máy gây mê kèm thở tích hợp Primus',
    category: 'Phẫu thuật & Gây mê (Anesthesia/OR)',
    model: 'Primus Infinity Empowered',
    manufacturer: 'Dräger',
    countryOfOrigin: 'Đức (Germany)',
    department: 'Phẫu thuật - Gây mê hồi sức',
    room: 'Phòng mổ Tim mạch OR-02',
    riskClass: 'D',
    status: 'maintenance_due',
    purchaseDate: '2023-01-18',
    warrantyExpiry: '2025-01-18',
    lastMaintenanceDate: '2026-04-18',
    nextMaintenanceDate: '2026-10-18', // overdue!
    purchaseValueVND: 2350000000,
    telemetry: {
      operatingHours: 5120,
      temperatureCelsius: 25.1,
      lastSelfTest: '2026-10-25T19:00:00Z',
      selfTestStatus: 'warning',
      utilizationRate: 72,
      powerCycleCount: 290
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-041',
        date: '2026-04-18',
        type: 'preventive',
        title: 'Bảo trì 6 tháng & thay thế bộ van thở một chiều',
        technician: 'Kỹ sư Phạm Văn Tuấn',
        organization: 'Dräger Service Partner VN',
        result: 'passed',
        notes: 'Kiểm tra độ kín buồng bốc hơi Isoflurane và Sevoflurane. Bình vôi hấp thụ CO2 được thay mới.',
        cost: 15400000,
        nextDate: '2026-10-18'
      }
    ],
    notes: 'Cần bảo dưỡng bổ sung khẩn cấp do quá hạn kiểm định buồng bay hơi gây mê 8 ngày.'
  },
  {
    id: 'asset-card-04',
    assetTag: 'MED-CAR-2024-0012',
    serialNumber: 'SN-MR-EV10-99',
    name: 'Mindray BeneHeart D6 Defibrillator / Monitor',
    vietnameseName: 'Máy sốc tim tạo nhịp kèm theo dõi thông số sự sống BeneHeart D6',
    category: 'Cấp cứu & Tim mạch (Emergency/Cardiology)',
    model: 'BeneHeart D6 Platinum',
    manufacturer: 'Mindray',
    countryOfOrigin: 'Trung Quốc (China)',
    department: 'Cấp cứu (Emergency Room)',
    room: 'Xe hồi sức cấp cứu lưu động Red-Code #1',
    riskClass: 'D',
    status: 'operational',
    purchaseDate: '2024-02-10',
    warrantyExpiry: '2027-02-10',
    lastMaintenanceDate: '2026-08-05',
    nextMaintenanceDate: '2026-11-05',
    purchaseValueVND: 380000000,
    telemetry: {
      operatingHours: 1980,
      batteryLevel: 98,
      lastSelfTest: '2026-10-26T03:00:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 45,
      powerCycleCount: 420
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-085',
        date: '2026-08-05',
        type: 'inspection',
        title: 'Kiểm tra năng lượng phát xung 360 Joules và dung lượng pin Lithium',
        technician: 'Kỹ sư Vũ Hải Đăng',
        organization: 'Phòng Vật tư & Thiết bị Y tế BV',
        result: 'passed',
        notes: 'Năng lượng phóng điện thử nghiệm trên máy phân tích QA-40 đạt dung sai sai lệch < 2%. Pin sạc đạt 100% dung lượng danh định.',
        cost: 1200000
      }
    ],
    notes: 'Thiết bị trang bị trên xe đẩy Code Blue, luôn cắm sạc dự phòng 24/7.'
  },
  {
    id: 'asset-lab-05',
    assetTag: 'MED-LAB-2022-0056',
    serialNumber: 'SN-COBAS-6000-88',
    name: 'Cobas 6000 Analyzer Series',
    vietnameseName: 'Hệ thống phân tích Hóa sinh - Miễn dịch tự động Cobas 6000',
    category: 'Xét nghiệm (Laboratory Diagnostics)',
    model: 'Cobas c501 + e601 Core Unit',
    manufacturer: 'Roche Diagnostics',
    countryOfOrigin: 'Thụy Sĩ (Switzerland)',
    department: 'Khoa Xét nghiệm (Laboratory)',
    room: 'Phòng Xét nghiệm Hóa sinh Trung tâm, Lầu 3',
    riskClass: 'C',
    status: 'calibration',
    purchaseDate: '2022-08-14',
    warrantyExpiry: '2024-08-14',
    lastMaintenanceDate: '2026-09-02',
    nextMaintenanceDate: '2026-11-02',
    purchaseValueVND: 9400000000,
    telemetry: {
      operatingHours: 18450,
      temperatureCelsius: 24.0,
      lastSelfTest: '2026-10-26T01:30:00Z',
      selfTestStatus: 'warning',
      utilizationRate: 91,
      powerCycleCount: 95
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-092',
        date: '2026-09-02',
        type: 'preventive',
        title: 'Vệ sinh kim hút mẫu, cuvette ủ và căn chỉnh đường chuẩn Calibrator',
        technician: 'Ks. Đỗ Anh Dũng',
        organization: 'Roche Diagnostics Vietnam Co., Ltd.',
        result: 'passed',
        notes: 'Đã hoàn tất bảo dưỡng kim phân phối mẫu R1/R2. Hệ số biến thiên CV% kiểm chuẩn nội bộ < 1.2%.',
        cost: 32000000
      }
    ],
    notes: 'Đang chạy lô chuẩn độ đa điểm định kỳ mẫu hóa sinh enzyme tim mạch Troponin-T và ProBNP.'
  },
  {
    id: 'asset-endo-06',
    assetTag: 'MED-END-2023-0077',
    serialNumber: 'SN-EVIS-X1-901',
    name: 'EVIS X1 Video Endoscopy System',
    vietnameseName: 'Hệ thống nội soi tiêu hóa phóng đại độ phân giải cao EVIS X1',
    category: 'Nội soi & Chẩn đoán can thiệp',
    model: 'CV-1500 / CLV-1500 Xenon',
    manufacturer: 'Olympus Medical',
    countryOfOrigin: 'Nhật Bản (Japan)',
    department: 'Khoa Thăm dò Chức năng & Nội soi',
    room: 'Phòng Nội soi can thiệp số 2',
    riskClass: 'B',
    status: 'under_repair',
    purchaseDate: '2023-11-05',
    warrantyExpiry: '2026-11-05',
    lastMaintenanceDate: '2026-06-20',
    nextMaintenanceDate: '2026-12-20',
    purchaseValueVND: 4200000000,
    telemetry: {
      operatingHours: 3820,
      temperatureCelsius: 29.5,
      lastSelfTest: '2026-10-24T14:20:00Z',
      selfTestStatus: 'error',
      utilizationRate: 0,
      powerCycleCount: 380
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-102',
        date: '2026-10-24',
        type: 'repair',
        title: 'Báo lỗi thấu kính quang học ngả màu và cáp truyền tín hiệu hình ảnh HDMI 4K',
        technician: 'Kỹ sư chuyên gia Olympus',
        organization: 'Olympus Authorized Service Hub',
        result: 'in_progress',
        notes: 'Đang tiến hành tháo cụm cáp CCD để thay thế linh kiện chính hãng từ kho Tokyo. Dự kiến hoàn thành ngày 28/10.',
        cost: 48000000
      }
    ],
    notes: 'Dây soi đại tràng CF-XZ1200L đang chờ linh kiện thay thế.'
  },
  {
    id: 'asset-dial-07',
    assetTag: 'MED-NEP-2023-0130',
    serialNumber: 'SN-FMC-5008S-12',
    name: 'Fresenius 5008S CorDiax Hemodialysis System',
    vietnameseName: 'Máy thận nhân tạo lọc máu liên tục và thẩm tách siêu lọc CorDiax',
    category: 'Thận nhân tạo & Lọc máu (Hemodialysis)',
    model: '5008S CorDiax OCM / BTM',
    manufacturer: 'Fresenius Medical Care',
    countryOfOrigin: 'Đức (Germany)',
    department: 'Khoa Thận nhân tạo - Lọc máu',
    room: 'Khu Lọc máu A, Vị trí máy HD-08',
    riskClass: 'D',
    status: 'operational',
    purchaseDate: '2023-04-10',
    warrantyExpiry: '2025-04-10',
    lastMaintenanceDate: '2026-08-20',
    nextMaintenanceDate: '2026-11-20',
    purchaseValueVND: 920000000,
    telemetry: {
      operatingHours: 7890,
      temperatureCelsius: 37.0,
      lastSelfTest: '2026-10-26T05:30:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 96,
      powerCycleCount: 810
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-089',
        date: '2026-08-20',
        type: 'preventive',
        title: 'Khử trùng hóa chất Citric Acid & thay phin lọc diệt khuẩn Diasafe Plus',
        technician: 'Kỹ sư Hoàng Minh Trí',
        organization: 'Fresenius Service Team Vietnam',
        result: 'passed',
        notes: 'Kiểm tra độ dẫn điện dịch lọc và áp lực màng lọc TMP đạt tiêu chuẩn AAMI/ISO 13959.',
        cost: 9800000
      }
    ],
    notes: 'Thiết bị hoạt động 3 ca/ngày phục vụ bệnh nhân suy thận mạn giai đoạn cuối.'
  },
  {
    id: 'asset-mon-08',
    assetTag: 'MED-ICU-2024-0210',
    serialNumber: 'SN-MX750-10492',
    name: 'IntelliVue MX750 Patient Monitor',
    vietnameseName: 'Màn hình theo dõi bệnh nhân đa thông số IntelliVue MX750',
    category: 'Theo dõi sinh hiệu (Patient Monitoring)',
    model: 'IntelliVue MX750 with Multi-Measurement Module',
    manufacturer: 'Philips Healthcare',
    countryOfOrigin: 'Hà Lan (Netherlands)',
    department: 'Hồi sức tích cực (ICU)',
    room: 'Phòng Hồi sức Ngoại, Giường số 01',
    riskClass: 'C',
    status: 'operational',
    purchaseDate: '2024-03-01',
    warrantyExpiry: '2027-03-01',
    lastMaintenanceDate: '2026-09-10',
    nextMaintenanceDate: '2026-12-10',
    purchaseValueVND: 560000000,
    telemetry: {
      operatingHours: 5410,
      temperatureCelsius: 31.2,
      lastSelfTest: '2026-10-26T02:00:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 98,
      powerCycleCount: 88
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-095',
        date: '2026-09-10',
        type: 'inspection',
        title: 'Kiểm tra cáp đo ECG 12 đạo trình, huyết áp động mạch xâm lấn IBP và SpO2',
        technician: 'Kỹ sư Vũ Văn Phong',
        organization: 'Phòng TBYT Bệnh viện',
        result: 'passed',
        notes: 'Kết nối mạng nội bộ trung tâm CMS Philips không gián đoạn, báo động âm thanh và thị giác nhạy bén.',
        cost: 2100000
      }
    ],
    notes: 'Được đồng bộ dữ liệu hồ sơ bệnh án điện tử HIS/EMR của bệnh viện.'
  },
  {
    id: 'asset-inf-09',
    assetTag: 'MED-PED-2023-0305',
    serialNumber: 'SN-ALRS-8100-33',
    name: 'Alaris PC Unit & Infusion Pump System',
    vietnameseName: 'Hệ thống máy tiêm truyền thông minh Alaris có bảo vệ liều thuốc',
    category: 'Truyền dịch & Bơm tiêm (Infusion/Injection)',
    model: 'Alaris System Model 8015/8100 Guardrails',
    manufacturer: 'Becton Dickinson (BD)',
    countryOfOrigin: 'Mỹ (USA)',
    department: 'Khoa Nhi & Sơ sinh (Pediatrics)',
    room: 'Phòng Sơ sinh non tháng NICU, Lồng ấp số 4',
    riskClass: 'B',
    status: 'standby',
    purchaseDate: '2023-07-22',
    warrantyExpiry: '2026-07-22',
    lastMaintenanceDate: '2026-07-15',
    nextMaintenanceDate: '2026-11-15',
    purchaseValueVND: 185000000,
    telemetry: {
      operatingHours: 2840,
      batteryLevel: 100,
      lastSelfTest: '2026-10-25T11:00:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 30,
      powerCycleCount: 154
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-079',
        date: '2026-07-15',
        type: 'calibration',
        title: 'Hiệu chuẩn độ chính xác lưu lượng bơm tiêm ml/giờ',
        technician: 'Kỹ sư Bùi Huy Thông',
        organization: 'Viện Trang thiết bị và Công trình Y tế (NIHE)',
        result: 'passed',
        notes: 'Đo lường sai số tốc độ tiêm truyền 0.1ml/h - 999ml/h. Độ chính xác đạt 99.2%.',
        cost: 3500000
      }
    ],
    notes: 'Cài đặt phần mềm Guardrails kiểm soát giới hạn liều thuốc chống sốc cho trẻ sơ sinh.'
  },
  {
    id: 'asset-auto-10',
    assetTag: 'MED-CSSD-2021-0022',
    serialNumber: 'SN-STER-700-44',
    name: 'Large Steam Sterilizer Autoclave',
    vietnameseName: 'Nồi hấp tiệt trùng hơi nước áp suất cao dung tích lớn 600L',
    category: 'Kiểm soát nhiễm khuẩn & Khử khuẩn (CSSD)',
    model: 'Uniclave 88-2D Horizontal Sliding Door',
    manufacturer: 'AJC Sterilizers',
    countryOfOrigin: 'Bồ Đào Nha (Portugal)',
    department: 'Trung tâm Tiệt trùng Dụng cụ (CSSD)',
    room: 'Khu bẩn tiếp nhận & Buồng hấp tiệt trùng số 02',
    riskClass: 'B',
    status: 'operational',
    purchaseDate: '2021-09-10',
    warrantyExpiry: '2023-09-10',
    lastMaintenanceDate: '2026-08-30',
    nextMaintenanceDate: '2026-11-30',
    purchaseValueVND: 3100000000,
    telemetry: {
      operatingHours: 12200,
      temperatureCelsius: 134.0,
      lastSelfTest: '2026-10-26T00:15:00Z',
      selfTestStatus: 'passed',
      utilizationRate: 85,
      powerCycleCount: 1420
    },
    maintenanceHistory: [
      {
        id: 'MNT-2026-088',
        date: '2026-08-30',
        type: 'preventive',
        title: 'Kiểm định an toàn áp lực bình chịu áp & thay gioăng đệm cửa silicone',
        technician: 'Thanh tra viên An toàn Kỹ thuật',
        organization: 'Trung tâm Kiểm định Kỹ thuật An toàn Khu vực I',
        result: 'passed',
        notes: 'Áp suất thử nghiệm 3.2 bar không rò rỉ. Kiểm nghiệm sinh học với chỉ thị nha bào Geobacillus stearothermophilus 100% âm tính.',
        cost: 21500000
      }
    ],
    notes: 'Tiệt khuẩn toàn bộ dụng cụ phẫu thuật tim hở, chấn thương chỉnh hình và nội soi.'
  }
];

export const DEPARTMENTS = [
  'Tất cả khoa phòng',
  'Hồi sức tích cực (ICU)',
  'Chẩn đoán hình ảnh (Radiology)',
  'Phẫu thuật - Gây mê hồi sức',
  'Cấp cứu (Emergency Room)',
  'Khoa Xét nghiệm (Laboratory)',
  'Khoa Thăm dò Chức năng & Nội soi',
  'Khoa Thận nhân tạo - Lọc máu',
  'Khoa Nhi & Sơ sinh (Pediatrics)',
  'Trung tâm Tiệt trùng Dụng cụ (CSSD)'
];
