"use client";
import { AuthForm } from "~/components/auth-form";
import { signUpSchema } from "~/lib/schemas";

const Page = () => {
	return (
		<AuthForm
			type="SIGN_UP"
			schema={signUpSchema}
			defaultValues={{
				email: "",
				password: "",
				fullName: "",
				universityId: 0,
				universityCard: "",
			}}
			onSubmit={() => {}}
		/>
	);
};

export default Page;
