import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";
import {useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {HOST_URL} from "../config";

function ShowBook() {
	const [book, setBook] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const {id} = useParams();
	useEffect(
		function () {
			setIsLoading(true);
			axios
				.get(`${HOST_URL}${id}`)
				.then((response) => {
					setBook(response.data);
					setIsLoading(false);
				})
				.catch((err) => {
					console.log(err.message);
				});
		},
		[id]
	);
	return (
		<div className="p-4 -mt-10">
			<BackButton />
			<h1 className="text-3xl my-4">Show Book</h1>
			{isLoading ? (
				<Spinner />
			) : (
				<div className="flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4">
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Id</span>
						<span>{book._id}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Title</span>
						<span>{book.title}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Author</span>
						<span>{book.author}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Publish Year</span>
						<span>{book.publishYear}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Create Time</span>
						<span>{new Date(book.createdAt).toString()}</span>
					</div>
					<div className="my-4">
						<span className="text-xl mr-4 text-gray-400">Update Time</span>
						<span>{new Date(book.updatedAt).toString()}</span>
					</div>
				</div>
			)}
		</div>
	);
}

export default ShowBook;
