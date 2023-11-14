import {PiBookOpenTextLight} from "react-icons/pi";
import {BiUserCircle, BiShow} from "react-icons/bi";
import {Link} from "react-router-dom";
import {BsInfoCircle} from "react-icons/bs";
import {AiOutlineEdit} from "react-icons/ai";
import {MdOutlineDelete} from "react-icons/md";
import {useState} from "react";
import Modal from "../Modal";

function BookSingleCard({book}) {
	const [showModal, setShowModal] = useState(false);
	return (
		<div className="border-2 border-gray-500 rounded-lg px-4 py-2 m-4 relative hover:shadow-xl">
			{showModal && <Modal book={book} onClose={() => setShowModal(false)} />}
			<h2 className="absolute top-1 right-2 px-4 py-1 bg-red-300 rounded-lg">
				{book.publishYear}
			</h2>
			<h4 className="my-2 text-gray-500">{book._id}</h4>
			<div className="flex justify-start items-center gap-x-2">
				<PiBookOpenTextLight className="text-red-300 text-2xl" />
				<h2 className="my-1">{book.title}</h2>
			</div>
			<div className="flex justify-start items-center gap-x-2">
				<BiUserCircle className="text-red-300 text-2xl" />
				<h2 className="my-1">{book.author}</h2>
			</div>
			<div className="flex justify-start items-center gap-x-2">
				<BiUserCircle className="text-red-300 text-2xl" />
				<h2 className="my-1">{book.createdAt}</h2>
			</div>
			<div className="flex justify-between gap-x-2 mt-4 p-4 items-center">
				<button onClick={() => setShowModal(true)}>
					<BiShow className="text-2xl text-blue-600 " />
				</button>

				<Link to={`/books/details/${book._id}`}>
					<BsInfoCircle className="text-2xl text-green-800" />
				</Link>
				<Link to={`/books/edit/${book._id}`}>
					<AiOutlineEdit className="text-2xl text-yellow-600" />
				</Link>
				<Link to={`/books/delete/${book._id}`}>
					<MdOutlineDelete className="text-2xl text-red-600" />
				</Link>
			</div>
		</div>
	);
}

export default BookSingleCard;
