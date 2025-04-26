"use client";
import { AuthForm } from "~/components/auth-form";
import { signInSchema } from "~/lib/schemas";
const Page = () => {
	return (
		<AuthForm
			type="SIGN_IN"
			schema={signInSchema}
			defaultValues={{
				email: "",
				password: "",
			}}
			onSubmit={() => {}}
		/>
	);
};

export default Page;
