"use client";

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [isAnimating, setIsAnimating] = useState(false);

  // Function to split the text into individual letters
  const splitText = (text: string) => {
    return text.split("").map((letter, index) => (
      <span
        key={index}
        className={`inline-block transform transition-all duration-300 ${
          isAnimating ? "animate-jump" : ""
        }`}
        style={{ animationDelay: `${index * 100}ms` }} // Slightly increased delay for smoother wave
      >
        {letter}
      </span>
    ));
  };

  // Function to start the animation
  const startAnimation = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      // Reset animation state after the wave completes (calculate total duration)
      setTimeout(() => setIsAnimating(false), 4000); // Adjust the timeout to match animation duration
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#E2F1E7]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left">
        {/* Wrap text in a container for hover effect */}
        <h1
          className="text-5xl font-bold text-[#243642] cursor-pointer"
          onMouseEnter={startAnimation}
        >
          {splitText("Welcome to Project Planner")}
        </h1>
        <h2 className="text-2xl text-[#387478] hover:text-[#629584] transition-colors duration-300">
          Effortlessly organize and track your projects.
        </h2>
        {/* Button to navigate to the /projects page */}
        <Link
          href="/projects"
          className="px-6 py-3 bg-[#257180] text-white rounded-full hover:bg-[#387478] shadow-lg hover:shadow-xl transition duration-300 transform hover:-translate-y-1"
        >
          Create New Project
        </Link>
      </main>
    </div>
  );
}
