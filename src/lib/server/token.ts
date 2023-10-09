import { eq } from 'drizzle-orm';
import { generateRandomString, isWithinExpiration } from 'lucia/utils';
import { db } from './db';
import { email_verification_token, password_reset_token } from './db/schema';

const TWO_HOURS = 1000 * 60 * 60 * 2;

export async function generate_email_verification_token(user_id: string) {
	const stored_user_tokens = await db.query.email_verification_token.findMany({
		where: eq(email_verification_token.user_id, user_id)
	});

	if (stored_user_tokens.length > 0) {
		const reusable_stored_token = stored_user_tokens.find((token) => {
			return isWithinExpiration(Number(token.expires) - TWO_HOURS / 2);
		});
		if (reusable_stored_token) return reusable_stored_token.id;
	}

	const token = generateRandomString(63);

	await db.insert(email_verification_token).values({
		id: token,
		user_id,
		expires: BigInt(new Date().getTime() + TWO_HOURS)
	});

	return token;
}

export async function validate_email_verification_token(token: string) {
	const stored_token = await db.transaction(async (tx) => {
		const stored_token = await tx.query.email_verification_token.findFirst({
			where: eq(email_verification_token.id, token)
		});

		if (!stored_token) throw new Error('Invalid token');
		await tx.delete(email_verification_token).where(eq(email_verification_token.id, token));

		return stored_token;
	});

	if (!isWithinExpiration(stored_token.expires)) throw new Error('Expired token');

	return stored_token.user_id;
}

export async function generate_password_reset_token(user_id: string) {
	const stored_user_tokens = await db.query.password_reset_token.findMany({
		where: eq(email_verification_token.user_id, user_id)
	});

	if (stored_user_tokens.length > 0) {
		const reusable_stored_token = stored_user_tokens.find((token) => {
			return isWithinExpiration(Number(token.expires) - TWO_HOURS / 2);
		});
		if (reusable_stored_token) return reusable_stored_token.id;
	}

	const token = generateRandomString(63);

	await db.insert(password_reset_token).values({
		id: token,
		user_id,
		expires: BigInt(new Date().getTime() + TWO_HOURS)
	});

	return token;
}

export async function validate_password_reset_token(token: string) {
	const stored_token = await db.transaction(async (tx) => {
		const stored_token = await tx.query.password_reset_token.findFirst({
			where: eq(password_reset_token.id, token)
		});

		if (!stored_token) throw new Error('Invalid token');
		await tx.delete(password_reset_token).where(eq(password_reset_token.id, token));
		return stored_token;
	});

	if (!isWithinExpiration(stored_token.expires)) throw new Error('Expired token');

	return stored_token.user_id;
}

export async function isValidPasswordResetToken(token: string) {
	const stored_token = await db.query.password_reset_token.findFirst({
		where: eq(password_reset_token.id, token)
	});

	if (!stored_token) return false;

	if (!isWithinExpiration(stored_token.expires)) throw new Error('Expired token');

	return true;
}
