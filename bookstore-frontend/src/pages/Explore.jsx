import BooksTable from "../components/home/BooksTable";
import Spinner from "../components/Spinner";
import {useBooks} from "../features/useBooks";

function Explore() {
	const {books, isLoading} = useBooks();

	return (
		<div className="px-5">
			{!isLoading ? (
				<>
					{" "}
					<div className="w-[100vw] pb-5">
						<h3 className="text-xl my-2">Most Popular</h3>

						<BooksTable books={books} />
					</div>
					<div className="h-[2px] w-full border-b-2 border-amber-400 my-12"></div>
					<div className="w-[100vw] pb-5">
						<h3 className="text-xl my-2">Latest Releases</h3>
						<BooksTable books={books} />
					</div>
					<div className="h-[2px] w-full border-b-2 border-amber-400 my-12"></div>
				</>
			) : (
				<div className=" flex justify-center items-center">
					<Spinner />
				</div>
			)}
		</div>
	);
}

export default Explore;
