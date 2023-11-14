import {Outlet} from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
function AppLayout() {
	return (
		<div className="text-slate-200 grid grid-cols-[100px,1fr] w-screen h-screen bg-[url('/asal-lotfi-8ePZbdxnpi0-unsplash.jpg')] bg-cover bg-center bg-blend-darken bg-[#00000093]">
			<Sidebar />
			<div className=""></div>
			<div className="w-[calc(100% - 200px)] ml-2 overflow-x-hidden">
				<Header />
				<div className="h-[2px] w-full border-b-2 border-amber-400 mb-12"></div>
				<main>
					<Outlet />
				</main>
			</div>
		</div>
	);
}

export default AppLayout;
