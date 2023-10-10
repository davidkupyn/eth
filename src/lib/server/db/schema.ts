import { relations } from 'drizzle-orm';
import { blob, int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const auth_tables = {
	user: 'user',
	session: 'user_session',
	key: 'user_key'
};

export const user = sqliteTable(auth_tables.user, {
	id: text('id').primaryKey(),
	email: text('email').notNull(),
	email_verified: int('email_verified').notNull()
});

export const session = sqliteTable(auth_tables.session, {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id),
	active_expires: blob('active_expires', {
		mode: 'bigint'
	}).notNull(),
	idle_expires: blob('idle_expires', {
		mode: 'bigint'
	}).notNull()
});

export const user_session_relation = relations(user, ({ one }) => ({
	session: one(session, {
		fields: [user.id],
		references: [session.user_id]
	})
}));

export const user_key = sqliteTable(auth_tables.key, {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id),
	hashed_password: text('hashed_password')
});

export const user_key_relation = relations(user, ({ one }) => ({
	key: one(user_key, {
		fields: [user.id],
		references: [user_key.user_id]
	})
}));

export const email_verification_token = sqliteTable('email_verification_token', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id),
	expires: blob('expires', {
		mode: 'bigint'
	}).notNull()
});

export const user_email_verification_token_relation = relations(user, ({ one }) => ({
	email_verification_token: one(email_verification_token, {
		fields: [user.id],
		references: [email_verification_token.user_id]
	})
}));

export const password_reset_token = sqliteTable('password_reset_token', {
	id: text('id').primaryKey(),
	user_id: text('user_id')
		.notNull()
		.references(() => user.id),
	expires: blob('expires', {
		mode: 'bigint'
	}).notNull()
});

export const user_password_reset_token_relation = relations(user, ({ one }) => ({
	password_reset_token: one(password_reset_token, {
		fields: [user.id],
		references: [password_reset_token.user_id]
	})
}));
