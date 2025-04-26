"use client";

import {
	DefaultValues,
	FieldValues,
	Path,
	SubmitHandler,
	useForm,
	UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { Button } from "~/components/ui/button";
import { FIELD_NAMES, FIELD_TYPES } from "~/constants";

import { ImageUpload } from "./image-upload";
import { cn } from "~/lib/utils";
import { toast } from "~/hooks/use-toast";
import { useRouter } from "next/navigation";

interface Props<T extends FieldValues> {
	schema: ZodType<T>;
	defaultValues: T;
	onSubmit: (values: T) => Promise<{
		success: boolean;
		error?: string;
	}>;
	type: "SIGN_IN" | "SIGN_UP";
}

export const AuthForm = <T extends FieldValues>({
	type,
	schema,
	defaultValues,
	onSubmit,
}: Props<T>) => {
	const router = useRouter();
	const form: UseFormReturn<T> = useForm({
		mode: "onTouched",
		resolver: zodResolver(schema),
		defaultValues: defaultValues as DefaultValues<T>,
	});

	const submitHandler: SubmitHandler<T> = async (values) => {
		const result = await onSubmit(values);

		if (result.success) {
			toast({
				title: "Success",
				description: isSignIn
					? "You have successfully signed in."
					: "You have successfully signed up.",
			});
			router.push("/");
		} else {
			toast({
				title: `Error ${isSignIn ? "signing in" : "signing up"}`,
				description: result.error,
				variant: "destructive",
			});
		}
	};

	const isSignIn = type === "SIGN_IN";

	return (
		<div className="flex flex-col gap-4">
			<h1 className="text-2xl font-semibold text-white">
				{isSignIn ? "Welcome back to BookWize" : "Create your library account"}
			</h1>
			<span className="text-light-100">
				{isSignIn
					? "Access the vast collection of resources and stay updated"
					: "Please complete all fields and upload a valid university ID to gain access to the library card"}
			</span>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(submitHandler)}
					className="space-y-6 w-full"
				>
					{Object.keys(defaultValues).map((field) => (
						<FormField
							key={field}
							control={form.control}
							name={field as Path<T>}
							render={({ field }) => (
								<FormItem>
									<FormLabel className="capitalize">
										{FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
									</FormLabel>
									<FormControl>
										{field.name === "universityCard" ? (
											<ImageUpload onFileChange={field.onChange} />
										) : (
											<Input
												{...field}
												// required
												type={
													FIELD_TYPES[
														field.name as keyof typeof FIELD_TYPES
													] === "email"
														? "text"
														: FIELD_TYPES[
																field.name as keyof typeof FIELD_TYPES
															]
												}
												inputMode={field.name === "email" ? "email" : "text"} // for mobile keyboard
												autoComplete={
													field.name === "email"
														? "email"
														: field.name === "password"
															? "current-password"
															: "off"
												}
												className={cn(
													"form-input",
													form.formState.errors[field.name] && "animate-shake"
												)}
											/>
										)}
									</FormControl>
									<FormMessage className="text-red-500 text-sm mt-1 animate-in" />
								</FormItem>
							)}
						/>
					))}
					<Button type="submit" className="form-btn">
						{isSignIn ? "Sign in" : "Sign up"}
					</Button>
				</form>
			</Form>
			<p className="text-center text-base font-medium">
				{isSignIn ? "New to BookWize? " : "Already have an account? "}
				<Link
					href={isSignIn ? "/sign-up" : "/sign-in"}
					className="font-bold text-primary hover:underline"
				>
					{isSignIn ? "Create an account" : "Sign in"}
				</Link>
			</p>
		</div>
	);
};
