import express from 'express';
import multer from 'multer';
import path from 'path';
import {
  uploadResume,
  getAllResumes,
  deleteResume
} from '../controllers/resume.controlle.js';

const router = express.Router();
const uploadPath = path.join('uploads');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});
const upload = multer({ storage });

router.post('/upload', upload.single('resume'), uploadResume);
router.get('/all', getAllResumes);
router.delete('/:id', deleteResume);

export default router;
