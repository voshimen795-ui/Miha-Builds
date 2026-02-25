import {
  type User, type InsertUser,
  type Project, type InsertProject,
  type BetaApplication, type InsertBetaApplication,
  users, projects, betaApplications
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  createBetaApplication(app: InsertBetaApplication): Promise<BetaApplication>;
  getBetaApplications(): Promise<BetaApplication[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async getProjects(): Promise<Project[]> {
    return db.select().from(projects).orderBy(asc(projects.sortOrder));
  }

  async getProject(id: string): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [created] = await db.insert(projects).values(project).returning();
    return created;
  }

  async createBetaApplication(app: InsertBetaApplication): Promise<BetaApplication> {
    const [created] = await db.insert(betaApplications).values(app).returning();
    return created;
  }

  async getBetaApplications(): Promise<BetaApplication[]> {
    return db.select().from(betaApplications);
  }
}

export const storage = new DatabaseStorage();
