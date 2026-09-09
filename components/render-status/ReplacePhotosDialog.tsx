'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

type DialogPreview = 'ready' | 'uploading' | 'notEnough' | 'angles' | 'failed';

const demos: DialogPreview[] = ['ready', 'uploading', 'notEnough', 'angles', 'failed'];
const demoLabel: Record<DialogPreview, string> = {
  ready: 'Ready',
  uploading: 'Uploading',
  notEnough: 'Not enough',
  angles: 'Angles',
  failed: 'Failed',
};

const lightRing =
  'focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]';

export default function ReplacePhotosDialog({
  open,
  onClose,
  onAngles,
}: {
  open: boolean;
  onClose: () => void;
  onAngles: () => void;
}) {
  const [photos, setPhotos] = useState<string[]>([]);
  const [countError, setCountError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [notEnough, setNotEnough] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [preview, setPreview] = useState<DialogPreview>('ready');
  const [dragOver, setDragOver] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, []);

  useEffect(() => {
    if (!open) return;
    setPreview('ready');
    setPhotos([]);
    setCountError(false);
    setUploading(false);
    setNotEnough(false);
    setSaveError(false);
    setDragOver(false);
    cancelRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !uploading) {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const root = dialogRef.current;
      if (!root) return;
      const els = Array.from(
        root.querySelectorAll<HTMLElement>(
          'button, [href], input, textarea, [tabindex]:not([tabindex="-1"])'
        )
      ).filter((el) => !el.hasAttribute('disabled') && el.style.display !== 'none');
      if (els.length === 0) return;
      const first = els[0];
      const last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, uploading, onClose]);

  if (!open) return null;

  const ready = photos.length === 3;
  const canCreate = ready && !uploading && !notEnough;

  const handleFiles = (files: File[]) => {
    setCountError(false);
    if (files.length !== 3) {
      setCountError(true);
      return;
    }
    setPhotos(files.map((f) => URL.createObjectURL(f)));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    handleFiles(files);
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const removePhoto = () => {
    setCountError(false);
    setPhotos([]);
  };

  const submit = () => {
    if (!canCreate) return;
    if (preview === 'notEnough') {
      setNotEnough(true);
      return;
    }
    setUploading(true);
    timer.current = setTimeout(() => {
      setUploading(false);
      if (preview === 'failed') {
        setSaveError(true);
        return;
      }
      if (preview === 'angles') {
        onAngles();
        onClose();
        return;
      }
      onClose();
    }, 1000);
  };

  const applyPreview = (p: DialogPreview) => {
    setPreview(p);
    setUploading(p === 'uploading');
    setNotEnough(p === 'notEnough');
    setSaveError(p === 'failed');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-[rgba(22,35,62,0.4)]"
        onClick={() => !uploading && onClose()}
      />
      <div
        ref={dialogRef}
        className="relative w-[520px] max-h-[90vh] overflow-auto bg-white border border-[#DCE3F0] rounded-[12px] p-7"
      >
        <h2 className="text-[20px] font-semibold tracking-[-0.02em] text-[#16233E]">
          Replace photographs
        </h2>
        <p className="mt-1 text-[13px] text-[#5D6C8A]">
          Upload three new photographs of this piece. We'll work out which
          angle each one is.
        </p>

        {ready ? (
          <div className="mt-5 flex gap-3">
            {photos.map((url, i) => (
              <div key={i} className="relative w-24 h-24">
                <img
                  src={url}
                  alt=""
                  className="w-full h-full rounded-[12px] object-cover border border-[#DCE3F0]"
                />
                <button
                  onClick={() => !uploading && removePhoto()}
                  disabled={uploading}
                  aria-label="Remove photograph"
                  className={`absolute -top-2 -right-2 w-6 h-6 rounded-full bg-white border border-[#DCE3F0] flex items-center justify-center text-[#5D6C8A] hover:text-[#16233E] disabled:bg-[#EDF1FA] ${lightRing}`}
                >
                  <i className="ri-close-line text-[14px]" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-5">
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragOver(true);
              }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              onClick={() => !uploading && fileRef.current?.click()}
              className={`h-[160px] rounded-[12px] border border-dashed bg-white flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors duration-150 ${
                dragOver ? 'border-[#152E56]' : 'border-[#C6D0E6] hover:border-[#152E56]'
              }`}
            >
              <i className="ri-add-line text-[24px] text-[#5D6C8A]" />
              <span className="text-[13px] text-[#16233E]">
                Add three photographs
              </span>
              <span className="text-[13px] text-[#5D6C8A]">
                Drop them here or click to choose. Upload all three at once.
              </span>
            </div>
            <input
              ref={fileRef}
              type="file"
              multiple
              className="hidden"
              disabled={uploading}
              onChange={handleInputChange}
            />
            {countError && (
              <p className="mt-2 text-[13px] text-[#A8552A]">
                Add exactly three photographs. This one needs all three
                together.
              </p>
            )}
          </div>
        )}

        {notEnough && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              You need at least 12 renders for this and have 4. Nothing has
              been replaced and no renders have been used.
            </p>
            <Link
              href="/settings/usage"
              className={`mt-3 h-9 px-4 text-[13px] font-medium text-[#16233E] bg-white border border-[#DCE3F0] rounded-full hover:bg-[#EDF1FA] transition-colors duration-150 whitespace-nowrap inline-flex items-center ${lightRing}`}
            >
              Top up renders
            </Link>
          </div>
        )}

        {saveError && (
          <div className="mt-4 border-l-2 border-[#A8552A] pl-3">
            <p className="text-[13px] text-[#A8552A]">
              We couldn't replace these photographs. Nothing has changed — try
              again.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-[13px] text-[#5D6C8A]">
            This will use at least 12 renders.
          </p>
          <div className="flex items-center gap-4">
            <button
              ref={cancelRef}
              onClick={() => !uploading && onClose()}
              className={`px-2 h-9 text-[13px] font-medium text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 whitespace-nowrap ${lightRing}`}
            >
              {uploading ? 'Cancel' : 'Cancel'}
            </button>
            <div className="flex flex-col items-end">
              <button
                onClick={submit}
                disabled={!canCreate}
                className={`h-9 px-4 text-[13px] font-medium rounded-full border transition-colors duration-150 whitespace-nowrap inline-flex items-center gap-2 ${lightRing} ${
                  canCreate
                    ? 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
                    : 'bg-[#EDF1FA] border-[#DCE3F0] text-[#5D6C8A]'
                }`}
              >
                {uploading ? (
                  <>
                    <i className="ri-loader-4-line animate-spin text-[16px]" />
                    Replacing…
                  </>
                ) : (
                  'Replace and regenerate'
                )}
              </button>
              {!ready && !uploading && (
                <p className="mt-1.5 text-[13px] text-[#5D6C8A]">
                  Add all three photographs to continue.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 left-6 z-50 max-w-[70vw] flex items-center gap-1 bg-white border border-[#DCE3F0] rounded-full p-1">
        <span className="px-2 text-[13px] font-medium text-[#5D6C8A]">
          Dialog state
        </span>
        {demos.map((d) => (
          <button
            key={d}
            onClick={() => applyPreview(d)}
            className={`h-7 px-2 text-[13px] font-medium rounded-full transition-colors duration-150 whitespace-nowrap ${lightRing} ${
              preview === d
                ? 'bg-[#152E56] text-white'
                : 'text-[#5D6C8A] hover:bg-[#EDF1FA]'
            }`}
          >
            {demoLabel[d]}
          </button>
        ))}
      </div>
    </div>
  );
}