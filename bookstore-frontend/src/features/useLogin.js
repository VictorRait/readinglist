import {useMutation, useQueryClient} from "@tanstack/react-query";

import {useNavigate} from "react-router-dom";

import {login as loginApi} from "../services/apiAuth";

export function useLogin() {
	// const queryClient = useQueryClient();
	const navigate = useNavigate();

	const {mutate: login, isLoading} = useMutation({
		mutationFn: ({data}) => {
			return loginApi({data});
		},
		onSuccess: (data) => {
			localStorage.setItem("Authorization", `Bearer ${data.token}`);
			console.log(data);
			// queryClient.setQueryData(["user"], data.user);
			navigate("/", {replace: true});
		},
		onError: (err) => {
			console.log("ERROR", err.message);
		},
	});
	return {login, isLoading};
}
