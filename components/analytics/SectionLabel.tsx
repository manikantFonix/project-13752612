'use client';

export default function SectionLabel({ children }: { children: string }) {
  return (
    <p className="text-[12px] font-medium text-[#5D6C8A] uppercase tracking-[0.06em]">
      {children}
    </p>
  );
}