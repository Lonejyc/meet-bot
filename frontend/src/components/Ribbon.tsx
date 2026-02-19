interface RibbonProps {
  className?: string;
}

export default function Ribbon({ className = "" }: RibbonProps) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1512 669"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-1/2 top-1/2 h-auto w-[120%] -translate-x-1/2 -translate-y-1/2"
        preserveAspectRatio="none"
      >
        <path
          d="M-266 325.13C-184.833 294.13 27.9 290.53 229.5 524.13C481.5 816.13 957.5 508.274 1018.5 262.274C1058.66 100.322 938.433 -27.1626 845 47.2737C724.5 143.274 742.7 297.813 868.5 347.002C1321.5 524.13 1455 434.002 1564 365.502"
          stroke="#C7FF39"
          strokeWidth="51"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
