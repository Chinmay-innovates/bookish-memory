import { ReactNode } from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";

import { cn } from "~/lib/utils";

import "./globals.css";

const ibmPlexSans = localFont({
	src: [
		{ path: "/fonts/IBMPlexSans-Regular.ttf", weight: "400", style: "normal" },
		{ path: "/fonts/IBMPlexSans-Medium.ttf", weight: "500", style: "normal" },
		{ path: "/fonts/IBMPlexSans-SemiBold.ttf", weight: "600", style: "normal" },
		{ path: "/fonts/IBMPlexSans-Bold.ttf", weight: "700", style: "normal" },
	],
	display: "swap",
});

const bebasNeue = localFont({
	src: [
		{ path: "/fonts/BebasNeue-Regular.ttf", weight: "400", style: "normal" },
	],
	variable: "--bebas-neue",
});

export const metadata: Metadata = {
	title: "BookWize",
	description:
		"BookWize is a book borrowing university library management solution.",
};

const RootLayout = ({ children }: { children: ReactNode }) => {
	return (
		<html lang="en">
			<body
				className={cn("antialiased", ibmPlexSans.className, bebasNeue.variable)}
			>
				{children}
			</body>
		</html>
	);
};

export default RootLayout;
