import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mailAdapter";

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "e074c477874183",
		pass: "9c6439feec9459",
	},
});

export class NodeMailerMailAdapter implements MailAdapter {
	async sendMail({ subject, body }: SendMailData) {
		await transport.sendMail({
			from: "Mateus <test@test.com",
			to: "Mateus Bossa <mateus.rbossa@gmail.com",
			subject: subject,
			html: body,
		});
	}
}
