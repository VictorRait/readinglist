import {useEffect} from "react";
import {useQuery} from "@tanstack/react-query";
import {getBooksbyUser} from "../services/apiBooks";

export function useBookByUser() {
	const {data, isLoading, refetch} = useQuery({
		queryFn: (userId) => getBooksbyUser(userId),
		queryKey: ["booksByUser"],
	});

	const {books, booksUser} = data || {}; // Destructuring 'data' into 'books' and 'booksUser'

	return {getBooks: refetch, isLoading, books, booksUser}; // Return 'books' and 'booksUser'
}
