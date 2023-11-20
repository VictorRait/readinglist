import {useEffect} from "react";
import {useState} from "react";
import axios from "axios";
import {MdOutlineAddBox} from "react-icons/md";
import {Link, useNavigate} from "react-router-dom";
import Spinner from "../components/Spinner";
import BooksCard from "../components/home/BooksCard";
import {useBookByUser} from "../features/useBookByUser";
import {useAuth} from "../context/AuthContext";

function Home() {
	const navigate = useNavigate();
	const {user, setUser} = useAuth(); // Assuming you have a setUser function in your context
	const {
		getBooks,
		books,
		booksUser,
		isLoading: isGettingBook,
	} = useBookByUser();

	useEffect(() => {
		const storedUser = JSON.parse(localStorage.getItem("user")) || user;
		if (storedUser) {
			setUser(storedUser);
		} else {
			navigate("/auth");
		}
	}, [navigate, setUser]);

	useEffect(() => {
		if (user) {
			getBooks(user);
		}
	}, [user, getBooks]);

	useEffect(() => {
		if (user) {
			localStorage.setItem("user", JSON.stringify(user));
		}
	}, [user]);

	if (!user || isGettingBook) {
		// Loading state when user is not available or book data is loading
		return <Spinner />;
	}

	const finalBooks = books.map((book) => {
		const userStatus = booksUser.find((userBook) => userBook._id === book._id);

		if (userStatus) {
			return {
				...book,
				status: userStatus.status, // Assuming status is a property in userStatus
			};
		}

		return book; // Return the original book if no matching user status is found
	});

	// Filter and sort books once the data is available
	const curReading = finalBooks
		? finalBooks.filter(
				(book) =>
					book.status === "reading" ||
					book.status === "finished" ||
					book.status === "stopped"
		  )
		: [];

	// Sort the filtered books
	const sortedCurReading = curReading.slice().sort((a, b) => {
		if (a.status === "finished" && b.status !== "finished") {
			return 1;
		}
		if (a.status !== "finished" && b.status === "finished") {
			return -1;
		}
		return 0;
	});

	return (
		<div className="p-4 pt-0 w-full flex justify-center items-center h-full">
			<div className="w-[100%] pb-5 ">
				<div className="flex ">
					<h3 className="text-xl my-2">Your Reading List</h3>
					<Link className="ml-auto" to="/books/create">
						<MdOutlineAddBox className="text-sky-600 text-4xl hover:text-sky-700" />
					</Link>
				</div>
				{curReading.length > 0 ? (
					<BooksCard books={sortedCurReading} />
				) : (
					<span className="text-slate-400">No books to show</span>
				)}
			</div>
		</div>
	);
}

export default Home;
