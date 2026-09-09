'use client';

interface Props {
  open: boolean;
  option: 1 | 2;
  notEnough: boolean;
  onOption: (o: 1 | 2) => void;
  onCancel: () => void;
  onSave: () => void;
}

export default function RegenerateDialog({
  open,
  option,
  notEnough,
  onOption,
  onCancel,
  onSave,
}: Props) {
  if (!open) return null;

  const radio = (sel: boolean, disabled: boolean) => (
    <span
      className={`mt-0.5 w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
        disabled ? 'border-[#C6CFE0]' : 'border-[#152E56]'
      }`}
    >
      {sel && (
        <span className="w-2 h-2 rounded-full bg-[#152E56]" />
      )}
    </span>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={onCancel}
      />
      <div className="relative w-[520px] bg-white border border-[#DCE3F0] rounded-[12px] p-7">
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Generate rose gold for existing products?
        </h2>
        <p className="mt-2 text-[13px] text-[#16233E] leading-relaxed">
          You've added rose gold. There are 128 products already in this
          catalog. Generating rose gold for them will use at least 512 renders.
        </p>

        <div className="mt-5 space-y-3">
          <button
            onClick={() => onOption(1)}
            className={`w-full flex items-start gap-3 border rounded-[12px] p-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              option === 1 ? 'border-[#152E56]' : 'border-[#DCE3F0] hover:border-[#C6D0E6]'
            }`}
          >
            {radio(option === 1, false)}
            <span>
              <span className="block text-[13px] font-medium text-[#16233E]">
                Only new products
              </span>
              <span className="block mt-1 text-[13px] text-[#5D6C8A]">
                Products already here keep the colors they have.
              </span>
            </span>
          </button>

          <button
            onClick={() => onOption(2)}
            disabled={notEnough}
            className={`w-full flex items-start gap-3 border rounded-[12px] p-4 text-left transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              option === 2 ? 'border-[#152E56]' : 'border-[#DCE3F0] hover:border-[#C6D0E6]'
            } ${notEnough ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {radio(option === 2, notEnough)}
            <span>
              <span className="block text-[13px] font-medium text-[#16233E]">
                Generate for existing products too
              </span>
              <span className="block mt-1 text-[13px] text-[#5D6C8A]">
                Uses at least 512 renders. Takes a while to finish.
              </span>
            </span>
          </button>
        </div>

        {notEnough && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              You need at least 512 renders to generate this color for existing
              products, and you have 130. The color hasn't been added.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <div>
            {option === 2 && !notEnough && (
              <span className="text-[13px] font-medium text-[#16233E] tabular-nums">
                At least 512 renders
              </span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onCancel}
              className="px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="h-9 px-4 text-[13px] font-medium text-white bg-[#152E56] border border-[#152E56] rounded-full hover:bg-[#172D54] transition-colors duration-150 whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
            >
              Save colors
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}