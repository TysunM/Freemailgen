import { type User, type InsertUser, type EmailGeneration, type InsertEmailGeneration } from "@shared/schema";
import { randomUUID } from "crypto";
import { DrizzleStorage } from './drizzleStorage';

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
      // Ensure JSONB fields are handled correctly if they are strings
      generatedEmails: typeof generation.generatedEmails === 'string' ? JSON.parse(generation.generatedEmails) : generation.generatedEmails,
      deliverabilityAnalysis: typeof generation.deliverabilityAnalysis === 'string' ? JSON.parse(generation.deliverabilityAnalysis) : generation.deliverabilityAnalysis,
      abTestSuggestions: typeof generation.abTestSuggestions === 'string' ? JSON.parse(generation.abTestSuggestions) : generation.abTestSuggestions,
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
      .sort((a, b) => (b.createdAt?.getTime() ?? 0) - (a.createdAt?.getTime() ?? 0))
      .slice(0, limit);
  }
}

// Conditionally export the storage implementation
let storage: IStorage;

if (process.env.NODE_ENV === 'production') {
  console.log("Using DrizzleStorage for production.");
  storage = new DrizzleStorage();
} else {
  console.log("Using MemStorage for development.");
  storage = new MemStorage();
}

export { storage };
