import {Link, useLocation} from "react-router-dom";
import {AiFillHome} from "react-icons/ai";
import {MdOutlineExplore} from "react-icons/md";
import {useState} from "react";
import {useEffect} from "react";
function Sidebar() {
	const [activePage, setActivePage] = useState();
	const location = useLocation();
	useEffect(
		function () {
			setActivePage(location.pathname);
		},
		[location, setActivePage]
	);
	return (
		<div
			className=" fixed flex flex-col justify-start w-[110px] text-slate-700 h-full bg-amber-200 
		items-left px-4 py-8 ">
			<div>
				<img className="rounded-full " src="/book logo blue.png"></img>
			</div>

			<div className="mt-10 ">
				<Link
					className="cursor-pointer"
					to="/
			">
					<div
						className={`flex gap-x-1 items-center justify-start ${
							activePage === "/" ? "text-sky-500" : ""
						}`}>
						<AiFillHome />
						<span className=""> Home</span>{" "}
					</div>
				</Link>

				<Link className="cursor-pointer" to="/books/explore">
					<div
						className={`flex gap-x-1 items-center justify-start ${
							activePage === "/books/explore" ? "text-sky-500" : ""
						}`}>
						<MdOutlineExplore />
						<span className=""> Explore</span>{" "}
					</div>
				</Link>
			</div>
			<div className="text-sm mt-auto">&copy;Copyright</div>
		</div>
	);
}

export default Sidebar;
