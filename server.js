require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const cheerio = require('cheerio');
const Tesseract = require('tesseract.js');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// --- Database Schema Setup ---
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vtuScraper', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('✅ MongoDB Connected'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

const ResultSchema = new mongoose.Schema({
    usn: { type: String, unique: true, required: true },
    studentName: String,
    sgpa: Number,
    cgpa: Number,
    collegeCode: String, // First 3 chars of USN (e.g., 1RV)
    branchCode: String,  // Eng branch code (e.g., CS)
    semester: String,
    fetchedAt: { type: Date, default: Date.now }
});

const Result = mongoose.model('Result', ResultSchema);


// --- Helper Functions ---

// 1. Solve CAPTCHA
async function solveCaptcha(base64Image) {
    try {
        const { data: { text } } = await Tesseract.recognize(
            `data:image/png;base64,${base64Image}`,
            'eng'
        );
        // VTU captchas are usually 6 alphanumeric characters
        return text.replace(/[^a-zA-Z0-9]/g, '').substring(0, 6);
    } catch (error) {
        console.error("OCR Error:", error);
        return null;
    }
}

// 2. Calculate Rank (Database Query)
async function calculateRank(sgpa, collegeCode, branchCode, semester) {
    try {
        const totalStudents = await Result.countDocuments({ collegeCode, branchCode, semester });
        
        // Count how many students have an SGPA strictly *greater* than this user
        const studentsAbove = await Result.countDocuments({ 
            collegeCode, branchCode, semester, 
            sgpa: { $gt: sgpa } 
        });
        
        // Rank is (number of students better than you) + 1
        return { rank: studentsAbove + 1, total: totalStudents };
        
    } catch (error) {
        console.error("Rank calculation error:", error);
        return { rank: 0, total: 0 };
    }
}


// --- Main API Route ---

app.post('/api/results/fetch', async (req, res) => {
    const { usn } = req.body;
    
    if (!usn || usn.length !== 10) {
        return res.status(400).json({ error: "Valid 10-character USN required." });
    }

    try {
        // STEP 1: Get Initial cookies and CAPTCHA from VTU
        // (This changes often based on VTU's current domain, usually results.vtu.ac.in)
        const VTU_BASE_URL = "https://results.vtu.ac.in/JFEcbcs24/index.php"; 
        
        const initRes = await axios.get(VTU_BASE_URL);
        const cookies = initRes.headers['set-cookie'];
        
        // Extract CAPTCHA ID from HTML if needed, or query the captcha image generator endpoint
        // Example: https://results.vtu.ac.in/JFEcbcs24/captcha_new.php
        const captchaRes = await axios.get("https://results.vtu.ac.in/JFEcbcs24/captcha_new.php", {
            headers: { Cookie: cookies },
            responseType: 'arraybuffer'
        });
        
        const base64Captcha = Buffer.from(captchaRes.data, 'binary').toString('base64');
        const solvedCaptcha = await solveCaptcha(base64Captcha);
        
        if (!solvedCaptcha || solvedCaptcha.length < 5) {
             return res.status(500).json({ error: "Failed to automatically solve CAPTCHA. Retrying may fix this." });
        }

        // STEP 2: Post Data to VTU
        // VTU uses specific form payloads, exact keys change by semester
        const formData = new URLSearchParams();
        formData.append('lns', usn); // Sometimes 'usn', sometimes 'lns'
        formData.append('captchacode', solvedCaptcha); // sometimes 'Token'
        formData.append('token', 'unique_token_extracted_from_initRes'); // Often required
        
        /* 
        const resultHTMLRes = await axios.post("https://results.vtu.ac.in/JFEcbcs24/resultpage.php", formData, {
            headers: { 
                Cookie: cookies,
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer': VTU_BASE_URL
            }
        });
        */
        
        // STEP 3: Parse the HTML HTML (Cheerio)
        // const $ = cheerio.load(resultHTMLRes.data);
        
        // Mock parsing extraction for the architecture proof:
        const extractedData = {
            studentDetails: {
                name: "JOHN DOE",
                usn: usn.toUpperCase(),
                college: "RV COLLEGE OF ENGINEERING"
            },
            semester: "5",
            marks: [
                { subject: "Software Engineering & Project Management", code: "BCS501", int: 35, ext: 45, total: 80, result: "P" },
                { subject: "Computer Networks", code: "BCS502", int: 32, ext: 50, total: 82, result: "P" }
            ],
            sgpa: 8.42,
            cgpa: 8.65
        };
        
        // STEP 4: Store in Database and Calculate Rank
        const collegeCode = usn.substring(0, 3).toUpperCase();
        const branchCode = usn.substring(5, 7).toUpperCase();
        
        // Upsert (Insert if new, Update if exists) the result into MongoDB
        await Result.findOneAndUpdate(
            { usn: extractedData.studentDetails.usn }, 
            { 
                ...extractedData.studentDetails,
                sgpa: extractedData.sgpa,
                cgpa: extractedData.cgpa,
                semester: extractedData.semester,
                collegeCode, 
                branchCode,
                fetchedAt: Date.now()
            }, 
            { upsert: true, new: true }
        );
        
        // Calculate the dynamic class rank using the database
        const ranking = await calculateRank(extractedData.sgpa, collegeCode, branchCode, extractedData.semester);
        
        extractedData.ranking = ranking;

        // Return JSON to client
        return res.json({ success: true, data: extractedData });

    } catch (err) {
        console.error('VTU Scraper Error:', err.message);
        res.status(500).json({ error: "Failed to fetch results from VTU server.", details: err.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`VTU Scraper API Server running on port ${PORT}`);
});
