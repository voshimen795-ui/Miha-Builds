import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const projects = pgTable("projects", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description").notNull(),
  url: text("url").notNull(),
  category: text("category").notNull(),
  status: text("status").notNull().default("live"),
  featured: boolean("featured").default(false),
  sortOrder: integer("sort_order").default(0),
});

export const betaApplications = pgTable("beta_applications", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  businessName: text("business_name").notNull(),
  businessType: text("business_type").notNull(),
  websiteUrl: text("website_url"),
  projectDescription: text("project_description").notNull(),
  budget: text("budget").notNull(),
  timeline: text("timeline").notNull(),
  howDidYouHear: text("how_did_you_hear"),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertProjectSchema = createInsertSchema(projects).omit({
  id: true,
});

export const insertBetaApplicationSchema = createInsertSchema(betaApplications).omit({
  id: true,
  status: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type BetaApplication = typeof betaApplications.$inferSelect;
export type InsertBetaApplication = z.infer<typeof insertBetaApplicationSchema>;
