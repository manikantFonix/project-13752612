'use client';

import type { MonthlyPoint } from './data';

const W = 620;
const H = 220;
const PAD_L = 36;
const PAD_R = 16;
const PAD_T = 16;
const PAD_B = 30;

function NiceMax(max: number): number {
  if (max <= 0) return 1;
  const step = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / step;
  let nice = 1;
  if (norm <= 1) nice = 1;
  else if (norm <= 2) nice = 2;
  else if (norm <= 2.5) nice = 2.5;
  else if (norm <= 5) nice = 5;
  else nice = 10;
  return nice * step;
}

function gridTicks(niceMax: number): number[] {
  const ticks: number[] = [];
  const steps = 4;
  for (let i = 0; i <= steps; i++) ticks.push((niceMax / steps) * i);
  return ticks;
}

export function AreaTimeChart({ data }: { data: MonthlyPoint[] }) {
  const values = data.map((d) => d.designs);
  const max = Math.max(...values, 0);
  const niceMax = NiceMax(max);
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const innerW = Math.max(plotW, 1);
  const stepX = data.length > 1 ? innerW / (data.length - 1) : innerW;
  const y = (v: number) => PAD_T + plotH - (v / niceMax) * plotH;
  const x = (i: number) => PAD_L + (data.length > 1 ? i * stepX : 0);
  const points = data.map((d, i) => [x(i), y(d.designs)] as const);
  const linePath = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  const areaPath = `${linePath} L${points[points.length - 1][0]},${y(0)} L${points[0][0]},${y(0)} Z`;
  const ticks = gridTicks(niceMax);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-hidden="true"
      width="100%"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD_L}
            y1={y(t)}
            x2={W - PAD_R}
            y2={y(t)}
            stroke="#E4E9F4"
            strokeWidth={1}
          />
          <text
            x={PAD_L - 8}
            y={y(t) + 3}
            textAnchor="end"
            fontSize={11}
            fill="#5D6C8A"
            fontWeight={500}
          >
            {Math.round(t).toLocaleString('en-US')}
          </text>
        </g>
      ))}
      <path d={areaPath} fill="#152E56" fillOpacity={0.08} />
      <path d={linePath} fill="none" stroke="#152E56" strokeWidth={2} />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3} fill="#152E56" />
      ))}
      {data.map((d, i) => (
        <text
          key={d.month}
          x={x(i)}
          y={H - 10}
          textAnchor="middle"
          fontSize={11}
          fill="#5D6C8A"
          fontWeight={500}
          className="tabular-nums"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}

export function BarTimeChart({ data }: { data: MonthlyPoint[] }) {
  const values = data.map((d) => d.completed);
  const max = Math.max(...values, 0);
  const niceMax = NiceMax(max);
  const plotW = W - PAD_L - PAD_R;
  const plotH = H - PAD_T - PAD_B;
  const innerW = Math.max(plotW, 1);
  const band = data.length > 0 ? innerW / data.length : innerW;
  const barW = Math.min(band * 0.6, 54);
  const y = (v: number) => PAD_T + plotH - (v / niceMax) * plotH;
  const ticks = gridTicks(niceMax);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="w-full h-auto"
      aria-hidden="true"
      width="100%"
    >
      {ticks.map((t) => (
        <g key={t}>
          <line
            x1={PAD_L}
            y1={y(t)}
            x2={W - PAD_R}
            y2={y(t)}
            stroke="#E4E9F4"
            strokeWidth={1}
          />
          <text
            x={PAD_L - 8}
            y={y(t) + 3}
            textAnchor="end"
            fontSize={11}
            fill="#5D6C8A"
            fontWeight={500}
          >
            {Math.round(t).toLocaleString('en-US')}
          </text>
        </g>
      ))}
      {data.map((d, i) => {
        const cx = PAD_L + band * i + band / 2;
        const h = y(0) - y(d.completed);
        const bx = cx - barW / 2;
        const by = y(d.completed);
        const r = Math.min(barW / 2, 8);
        return (
          <rect
            key={d.month}
            x={bx}
            y={by}
            width={barW}
            height={Math.max(h, 0)}
            rx={r}
            fill="#152E56"
          />
        );
      })}
      {data.map((d, i) => (
        <text
          key={d.month}
          x={PAD_L + band * i + band / 2}
          y={H - 10}
          textAnchor="middle"
          fontSize={11}
          fill="#5D6C8A"
          fontWeight={500}
          className="tabular-nums"
        >
          {d.month}
        </text>
      ))}
    </svg>
  );
}