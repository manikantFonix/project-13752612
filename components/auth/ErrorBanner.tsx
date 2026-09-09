import type { ReactNode } from 'react';

export default function ErrorBanner({
  text,
  children,
}: {
  text: string;
  children?: ReactNode;
}) {
  return (
    <div
      aria-live="polite"
      className="border-l-2 border-[#A8552A] pl-3 py-3 text-[13px] text-[#A8552A]"
    >
      <p>{text}</p>
      {children}
    </div>
  );
}