import { SubmitFeedbackService } from "./submitFeedbackService";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedback = new SubmitFeedbackService(
	{ create: createFeedbackSpy },
	{ sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
	it("should be able to submit a feedback", async () => {
		await expect(
			submitFeedback.handle({
				type: "BUG",
				comment: "example comment",
				screenshot: "data:image/png;base64,asddasadsadsasdasd",
			})
		).resolves.not.toThrow();

		expect(createFeedbackSpy).toHaveBeenCalled();
		expect(sendMailSpy).toHaveBeenCalled();
	});

	it("should not be able to submit without type", async () => {
		await expect(
			submitFeedback.handle({
				type: "",
				comment: "example comment",
				screenshot: "data:image/png;base64,asddasadsadsasdasd",
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});

	it("should not be able to submit without comment", async () => {
		await expect(
			submitFeedback.handle({
				type: "BUG",
				comment: "",
				screenshot: "data:image/png;base64,asddasadsadsasdasd",
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});

	it("should not be able to submit with wrong file format", async () => {
		await expect(
			submitFeedback.handle({
				type: "BUG",
				comment: "AAAA",
				screenshot: "saddsa",
			})
		).rejects.toThrow();

		expect(createFeedbackSpy).not.toHaveBeenCalled();
		expect(sendMailSpy).not.toHaveBeenCalled();
	});
});
