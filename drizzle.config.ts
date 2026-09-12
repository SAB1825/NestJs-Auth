
import { defineConfig } from "drizzle-kit"
import * as dotenv from "dotenv"

dotenv.config();

if (!process.env.DATABASE_URL) {
  throw new Error('Database URL is not set.')
}

export default defineConfig({
  schema: './src/database/schema.ts',
  out: './drizzle',
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  verbose: true
})