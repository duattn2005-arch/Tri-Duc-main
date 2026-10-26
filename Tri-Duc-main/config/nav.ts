import {
  LayoutDashboard, ClipboardList, QrCode, ScanLine, KeyRound,
  History, Users, CalendarDays, Bell, type LucideIcon,
} from "lucide-react";

export type NavItem = { href: string; label: string; short: string; icon: LucideIcon };

export const navItems: NavItem[] = [
  { href: "/", label: "Tổng quan", short: "Tổng quan", icon: LayoutDashboard },
  { href: "/phieu", label: "Phiếu sửa chữa", short: "Phiếu", icon: ClipboardList },
  { href: "/thiet-bi", label: "Thiết bị & Mã QR", short: "Thiết bị", icon: QrCode },
  { href: "/quet", label: "Quét QR", short: "Quét QR", icon: ScanLine },
  { href: "/phan-quyen", label: "Phân quyền quét", short: "Phân quyền", icon: KeyRound },
  { href: "/lich-su-quet", label: "Lịch sử quét", short: "Lịch sử", icon: History },
  { href: "/ky-thuat-vien", label: "Kỹ thuật viên", short: "KTV", icon: Users },
  { href: "/lich", label: "Lịch làm việc", short: "Lịch", icon: CalendarDays },
  { href: "/thong-bao", label: "Thông báo", short: "Thông báo", icon: Bell },
];

// Mobile bottom nav: Quét QR nằm giữa
export const bottomNav = ["/", "/phieu", "/quet", "/lich", "/thong-bao"];
