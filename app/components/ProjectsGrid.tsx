interface ProjectsGridProps {
  children: React.ReactNode;
  className?: string;
}

export default function ProjectsGrid({
  children,
  className = "",
}: ProjectsGridProps) {
  return (
    <div className={`m-4 mb-8 grid grid-cols-10 gap-4 ${className}`}>
      {children}
    </div>
  );
}

