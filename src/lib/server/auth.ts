import { dev } from '$app/environment';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { libsql_client } from './db';
import { auth_tables } from './db/schema';

export const auth = lucia({
	adapter: libsql(libsql_client, auth_tables),
	middleware: sveltekit(),
	env: dev ? 'DEV' : 'PROD',
	getUserAttributes: (data) => {
		return {
			email: data.email,
			emailVerified: Boolean(data.email_verified)
		};
	}
});

export type Auth = typeof auth;
