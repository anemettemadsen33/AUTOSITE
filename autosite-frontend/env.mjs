/**
 * Environment variables configuration and validation
 * This file ensures all required environment variables are present and valid
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Server-side environment variables
   * These are only available on the server and won't be exposed to the client
   */
  server: {
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
    // OpenAI API key for intelligent search features
    OPENAI_API_KEY: z.string().optional(),
    // Stripe secret key for payment processing
    STRIPE_SECRET_KEY: z.string().optional(),
  },

  /**
   * Client-side environment variables
   * These are exposed to the browser and must be prefixed with NEXT_PUBLIC_
   */
  client: {
    // Laravel backend API URL
    NEXT_PUBLIC_API_URL: z.string().url().default("http://localhost:8000/api"),
    // Stripe publishable key
    NEXT_PUBLIC_STRIPE_KEY: z.string().optional(),
    // Site URL for canonical links and social sharing
    NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
    // Enable debug mode
    NEXT_PUBLIC_DEBUG: z.enum(["true", "false"]).default("false"),
  },

  /**
   * Runtime environment variables
   * You can access these as `process.env.VARIABLE_NAME`
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_STRIPE_KEY: process.env.NEXT_PUBLIC_STRIPE_KEY,
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
  },

  /**
   * Skip validation during build (optional)
   * Set to true if you want to skip validation during build time
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
