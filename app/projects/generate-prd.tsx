"use client";

import { useState, useEffect } from "react";
import Groq from "groq-sdk";
import { useRouter } from "next/router";

// Initialize Groq client
const groq = new Groq({ apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY });

// Define the structure of your project data
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

export default function GeneratePRD() {
  const router = useRouter();
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [prdDocument, setPrdDocument] = useState<string>("");

  // Parse the projectData from the router's query string
  useEffect(() => {
    if (router.query.projectData) {
      const parsedData = JSON.parse(router.query.projectData as string);
      setProjectData(parsedData);
    }
  }, [router.query.projectData]);

  // Function to generate PRD (same as previous explanation)
  const generatePRD = async () => {
    if (!projectData) return;

    const prompt = `
      You are an experienced Project manager. Generate a comprehensive Product Requirements Document (PRD) with the given details.

      Here is the project information:
      Project Name: ${projectData.ProjectName}
      Project Description: ${projectData.ProjectDescription}
      Project Scale: ${projectData.ProjectScale}
      Time Frame: ${projectData.ProjectTimeFrame}
      Can Have More Members: ${projectData.CanHaveMoreMembers}
      Maximum Member Limit: ${projectData.MaximumMemberLimit}
      Team Members: ${JSON.stringify(projectData.ProjectMembers, null, 2)}
      Project Regulations: ${projectData.ProjectRegulations.join(", ")}
      Project Type: ${projectData.ProjectType}
      Dependencies: ${JSON.stringify(projectData.Dependencies, null, 2)}
      Key Features: ${projectData.KeyFeatures.join(", ")}
      Target Audience: ${projectData.TargetAudience}
      Security Requirements: ${projectData.SecurityRequirements.join(", ")}
      User Flow: ${projectData.UserFlow.join(" -> ")}
      Performance Metrics: ${JSON.stringify(
        projectData.PerformanceMetrics,
        null,
        2
      )}
      Integration Needs: ${projectData.IntegrationNeeds.join(", ")}
      Platform Support: ${projectData.PlatformSupport}
      Non-Functional Requirements: ${projectData.NonFunctionalRequirements.join(
        ", "
      )}
      Additional Information: ${projectData.AdditionalInformation}

      Generate a comprehensive PRD including:
      - Project overview, goals, and objectives
      - Team structure and roles/responsibilities
      - Sprint plans with specific tasks and deadlines
      - Key features and deliverables
      - Performance metrics and monitoring
      - Non-functional requirements (scalability, maintainability)
      - Risk mitigation strategies (security risks, technical debt, regulatory changes)
      - Communication plan (stand-ups, team meetings, stakeholder meetings)
      - Resource allocation
      - Detailed Information on what libraries, tech stack, software, Dependency product, hardware, should be used

      Provide a detailed, actionable plan to ensure successful project delivery within the timeline.
    `;

    try {
      const response = await groq.chat.completions.create({
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        model: "llama3-8b-8192",
      });

      const prdContent = response.choices[0]?.message?.content || "No response";
      setPrdDocument(prdContent);
    } catch (error) {
      console.error("Error generating PRD:", error);
      setPrdDocument("Error generating PRD. Please try again later.");
    }
  };

  // Trigger PRD generation on component mount if projectData is available
  useEffect(() => {
    if (projectData) {
      generatePRD();
    }
  }, [projectData]);

  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-3xl">
        <h1 className="text-5xl font-bold mb-6 text-center sm:text-left">
          Generated PRD Document
        </h1>
        <div className="bg-gray-100 p-6 rounded-lg shadow-md w-full">
          <pre className="whitespace-pre-wrap text-black">{prdDocument}</pre>
        </div>
      </main>
    </div>
  );
}
