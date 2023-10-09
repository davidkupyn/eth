import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import * as schema from './schema';

export const libsql_client = createClient({
	url: process.env.DATABASE_URL ?? '',
	authToken: process.env.DATABASE_AUTH_TOKEN ?? ''
});

export const db = drizzle(libsql_client, { schema });
