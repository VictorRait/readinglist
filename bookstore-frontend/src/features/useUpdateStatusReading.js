import {useMutation, useQueryClient} from "@tanstack/react-query";
import {enqueueSnackbar} from "notistack";
import {useState} from "react";
import {updateStatusReading as updateStatusReadingApi} from "../services/apiBooks";

export function useupdateStatusReading() {
	const queryClient = useQueryClient();
	const {mutate: updateStatusReading, isLoading} = useMutation({
		mutationFn: ({id, status, user}) => {
			return updateStatusReadingApi({id, status, user});
		},

		onSuccess: (data) => {
			enqueueSnackbar("Book updated sucessfully", {variant: "success"});
			queryClient.invalidateQueries(["booksByUser"]);
		},
		onError: (error) => {
			enqueueSnackbar("Book update failed", {variant: "error"});
		},
	});

	return {updateStatusReading, isUpdating: isLoading};
}
