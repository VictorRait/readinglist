import express from "express";
import {PORT, mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./Routes/BookRoutes.js";
import userRouter from "./Routes/UserRoutes.js";
import cors from "cors";
const app = express();

// middleware for parsing request body
app.use(express.json());

app.get("/", (request, response) => {
	console.log(request);
	return response.status(432).send("welcome");
});
//  middleware for cors
// 1.allow all origins with default of cors(*)
app.use(cors());
// 2. allow custom origins
// app.use(
// 	cors({
// 		origin: "http://localhost:3000",
// 		methods: ["GET", "POST", "PUT", "DELETE"],
// 		allowedHeaders: ["Content-Type"],
// 	})
// );
app.use("/books", booksRouter);
app.use("/auth", userRouter);

mongoose
	.connect(mongoDBURL)
	.then(() => {
		console.log("App connected to database");
		app.listen(PORT, () => {
			console.log(`App is listening to ${PORT}`);
		});
	})
	.catch((error) => {
		console.log(error);
	});
