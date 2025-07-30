import { MongoClient } from "mongodb";

const MONGODB_URI = "mongodb+srv://ai:Ai123@cluster0.fwwaouj.mongodb.net/";
const DB_NAME = "intelligate_jobs";

const sampleJobs = [
  {
    title: "Auto Design Engineer",
    location: "Pune",
    experience: "3+ Years",
    industry: "Automotive",
    salary: "8-12 LPA",
    type: "Full-time",
    description: "Leading automotive company seeks experienced design engineer for EV development projects. Must have expertise in automotive design software and understanding of electric vehicle systems.",
    skills: ["AutoCAD", "CATIA", "SolidWorks", "Automotive Design", "EV Systems"],
    status: "active",
    postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "BPO Team Leader",
    location: "Gurugram",
    experience: "2+ Years",
    industry: "ITES & BPO",
    salary: "5-8 LPA",
    type: "Full-time",
    description: "International BPO company looking for dynamic team leader to manage customer service operations. Strong communication and leadership skills required.",
    skills: ["Team Management", "Customer Service", "Process Improvement", "Communication"],
    status: "active",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Pharma Sales Manager",
    location: "Lucknow",
    experience: "5+ Years",
    industry: "Pharmaceuticals",
    salary: "10-15 LPA",
    type: "Full-time",
    description: "Pharmaceutical company seeks experienced sales manager for North India region. Must have deep understanding of pharmaceutical market and regulatory requirements.",
    skills: ["Sales Management", "Market Analysis", "Team Leadership", "Pharmaceutical Knowledge", "Regulatory Compliance"],
    status: "active",
    postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Senior Software Engineer",
    location: "Noida",
    experience: "4-6 Years",
    industry: "ITES & BPO",
    salary: "12-18 LPA",
    type: "Full-time",
    description: "Tech company looking for senior software engineer with expertise in cloud technologies and modern web development frameworks.",
    skills: ["React", "Node.js", "AWS", "MongoDB", "TypeScript", "Cloud Computing"],
    status: "active",
    postedDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Production Manager",
    location: "Chennai",
    experience: "8-10 Years",
    industry: "Manufacturing",
    salary: "15-20 LPA",
    type: "Full-time",
    description: "Manufacturing unit requires production manager with lean manufacturing experience and strong operational skills.",
    skills: ["Lean Manufacturing", "Six Sigma", "Quality Control", "Team Management", "Operations"],
    status: "active",
    postedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    title: "Electrical Engineer",
    location: "Bangalore",
    experience: "3-5 Years",
    industry: "Electrical",
    salary: "8-12 LPA",
    type: "Full-time",
    description: "Electronics company seeking electrical engineer for power systems design and circuit development projects.",
    skills: ["Circuit Design", "Power Systems", "MATLAB", "Electrical Testing", "PCB Design"],
    status: "active",
    postedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

async function seedDatabase() {
  let client: MongoClient;
  
  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();
    console.log("Connected to MongoDB");
    
    const db = client.db(DB_NAME);
    
    // Clear existing jobs
    await db.collection("job_openings").deleteMany({});
    console.log("Cleared existing jobs");
    
    // Insert sample jobs
    const result = await db.collection("job_openings").insertMany(sampleJobs);
    console.log(`Inserted ${result.insertedCount} sample jobs`);
    
    // Create indexes
    await db.collection("job_openings").createIndex({ status: 1 });
    await db.collection("job_openings").createIndex({ industry: 1 });
    await db.collection("job_openings").createIndex({ postedDate: -1 });
    
    await db.collection("job_applications").createIndex({ jobId: 1 });
    await db.collection("job_applications").createIndex({ submittedAt: -1 });
    
    console.log("Created database indexes");
    console.log("Database seeding completed successfully!");
    
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    if (client!) {
      await client.close();
    }
  }
}

// Run the seeder
seedDatabase();

export { seedDatabase };
