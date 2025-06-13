import { jobData } from "./jobData.js";

export function matchJobs(resumeSkills = []) {
  // Normalize resume skills to lowercase
  const normalizedResumeSkills = Array.isArray(resumeSkills)
    ? resumeSkills.map(skill => skill.toLowerCase())
    : [];

  const matchedJobs = jobData.map((job) => {
    const normalizedJobSkills = job.skills.map(skill => skill.toLowerCase());

    const matchCount = normalizedJobSkills.filter(skill =>
      normalizedResumeSkills.includes(skill)
    ).length;

    const matchPercentage = job.skills.length > 0
      ? Math.round((matchCount / job.skills.length) * 100)
      : 0;

    return {
      ...job,
      matchPercentage
    };
  });

  // Sort jobs by best match first
  return matchedJobs.sort((a, b) => b.matchPercentage - a.matchPercentage);
}
