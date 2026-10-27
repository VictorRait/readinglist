import axios from "axios";
import { HOST_URL } from "../config";

const api = axios.create({
	baseURL: HOST_URL,
});

api.interceptors.request.use((config) => {
	const authHeader = localStorage.getItem("Authorization");
	if (authHeader) {
		config.headers.Authorization = authHeader.startsWith("Bearer ")
			? authHeader
			: `Bearer ${authHeader}`;
	}
	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401 || error.response?.status === 403) {
			console.warn("Session expired. Logging out...");

			localStorage.removeItem("Authorization");
			localStorage.removeItem("user");

			window.location.href = "/auth";
		}

		return Promise.reject(error);
	},
);

export default api;
