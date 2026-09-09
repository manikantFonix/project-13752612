'use client';

export default function UnavailablePage() {
  return (
    <div className="min-h-screen bg-[#EDF1FA] flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-[18px] font-semibold text-[#16233E]">
          This catalog isn't available.
        </p>
        <p className="mx-auto mt-2 max-w-[320px] text-[13px] text-[#5D6C8A]">
          If someone shared this link with you, ask them for an up-to-date one.
        </p>
      </div>
    </div>
  );
}