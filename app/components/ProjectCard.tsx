interface ProjectCardProps {
  colSpan?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
  title?: string;
  height?: string;
  className?: string;
}

export default function ProjectCard({
  colSpan = 3,
  title = "Project xyz",
  className = "",
}: ProjectCardProps) {
  const colSpanClass = `col-span-${colSpan}`;

  return (
    <div
      className={`border-2 border-background-base/20 bg-white/5 rounded-2xl p-4 h-60 ${colSpanClass} ${className}`}
    >
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
}

