"use client";
import { AuthForm } from "~/components/auth-form";
import { signInWithCredentials } from "~/lib/actions/auth";
import { signInSchema } from "~/lib/validation";
const Page = () => {
	return (
		<AuthForm
			type="SIGN_IN"
			schema={signInSchema}
			defaultValues={{
				email: "",
				password: "",
			}}
			onSubmit={signInWithCredentials}
		/>
	);
};

export default Page;
