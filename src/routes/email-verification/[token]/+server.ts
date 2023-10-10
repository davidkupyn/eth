import { auth } from '$lib/server/auth';
import { validate_email_verification_token } from '$lib/server/token';

export async function GET({ params, locals }) {
	const { token } = params;
	try {
		const userId = await validate_email_verification_token(token);
		const user = await auth.getUser(userId);
		await auth.invalidateAllUserSessions(user.userId);
		await auth.updateUserAttributes(user.userId, {
			email_verified: Number(true)
		});
		const session = await auth.createSession({
			userId: user.userId,
			attributes: {}
		});
		locals.auth.setSession(session);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	} catch {
		return new Response('Invalid email verification link', {
			status: 400
		});
	}
}
