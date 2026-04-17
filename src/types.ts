export type JobRecommendation = {
  title: string;
  matchScore: number;
  description: string;
  keySkills: string[];
  growthPotential: string;
};

export type CareerReport = {
  personalityTraits: { name: string; value: number }[];
  competencyAnalysis: { name: string; value: number }[];
  summary: string;
  strengths: string[];
  areasForGrowth: string[];
};

export type RoadmapStep = {
  id: string;
  stage: string;
  title: string;
  description: string;
  duration: string;
  tasks: string[];
};

export type UserDiagnosticData = {
  interests: string[];
  values: string[];
  skills: string[];
  workingStyle: string;
  careerGoals: string;
};

export type CareerCanvasData = {
  report: CareerReport;
  recommendations: JobRecommendation[];
  roadmap: RoadmapStep[];
};
