import BentoGrid from '../components/BentoGrid';

export default function ProjectsPage() {
  return (
    <main className="relative h-screen overflow-hidden">
      {/* Header - Fixed with fade */}
      {/* <div className="absolute top-0 left-0 right-0 z-20 px-8 md:px-12 py-6 md:py-8">
        <h1 className="text-4xl md:text-5xl font-bold tracking-wide text-gray-900">
          Projects
        </h1>
        <p className="text-gray-600 mt-2 text-sm md:text-base">
          Explore my work — scroll in any direction
        </p>
      </div> */}

      {/* Bento Grid - Fills entire viewport */}
      <BentoGrid />
    </main>
  );
}


