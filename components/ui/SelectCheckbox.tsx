'use client';

interface Props {
  checked: boolean;
  onChange: () => void;
  label: string;
}

export default function SelectCheckbox({ checked, onChange, label }: Props) {
  return (
    <label className="flex items-center cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        aria-label={label}
        className="w-[18px] h-[18px] rounded-[6px] border-[#DCE3F0] text-[#152E56] cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#152E56] focus-visible:ring-offset-2 focus-visible:ring-offset-[#EDF1FA]"
      />
    </label>
  );
}