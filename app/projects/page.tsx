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
    Others: string;
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
  KeyFeatures: string;
  TargetAudience: string;
  SecurityRequirements: string;
  UserFlow: string[];
  PerformanceMetrics: {
    responseTime: string;
    loadHandling: string;
  };
  IntegrationNeeds: string[];
  PlatformSupport: string;
  NonFunctionalRequirements: string;
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
    KeyFeatures: "",
    TargetAudience: "",
    SecurityRequirements: "",
    UserFlow: [],
    PerformanceMetrics: {
      responseTime: "",
      loadHandling: "",
    },
    IntegrationNeeds: [],
    PlatformSupport: "",
    NonFunctionalRequirements: "",
    AdditionalInformation: "",
  });

  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Check if required fields are filled
    if (!projectData.ProjectName || !projectData.ProjectDescription) {
      setError("You need to enter both Project Name and Project Description.");
      return;
    }

    setError(null); // Clear any previous error

    // Save data and navigate
    const saveData = (data: typeof projectData) => {
      localStorage.setItem("projectData", JSON.stringify(data));
    };
    saveData(projectData);

    // Navigate to the next page
    router.push(`/generate-prd`);
  };

  // Function to handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Function to handle member count changes
  const handleMemberChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setProjectData((prevData) => ({
      ...prevData,
      ProjectMembers: {
        ...prevData.ProjectMembers,
        [name]: name === "Others" ? value : parseInt(value, 10), // String for 'Others', number otherwise
      },
    }));
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#E2F1E7]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full max-w-2xl">
        <h1 className="text-5xl font-bold mb-6 text-center sm:text-left text-[#243642]">
          Project Planner
        </h1>

        {/* Extended Form */}
        <form className="flex flex-col gap-6 w-full" onSubmit={handleSubmit}>
          <label className="flex flex-col font-medium text-lg text-[#257180]">
            Project Name:
            <input
              type="text"
              name="ProjectName"
              value={projectData.ProjectName}
              onChange={handleInputChange}
              className="p-3 border border-[#629584] rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-[#387478] bg-[#F2E5BF]"
              placeholder="Enter your project name"
              required
            />
          </label>

          <label className="flex flex-col font-medium text-lg text-[#257180]">
            Project Description:
            <textarea
              name="ProjectDescription"
              value={projectData.ProjectDescription}
              onChange={handleInputChange}
              className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-black resize-none focus:outline-none focus:ring-2 focus:ring-[#387478] bg-[#F2E5BF]"
              placeholder="Enter your project description"
              required
            />
          </label>

          <label className="flex flex-col font-medium text-lg text-[#257180]">
            Project Scale:
            <input
              type="text"
              name="ProjectScale"
              value={projectData.ProjectScale}
              onChange={handleInputChange}
              className="p-3 border border-[#629584] rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-[#387478] bg-[#F2E5BF]"
              placeholder="e.g., Small, Medium, Large"
            />
          </label>

          <label className="flex flex-col font-medium text-lg text-[#257180]">
            Project Time Frame:
            <input
              type="text"
              name="ProjectTimeFrame"
              value={projectData.ProjectTimeFrame}
              onChange={handleInputChange}
              className="p-3 border border-[#629584] rounded-lg mt-2 text-black focus:outline-none focus:ring-2 focus:ring-[#387478] bg-[#F2E5BF]"
              placeholder="e.g., 3 months"
            />
          </label>

          {/* Member section */}
          <fieldset className="border border-[#629584] p-4 rounded-lg bg-[#E2F1E7]">
            <legend className="font-medium text-lg text-[#257180]">
              Project Members
            </legend>
            <label className="flex flex-col mt-2 text-[#257180]">
              Designers:
              <input
                type="number"
                name="Designer"
                value={projectData.ProjectMembers.Designer}
                onChange={handleMemberChange}
                className="p-2 border border-[#629584] rounded-lg mt-1 text-black bg-[#F2E5BF]"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2 text-[#257180]">
              Security Analysts:
              <input
                type="number"
                name="SecurityAnalyst"
                value={projectData.ProjectMembers.SecurityAnalyst}
                onChange={handleMemberChange}
                className="p-2 border border-[#629584] rounded-lg mt-1 text-black bg-[#F2E5BF]"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2 text-[#257180]">
              Backend Developers:
              <input
                type="number"
                name="BackendDevelopers"
                value={projectData.ProjectMembers.BackendDevelopers}
                onChange={handleMemberChange}
                className="p-2 border border-[#629584] rounded-lg mt-1 text-black bg-[#F2E5BF]"
                min="0"
              />
            </label>
            <label className="flex flex-col mt-2 text-[#257180]">
              Frontend Developers:
              <input
                type="number"
                name="FrontendDevelopers"
                value={projectData.ProjectMembers.FrontendDevelopers}
                onChange={handleMemberChange}
                className="p-2 border border-[#629584] rounded-lg mt-1 text-black bg-[#F2E5BF]"
                min="0"
              />
            </label>
            <label className="flex flex-col font-medium text-lg text-[#387478]">
              Others:
              <textarea
                name="Others"
                value={projectData.ProjectMembers.Others}
                onChange={handleMemberChange}
                className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] resize-none focus:outline-none focus:ring-2 focus:ring-[#257180]"
                placeholder="Enter Additional Roles separated by commas"
              />
            </label>
          </fieldset>

          {/* Project Regulations */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
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
                    .map((item) => item.trim()), // Allow spaces between items
                }))
              }
              className="p-3 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="Enter regulations, separated by commas"
            />
          </label>

          {/* Dependencies */}
          <fieldset className="flex flex-col gap-3 font-medium text-lg text-[#387478]">
            <legend className="text-2xl font-bold">Dependencies</legend>

            <label className="flex flex-col">
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
                className="p-3 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] focus:outline-none focus:ring-2 focus:ring-[#257180]"
                placeholder="e.g., React"
              />
            </label>

            <label className="flex flex-col">
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
                className="p-3 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] focus:outline-none focus:ring-2 focus:ring-[#257180]"
                placeholder="e.g., Node.js"
              />
            </label>

            <label className="flex flex-col">
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
                className="p-3 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] focus:outline-none focus:ring-2 focus:ring-[#257180]"
                placeholder="e.g., MongoDB"
              />
            </label>
          </fieldset>

          {/* Key Features */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
            Key Features:
            <textarea
              name="KeyFeatures"
              value={projectData.KeyFeatures}
              onChange={handleInputChange}
              className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] resize-none focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="Enter key features, each on a new line"
            />
          </label>

          {/* Security Requirements */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
            Security Requirements:
            <textarea
              name="SecurityRequirements"
              value={projectData.SecurityRequirements}
              onChange={handleInputChange}
              className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] resize-none focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="Enter security requirements, each on a new line"
            />
          </label>

          {/* Platform Support */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
            Platform Support:
            <input
              type="text"
              name="PlatformSupport"
              value={projectData.PlatformSupport}
              onChange={handleInputChange}
              className="p-3 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="e.g., Web application with mobile-friendly design"
            />
          </label>

          {/* Non-Functional Requirements */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
            Non-Functional Requirements:
            <textarea
              name="NonFunctionalRequirements"
              value={projectData.NonFunctionalRequirements}
              onChange={handleInputChange}
              className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] resize-none focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="Enter non-functional requirements, separated by commas"
            />
          </label>

          {/* Additional Information */}
          <label className="flex flex-col font-medium text-lg text-[#387478]">
            Additional Information:
            <textarea
              name="AdditionalInformation"
              value={projectData.AdditionalInformation}
              onChange={handleInputChange}
              className="p-3 h-32 border border-[#629584] rounded-lg mt-2 text-[#243642] bg-[#F2E5BF] resize-none focus:outline-none focus:ring-2 focus:ring-[#257180]"
              placeholder="Enter any additional information"
            />
          </label>

          {error && <span className="text-red-500 text-sm mt-2">{error}</span>}

          <button
            type="button"
            onClick={handleSubmit}
            className="px-6 py-3 bg-[#257180] text-white rounded-lg mt-6 text-lg font-semibold transition-transform duration-300 transform hover:scale-105 hover:bg-[#387478] hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#629584] focus:ring-opacity-50"
          >
            Generate PRD
          </button>
        </form>
      </main>
    </div>
  );
}
