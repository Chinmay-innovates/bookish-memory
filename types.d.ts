/**
 * Represents a book in the library system
 */
interface Book {
	/** Unique identifier for the book */
	id: number;
	title: string;
	author: string;
	genre: string;
	/** Rating from 0 to 5 */
	rating: number;
	/** Total number of copies owned by the library */
	totalCopies: number;
	/** Number of copies currently available for borrowing */
	availableCopies: number;
	description: string;
	coverColor: string;
	coverUrl: string;
	videoUrl: string;
	summary: string;
	/** Whether the book is currently loaned by the user */
	isLoanedBook?: boolean; // optional
}

interface AuthCredentials {
	fullName: string;
	email: string;
	password: string;
	universityId: number;
	universityCard: string;
}
