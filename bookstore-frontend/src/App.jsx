import {BrowserRouter, Route, Routes} from "react-router-dom";
import CreateBook from "./pages/CreateBook";
import DeleteBook from "./pages/DeleteBook";
import EditBook from "./pages/EditBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";
import {SnackbarProvider} from "notistack";
import AppLayout from "./components/AppLayout";
import Explore from "./pages/Explore";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import Login from "./pages/Login";
import {AuthProvider} from "./context/AuthContext";

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// staleTime: 60 * 1000,
			staleTime: 0,
		},
	},
});
function App() {
	return (
		<AuthProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<BrowserRouter>
					<SnackbarProvider>
						<Routes>
							<Route element={<AppLayout />}>
								<Route index path="/" element={<Home />} />
								<Route path="/books/create" element={<CreateBook />} />
								<Route path="/books/explore" element={<Explore />} />
								<Route path="/books/details/:id" element={<ShowBook />} />
								<Route path="/books/edit/:id" element={<EditBook />} />
								<Route path="/books/delete/:id" element={<DeleteBook />} />
							</Route>
							<Route path="/auth" element={<Login />} />
						</Routes>
					</SnackbarProvider>
				</BrowserRouter>
			</QueryClientProvider>
		</AuthProvider>
	);
}

export default App;
