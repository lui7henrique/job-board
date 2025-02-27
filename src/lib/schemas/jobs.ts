import { z } from "zod";

export const jobSchema = z.object({
	title: z.string().min(3, {
		message: "Job title must be at least 3 characters long",
	}),
	company: z.string().min(2, {
		message: "Company name must be at least 2 characters long",
	}),
	description: z.string().min(10, {
		message: "Job description must be at least 10 characters long",
	}),
});

export type JobFormValues = z.infer<typeof jobSchema>;
