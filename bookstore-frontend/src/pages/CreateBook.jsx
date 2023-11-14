import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import {HOST_URL} from "../config";
import {useSnackbar} from "notistack";
import {useAuth} from "../context/AuthContext";
function CreateBook() {
	const [title, setTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [publishYear, setPublishYear] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {enqueueSnackbar} = useSnackbar();
	const {user} = useAuth();
	const bookData = {
		title,
		author,
		publishYear,
		user,
	};
	function handleCreateBook() {
		setIsLoading(true);
		axios
			.post(`${HOST_URL}books`, bookData)
			.then(() => {
				setIsLoading(false);
				enqueueSnackbar("Book created sucessfully", {variant: "success"});
				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
				enqueueSnackbar("Error creating book", {variant: "error"});
				setIsLoading(false);
			});
	}
	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Create Book</h1>
			{isLoading ? <Spinner /> : ""}
			<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
				<div className="my-4">
					<label className="text-xl mr-4 text-slate-200">Title</label>
					<input
						className="border-2 border-slate-200 px-4 py-2 w-full text-slate-800"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}></input>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-slate-200">Author</label>
					<input
						className="border-2 border-slate-200 px-4 py-2 w-full text-slate-800"
						type="text"
						value={author}
						onChange={(e) => setAuthor(e.target.value)}></input>
				</div>
				<div className="my-4">
					<label className="text-xl mr-4 text-slate-200">Publish Year</label>
					<input
						className="border-2 border-slate-200 px-4 py-2 w-full text-slate-800"
						type="text"
						value={publishYear}
						onChange={(e) => setPublishYear(e.target.value)}></input>
				</div>
				<button className="p-2 bg-sky-300 m-8" onClick={handleCreateBook}>
					Create
				</button>
			</div>
		</div>
	);
}

export default CreateBook;
