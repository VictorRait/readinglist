import {useQuery} from "@tanstack/react-query";
import {getBooks} from "../services/apiBooks";

export function useBooks() {
	const {data: books, isLoading} = useQuery({
		queryFn: getBooks,
		queryKey: ["books"],
	});

	return {books, isLoading};
}
