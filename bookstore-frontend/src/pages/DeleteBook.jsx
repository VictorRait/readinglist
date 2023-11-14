import axios from "axios";
import {useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import BackButton from "../components/BackButton";
import {HOST_URL} from "../config";
import {useSnackbar} from "notistack";
import {HiTrash} from "react-icons/hi";
function DeleteBook() {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const {id} = useParams();
	const {enqueueSnackbar} = useSnackbar();
	function handleDelete() {
		setIsLoading(true);
		axios
			.delete(`${HOST_URL}${id}`)
			.then(() => {
				enqueueSnackbar("Book deleted sucessfully", {variant: "success"});
				setIsLoading(false);
				navigate("/");
			})
			.catch((err) => {
				console.log(err.message);
				enqueueSnackbar("Delete error", {variant: "error"});
				setIsLoading(false);
			});
	}
	return (
		<div className="p-4">
			<BackButton />
			<h1 className="text-3xl my-4">Delete Book</h1>
			<div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
				<h3 className="text-2xl">This book will be deleted, are you sure?</h3>
				<button
					onClick={handleDelete}
					className="p-4 text-white bg-red-600 m-8 w-full flex items-center justify-center">
					<span className="mr-2">Delete Book</span>{" "}
					<HiTrash className="text-xl" />
				</button>
			</div>
		</div>
	);
}

export default DeleteBook;
