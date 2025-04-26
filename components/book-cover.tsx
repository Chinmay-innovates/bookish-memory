import Image from "next/image";
import { cn } from "~/lib/utils";
import { BookCoverSVG } from "./book-cover-svg";

type BookCoverVariant = "extraSmall" | "small" | "medium" | "regular" | "wide";

const variantStyles: Record<BookCoverVariant, string> = {
	extraSmall: "book-cover_extra_small",
	small: "book-cover_small",
	medium: "book-cover_medium",
	regular: "book-cover_regular",
	wide: "book-cover_wide",
};
interface Props {
	variant?: BookCoverVariant;
	className?: string;
	coverImage?: string;
	coverColor?: string;
}

export const BookCover = ({
	className,
	coverColor = "#012B48",
	coverImage = "https://placehold.co/400X550.png",
	variant = "regular",
}: Props) => {
	return (
		<div
			className={cn(
				"relative overflow-hidden rounded-sm transition-all duration-300",
				variantStyles[variant],
				className
			)}
		>
			<BookCoverSVG coverColor={coverColor} />
			<div
				className="absolute z-10 rounded-xl"
				style={{
					left: "12%",
					width: "87.5%",
					height: "87.4%",
				}}
			>
				<Image
					fill
					src={coverImage}
					alt="Book Cover"
					className="object-fill rounded-tr-lg rounded-br-lg"
				/>
			</div>
		</div>
	);
};
