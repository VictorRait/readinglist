import {useState} from "react";
import {useLogin} from "../features/useLogin";
import {useAuth} from "../context/AuthContext";

function Login() {
	const {login, isLoading} = useLogin();
	const {setUser} = useAuth();
	// Define state to store user input
	const [formData, setFormData] = useState({
		email: "", // Change "username" to "email" for consistency with your input fields
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(formData);
			const userData = login(
				{data: formData},
				{
					onSuccess: (data) => {
						setUser(data.user);
					},
				}
			);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-blend-darken bg-[#00000093] bg-[url('/asal-lotfi-8ePZbdxnpi0-unsplash.jpg')]">
			<div className="w-[50vw] h-[50vh] bg-amber-100 rounded-lg flex flex-col justify-center items-center">
				<h3 className="font-semibold uppercase text-xl">Log in</h3>
				<form
					className="flex flex-col justify-between gap-4 bg-slate-200 p-10"
					onSubmit={handleSubmit} // Use onSubmit to trigger the handleSubmit function on form submission
				>
					<div className="flex flex-col">
						<label> Email:</label>
						<input
							type="email"
							name="email"
							value={formData.email}
							onChange={(e) =>
								setFormData({...formData, email: e.target.value})
							} // Update the "email" property
						/>
					</div>
					<div className="flex flex-col">
						<label> Password:</label>
						<input
							type="password"
							name="password"
							value={formData.password}
							onChange={(e) =>
								setFormData({...formData, password: e.target.value})
							} // Update the "password" property
						/>
					</div>
					<button type="submit">Send</button>{" "}
					{/* Use type="submit" for the button */}
				</form>
			</div>
		</div>
	);
}

export default Login;
