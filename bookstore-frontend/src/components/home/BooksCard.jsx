import {useState} from "react";
import Modal from "../Modal";
import BookSingleCard from "./BookSingleCard";

function BooksCard({books}) {
	const [currentBook, setCurrentBook] = useState();

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
			{books.map((book) => (
				<BookSingleCard
					onClick={() => setCurrentBook(book.title)}
					book={book}
					key={book._id}
				/>
			))}
			{currentBook && (
				<Modal
					type="home"
					book={books?.find((book) => book.title === currentBook)}
					onClose={() => setCurrentBook("")} // Clear the state to close the modal
				/>
			)}
		</div>
	);
}

export default BooksCard;
