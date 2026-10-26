# TriDuc – App nội bộ quản lý KTV sửa thiết bị y tế

Nguồn duy nhất cho yêu cầu. Không đọc lại lệnh gốc dài.

## Thương hiệu
- Tên công ty: **CÔNG TY TNHH THƯƠNG MẠI DỊCH VỤ TRÍ ĐỨC** (TRIDUC Medical Equipment) — người dùng đã đổi từ tên trong lệnh gốc.
- Logo `public/logo.png`; tên/logo/màu đặt trong `config/brand.ts`. Hiện ở: sidebar, header mobile, trang đăng nhập, favicon, tem QR.
- Màu chính `#0E7C86`, font Be Vietnam Pro + JetBrains Mono. Giữ nguyên ngôn ngữ thiết kế Stitch/AI Studio (tham khảo `design-ref/`, `public/assets/aistudio/`). Toàn bộ chữ tiếng Việt.

## Stack
Next.js App Router + TypeScript + Tailwind v4 + Supabase (Auth, Postgres, Storage).

## Vai trò
admin, quản lý (manager), kỹ thuật viên (technician). Kiểm quyền 2 lớp: RLS trong Postgres + kiểm tra phía server.

## Chức năng (chạy thật với DB)
- Tổng quan: KPI từ dữ liệu thật.
- Phiếu sửa chữa: CRUD, phân công, đổi trạng thái, ảnh (Storage), chữ ký khách.
- Thiết bị & Mã QR: sinh token ngẫu nhiên, in tem (có logo + tên công ty).
- Quét QR bằng camera: chỉ KTV có quyền còn hạn mới check-in/check-out; ghi giờ + GPS; bị từ chối thì chặn và ghi log.
- Phân quyền quét theo thiết bị / khách hàng / phiếu, có thời hạn.
- Lịch sử quét (xuất Excel).
- Kỹ thuật viên, Lịch làm việc, Thông báo.
- Responsive desktop + mobile (mobile: bottom nav, nút Quét QR ở giữa), PWA, dữ liệu mẫu, README tiếng Việt.

## Quy tắc làm việc
- 6 phần, xong mỗi phần: chạy `npm run build`, cập nhật Tiến độ, dừng chờ người dùng gõ "tiếp".
- Chỉ đọc file liên quan phần đang làm; sửa từng đoạn; không in lại code; không thêm tính năng ngoài yêu cầu.
- Báo cáo mỗi phần ≤ 5 dòng: đã làm gì, file nào, người dùng cần làm gì.

## Tiến độ
- [x] (1) Khung dự án + giao diện + logo — Next 16, `app/(app)/*` (trang placeholder: /, phieu, thiet-bi, quet, phan-quyen, lich-su-quet, ky-thuat-vien, lich, thong-bao), `app/dang-nhap`, `components/AppShell.tsx` (sidebar + header/drawer mobile + bottom nav), `BrandLogo`, `PageHeader`, `config/{brand,nav}.ts`, class dùng chung `.card .btn-primary .btn-outline .input .label` trong `app/globals.css`, favicon `app/icon.png`. Mã Vite cũ ở `design-ref/` (bị loại khỏi tsconfig).
- [ ] (2) Database + RLS + đăng nhập
- [ ] (3) Phiếu sửa chữa
- [ ] (4) QR + phân quyền + log
- [ ] (5) Tổng quan + KTV + lịch + thông báo
- [ ] (6) Responsive + PWA + README
