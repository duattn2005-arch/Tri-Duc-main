import Image from "next/image";
import { brand } from "@/config/brand";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-[#f7f9fb]">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <Image src={brand.logo} alt={brand.shortName} width={112} height={112} className="mx-auto rounded-2xl bg-white shadow-xs" priority />
          <h1 className="mt-4 text-base font-bold text-[#283891] uppercase leading-snug">{brand.companyName}</h1>
          <p className="text-xs text-[#505f76] mt-1">{brand.appDescription}</p>
        </div>
        <form className="card p-6 space-y-4">
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" name="email" type="email" required autoComplete="email" className="input" placeholder="ten@triduc.vn" />
          </div>
          <div>
            <label className="label" htmlFor="password">Mật khẩu</label>
            <input id="password" name="password" type="password" required autoComplete="current-password" className="input" />
          </div>
          <button type="submit" className="btn-primary w-full">Đăng nhập</button>
        </form>
      </div>
    </div>
  );
}
