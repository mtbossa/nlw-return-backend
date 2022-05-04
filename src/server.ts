import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

app.use(express.json());

const transport = nodemailer.createTransport({
	host: "smtp.mailtrap.io",
	port: 2525,
	auth: {
		user: "e074c477874183",
		pass: "9c6439feec9459",
	},
});

app.post("/api/feedback", async (req, res) => {
	const { type, comment, screenshot } = req.body;
	console.log({ type, comment, screenshot });
	const feedback = await prisma.feedback.create({
		data: {
			type,
			comment,
			screenshot,
		},
	});

	await transport.sendMail({
		from: "Mateus <test@test.com",
		to: "Mateus Bossa <mateus.rbossa@gmail.com",
		subject: "Novo feedback",
		html: [
			`<div style="font-family: sans-serif; font-size: 16px; color: #222">`,
			`<p>Tipo do feedback: ${type}</p>`,
			`<p>Comentário: ${comment}</p>`,
			"</div>",
		].join("\n"),
	});
	return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
	console.log("http server running");
});
