import { auth } from '$lib/server/auth';
import { fail } from '@sveltejs/kit';
import { db } from '$lib/server/db';
import { generate_email_verification_token } from '$lib/server/token';
import { is_valid_email, send_password_reset_link } from '$lib/server/email';

import { eq } from 'drizzle-orm';
import { user as user_table } from '$lib/server/db/schema';

export const actions = {
	default: async ({ request }) => {
		const formData = await request.formData();
		const email = formData.get('email');

		if (!is_valid_email(email)) {
			return fail(400, {
				message: 'Invalid email'
			});
		}
		try {
			const storedUser = await db.query.user.findFirst({
				where: eq(user_table.email, email.toLowerCase())
			});

			if (!storedUser) {
				return fail(400, {
					message: 'User does not exist'
				});
			}
			const user = auth.transformDatabaseUser(storedUser);
			const token = await generate_email_verification_token(user.userId);
			await send_password_reset_link(token, user.email);
			return {
				success: true
			};
		} catch (e) {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
