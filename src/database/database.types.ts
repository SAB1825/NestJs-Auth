import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schema';

// This is a TYPE only — it exists for TypeScript/autocomplete purposes.
// It disappears completely when the code compiles to JS (types don't exist at runtime).
// So Nest's DI (Dependency Injection) container CANNOT use this to look anything up.
export type DrizzleDatabse = NodePgDatabase<typeof schema>;

// This is a real VALUE that exists at runtime (unlike the type above).
// We use it as a unique "token" / "ticket" so NestJS's DI container
// knows which provider to give us when we ask for the db connection.
// A Symbol guarantees uniqueness — no other library/token can accidentally clash with it.
export const DRIZZLE_CLIENT = Symbol('DRIZZLE_CLIENT');
