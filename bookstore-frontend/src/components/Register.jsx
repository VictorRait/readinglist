import {useState} from "react";
import {useLogin} from "../features/useLogin";
import {useAuth} from "../context/AuthContext";
import {useNavigate, Link} from "react-router-dom";
import {useRegister} from "../features/useRegister";
import {login} from "../services/apiAuth";

function Register() {
	const navigate = useNavigate();
	const {register, isLoading} = useRegister();
	const {setUser} = useAuth();
	const [error, setError] = useState();
	// Define state to store user input
	const [formData, setFormData] = useState({
		username: "",
		email: "", // Change "username" to "email" for consistency with your input fields
		password: "",
	});

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log(formData);
			register(
				{data: formData},
				{
					onSuccess: (data) => {
						navigate("/auth", {replace: true});
					},
					onError: () => {
						setError(error.message);
					},
				}
			);
		} catch (error) {
			console.error("Error:", error);
			setError(error.message);
		}
	};

	return (
		<div className="h-screen w-screen flex justify-center items-center bg-cover bg-center bg-blend-darken bg-[#00000093] bg-[url('/asal-lotfi-8ePZbdxnpi0-unsplash.jpg')]">
			<div className="w-[40rem] h-[27rem] bg-amber-100 rounded-lg flex flex-col justify-center items-center py-5  ">
				<h3 className="font-semibold uppercase text-xl">Sign up</h3>
				<form
					className="flex flex-col justify-between gap-4 bg-slate-200 p-10 w-[20rem] my-4"
					onSubmit={handleSubmit} // Use onSubmit to trigger the handleSubmit function on form submission
				>
					<div className="flex flex-col">
						<label>Username</label>
						<input
							type="text"
							name="username"
							value={formData.username}
							onChange={(e) =>
								setFormData({...formData, username: e.target.value})
							} // Update the "email" property
						/>
					</div>
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
					<button
						className="border border-slate-400 p-1 rounded-lg bg-slate-300 hover:bg-slate-400"
						type="submit">
						{isLoading ? "Loading..." : "Register"}
					</button>{" "}
					{error ? <p>error</p> : ""}
					{/* Use type="submit" for the button */}
				</form>
				<p>
					{"Already have an account? "}
					<Link to="/auth" className="text-sky-400 hover:underline">
						Sign in
					</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
