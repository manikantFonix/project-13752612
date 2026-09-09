'use client';

import { useEffect, useRef, useState } from 'react';
import { FOCUS_RING } from './requests/data';

interface Props {
  onClose: () => void;
  onAdd: (dataUrl: string) => void;
}

const WIDTH = 640;
const HEIGHT = 420;
const strokeWidths = [
  { value: 2, label: 'Thin' },
  { value: 5, label: 'Medium' },
  { value: 9, label: 'Thick' },
];

export default function SketchDialog({ onClose, onAdd }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [tool, setTool] = useState<'pencil' | 'eraser'>('pencil');
  const [width, setWidth] = useState(5);
  const [has, setHas] = useState(false);
  const drawing = useRef(false);
  const last = useRef({ x: 0, y: 0 });
  const undoStack = useRef<string[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  }, []);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const prev = document.activeElement as HTMLElement | null;
    wrap.querySelector<HTMLElement>('[data-autofocus]')?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key !== 'Tab') return;
      const els = Array.from(
        wrap.querySelectorAll<HTMLElement>('button, input, textarea, [tabindex]:not([tabindex="-1"])')
      ).filter((el) => !el.hasAttribute('disabled'));
      if (els.length === 0) return;
      const first = els[0];
      const lastEl = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        lastEl.focus();
      } else if (!e.shiftKey && document.activeElement === lastEl) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      prev?.focus();
    };
  }, [onClose]);

  const pos = (e: React.PointerEvent) => {
    const rect = canvasRef.current!.getBoundingClientRect();
    return {
      x: (e.clientX - rect.left) * (WIDTH / rect.width),
      y: (e.clientY - rect.top) * (HEIGHT / rect.height),
    };
  };

  const begin = (e: React.PointerEvent) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const snapshot = canvas.toDataURL();
    undoStack.current.push(snapshot);
    drawing.current = true;
    last.current = pos(e);
    canvas.setPointerCapture(e.pointerId);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const p = pos(e);
    ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : '#16233E';
    ctx.lineWidth = tool === 'eraser' ? width + 6 : width;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(last.current.x, last.current.y);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
    last.current = p;
    setHas(true);
  };

  const end = () => {
    drawing.current = false;
  };

  const undo = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const prev = undoStack.current.pop();
    if (prev) {
      const img = new Image();
      img.onload = () => ctx.drawImage(img, 0, 0);
      img.src = prev;
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, WIDTH, HEIGHT);
    }
  };

  const clear = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    undoStack.current.push(canvas.toDataURL());
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);
  };

  const toolBtn = (t: 'pencil' | 'eraser', label: string, icon: string) => (
    <button
      key={t}
      type="button"
      onClick={() => setTool(t)}
      aria-pressed={tool === t}
      aria-label={label}
      className={`w-9 h-9 flex items-center justify-center rounded-full transition-colors duration-150 ${FOCUS_RING} ${
        tool === t
          ? 'bg-[#152E56] text-white'
          : 'bg-[#F3F6FC] text-[#5D6C8A] hover:text-[#16233E]'
      }`}
    >
      <i className={`${icon} text-[20px] w-5 h-5 flex items-center justify-center`} />
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-[#16233E]/40" onClick={onClose} aria-hidden />
      <div
        ref={wrapRef}
        role="dialog"
        aria-modal="true"
        aria-label="Draw your idea"
        className="relative w-full max-w-[720px] bg-white border border-[#DCE3F0] rounded-[12px] p-5"
      >
        <h2 className="text-[20px] font-semibold text-[#16233E]">Draw your idea</h2>

        <div className="mt-4 flex items-center gap-2 justify-between">
          <div className="flex items-center gap-2">
            {toolBtn('pencil', 'Pencil', 'ri-pencil-line')}
            {toolBtn('eraser', 'Eraser', 'ri-eraser-line')}
            <button
              type="button"
              onClick={undo}
              aria-label="Undo"
              className={`w-9 h-9 flex items-center justify-center rounded-full bg-[#F3F6FC] text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 ${FOCUS_RING}`}
            >
              <i className="ri-arrow-go-back-line text-[20px] w-5 h-5 flex items-center justify-center" />
            </button>
            <button
              type="button"
              onClick={clear}
              aria-label="Clear"
              className={`w-9 h-9 flex items-center justify-center rounded-full bg-[#F3F6FC] text-[#5D6C8A] hover:text-[#16233E] transition-colors duration-150 ${FOCUS_RING}`}
            >
              <i className="ri-delete-bin-line text-[20px] w-5 h-5 flex items-center justify-center" />
            </button>
          </div>
          <div className="flex items-center gap-1.5" role="radiogroup" aria-label="Stroke width">
            {strokeWidths.map((s) => (
              <button
                key={s.value}
                type="button"
                onClick={() => setWidth(s.value)}
                aria-checked={width === s.value}
                role="radio"
                aria-label={s.label}
                className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-150 ${FOCUS_RING} ${
                  width === s.value
                    ? 'bg-[#152E56]/10 text-[#152E56]'
                    : 'bg-[#F3F6FC] text-[#5D6C8A] hover:text-[#16233E]'
                }`}
              >
                <span
                  className="rounded-full bg-current"
                  style={{ width: s.value + 1, height: s.value + 1 }}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 flex justify-center">
          <canvas
            ref={canvasRef}
            width={WIDTH}
            height={HEIGHT}
            onPointerDown={begin}
            onPointerMove={move}
            onPointerUp={end}
            onPointerLeave={end}
            className="bg-white border border-[#DCE3F0] rounded-[12px] touch-none cursor-crosshair focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
          />
        </div>

        <p className="mt-3 text-[12px] text-[#5D6C8A]">
          You can describe it instead if that's easier.
        </p>

        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={`h-9 px-4 text-[13px] font-medium text-[#16233E] hover:text-[#152E56] transition-colors duration-150 whitespace-nowrap ${FOCUS_RING}`}
          >
            Cancel
          </button>
          <button
            type="button"
            data-autofocus
            disabled={!has}
            onClick={() => {
              const dataUrl = canvasRef.current?.toDataURL() ?? '';
              onAdd(dataUrl);
              onClose();
            }}
            className={`h-9 px-4 text-[13px] font-medium rounded-full border whitespace-nowrap ${FOCUS_RING} ${
              has
                ? 'bg-[#152E56] border-[#152E56] text-white hover:bg-[#172D54]'
                : 'bg-[#EDF1FA] border-[#EDF1FA] text-[#5D6C8A] cursor-not-allowed'
            } transition-colors duration-150`}
          >
            Add sketch
          </button>
        </div>
      </div>
    </div>
  );
}