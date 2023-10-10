import { auth } from '$lib/server/auth';
import { is_valid_password_reset_token, validate_password_reset_token } from '$lib/server/token';
import { fail, redirect } from '@sveltejs/kit';

export async function load({ params }) {
	const { token } = params;
	const validToken = await is_valid_password_reset_token(token);
	if (!validToken) {
		throw redirect(302, '/password-reset');
	}
	return {};
}

export const actions = {
	default: async ({ request, params, locals }) => {
		const formData = await request.formData();
		const password = formData.get('password');

		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			return fail(400, {
				message: 'Password must be at least 6 characters long'
			});
		}
		try {
			const { token } = params;
			const userId = await validate_password_reset_token(token);
			let user = await auth.getUser(userId);
			await auth.invalidateAllUserSessions(user.userId);
			await auth.updateKeyPassword('email', user.email, password);
			if (!user.emailVerified) {
				user = await auth.updateUserAttributes(user.userId, {
					email_verified: Number(true)
				});
			}
			const session = await auth.createSession({
				userId: user.userId,
				attributes: {}
			});
			locals.auth.setSession(session);
		} catch (e) {
			return fail(400, {
				message: 'Invalid or expired password reset link'
			});
		}
		throw redirect(302, '/');
	}
};
