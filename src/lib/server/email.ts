import { Resend } from 'resend';

export const mailer = new Resend(process.env.RESEND_API_KEY);

export async function send_email_verification_link(token: string, email: string) {
	const url = `${process.env.WEBSITE_URL}/email-verification/${token}`;

	mailer.emails.send({
		from: process.env.RESEND_FROM_EMAIL ?? '',
		to: email,
		subject: 'Hello World',
		html: `<p>${url}</p>`
	});
}

export async function send_password_reset_link(token: string, email: string) {
	const url = `${process.env.WEBSITE_URL}/password-reset/${token}`;

	mailer.emails.send({
		from: process.env.RESEND_FROM_EMAIL ?? '',
		to: email,
		subject: 'Hello World',
		html: `<p>${url}</p>`
	});
}

export function is_valid_email(maybe_email: unknown): maybe_email is string {
	if (typeof maybe_email !== 'string') return false;
	if (maybe_email.length > 255) return false;

	const email_regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
	return email_regex.test(maybe_email);
}
