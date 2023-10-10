import { auth } from '$lib/server/auth';
import { db } from '$lib/server/db';
import { user as user_table } from '$lib/server/db/schema';
import { is_valid_email, send_password_reset_link } from '$lib/server/email';
import { generate_password_reset_token } from '$lib/server/token.js';
import { fail } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		if (!is_valid_email(email)) {
			return fail(400, {
				message: 'Please enter a valid email address'
			});
		}
		try {
			const storedUser = await db.query.user.findFirst({
				where: eq(user_table.email, email.toLowerCase())
			});

			if (!storedUser) {
				return fail(400, {
					message: 'No user found with that email address'
				});
			}
			const user = auth.transformDatabaseUser(storedUser);
			const token = await generate_password_reset_token(user.userId);
			await send_password_reset_link(token, user.email);
			return {
				success: true,
				email
			};
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
