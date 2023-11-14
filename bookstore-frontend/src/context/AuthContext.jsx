// AuthContext.js
import {createContext, useContext, useState} from "react";

const AuthContext = createContext();

export function AuthProvider({children}) {
	const [user, setUser] = useState(""); // Initially, the user is not authenticated

	return (
		<AuthContext.Provider value={{user, setUser}}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
