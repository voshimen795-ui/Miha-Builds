import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBetaApplicationSchema } from "@shared/schema";
import { seed } from "./seed";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seed();

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(req.params.id);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.json(project);
  });

  app.post("/api/beta-applications", async (req, res) => {
    const parsed = insertBetaApplicationSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid application data",
        errors: parsed.error.flatten().fieldErrors,
      });
    }
    const application = await storage.createBetaApplication(parsed.data);
    res.status(201).json(application);
  });

  app.get("/api/beta-applications", async (_req, res) => {
    const applications = await storage.getBetaApplications();
    res.json(applications);
  });

  return httpServer;
}
