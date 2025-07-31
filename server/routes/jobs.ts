import { RequestHandler } from "express";
import { MongoClient, ObjectId } from "mongodb";
import nodemailer from "nodemailer";

const MONGODB_URI = "mongodb+srv://ai:Ai123@cluster0.fwwaouj.mongodb.net/";
const DB_NAME = "intelligate_jobs";

let client: MongoClient;

async function connectToMongoDB() {
  if (!client) {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
  }
  return client.db(DB_NAME);
}

// Email configuration
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'sharmaishwar970@gmail.com',
    pass: 'winfpjblpaxlnwlc'
  }
});

// Get all job openings
export const getJobOpenings: RequestHandler = async (req, res) => {
  try {
    console.log("Fetching job openings from MongoDB...");
    const db = await connectToMongoDB();
    const jobs = await db.collection("job_openings").find({ status: "active" }).toArray();
    console.log(`Found ${jobs.length} active jobs`);
    res.json(jobs);
  } catch (error) {
    console.error("Error fetching job openings:", error);
    res.status(500).json({ error: "Failed to fetch job openings" });
  }
};

// Get single job by ID
export const getJobById: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const db = await connectToMongoDB();
    const job = await db.collection("job_openings").findOne({ _id: new ObjectId(id) });
    
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.json(job);
  } catch (error) {
    console.error("Error fetching job:", error);
    res.status(500).json({ error: "Failed to fetch job" });
  }
};

// Create new job (Admin only)
export const createJob: RequestHandler = async (req, res) => {
  try {
    const { title, location, experience, industry, salary, type, description, skills } = req.body;
    
    const newJob = {
      title,
      location,
      experience,
      industry,
      salary,
      type,
      description,
      skills: skills || [],
      status: "active",
      postedDate: new Date(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    const db = await connectToMongoDB();
    const result = await db.collection("job_openings").insertOne(newJob);
    
    res.status(201).json({ 
      success: true, 
      jobId: result.insertedId,
      message: "Job created successfully" 
    });
  } catch (error) {
    console.error("Error creating job:", error);
    res.status(500).json({ error: "Failed to create job" });
  }
};

// Update job (Admin only)
export const updateJob: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body, updatedAt: new Date() };
    
    const db = await connectToMongoDB();
    const result = await db.collection("job_openings").updateOne(
      { _id: new ObjectId(id) },
      { $set: updateData }
    );
    
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.json({ success: true, message: "Job updated successfully" });
  } catch (error) {
    console.error("Error updating job:", error);
    res.status(500).json({ error: "Failed to update job" });
  }
};

// Delete job (Admin only)
export const deleteJob: RequestHandler = async (req, res) => {
  try {
    const { id } = req.params;
    
    const db = await connectToMongoDB();
    const result = await db.collection("job_openings").deleteOne({ _id: new ObjectId(id) });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Job not found" });
    }
    
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (error) {
    console.error("Error deleting job:", error);
    res.status(500).json({ error: "Failed to delete job" });
  }
};

// Submit job application
export const submitApplication: RequestHandler = async (req, res) => {
  try {
    const { jobId, fullName, email, phone, resume } = req.body;
    
    const application = {
      jobId,
      fullName,
      email,
      phone,
      resume, // base64 encoded file
      status: "pending",
      submittedAt: new Date(),
      createdAt: new Date()
    };
    
    const db = await connectToMongoDB();
    const result = await db.collection("job_applications").insertOne(application);
    
    res.status(201).json({ 
      success: true, 
      applicationId: result.insertedId,
      message: "Application submitted successfully" 
    });
  } catch (error) {
    console.error("Error submitting application:", error);
    res.status(500).json({ error: "Failed to submit application" });
  }
};

// Get all applications (Admin only)
export const getApplications: RequestHandler = async (req, res) => {
  try {
    const db = await connectToMongoDB();
    const applications = await db.collection("job_applications")
      .aggregate([
        {
          $lookup: {
            from: "job_openings",
            localField: "jobId",
            foreignField: "_id",
            as: "job"
          }
        },
        {
          $unwind: "$job"
        },
        {
          $sort: { submittedAt: -1 }
        }
      ]).toArray();
    
    res.json(applications);
  } catch (error) {
    console.error("Error fetching applications:", error);
    res.status(500).json({ error: "Failed to fetch applications" });
  }
};

// Admin authentication
export const adminLogin: RequestHandler = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple authentication - in production, use proper hashing
    if (username === "admin" && password === "intelligate2025") {
      // Generate a simple session token
      const token = Buffer.from(`${username}:${Date.now()}`).toString('base64');
      res.json({ 
        success: true, 
        token, 
        message: "Login successful" 
      });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Login failed" });
  }
};

// Middleware to verify admin token
export const verifyAdmin: RequestHandler = (req, res, next) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }
  
  const token = authHeader.substring(7);
  
  try {
    // Simple token verification - in production, use JWT
    const decoded = Buffer.from(token, 'base64').toString();
    if (decoded.includes('admin:')) {
      next();
    } else {
      res.status(401).json({ error: "Invalid token" });
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};
