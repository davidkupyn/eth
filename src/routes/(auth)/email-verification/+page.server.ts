import { send_email_verification_link } from '$lib/server/email';
import { generate_email_verification_token } from '$lib/server/token';
import { fail, redirect } from '@sveltejs/kit';

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (!session) throw redirect(302, '/sign-in');
	if (session.user.emailVerified) {
		throw redirect(302, '/');
	}
	return {};
};

export const actions = {
	default: async ({ locals }) => {
		const session = await locals.auth.validate();
		if (!session) throw redirect(302, '/sign-in');
		if (session.user.emailVerified) {
			throw redirect(302, '/');
		}
		try {
			const token = await generate_email_verification_token(session.user.userId);
			await send_email_verification_link(token, session.user.email);
			return {
				success: true
			};
		} catch {
			return fail(500, {
				message: 'An unknown error occurred'
			});
		}
	}
};
