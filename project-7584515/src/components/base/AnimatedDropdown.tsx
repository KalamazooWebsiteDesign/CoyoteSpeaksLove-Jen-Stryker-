import { useState, useRef, useEffect } from "react";

interface AnimatedDropdownProps {
  label: string;
  children: React.ReactNode;
  summaryBg?: string;
  summaryTextColor?: string;
  iconColor?: string;
  contentBorderColor?: string;
}

export default function AnimatedDropdown({
  label,
  children,
  summaryBg = "#e8f4fd",
  summaryTextColor = "#133C55",
  iconColor = "#386FA4",
  contentBorderColor = "#84D2F6",
}: AnimatedDropdownProps) {
  const [open, setOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setHeight(open ? contentRef.current.scrollHeight : 0);
    }
  }, [open]);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full cursor-pointer p-4 rounded-lg transition-colors duration-200"
        style={{ backgroundColor: summaryBg }}
        aria-expanded={open}
      >
        <span className="font-semibold text-sm" style={{ color: summaryTextColor }}>
          {label}
        </span>
        <span
          className="flex items-center justify-center w-5 h-5 transition-transform duration-300"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <i className="ri-arrow-down-s-line text-xl" style={{ color: iconColor }} />
        </span>
      </button>

      <div
        style={{
          height: `${height}px`,
          overflow: "hidden",
          transition: "height 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div ref={contentRef}>
          <div
            className="mt-3 p-6 bg-white border rounded-lg"
            style={{ borderColor: contentBorderColor }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
