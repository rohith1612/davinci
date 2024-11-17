import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">Welcome to Project Planner</h1>
        <h2 className="text-xl text-gray-600">
          Effortlessly organize and track your projects.
        </h2>
        {/* Button to navigate to the /projects page */}
        <Link
          href="/projects"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create New Project
        </Link>
      </main>
    </div>
  );
}
