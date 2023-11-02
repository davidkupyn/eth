import { Resend } from 'resend';

export const mailer = new Resend(process.env.RESEND_API_KEY);

export async function send_email_verification_link(token: string, email: string) {
	const url = `${process.env.WEBSITE_URL}/email-verification/${token}`;

	mailer.emails.send({
		from: process.env.RESEND_FROM_EMAIL ?? '',
		to: email,
		subject: 'Verify Your Email Address for Ethera Account',
		html: `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
					<title>Verify Your Email Address for Ethera Account</title>
					<style>
							body {
									font-family: Arial, sans-serif;
							}
					</style>
			</head>
			<body>
					<p>Dear Ethera User,</p><p style="text-align: start">We hope this message finds you in good health and high spirits.</p><p style="text-align: start">To enhance the security of your Ethera account, we kindly request you to verify your email address by following the steps below:</p><ol><li><p>Click on the "Verify Email" link provided below.</p></li><li><p>You will be redirected to a confirmation page indicating the successful verification of your email address.</p></li></ol><p style="text-align: start"><a target="_blank" rel="noopener noreferrer nofollow" href="${url}">Verify Email</a></p><p style="text-align: start">Please be assured that this process is crucial in ensuring the protection and integrity of your Ethera account.</p><p style="text-align: start">If you did not initiate this email verification request, please disregard this message.</p><p style="text-align: start">Should you have any queries or concerns, please do not hesitate to contact our support team at <a target="_blank" rel="noopener noreferrer nofollow" href="https://mailto:support@kupyn.dev">support@kupyn.dev</a>.</p><p style="text-align: start">Thank you for entrusting Ethera with your digital journey.</p><p style="text-align: start">Warm regards,</p><p style="text-align: start">Ethera Team</p>
			</body>
			</html>
		`
	});
}

export async function send_password_reset_link(token: string, email: string) {
	const url = `${process.env.WEBSITE_URL}/password-reset/${token}`;

	mailer.emails.send({
		from: process.env.RESEND_FROM_EMAIL ?? '',
		to: email,
		subject: 'Password Reset Request',
		html: `
			<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
			<html xmlns="http://www.w3.org/1999/xhtml">
			<head>
					<meta name="viewport" content="width=device-width, initial-scale=1.0" />
					<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
					<title>Password Reset Request</title>
					<style>
							body {
									font-family: Arial, sans-serif;
							}
					</style>
			</head>
			<body>
					<p>Dear Ethera User,</p><p style="text-align: start">I hope this email finds you well. We have received a request to reset your password for your Account.</p><p style="text-align: start">To proceed with the password reset, please follow the steps below:</p><ol><li><p>Click on the "Reset Password" link provided below.</p></li><li><p>Type in your new password.</p></li><li><p>Click "Submit" to confirm the password change.</p></li></ol><p><a target="_blank" rel="noopener noreferrer nofollow" href="${url}">Reset Password</a></p><p style="text-align: start">If you did not initiate this password reset request, please ignore this email. Your current password remains unchanged.</p><p style="text-align: start">Should you encounter any difficulties or have further questions, feel free to contact our support team at <a target="_blank" rel="noopener noreferrer nofollow" href="https://mailto:support@kupyn.dev">support@kupyn.dev</a></p><p style="text-align: start">Thank you for using Ethera.</p><p style="text-align: start">Best regards,</p><p style="text-align: start">Ethera Team</p>
			</body>
			</html>
		`
	});
}

export function is_valid_email(maybe_email: unknown): maybe_email is string {
	if (typeof maybe_email !== 'string') return false;
	if (maybe_email.length > 255) return false;

	const email_regex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
	return email_regex.test(maybe_email);
}
