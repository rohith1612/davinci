"use client";

import { useState, useEffect } from "react";
import Groq from "groq-sdk";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PRDPdf from "../generate-pdf/page";

// Initialize Groq client
const groq = new Groq({
  apiKey: process.env.NEXT_PUBLIC_GROQ_API_KEY,
  dangerouslyAllowBrowser: true,
});

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
    Others: string;
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
  const [projectData, setProjectData] = useState<ProjectData | null>(null);
  const [prdDocument, setPrdDocument] = useState<string>("");

  useEffect(() => {
    // Load data from localStorage and set it to state
    const data = localStorage.getItem("projectData");
    if (data) {
      setProjectData(JSON.parse(data));
    }
  }, []);

  // Function to generate PRD (same as previous explanation)
  const generatePRD = async () => {
    if (!projectData) return;

    const prompt = `
    Clear all messages from before.
    This is a fresh chat, clear everything else.
    You are an experienced Project Manager specializing in agile methodologies. 
    Generate a comprehensive Product Requirements Document (PRD) using the details provided below.
    Make the major headings Numbered.

    Here is the project information:
    - Project Name: ${projectData.ProjectName}
    - Project Description: ${projectData.ProjectDescription}
    - Project Scale: ${projectData.ProjectScale}
    - Time Frame: ${projectData.ProjectTimeFrame}
    - Can Have More Members: ${projectData.CanHaveMoreMembers}
    - Maximum Member Limit: ${projectData.MaximumMemberLimit}
    - Team Members: ${JSON.stringify(projectData.ProjectMembers, null, 2)}
    - Project Regulations: ${projectData.ProjectRegulations.join(", ")}
    - Project Type: ${projectData.ProjectType}
    - Dependencies: ${JSON.stringify(projectData.Dependencies, null, 2)}
    - Key Features: ${projectData.KeyFeatures.join(", ")}
    - Target Audience: ${projectData.TargetAudience}
    - Security Requirements: ${projectData.SecurityRequirements.join(", ")}
    - User Flow: ${projectData.UserFlow.join(" -> ")}
    - Performance Metrics: ${JSON.stringify(
      projectData.PerformanceMetrics,
      null,
      2
    )}
    - Integration Needs: ${projectData.IntegrationNeeds.join(", ")}
    - Platform Support: ${projectData.PlatformSupport}
    - Non-Functional Requirements: ${projectData.NonFunctionalRequirements}
    - Additional Information: ${projectData.AdditionalInformation}

    Your task is to generate a highly detailed PRD that includes:

    Instead of "Here is the comprehensive Product Requirements Document..." just print the project name in capitals.

    1. Project Overview: In each lines, give a Self generated project introduction, Necessary key features in bullets, and generate Project Description after analysing users description.
    2. Team Structure: Bullet out the team members, their count, their responsibility. Include Others is its there.
    3. Project Time Frame : Analyse user's time frame & generate, if not mentioned, generate a time frame required for adequate completion of the project.

    !! never ignore sprint plans. Sprint plans is the most important part of the prd. Highest Priority part.
    4. **Sprint Plans**:
       - Breakdown the project into clear, concise sprints.
       - For each sprint, specify tasks in bullet points with priorities and deadlines.
       - Assign specific tasks to the team member[number]. (eg: designer 2)
    5. **Key Features & Deliverables**: Highlight the key features and deliverables, emphasizing what should be completed by the end of each sprint.
    6. **Performance Metrics**: Define how performance will be monitored, include both functional and non-functional performance metrics.
    7. **Non-Functional Requirements**: Consider aspects like scalability, maintainability, usability, and reliability.
    8. **Communication Plan**:
       - Define communication channels (stand-ups, weekly team meetings, stakeholder updates).
       - Detail the frequency and expectations for each type of meeting.
    9. **Resource Allocation**:
       - Generate tools and modules required, by analysing the user-input.
       - Suggest more resources for efficient development and collaboration.
    10. **Risk Management**: Anticipate potential risks and mitigation strategies.
    11. **Final Delivery**:
        - Summarize the timeline and delivery expectations.
        - Include final deliverables, testing phases, and approval milestones.

    Generate a note message that, the refresh the page until we get a satisfactory prd document, and the document may have a small chance to contain misunderstanding.
    
    Ensure the PRD is clear, actionable, and structured to facilitate smooth project execution and tracking within the designated timeline. 
    Each section should be clearly separated and outlined.
    There should not be any asterisks in the output, dont use markdown format. Just use Paragraph phrasing well along with numbering as bullet points.
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
    <div className="min-h-screen p-8 pb-20 sm:p-20 font-[family-name:var(--font-geist-sans)] bg-[#1A1A1A] text-[#E2F1E7]">
      <main className="flex flex-col gap-8 items-center sm:items-start w-full max-w-3xl">
        <h1 className="text-5xl font-bold mb-6 text-center sm:text-left text-[#FCFAEE]">
          Generated PRD Document
        </h1>
        <div className="bg-[#243642] p-6 rounded-lg shadow-md w-full lg:w-[1000px] xl:w-[1100px]">
          <pre className="whitespace-pre-wrap text-[#FCFAEE]">
            {prdDocument}
          </pre>
        </div>

        {/* {prdDocument && (
          <PDFDownloadLink
            document={<PRDPdf prdContent={prdDocument} />}
            fileName="generated_prd.pdf"
          >
            <button className="bg-[#387478] text-white font-semibold py-2 px-4 rounded hover:bg-[#257180] shadow-lg hover:shadow-xl transition duration-300">
              Download PDF
            </button>
          </PDFDownloadLink>
        )} */}
      </main>
    </div>
  );
}
