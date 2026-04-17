import { GoogleGenAI, Type } from "@google/genai";
import { UserDiagnosticData, CareerCanvasData } from "../types";

const ai = new GoogleGenAI({ apiKey: "AQ.Ab8RN6J0WIdq0V-GOc2VZgECwpEZ5pHZL7Vf1GAH7lrOroCLVA" });

export async function generateCareerCuration(data: UserDiagnosticData): Promise<CareerCanvasData> {
  const prompt = `
    Analyze the following career diagnostic data and generate a comprehensive career curation report.
    Interests: ${data.interests.join(", ")}
    Values: ${data.values.join(", ")}
    Skills: ${data.skills.join(", ")}
    Working Style: ${data.workingStyle}
    Career Goals: ${data.careerGoals}

    The report should include:
    1. A personality trait analysis (5-6 traits with values 0-100).
    2. A competency analysis (5-6 key competencies with values 0-100).
    3. A summary of the analysis.
    4. 3 specific job recommendations with match scores and details.
    5. A 4-step roadmap for candidate.
  `;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          report: {
            type: Type.OBJECT,
            properties: {
              personalityTraits: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  },
                  required: ["name", "value"]
                }
              },
              competencyAnalysis: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    value: { type: Type.NUMBER }
                  },
                  required: ["name", "value"]
                }
              },
              summary: { type: Type.STRING },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              areasForGrowth: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["personalityTraits", "competencyAnalysis", "summary", "strengths", "areasForGrowth"]
          },
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                title: { type: Type.STRING },
                matchScore: { type: Type.NUMBER },
                description: { type: Type.STRING },
                keySkills: { type: Type.ARRAY, items: { type: Type.STRING } },
                growthPotential: { type: Type.STRING }
              },
              required: ["title", "matchScore", "description", "keySkills", "growthPotential"]
            }
          },
          roadmap: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                stage: { type: Type.STRING },
                title: { type: Type.STRING },
                description: { type: Type.STRING },
                duration: { type: Type.STRING },
                tasks: { type: Type.ARRAY, items: { type: Type.STRING } }
              },
              required: ["id", "stage", "title", "description", "duration", "tasks"]
            }
          }
        },
        required: ["report", "recommendations", "roadmap"]
      }
    }
  });

  return JSON.parse(response.text) as CareerCanvasData;
}
