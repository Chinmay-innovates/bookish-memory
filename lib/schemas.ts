import { z } from "zod";

export const signUpSchema = z.object({
	fullName: z.string().trim().min(3, "Full name must be at least 3 characters"),
	email: z.string().trim().email(),
	universityId: z.coerce
		.number()
		.int()
		.positive("Please provide a valid university ID"),
	universityCard: z.string().nonempty("University card is required"),
	password: z.string().trim().min(6, "Password must be at least 6 characters"),
});

export const signInSchema = z.object({
	email: z.string().trim().email(),
	password: z.string().trim(),
});
