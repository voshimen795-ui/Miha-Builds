import { db } from "./db";
import { projects } from "@shared/schema";
import { sql } from "drizzle-orm";

const seedProjects = [
  {
    title: "Luxe Interiors",
    description: "A premium interior design studio with immersive 3D room previews and an elegant booking system.",
    url: "https://dribbble.com",
    category: "Design Studio",
    status: "live",
    featured: true,
    sortOrder: 1,
  },
  {
    title: "Quantum Finance",
    description: "Next-generation fintech dashboard with real-time analytics and AI-powered insights.",
    url: "https://stripe.com",
    category: "FinTech",
    status: "live",
    featured: true,
    sortOrder: 2,
  },
  {
    title: "Atlas Travel Co",
    description: "Luxury travel platform featuring curated experiences with cinematic storytelling.",
    url: "https://www.awwwards.com",
    category: "Travel",
    status: "live",
    featured: false,
    sortOrder: 3,
  },
  {
    title: "Noir Coffee Roasters",
    description: "Artisanal coffee brand with an e-commerce experience that mirrors the craft behind each blend.",
    url: "https://vercel.com",
    category: "E-Commerce",
    status: "live",
    featured: false,
    sortOrder: 4,
  },
];

export async function seed() {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(projects);
  const count = Number(existing[0].count);

  if (count === 0) {
    console.log("Seeding projects...");
    await db.insert(projects).values(seedProjects);
    console.log(`Seeded ${seedProjects.length} projects.`);
  } else {
    console.log(`Projects already seeded (${count} found).`);
  }
}
