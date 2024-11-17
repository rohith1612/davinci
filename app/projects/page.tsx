"use client";

import { useRouter } from "next/navigation";
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
    Others: string | number | readonly string[] | undefined;
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
      Others: "",
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

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const saveData = (data: ProjectData) => {
      localStorage.setItem("projectData", JSON.stringify(data));
    };
    saveData(projectData);
    router.push(`/generate-prd`);
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
            <label className="flex flex-col mt-2">
              Others:
              <input
                type="text"
                name="Others"
                value={projectData.ProjectMembers.Others}
                onChange={handleMemberChange}
                className="p-2 border border-gray-300 rounded-lg mt-1 text-black"
                min="0"
                placeholder="Enter roles in new lines"
              />
            </label>
          </fieldset>

          {/* Project Regulations */}
          <label className="flex flex-col font-medium text-lg">
            Project Regulations:
            <input
              type="text"
              name="ProjectRegulations"
              value={projectData.ProjectRegulations.join(", ")}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  ProjectRegulations: e.target.value
                    .split(",")
                    .map((item) => item.trim()),
                }))
              }
              className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter regulations, separated by commas"
            />
          </label>

          {/* Dependencies */}
          <fieldset className="flex flex-col gap-3 font-medium text-lg">
            <legend>Dependencies</legend>
            <label>
              Frontend Framework:
              <input
                type="text"
                name="Frontend"
                value={projectData.Dependencies.Frontend}
                onChange={(e) =>
                  setProjectData((prevData) => ({
                    ...prevData,
                    Dependencies: {
                      ...prevData.Dependencies,
                      Frontend: e.target.value,
                    },
                  }))
                }
                className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., React"
              />
            </label>

            <label>
              Backend Framework:
              <input
                type="text"
                name="Backend"
                value={projectData.Dependencies.Backend}
                onChange={(e) =>
                  setProjectData((prevData) => ({
                    ...prevData,
                    Dependencies: {
                      ...prevData.Dependencies,
                      Backend: e.target.value,
                    },
                  }))
                }
                className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Node.js"
              />
            </label>

            <label>
              Database:
              <input
                type="text"
                name="Database"
                value={projectData.Dependencies.Database}
                onChange={(e) =>
                  setProjectData((prevData) => ({
                    ...prevData,
                    Dependencies: {
                      ...prevData.Dependencies,
                      Database: e.target.value,
                    },
                  }))
                }
                className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., MongoDB"
              />
            </label>
          </fieldset>

          {/* Key Features */}
          <label className="flex flex-col font-medium text-lg">
            Key Features:
            <textarea
              name="KeyFeatures"
              value={projectData.KeyFeatures.join("\n")}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  KeyFeatures: e.target.value
                    .split("\n")
                    .map((item) => item.trim()),
                }))
              }
              className="p-3 h-32 border border-gray-300 rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter key features, each on a new line"
            />
          </label>

          {/* Security Requirements */}
          <label className="flex flex-col font-medium text-lg">
            Security Requirements:
            <textarea
              name="SecurityRequirements"
              value={projectData.SecurityRequirements.join("\n")}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  SecurityRequirements: e.target.value
                    .split("\n")
                    .map((item) => item.trim()),
                }))
              }
              className="p-3 h-32 border border-gray-300 rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter security requirements, each on a new line"
            />
          </label>

          {/* Platform Support */}
          <label className="flex flex-col font-medium text-lg">
            Platform Support:
            <input
              type="text"
              name="PlatformSupport"
              value={projectData.PlatformSupport}
              onChange={handleInputChange}
              className="p-3 border border-gray-300 rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Web application with mobile-friendly design"
            />
          </label>

          {/* Non-Functional Requirements */}
          <label className="flex flex-col font-medium text-lg">
            Non-Functional Requirements:
            <textarea
              name="NonFunctionalRequirements"
              value={projectData.NonFunctionalRequirements.join("\n")}
              onChange={(e) =>
                setProjectData((prevData) => ({
                  ...prevData,
                  NonFunctionalRequirements: e.target.value
                    .split("\n")
                    .map((item) => item.trim()),
                }))
              }
              className="p-3 h-32 border border-gray-300 rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter non-functional requirements, each on a new line"
            />
          </label>

          {/* Additional Information */}
          <label className="flex flex-col font-medium text-lg">
            Additional Information:
            <textarea
              name="AdditionalInformation"
              value={projectData.AdditionalInformation}
              onChange={handleInputChange}
              className="p-3 h-32 border border-gray-300 rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter any additional information"
            />
          </label>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mt-6 text-lg font-semibold transition-all duration-200"
          >
            Generate PRD
          </button>
        </form>
      </main>
    </div>
  );
}
