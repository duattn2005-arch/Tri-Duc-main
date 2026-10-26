import Image from "next/image";
import { brand } from "@/config/brand";

export function BrandLogo({ size = 40, showName = true }: { size?: number; showName?: boolean }) {
  return (
    <div className="flex items-center gap-2.5 min-w-0">
      <Image src={brand.logo} alt={brand.shortName} width={size} height={size} className="rounded-lg bg-white shrink-0 object-contain" priority />
      {showName && (
        <div className="min-w-0">
          <p className="text-[11px] font-bold leading-tight text-[#283891] uppercase">{brand.companyName}</p>
          <p className="text-[10px] text-[#505f76] leading-tight mt-0.5">{brand.appDescription}</p>
        </div>
      )}
    </div>
  );
}
