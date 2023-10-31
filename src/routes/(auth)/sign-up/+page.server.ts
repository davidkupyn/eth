import { auth } from '$lib/server/auth';
import { send_email_verification_link } from '$lib/server/email';
import { generate_email_verification_token } from '$lib/server/token';
import { fail, redirect } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/client';
import { z } from 'zod';

const SignUpSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6).max(255)
});

export const load = async ({ locals }) => {
	const session = await locals.auth.validate();
	if (session) {
		if (!session.user.emailVerified) throw redirect(302, '/email-verification');
		throw redirect(302, '/');
	}
	return {
		form: superValidate(SignUpSchema)
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		const form = await superValidate(request, SignUpSchema);

		if (!form.valid) {
			return fail(400, { form });
		}
		const { email, password } = form.data;

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
		} catch (error: any) {
			console.error(error);
			if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
				setError(form, 'email', 'Email already in use');
				return fail(400, {
					form
				});
			}
			return fail(500, {
				form
			});
		}
		throw redirect(302, '/email-verification');
	}
};
