import express from "express";
import { NodeMailerMailAdapter } from "./adapters/nodemailer/nodemailerMailAdapter";
import { prisma } from "./prisma";
import { PrismaFeedbackRepository } from "./repositories/prisma/prismaFeedbacksRepository";
import { SubmitFeedbackService } from "./services/submitFeedbackService";

export const routes = express.Router();

routes.post("/api/feedback", async (req, res) => {
	const { type, comment, screenshot } = req.body;
	console.log({ type, comment, screenshot });

	const prismaFeedbackRepository = new PrismaFeedbackRepository();
	const nodeMailerMailAdapter = new NodeMailerMailAdapter();

	const submitFeedbackService = new SubmitFeedbackService(
		prismaFeedbackRepository,
		nodeMailerMailAdapter
	);

	await submitFeedbackService.handle({ type, comment, screenshot });

	return res.status(201).send();
});
