import { z } from "zod";

export const signUpSchema = z
	.object({
		name: z.string().min(2, {
			message: "Name must be at least 2 characters long",
		}),
		email: z.string().email({
			message: "Please enter a valid email address",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password must be at least 6 characters long",
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});

export type SignUpFormValues = z.infer<typeof signUpSchema>;
