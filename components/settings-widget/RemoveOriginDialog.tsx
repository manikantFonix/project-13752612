'use client';

import DialogModal from './DialogModal';
import { focusRing } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RemoveOriginDialog({ open, onClose, onConfirm }: Props) {
  return (
    <DialogModal open={open} onClose={onClose} width={460}>
      <h3 className="text-[18px] font-semibold text-[#16233E]">
        Remove your last website?
      </h3>
      <p className="mt-2 text-[13px] text-[#16233E]">
        The widget will stop working straight away. The snippet can stay on your
        site — it just won't load anything until you add a website back.
      </p>
      <div className="mt-6 flex items-center justify-end gap-4">
        <button
          type="button"
          autoFocus
          onClick={onClose}
          className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#5D6C8A] transition-colors duration-150 whitespace-nowrap ${focusRing}`}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={onConfirm}
          className={`h-9 px-4 text-[13px] font-medium text-[#A8552A] bg-white border border-[#A8552A] rounded-full hover:bg-[#A8552A]/5 transition-colors duration-150 whitespace-nowrap ${focusRing}`}
        >
          Remove
        </button>
      </div>
    </DialogModal>
  );
}