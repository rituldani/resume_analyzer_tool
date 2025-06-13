const jobKeywords = [
  "javascript",
  "react",
  "node.js",
  "express",
  "mongodb",
  "api",
  "socket",
  "git",
  "full stack",
  "frontend",
  "backend"
];

// Count how many keywords appear in the resume text
const countKeywordMatches = (text, keywords) => {
  let matches = 0;
  keywords.forEach(keyword => {
    const regex = new RegExp(`\\b${keyword}\\b`, 'gi');
    const found = text.match(regex);
    if (found) matches += found.length;
  });
  return matches;
};

export function analyzeResume(extractedData) {
  // 1. Convert resume content into a flat string for keyword matching
  let resumeText = "";

  try {
    // Try using .text if available
    if (typeof extractedData?.text === "string") {
      resumeText = extractedData.text;
    } else {
      // Else stringify the whole object
      resumeText = JSON.stringify(extractedData);
    }
  } catch (err) {
    resumeText = "";
  }

  const text = resumeText.toLowerCase();

  // 2. Keyword Score
  const keywordMatches = countKeywordMatches(text, jobKeywords);
  const keywordScore = Math.min(keywordMatches * 5, 50); // out of 50

  // 3. Section Score (based on object fields)
  let sectionScore = 0;
  const suggestions = [];

  if (Array.isArray(extractedData.experience) && extractedData.experience.length > 0) {
    sectionScore += 20;
  } else {
    suggestions.push("Add details about your work experience.");
  }

  if (Array.isArray(extractedData.education) && extractedData.education.length > 0) {
    sectionScore += 15;
  } else {
    suggestions.push("Include your education details.");
  }

  // 4. Resume Length Score
  const lengthScore = text.length > 1000 ? 15 : (text.length / 1000) * 15;
  if (text.length < 500) {
    suggestions.push("Your resume seems short; consider adding more details.");
  }

  // 5. Final Score
  const totalScore = Math.round(keywordScore + sectionScore + lengthScore);

  // Extra suggestions based on scores
  if (keywordScore < 20) {
    suggestions.push("Add more relevant technical skills like programming languages or tools.");
  }

  if (totalScore < 50) {
    suggestions.push("Improve the structure and completeness of your resume.");
  } else if (totalScore >= 90) {
    suggestions.push("Your resume looks great and aligns well with the job requirements!");
  }

  return {
    score: totalScore,
    suggestions,
    keywordScore,
    sectionScore,
    lengthScore
  };
}
