import axios from "axios";
import {HOST_URL} from "../config";

// Create an auth object to store the user's authentication token
const auth = {
	token: null,
	user: "",
};

export async function login({data}) {
	try {
		const {email, password} = data;
		const res = await axios.post(`${HOST_URL}auth/login`, {email, password});
		auth.token = res.data.token;
		auth.user = res.data.user;
		axios.defaults.headers.common["Authorization"] = `Bearer ${res.data.token}`;
		console.log(auth);
		return auth;
	} catch (err) {
		throw new Error(err.message);
	}
}
// Logout function
export function logout() {
	// Clear the token and user information
	auth.token = null;
	auth.user = "";

	// Remove the Authorization header
	delete axios.defaults.headers.common["Authorization"];

	console.log("User logged out");
}
// Export the auth object so it can be used in other parts of your application
export {auth};
