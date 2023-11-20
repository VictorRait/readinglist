import axios from "axios";
import {HOST_URL} from "../config";

export async function getBooksbyUser({user}) {
	try {
		const token = localStorage.getItem("Authorization");

		if (!token) {
			throw new Error("Authentication token not found.");
		}

		const resUser = await axios.get(`${HOST_URL}auth/profile`, {
			headers: {
				Authorization: `${token}`,
			},
		});

		const books = resUser.data.books;
		const booksUser = resUser.data.booksOwned;

		return {books, booksUser};
	} catch (err) {
		throw new Error(err.message);
	}
}

export async function getBooks() {
	try {
		const res = await axios.get(`${HOST_URL}books`);
		const data = res.data.data;

		return data;
	} catch (err) {
		throw new Error(err.message);
	}
}
export async function updateStatusReading({id, status, user}) {
	try {
		const userId = user._id;
		const res = await axios.put(`${HOST_URL}books/${id}/${status}/${userId}`);
		const message = res.data.message;

		return message;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
}
