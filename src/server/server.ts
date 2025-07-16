// import express from 'express';
// import multer from 'multer';
// import cors from 'cors';
// // import localtunnel from 'localtunnel';
// import path from 'path';
// import fs from 'fs';

// const app = express();
// const port = 3001;

// // Enable CORS
// app.use(cors());
// app.use(express.json());

// // Configure multer for file uploads
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     const uploadDir = path.join(__dirname, '../../uploads');
//     // Create uploads directory if it doesn't exist
//     if (!fs.existsSync(uploadDir)) {
//       fs.mkdirSync(uploadDir, { recursive: true });
//     }
//     cb(null, uploadDir);
//   },
//   filename: (req, file, cb) => {
//     // Generate unique filename
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, uniqueSuffix + '-' + file.originalname);
//   }
// });

// const upload = multer({ 
//   storage,
//   fileFilter: (req, file, cb) => {
//     if (file.mimetype === 'application/pdf') {
//       cb(null, true);
//     } else {
//       cb(new Error('Only PDF files are allowed'));
//     }
//   },
//   limits: {
//     fileSize: 10 * 1024 * 1024 // 10MB limit
//   }
// });

// // Store analysis results temporarily
// const analysisResults = new Map();

// // Handle CV upload
// app.post('/upload', upload.single('cv'), (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ error: 'No file uploaded' });
//     }

//     const fileInfo = {
//       filename: req.file.filename,
//       path: req.file.path,
//       size: req.file.size,
//       professionalTitle: req.body.professionalTitle
//     };

//     // Return the file info and tunnel URLs
//     res.json({
//       file: fileInfo,
//       message: 'File uploaded successfully'
//     });
//   } catch (error) {
//     console.error('Upload error:', error);
//     res.status(500).json({ error: 'File upload failed' });
//   }
// });

// // Handle n8n analysis callback
// app.post('/analysis-callback', (req, res) => {
//   try {
//     const { fileId, analysis } = req.body;
    
//     // Store analysis results
//     analysisResults.set(fileId, analysis);
    
//     res.json({ message: 'Analysis received' });
//   } catch (error) {
//     console.error('Analysis callback error:', error);
//     res.status(500).json({ error: 'Failed to process analysis' });
//   }
// });

// // Get analysis results
// app.get('/analysis/:fileId', (req, res) => {
//   const { fileId } = req.params;
//   const analysis = analysisResults.get(fileId);
  
//   if (!analysis) {
//     return res.status(404).json({ error: 'Analysis not found' });
//   }
  
//   res.json(analysis);
// });

// // Start server and create tunnel
// async function startServer() {
//   try {
//     // Start express server
//     app.listen(port, () => {
//       console.log(`Server running on port ${port}`);
//     });

//     // Create tunnels for upload and callback endpoints
//     const uploadTunnel = await localtunnel({ port, subdomain: 'matchpro-upload' });
//     const callbackTunnel = await localtunnel({ port, subdomain: 'matchpro-callback' });

//     console.log('Upload tunnel URL:', uploadTunnel.url);
//     console.log('Callback tunnel URL:', callbackTunnel.url);

//     // Handle tunnel close
//     uploadTunnel.on('close', () => {
//       console.log('Upload tunnel closed');
//     });

//     callbackTunnel.on('close', () => {
//       console.log('Callback tunnel closed');
//     });

//   } catch (error) {
//     console.error('Failed to start server or create tunnel:', error);
//   }
// }

// startServer(); 