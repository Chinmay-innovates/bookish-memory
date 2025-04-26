"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "~/lib/utils";

export const Header = () => {
	const pathname = usePathname();
	return (
		<header className="my-10 flex justify-between gap-5">
			<Link href={"/"}>
				<Image
					src={"/icons/logo.svg"}
					alt="BookWize Logo"
					width={40}
					height={40}
					priority
				/>
			</Link>
			<ul className="flex flex-row items-center gap-8">
				<li>
					<Link
						href={"/library"}
						className={cn(
							"text-base cursor-pointer capitalize",
							pathname === "/library" ? "text-light-200" : "text-light-100"
						)}
					>
						Library
					</Link>
				</li>
			</ul>
		</header>
	);
};
