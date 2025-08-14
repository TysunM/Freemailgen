import { sql } from "drizzle-orm";
import { pgTable, text, varchar, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const emailGenerations = pgTable("email_generations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  productDescription: text("product_description").notNull(),
  targetAudience: text("target_audience").notNull(),
  emailCount: text("email_count").notNull().default("2"),
  toneStyle: text("tone_style").notNull().default("professional"),
  industryFocus: text("industry_focus").notNull().default("technology"),
  generatedEmails: jsonb("generated_emails").notNull(),
  deliverabilityAnalysis: jsonb("deliverability_analysis"),
  abTestSuggestions: jsonb("ab_test_suggestions"),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertEmailGenerationSchema = createInsertSchema(emailGenerations).omit({
  id: true,
  createdAt: true,
});

export const emailGenerationInputSchema = z.object({
  productDescription: z.string().min(50, "Product description must be at least 50 characters"),
  targetAudience: z.string().min(30, "Target audience details must be at least 30 characters"),
  emailCount: z.literal("2").default("2"),
  toneStyle: z.enum(["professional", "casual", "direct", "consultative"]).default("professional"),
  industryFocus: z.enum(["technology", "finance", "healthcare", "retail", "manufacturing", "consulting", "ecommerce", "education"]).default("technology"),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertEmailGeneration = z.infer<typeof insertEmailGenerationSchema>;
export type EmailGeneration = typeof emailGenerations.$inferSelect;
export type EmailGenerationInput = z.infer<typeof emailGenerationInputSchema>;

export interface GeneratedEmail {
  id: string;
  type: "introduction" | "value-focused" | "case-study" | "final-followup";
  subject: string;
  body: string;
  stage: string;
}

export interface DeliverabilityAnalysis {
  spamTriggerWords: { status: "low" | "medium" | "high"; count: number };
  subjectLineLength: { status: "optimal" | "too-short" | "too-long"; length: number };
  emailLength: { status: "optimal" | "too-short" | "too-long"; wordCount: number };
  personalizationScore: { status: "low" | "medium" | "high"; score: number };
  ctaClarity: { status: "excellent" | "good" | "poor"; score: number };
  linkBalance: { status: "perfect" | "good" | "too-many"; count: number };
  overallScore: number;
}

export interface ABTestSuggestion {
  alternativeSubjects: string[];
  openingHooks: string[];
}
