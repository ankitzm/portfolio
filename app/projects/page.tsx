import BentoGrid from '../components/BentoGrid';

export default function ProjectsPage() {
  return (
    <main className="relative min-h-screen bg-gray-100">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-8 md:p-12 bg-gradient-to-b from-gray-100 via-gray-100/90 to-transparent">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-gray-900">
          Projects
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Explore my work — scroll in any direction
        </p>
      </div>

      {/* Bento Grid */}
      <BentoGrid />
    </main>
  );
}


