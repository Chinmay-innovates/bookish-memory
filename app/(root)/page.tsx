import { BookList } from "~/components/book-list";
import { BookOverview } from "~/components/book-overview";
import { sampleBooks } from "~/constants";

const Home = () => {
	return (
		<>
			<BookOverview {...sampleBooks[0]} />
			<BookList
				title="Latest books"
				books={sampleBooks}
				containerClassName="mt-28"
			/>
		</>
	);
};

export default Home;
