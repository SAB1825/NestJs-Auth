import { pgTable, uuid, varchar, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: varchar('name', { length: 225 }).notNull(),
  email: varchar('email', { length: 225 }).notNull().unique(),
  passwordHash: varchar('password_hash', { length: 225 }),
  googleId: varchar('google_id', { length: 255 }).unique(),
  githubId: varchar('github_id', { length: 255 }).unique(),
  avatarUrl: varchar('avatar_url', { length: 512 }),
  refreshTokenHash: varchar('refresh_token_hash', { length: 255 }),
  passwordResetTokenHash: varchar('password_reset_token_expires_at', {
    length: 255,
  }),
  passwordResetTokenExpiresAt: timestamp('password_reset_token_expires_at', {
    withTimezone: true,
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
