import {useMutation, useQueryClient} from "@tanstack/react-query";

import {register as registerApi} from "../services/apiAuth";

export function useRegister() {
	// const queryClient = useQueryClient();

	const {mutate: register, isLoading} = useMutation({
		mutationFn: ({data}) => {
			return registerApi({data});
		},
		onSuccess: (data) => {
			enqueueSnackbar("Registered sucessfully", {variant: "success"});
		},
		onError: (err) => {
			console.log("ERROR", err.message);
		},
	});
	return {register, isLoading};
}
