import mongoose from 'mongoose';

const resumeSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  skills: [String],
  education: [String],
  experience: [String],
  rawText: String, // optional - to keep original text
  score: Number,
  suggestions: {
    type: [String], // ✅ this allows an array of strings
    default: []
  },
  matchedJobs: [
    {
      title: String,
      description: String,
      skills: [String],
      matchPercentage: Number
    }
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { timestamps: true });

export const Resume = mongoose.model('Resume', resumeSchema);
