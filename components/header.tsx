"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn, getInitials } from "~/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Session } from "next-auth";

export const Header = ({ session }: { session: Session }) => {
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
				<li>
					<Link href={"/my-profile"}>
						<Avatar>
							<AvatarImage src={session.user?.image || ""} />
							<AvatarFallback className="bg-amber-100 font-semibold">
								{getInitials(session.user?.name || "IN")}
							</AvatarFallback>
						</Avatar>
					</Link>
				</li>
			</ul>
		</header>
	);
};
