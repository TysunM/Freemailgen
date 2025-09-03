import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from '@shared/schema';
import type { IStorage } from './storage';
import type { User, InsertUser, EmailGeneration, InsertEmailGeneration } from "@shared/schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

export class DrizzleStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const users = await db.select().from(schema.users).where(schema.sql`${schema.users.id} = ${id}`).limit(1);
    return users[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const users = await db.select().from(schema.users).where(schema.sql`${schema.users.username} = ${username}`).limit(1);
    return users[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const newUser = await db.insert(schema.users).values(insertUser).returning();
    return newUser[0];
  }

  async saveEmailGeneration(generation: InsertEmailGeneration): Promise<EmailGeneration> {
    const newGeneration = await db.insert(schema.emailGenerations).values(generation).returning();
    return newGeneration[0];
  }

  async getEmailGeneration(id: string): Promise<EmailGeneration | undefined> {
    const generations = await db.select().from(schema.emailGenerations).where(schema.sql`${schema.emailGenerations.id} = ${id}`).limit(1);
    return generations[0];
  }

  async getRecentGenerations(limit: number): Promise<EmailGeneration[]> {
    return db.select()
      .from(schema.emailGenerations)
      .orderBy(schema.sql`${schema.emailGenerations.createdAt} DESC`)
      .limit(limit);
  }
}
