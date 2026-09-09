'use client';

interface Props {
  logo: string | null;
  brandName: string;
  email: string;
  phone: string;
  color: string;
}

export default function BrandPreview({ logo, brandName, email, phone, color }: Props) {
  const haveContact = email.trim() !== '' || phone.trim() !== '';

  return (
    <div>
      <p className="text-[13px] font-medium text-[var(--text)]">
        What your customers see
      </p>
      <p className="mt-1 text-[12px] text-[var(--text-sec)]">
        Your shared catalog, with what you've set.
      </p>

      <div
        aria-hidden="true"
        className="mt-4 border border-[var(--border)] rounded-[12px] overflow-hidden"
      >
        <div className="bg-[#FFFFFF] border-b border-[#DCE3F0] px-5 py-3 flex items-center">
          {logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logo} alt="" className="h-[28px] w-auto object-contain" />
          ) : (
            <span className="text-[15px] font-semibold text-[#16233E]">
              {brandName || 'Brand name'}
            </span>
          )}
        </div>

        <div className="bg-[#EDF1FA] px-5 pt-5 pb-6">
          <div>
            <p className="text-[15px] font-semibold text-[#16233E]">Bridal 2026</p>
            <p className="mt-0.5 text-[11px] text-[#5D6C8A]">42 pieces</p>
          </div>

          <div className="mt-4 flex gap-2">
            <span
              className="h-8 px-4 flex items-center text-[13px] font-medium text-[#FFFFFF] rounded-full"
              style={{ background: color }}
            >
              Bridal
            </span>
            <span className="h-8 px-4 flex items-center text-[13px] font-medium text-[#16233E] bg-[#FFFFFF] border border-[#DCE3F0] rounded-full">
              Everyday
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { cat: 'Ring', price: '$1,450' },
              { cat: 'Necklace', price: '$980' },
            ].map((p) => (
              <div key={p.cat}>
                <div className="aspect-square rounded-[8px] bg-[#E4E9F4]" />
                <p className="mt-2 text-[12px] text-[#5D6C8A]">{p.cat}</p>
                <p className="text-[13px] font-medium text-[#16233E]">{p.price}</p>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-5 w-full h-9 text-[13px] font-medium text-[#FFFFFF] rounded-full"
            style={{ background: color }}
          >
            Request these
          </button>

          {haveContact && (
            <div className="mt-5 border-t border-[#DCE3F0] pt-4 text-center">
              <p className="text-[11px] text-[#5D6C8A]">
                {email}
                {email && phone ? ' · ' : ''}
                {phone}
              </p>
            </div>
          )}
        </div>
      </div>

      <p className="mt-3 text-[12px] text-[var(--text-sec)]">
        This doesn't change the widget on your website — that takes its colors
        from your own site automatically.
      </p>
    </div>
  );
}