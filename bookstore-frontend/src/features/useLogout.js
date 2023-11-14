import {useMutation, useQueryClient} from "@tanstack/react-query";

import {useNavigate} from "react-router-dom";
import {useAuth} from "../context/AuthContext";

import {logout as logoutApi} from "../services/apiAuth";

export function useLogout() {
	const {user, setUser} = useAuth();
	// const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {mutate: logout, isLoading} = useMutation({
		mutationFn: logoutApi,
		onSuccess: (data) => {
			localStorage.removeItem("Authorization");
			setUser(null);
			// queryClient.setQueryData(["user"], data.user);
			navigate("/auth", {replace: true});
		},
		onError: (err) => {
			console.log("ERROR", err.message);
		},
	});
	return {logout, isLoading};
}
