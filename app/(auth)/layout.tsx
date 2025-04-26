import Image from "next/image";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import { auth } from "~/auth";

const AuthLayout = async ({ children }: { children: ReactNode }) => {
	const session = await auth();
	if (session?.user) {
		redirect("/");
	}
	return (
		<main className="auth-container">
			<section className="auth-form">
				<div className="auth-box">
					<div className="flex flex-row gap-2">
						<Image
							src="/icons/logo.svg"
							alt="BookWize Logo"
							width={38}
							height={38}
						/>
						<h1 className="text-2xl font-bold text-white">BookWize</h1>
					</div>
					<section>{children}</section>
				</div>
			</section>
			<section className="auth-illustration">
				<Image
					priority
					src="/images/auth-illustration.png"
					alt="Auth Illustration"
					width={1000}
					height={1000}
					className="size-full object-cover"
				/>
			</section>
		</main>
	);
};

export default AuthLayout;
