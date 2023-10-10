import { auth } from '$lib/server/auth';
import { is_valid_email, send_email_verification_link } from '$lib/server/email';
import { generate_email_verification_token } from '$lib/server/token';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	return {};
};

export const actions = {
	default: async ({ request, locals }) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		if (!is_valid_email(email)) {
			return fail(400, {
				email: 'Please enter a valid email address'
			});
		}

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				password: 'Password must be at least 6 characters long'
			});
		}

		try {
			const user = await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email.toLowerCase(),
					password
				},
				attributes: {
					email: email.toLowerCase(),
					email_verified: Number(false)
				}
			});
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});

			locals.auth.setSession(session);

			const token = await generate_email_verification_token(user.userId);
			await send_email_verification_link(token, user.email);
		} catch (error) {
			console.error(error);
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
		throw redirect(302, '/email-verification');
	}
};
