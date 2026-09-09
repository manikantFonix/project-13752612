'use client';

import DialogModal from './DialogModal';
import { focusRing } from './data';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function RotateKeyDialog({ open, onClose, onConfirm }: Props) {
  return (
    <DialogModal open={open} onClose={onClose} width={520}>
      <h3 className="text-[18px] font-semibold text-[#16233E]">
        Rotate your embed key?
      </h3>
      <div className="mt-2 space-y-2">
        <p className="text-[13px] text-[#16233E]">
          The current key stops working immediately.
        </p>
        <p className="text-[13px] text-[#16233E]">
          Every place you've pasted the snippet will stop loading until you
          replace it with the new one. If the widget is on more than one page,
          that's every one of them.
        </p>
        <p className="text-[13px] text-[#5D6C8A]">
          Only do this if you think the key has been misused. It doesn't fix
          anything else.
        </p>
      </div>
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
          Rotate key
        </button>
      </div>
    </DialogModal>
  );
}