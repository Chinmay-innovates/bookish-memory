import { BookList } from "~/components/book-list";
import { BookOverview } from "~/components/book-overview";
import { sampleBooks } from "~/constants";
import { db } from "~/db/drizzle";
import { users } from "~/db/schema";

const Home = async () => {
	const result = await db.select().from(users);
	console.log(JSON.stringify(result, null, 2));1
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
