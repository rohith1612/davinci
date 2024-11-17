"use client";

import { useState } from "react";

// Sample interface to define the project data structure
interface ProjectData {
  ProjectName: string;
  ProjectDescription: string;
  ProjectScale: string;
  ProjectTimeFrame: string;
  CanHaveMoreMembers: boolean;
  MaximumMemberLimit: number;
  ProjectMembers: {
    Designer: number;
    SecurityAnalyst: number;
    BackendDevelopers: number;
    FrontendDevelopers: number;
  };
  ProjectRegulations: string[];
  ProjectType: string;
  Dependencies: {
    Frontend: string;
    Backend: string;
    Database: string;
  };
  KeyFeatures: string[];
  TargetAudience: string;
  SecurityRequirements: string[];
  UserFlow: string[];
  PerformanceMetrics: {
    responseTime: string;
    loadHandling: string;
  };
  IntegrationNeeds: string[];
  PlatformSupport: string;
  NonFunctionalRequirements: string[];
  AdditionalInformation: string;
}

export default function Projects() {
  // State to collect form data
  const [projectData, setProjectData] = useState<ProjectData>({
    ProjectName: "",
    ProjectDescription: "",
    ProjectScale: "",
    ProjectTimeFrame: "",
    CanHaveMoreMembers: false,
    MaximumMemberLimit: 0,
    ProjectMembers: {
      Designer: 0,
      SecurityAnalyst: 0,
      BackendDevelopers: 0,
      FrontendDevelopers: 0,
    },
    ProjectRegulations: [],
    ProjectType: "",
    Dependencies: {
      Frontend: "",
      Backend: "",
      Database: "",
    },
    KeyFeatures: [],
    TargetAudience: "",
    SecurityRequirements: [],
    UserFlow: [],
    PerformanceMetrics: {
      responseTime: "",
      loadHandling: "",
    },
    IntegrationNeeds: [],
    PlatformSupport: "",
    NonFunctionalRequirements: [],
    AdditionalInformation: "",
  });

  // State to store all projects
  const [projects, setProjects] = useState<ProjectData[]>([]);

  // Function to handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setProjects([...projects, projectData]); // Add current project data to the array
    console.log("Collected Project Data:", projectData);
  };

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setProjectData((prevData) => ({ ...prevData, [name]: checked }));
    } else {
      setProjectData((prevData) => ({ ...prevData, [name]: value }));
    }
  };

  // Function to handle member count changes
  const handleMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({
      ...prevData,
      ProjectMembers: {
        ...prevData.ProjectMembers,
        [name]: parseInt(value),
      },
    }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-center sm:text-left">
          Project Planner
        </h1>

        {/* Extended Form */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <label className="flex flex-col font-medium text-lg">
            Project Name:
            <input
              type="text"
              name="ProjectName"
              value={projectData.ProjectName}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your project name"
              required
            />
          </label>

          <label className="flex flex-col font-medium text-lg">
            Project Description:
            <textarea
              name="ProjectDescription"
              value={projectData.ProjectDescription}
              onChange={handleInputChange}
              className="p-3 h-32 border border-gray-300 rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your project description"
              required
            />
          </label>

          <label className="flex flex-col font-medium text-lg">
            Project Scale:
            <input
              type="text"
              name="ProjectScale"
              value={projectData.ProjectScale}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Small, Medium, Large"
            />
          </label>

          <label className="flex flex-col font-medium text-lg">
            Project Time Frame:
            <input
              type="text"
              name="ProjectTimeFrame"
              value={projectData.ProjectTimeFrame}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., 3 months"
            />
          </label>

          {/* Member section */}
          <fieldset className="border border-gray-300 p-4 rounded-lg">
            <legend className="font-medium text-lg">Project Members</legend>
            <label className="flex flex-col mt-2">
              Designers:
              <input
                type="number"
                name="Designer"
                value={projectData.ProjectMembers.Designer}
                onChange={handleMemberChange}
                className="p-2 border border-gray-300 rounded-lg mt-1 text-black"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2">
              Security Analysts:
              <input
                type="number"
                name="SecurityAnalyst"
                value={projectData.ProjectMembers.SecurityAnalyst}
                onChange={handleMemberChange}
                className="p-2 border border-gray-300 rounded-lg mt-1 text-black"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2">
              Backend Developers:
              <input
                type="number"
                name="BackendDevelopers"
                value={projectData.ProjectMembers.BackendDevelopers}
                onChange={handleMemberChange}
                className="p-2 border border-gray-300 rounded-lg mt-1 text-black"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2">
              Frontend Developers:
              <input
                type="number"
                name="FrontendDevelopers"
                value={projectData.ProjectMembers.FrontendDevelopers}
                onChange={handleMemberChange}
                className="p-2 border border-gray-300 rounded-lg mt-1 text-black"
                min="0"
              />
            </label>
          </fieldset>

          {/* Additional data collection can continue similarly... */}
          {/* Collect more data as per requirements */}

          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6 text-lg font-semibold transition-all duration-200">
            Submit Project
          </button>
        </form>
      </main>
    </div>
  );
}

// Export the collected projects data
// export { projects };
