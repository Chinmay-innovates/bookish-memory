"use server";

import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { signIn } from "~/auth";
import { db } from "~/db/drizzle";
import { users } from "~/db/schema";
import { ratelimit } from "../rate-limit";
import { redirect } from "next/navigation";

export const signInWithCredentials = async (
	params: Pick<AuthCredentials, "email" | "password">
) => {
	const { email, password } = params;

	const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
	const { success } = await ratelimit.limit(ip);

	if (!success) {
		return redirect("/too-fast");
	}

	try {
		const result = await signIn("credentials", {
			email,
			password,
			redirect: false,
		});

		if (result?.error) {
			return {
				success: false,
				error: result.error,
			};
		}

		return {
			success: true,
		};
	} catch (error) {
		console.log(error, "Sign In Error");
		return {
			success: false,
			error: "Sign In Error",
		};
	}
};

export const signUp = async (params: AuthCredentials) => {
	const { fullName, email, password, universityId, universityCard } = params;

	const ip = (await headers()).get("x-forwarded-for") || "127.0.0.1";
	const { success } = await ratelimit.limit(ip);

	if (!success) {
		return redirect("/too-fast");
	}

	const existingUser = await db
		.select()
		.from(users)
		.where(eq(users.email, email))
		.limit(1);

	if (existingUser.length > 0) {
		return {
			success: false,
			error: "User already exists",
		};
	}

	const hashedPassword = await bcrypt.hash(password, 10);

	try {
		await db.insert(users).values({
			fullName,
			email,
			password: hashedPassword,
			universityId,
			universityCard,
		});

		await signInWithCredentials({ email, password });

		return {
			success: true,
		};
	} catch (error) {
		console.log(error, "Sign Up Error");
		return {
			success: false,
			error: "Sign Up Error",
		};
	}
};
