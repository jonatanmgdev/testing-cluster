"use client";

interface CommonChip {
  text: string;
  icon?: JSX.Element;
  color?: string;
  disabled?: boolean;
  onClick?: (event? : any) => void;
  className?: string;
  textClassName?: string;
}

export default function CommonChip({
  text,
  icon,
  onClick,
  color = "white",
  disabled = false,
  className,
  textClassName,
}: CommonChip) {
  const borderStyle = { borderColor: color };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={borderStyle}
      className={`inline-flex justify-center items-center ${className}`}
    >
        {icon}
        <div className={`ml-2 whitespace-nowrap ${textClassName}`}>{text}</div>
    </button>
  );
}
