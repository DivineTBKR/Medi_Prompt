import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

// The little brand mark shown in headers and on the sign-in screens.
export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <Link href="/" className={cn("group flex items-center gap-2.5", className)}>
      <div className="relative grid size-14 place-items-center rounded-2xl bg-primary/10 shadow-sm ring-1 ring-primary/20">
        <Image
          src="/medi-prompt-logo.png"
          alt="Medi Prompt logo"
          width={56}
          height={56}
          className="size-12 object-contain drop-shadow-sm"
        />
        <span className="absolute -bottom-0.5 -right-0.5 size-2.5 animate-pulse-dot rounded-full bg-success ring-2 ring-background" />
      </div>
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight">
          Medi<span className="text-primary"> Prompt</span>
        </span>
      )}
    </Link>
  );
}
