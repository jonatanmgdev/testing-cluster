"use client";

interface PageHeaderProps {
  title?: string;
  description?: string;
  className?: string;
}

export default function PageHeader({
  title,
  description,
  className,
}: PageHeaderProps) {
  return (
    <div className={`flex flex-col ${className}`}>
      <div className="container">
        <h2 className="mb-2">{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}
