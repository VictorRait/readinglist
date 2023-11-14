import {useEffect, useState} from "react";
import MultiCarousel from "../MultiCarousel";
import Modal from "../Modal";

function BooksTable({books}) {
	const [hasBooks, setHasBooks] = useState(false);
	const [carouselBooks, setCarouselBooks] = useState([]);
	const [showCurrentBook, setShowCurrentBook] = useState("");
	const [isDragging, setIsDragging] = useState(false);

	useEffect(() => {
		if (books?.length > 0) {
			setHasBooks(true);
			setCarouselBooks(books);
		}
	}, [books]);

	function handleMouseDown() {
		setIsDragging(true);
	}

	function handleMouseUp(title) {
		setIsDragging(false);
		setShowCurrentBook(title);
	}

	return (
		<>
			<MultiCarousel>
				{hasBooks ? (
					carouselBooks?.map((book, index) => {
						return (
							<div
								onMouseDown={handleMouseDown}
								onMouseUp={() => handleMouseUp(book.title)}
								style={{
									cursor: isDragging ? "grabbing" : "grab",
									border: "1px solid #ccc",
									padding: "10px",
									userSelect: isDragging ? "none" : "auto",
									pointerEvents: isDragging ? "none" : "auto",
								}}
								key={book.title}
								// onClick={() => handleClick(book.title)}
								className="!flex  cursor-pointer">
								<div className="border-2 border-amber-200 w-[130px] p-1 flex items-center justify-center">
									{book.image ? (
										<img
											className="w-full  h-[150px] "
											src={book.image}
											alt={book.title}
										/>
									) : (
										<div className="w-full   h-[150px]  bg-slate-200"></div>
									)}
								</div>
								<div className="border-2 w-[10em] border-amber-200 p-4 flex flex-col hidden md:flex ">
									<span className="text-xl font-semibold">{book.title}</span>
									<span>{book.author}</span>
									<span>{book.publishYear}</span>
								</div>
							</div>
						);
					})
				) : (
					<div>No books to show</div>
				)}
			</MultiCarousel>
			{/* Conditionally render the modal using the showCurrentBook state */}
			{showCurrentBook && (
				<Modal
					book={carouselBooks?.find((book) => book.title === showCurrentBook)}
					onClose={() => setShowCurrentBook("")} // Clear the state to close the modal
				/>
			)}
		</>
	);
}

export default BooksTable;
