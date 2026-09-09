import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-6 bg-[#EDF1FA]">
      <h1 className="text-[56px] font-semibold tracking-[-0.02em] text-[#16233E]">
        404
      </h1>
      <p className="mt-2 text-[15px] text-[#5D6C8A]">
        This page has not been generated.
      </p>
      <Link
        href="/"
        className="mt-6 h-9 px-4 inline-flex items-center text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      >
        Back to Catalogs
      </Link>
    </div>
  );
}