import api from "./axiosInstance";
import { HOST_URL } from "../config";

export async function getBooksbyUser() {
	try {
		const resUser = await api.get(`/auth/profile`);

		const books = resUser.data.books;
		const booksUser = resUser.data.booksOwned;

		return { books, booksUser };
	} catch (err) {
		throw new Error(err.response?.data?.message || err.message);
	}
}

export async function getBooks() {
	try {
		const res = await api.get(`/books`);
		const data = res.data.data;

		return data;
	} catch (err) {
		throw new Error(err.message);
	}
}
export async function updateStatusReading({ id, status, user }) {
	try {
		const userId = user._id;
		const res = await api.put(`/books/${id}/${status}/${userId}`);
		const message = res.data.message;

		return message;
	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
}
