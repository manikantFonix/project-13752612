'use client';

export default function DroppedNotice({
  dropped,
  included,
  total,
}: {
  dropped: number;
  included: number;
  total: number;
}) {
  return (
    <div className="mb-5 border-l-2 border-[#A8552A] pl-3 py-3 text-[13px] text-[#A8552A]">
      {dropped} of the pieces you chose aren't available any more, so{' '}
      {included} of the {total} are included.
    </div>
  );
}