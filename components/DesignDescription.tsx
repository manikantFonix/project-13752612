'use client';

interface Props {
  value: string;
  onChange: (v: string) => void;
  generating: boolean;
  attachments: { id: string; name: string; thumb: string }[];
  onRemoveAttachment: (id: string) => void;
  onAttach: () => void;
  onCamera: () => void;
  onOpenSketch: () => void;
  onOpenVoice: () => void;
  canGenerate: boolean;
  disabledReason: string | null;
  onGenerate: () => void;
}

export default function DesignDescription({
  value,
  onChange,
  generating,
  attachments,
  onRemoveAttachment,
  onAttach,
  onCamera,
  onOpenSketch,
  onOpenVoice,
  canGenerate,
  disabledReason,
  onGenerate,
}: Props) {
  return (
    <div className="relative bg-white border border-[#DCE3F0] rounded-[28px] overflow-hidden focus-within:border-[#152E56] focus-within:ring-2 focus-within:ring-[#152E56]/20">
      <div className="px-4 pt-3.5 pb-3 flex items-center justify-between gap-3 border-b border-[#EDF1FA]">
        <span className="text-[13px] font-medium text-[#16233E]">Describe your design</span>
        <div className="flex items-center gap-3">
          <span className="text-[12px] text-[#5D6C8A]">Design number</span>
          <span className="text-[13px] font-medium text-[#16233E] tabular-nums">JCX-102</span>
          <button
            type="button"
            aria-label="Rename design number"
            className="w-7 h-7 flex items-center justify-center rounded-full text-[#5D6C8A] hover:text-[#16233E] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-edit-line text-[18px]" />
          </button>
        </div>
      </div>

      <div className="px-4 pt-3 pb-3 flex items-center gap-2">
        <button
          type="button"
          onClick={onAttach}
          aria-label="Attach a reference"
          title="Attach"
          className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-[#5D6C8A] bg-white border border-[#DCE3F0] hover:border-[#C6D0E6] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
        >
          <i className="ri-attachment-2 text-[20px]" />
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          readOnly={generating}
          placeholder="Describe the piece — the stone, the metal, the setting, and anything the customer has asked for."
          rows={1}
          className="w-full min-h-[40px] max-h-[140px] py-2 text-[15px] leading-relaxed text-[#16233E] placeholder-[#5D6C8A] bg-transparent outline-none resize-none border-0"
        />

        <div className="shrink-0 flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Take a photo"
            title="Take a photo"
            onClick={onCamera}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#5D6C8A] bg-white border border-[#DCE3F0] hover:border-[#C6D0E6] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-camera-line text-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Draw a sketch"
            title="Draw a sketch"
            onClick={onOpenSketch}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#5D6C8A] bg-white border border-[#DCE3F0] hover:border-[#C6D0E6] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-pencil-line text-[20px]" />
          </button>
          <button
            type="button"
            aria-label="Record a description"
            title="Record a description"
            onClick={onOpenVoice}
            className="w-9 h-9 flex items-center justify-center rounded-full text-[#5D6C8A] bg-white border border-[#DCE3F0] hover:border-[#C6D0E6] hover:bg-[#F3F6FC] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          >
            <i className="ri-mic-line text-[20px]" />
          </button>
          <button
            type="button"
            onClick={onGenerate}
            disabled={!canGenerate}
            className={`h-10 px-5 text-[13px] font-medium rounded-full whitespace-nowrap focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA] ${
              canGenerate
                ? 'text-white bg-[#152E56] hover:bg-[#172D54] transition-colors duration-150'
                : 'text-[#5D6C8A] bg-[#EDF1FA] cursor-not-allowed'
            }`}
          >
            Generate render
          </button>
        </div>
      </div>

      {attachments.length > 0 && !generating && (
        <div className="px-4 pb-3 flex flex-wrap gap-2">
          {attachments.map((a) => (
            <div
              key={a.id}
              className="h-8 inline-flex items-center gap-2 border border-[#DCE3F0] rounded-full bg-white pl-1.5 pr-2"
            >
              <img src={a.thumb} alt="" className="w-5 h-5 rounded-full object-cover" />
              <span className="text-[13px] text-[#16233E] max-w-[160px] truncate tabular-nums">
                {a.name}
              </span>
              <button
                type="button"
                aria-label={`Remove ${a.name}`}
                onClick={() => onRemoveAttachment(a.id)}
                className="w-5 h-5 flex items-center justify-center rounded-full text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
              >
                <i className="ri-close-line text-[14px]" />
              </button>
            </div>
          ))}
        </div>
      )}

      {generating && (
        <div className="absolute bottom-0 left-0 right-0 h-[3px] overflow-hidden">
          <div className="h-full w-1/3 animate-[custom-progress_1.4s_ease-in-out_infinite] bg-[#152E56]" />
        </div>
      )}
      <style>{`@keyframes custom-progress { 0% { transform: translateX(-100%); } 100% { transform: translateX(400%); } }`}</style>
    </div>
  );
}