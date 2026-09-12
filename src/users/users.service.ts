import { Inject, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { users } from '../database/schema';
import type { User } from '../database/schema';
import { DRIZZLE_CLIENT, DrizzleDatabse } from '../database/database.types';

export type SafeUser = Omit<
  User,
  | 'passwordHash'
  | 'refreshTokenHash'
  | 'passwordResetTokenHash'
  | 'passwordResetTokenExpiresAt'
>;

@Injectable()
export class UsersService {
  constructor(@Inject(DRIZZLE_CLIENT) private readonly db: DrizzleDatabse) {}

  async findById(id: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.id, id))
      .limit(1);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return user;
  }

  async findByGoogleId(googleId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.googleId, googleId))
      .limit(1);

    return user;
  }

  async findByGithubId(githubId: string): Promise<User | undefined> {
    const [user] = await this.db
      .select()
      .from(users)
      .where(eq(users.githubId, githubId))
      .limit(1);

    return user;
  }

  async createWithPassword(data: {
    name: string;
    email: string;
    passwordHash: string;
  }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        passwordHash: data.passwordHash,
      })
      .returning();

    return user;
  }

  async createOAuthUSer(data: {
    name: string;
    email: string;
    avatarUrl?: string;
    googleId?: string;
    githubId?: string;
  }): Promise<User> {
    const [user] = await this.db
      .insert(users)
      .values({
        name: data.name,
        email: data.email,
        avatarUrl: data.avatarUrl,
        githubId: data.githubId,
        googleId: data.googleId,
      })
      .returning();

    return user;
  }

  async linkGoogleId(userId: string, googleId: string): Promise<void> {
    await this.db
      .update(users)
      .set({ googleId, updatedAt: new Date() })
      .where(eq(users.id, userId));
  }

  async updateRefreshTokenHash(
    userId: string,
    refreshTokenHash: string,
  ): Promise<void> {
    await this.db
      .update(users)
      .set({
        refreshTokenHash,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  }

  async clearRefreshTokenHash(userId: string): Promise<void> {
    await this.db
      .update(users)
      .set({
        refreshTokenHash: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  }

  async setPasswordResetToken(
    userId: string,
    passwordResetTokenHash: string,
    passwordResetTokenExpiresAt: Date,
  ): Promise<void> {
    await this.db
      .update(users)
      .set({
        passwordResetTokenHash,
        passwordResetTokenExpiresAt,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  }

  async resetPassword(userId: string, passwordHash: string): Promise<void> {
    await this.db
      .update(users)
      .set({
        passwordHash,
        passwordResetTokenHash: null,
        passwordResetTokenExpiresAt: null,
        refreshTokenHash: null,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId));
  }

  toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      googleId: user.googleId,
      githubId: user.githubId,
      avatarUrl: user.avatarUrl,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
  }
}
