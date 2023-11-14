import {useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {useState} from "react";
import {AiOutlineClose} from "react-icons/ai";
import {BiUserCircle} from "react-icons/bi";
import {PiBookOpenTextLight} from "react-icons/pi";
import {useAuth} from "../context/AuthContext";
import {useupdateStatusReading} from "../features/useUpdateStatusReading";
function Modal({book, onClose, type = "explore"}) {
	const {user} = useAuth();
	const {updateStatusReading, isUpdating} = useupdateStatusReading();
	const [confirmRemove, setConfirmRemove] = useState(false);
	function handleClick(status) {
		updateStatusReading({id: book._id, status, user});
		console.log("click");
		onClose();
	}

	return (
		<div
			onClick={onClose}
			className="fixed bg-black bg-opacity-60 top-0 text-slate-800 left-0 right-0 bottom-0 z-50 flex justify-center items-center">
			{type === "explore" && (
				<>
					<div
						onClick={(e) => e.stopPropagation()}
						className="w-[600px] max-w-full h-[400px] bg-white rounded-xl p-4 flex flex-col relative">
						<AiOutlineClose
							onClick={onClose}
							className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
						/>
						<h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
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
						<p>Synopsis:</p>
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
							placeat fugit veritatis perspiciatis earum repudiandae ratione
							voluptate, similique voluptates, tenetur cupiditate quo? Veniam
							dolores labore facere facilis expedita unde vel!
						</p>
						<button
							disabled={isUpdating}
							onClick={() => handleClick("reading")}
							className="px-4 py-2 bg-green-400 mt-4 w-[25rem] ml-auto mr-auto">
							Add to reading list
						</button>
					</div>
				</>
			)}
			{type === "home" && (
				<>
					<div
						onClick={(e) => e.stopPropagation()}
						className="w-fit max-w-full h-fit bg-white rounded-xl p-4 flex flex-col relative">
						<AiOutlineClose
							onClick={onClose}
							className="absolute right-6 top-6 text-3xl text-red-600 cursor-pointer"
						/>
						{confirmRemove ? (
							<div className="flex flex-col gap-5  mt-12 pt-4 px-3">
								<h2 className="text-xl font-semibold">
									Confirm remove this book from reading list?
								</h2>
								<button
									onClick={() => handleClick("remove")}
									className="bg-red-400 p-4 text-white">
									Remove
								</button>
								`
							</div>
						) : (
							<>
								{" "}
								<h2 className="w-fit px-4 py-1 bg-red-300 rounded-lg">
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
								<div className="flex gap-x-5 mt-4">
									<button
										onClick={() => handleClick("finished")}
										className="bg-amber-300 hover:bg-green-400 rounded-lg px-3 py-1.5">
										Finished
									</button>
									<button
										onClick={() => handleClick("stopped")}
										className="bg-gray-300 hover:bg-gray-700 hover:text-slate-300 rounded-lg px-3 py-1.5">
										Stop
									</button>
									<button
										onClick={() => setConfirmRemove(true)}
										className="bg-red-400 hover:bg-red-500  rounded-lg px-3 py-1.5 text-white">
										Remove from list
									</button>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	);
}

export default Modal;
