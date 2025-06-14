import fs from 'fs/promises';
import { extractResumeData } from '../utils/resumeUtils.js';
import { analyzeResume } from '../utils/resumeAnalyzer.js';
import { Resume } from '../models/resume.model.js';
import { matchJobs } from "../utils/jobMatcher.js";

const uploadResume = async (req, res) => {
  // console.log(req.user)
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    console.log(req.user._id)
    // 1. Read the uploaded PDF
    const filePath = req.file.path;
    const fileBuffer = await fs.readFile(filePath);
    // 2. Parse the PDF
    const pdfParse = (await import('pdf-parse/lib/pdf-parse.js')).default;
    const parsed = await pdfParse(fileBuffer);
    const rawText = parsed.text;
    // 3. Extract Resume
    const extractedData = extractResumeData(rawText);
    // 4. Analyze Resume
    const analysisResult = analyzeResume(extractedData);
    // 5. Match resume to Jobs
    const matchedJobs = matchJobs(extractedData.skills || []);
    // 6. Save to DB
    const newResume = new Resume({
      ...extractedData,
      rawText,
      score: analysisResult.score,
      suggestions: analysisResult.suggestions,
      matchedJobs,
      user: req.user._id,
      // uploadedBy: req.user._id
    });
    await newResume.save();
    // console.log(newResume);

    res.status(200).json({
      message: 'Resume uploaded and parsed',
      Data: newResume,
    });
  } catch (error) {
    console.error("Error parsing PDF:", error);
    res.status(500).json({ error: 'Failed to parse resume' });
  }
};

const getAllResumes = async (req, res) => {
  try {
    // console.log(req.user._id)
    const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
    // const resumes = await Resume.find().sort({ createdAt: -1 });
    res.status(200).json({
      message: 'Resumes fetched successfully',
      data: resumes,
    });
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ error: 'Failed to fetch resumes' });
  }
};

const deleteResume = async (req, res) => {
  try {
    const { id } = req.params;
    await Resume.findByIdAndDelete(id);
    res.status(200).json({ message: 'Resume deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete resume' });
  }
};

export { uploadResume, getAllResumes, deleteResume };
