import Link from "next/link";
import { BookCover } from "./book-cover";
import { cn } from "~/lib/utils";
import Image from "next/image";
import { Button } from "./ui/button";

export const BookCard = ({
	id,
	title,
	genre,
	coverUrl,
	coverColor,
	isLoanedBook = false,
}: Book) => (
	<li className={cn(isLoanedBook && "xs:w-52 w-full")}>
		<Link
			href={`/books/${id}`}
			className={cn(isLoanedBook && "w-full flex flex-col items-center")}
		>
			<BookCover coverImage={coverUrl} coverColor={coverColor} />
			<div className={cn(!isLoanedBook && "xs:max-w-40 max-w-28")}>
				<p className="book-title">{title}</p>
				<p className="book-genre">{genre}</p>
			</div>
			{isLoanedBook && (
				<div className="mt-3 w-full">
					<div className="book-loaned">
						<Image
							src={"/icons/calendar.svg"}
							alt="Calendar"
							width={20}
							height={20}
							className={"object-contain"}
						/>
						<p className="text-light-100">11 days left to return</p>
					</div>
					<Button variant={"ghost"} className="book-btn">
						Download receipt
					</Button>
				</div>
			)}
		</Link>
	</li>
);
