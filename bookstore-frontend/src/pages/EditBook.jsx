import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {HOST_URL} from "../config";
import {useSnackbar} from "notistack";
function EditBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {enqueueSnackbar} = useSnackbar();
	const {id} = useParams();
	const bookData = {
		title,
		author,
		publishYear,
	};
	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`${HOST_URL}${id}`)
			.then((res) => {
				setTitle(res.data.title);
				setAuthor(res.data.author);
				setPublishYear(res.data.publishYear);
				setIsLoading(false);
			})
			.catch((err) => {
				console.log(err.message);

				setIsLoading(false);
			});
	}, [id]);

	function handleEditBook() {
		setIsLoading(true);
		axios
			.put(`${HOST_URL}${id}`, bookData)
			.then(() => {
				setIsLoading(false);
				enqueueSnackbar("Book edited sucessfully", {variant: "success"});
				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
				enqueueSnackbar("Edit error", {variant: "error"});
				setIsLoading(false);
			});
	}
	return (
		<div className="p-4 -mt-10">
			<BackButton />
			<h1 className="text-3xl my-4">Edit Book</h1>
			{isLoading ? <Spinner /> : ""}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Title</label>
					<input
						className="border-2 border-gray-500 px-4 py-2 w-full"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}></input>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Author</label>
					<input
						className="border-2 border-gray-500 px-4 py-2 w-full"
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}></input>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-gray-500">Publish Year</label>
					<input
						className="border-2 border-gray-500 px-4 py-2 w-full"
						type="text"
						value={publishYear}
						onChange={(e) => setPublishYear(e.target.value)}></input>
				</div>
				<button onClick={handleEditBook} className="p-2 bg-sky-300 m-8">
					Edit
				</button>
			</div>
		</div>
	);
}

export default EditBook;
