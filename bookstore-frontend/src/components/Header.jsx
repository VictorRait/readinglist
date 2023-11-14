import {useAuth} from "../context/AuthContext";
import {IoIosLogOut} from "react-icons/io";
import {useLogout} from "../features/useLogout";

function Header() {
	const {user} = useAuth();
	const {logout} = useLogout();
	function handleClick() {
		logout();
	}
	return (
		<div className="flex justify-between items-center p-5 ">
			<div className="flex justify-between items-center gap-x-5">
				<div className="flex gap-2">Welcome, {user.userName}</div>
			</div>
			<div>
				<button
					onClick={handleClick}
					className="text-xl text-sky-400 hover:text-sky-600">
					<IoIosLogOut />
				</button>
			</div>
		</div>
	);
}

export default Header;
