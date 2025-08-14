import { type User, type InsertUser, type EmailGeneration, type InsertEmailGeneration } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  saveEmailGeneration(generation: InsertEmailGeneration): Promise<EmailGeneration>;
  getEmailGeneration(id: string): Promise<EmailGeneration | undefined>;
  getRecentGenerations(limit: number): Promise<EmailGeneration[]>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private emailGenerations: Map<string, EmailGeneration>;

  constructor() {
    this.users = new Map();
    this.emailGenerations = new Map();
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async saveEmailGeneration(generation: InsertEmailGeneration): Promise<EmailGeneration> {
    const id = randomUUID();
    const savedGeneration: EmailGeneration = {
      ...generation,
      id,
      createdAt: new Date(),
    };
    this.emailGenerations.set(id, savedGeneration);
    return savedGeneration;
  }

  async getEmailGeneration(id: string): Promise<EmailGeneration | undefined> {
    return this.emailGenerations.get(id);
  }

  async getRecentGenerations(limit: number): Promise<EmailGeneration[]> {
    const generations = Array.from(this.emailGenerations.values());
    return generations
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, limit);
  }
}

export const storage = new MemStorage();
