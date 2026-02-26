import { db } from "./db";
import { projects } from "@shared/schema";
import { sql } from "drizzle-orm";

export async function seed() {
  const existing = await db.select({ count: sql<number>`count(*)` }).from(projects);
  const count = Number(existing[0].count);
  console.log(`Projects in database: ${count}.`);
}
