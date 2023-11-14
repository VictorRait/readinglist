import express from "express";
import mongoose from "mongoose";
import {Book} from "../models/bookModel.js";
import {Owner} from "../models/OwnerModel.js";

const router = express.Router();

// route for save a new book
router.post("/", async (request, response) => {
	try {
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			return response
				.status(400)
				.send({message: "Title, Author, Publish Year required"});
		}

		const newBook = {
			title: request.body.title,
			author: request.body.author,
			publishYear: request.body.publishYear,
			status: "reading",
		};

		// Create a new book and get the generated _id
		const createdBook = await Book.create(newBook);

		// Find the owner based on the user property
		const owner = await Owner.findOne({user: request.body.user});

		// Push the created book (with its _id) to the owner's books array
		owner.books.push(createdBook);

		// Save the owner with the updated books array
		await owner.save();

		return response.status(201).send(createdBook);
	} catch (err) {
		console.log(err.message);
		response.status(500).send({message: err.message});
	}
});
// route to get all books from database
router.get("/", async (request, response) => {
	try {
		const books = await Book.find({});
		return response.status(200).json({
			count: books.length,
			data: books,
		});
	} catch (err) {
		console.log(err.message);
		response.status(500).send({message: err.message});
	}
});
// route to get ONE books from database by ID
router.get("/:id", async (request, response) => {
	try {
		const {id} = request.params;
		const book = await Book.findById(id);
		return response.status(200).json(book);
	} catch (err) {
		console.log(err.message);
		response.status(500).send({message: err.message});
	}
});
// route update a book
router.put("/:id", async (request, response) => {
	try {
		console.log(request, response);
		if (
			!request.body.title ||
			!request.body.author ||
			!request.body.publishYear
		) {
			response
				.status(400)
				.send({message: "Title, Author, Publish Year required"});
		}

		const {id} = request.params;

		const result = await Book.findByIdAndUpdate(id, request.body);

		if (!result) {
			return response.status(404).json({message: "Book not found"});
		}

		return response.status(200).send({message: "Book updated succesfully"});
	} catch (err) {
		console.log(err.message);
		response.status(500).send({message: err.message});
	}
});
// status to reading
router.put("/:id/:status/:user", async (request, response) => {
	try {
		const {id, status, user} = request.params;
		console.log(id, status, user);

		// Convert the received id string to a MongoDB ObjectId
		const bookId = new mongoose.Types.ObjectId(id);

		const owner = await Owner.findOne({user: user});

		if (!owner) {
			return response.status(404).json({message: "Owner not found"});
		}

		if (status !== "reading") {
			// Update the book status if it's not "reading"

			const bookIndex = owner.books.findIndex((book) => {
				return book._id.equals(bookId);
			});

			if (bookIndex !== -1) {
				owner.books[bookIndex].status = status;

				await owner.save();
			}
		} else {
			// If status is "reading", add the book to the owner's list
			const result = await Book.findById(bookId);

			if (!result) {
				return response.status(404).json({message: "Book not found"});
			}
			const alreadyOwned = owner.books.some((book) => book._id.equals(bookId));

			if (!alreadyOwned) {
				owner.books.push({status: "reading", _id: result._id});
				await owner.save();
			} else {
				const bookToUpdate = owner.books.find((book) =>
					book._id.equals(bookId)
				);
				if (bookToUpdate) {
					bookToUpdate.status = "reading";
					await owner.save();
				}
			}
		}

		return response.status(200).json({message: "Book updated successfully"});
	} catch (err) {
		console.log(err.message);
		response.status(500).json({message: err.message});
	}
});
// route delete a book by id
router.delete("/:id", async (request, response) => {
	try {
		const {id} = request.params;
		const result = await Book.findByIdAndDelete(id);

		if (!result) {
			return response.status(404).json({message: "Book not found"});
		}

		return response.status(200).send({message: "Book deleted succesfully"});
	} catch (err) {
		console.log(err.message);
		response.status(500).send({message: err.message});
	}
});

// Route to update the "status" property for all books
// router.put("/update-status", async (request, response) => {
// 	try {
// 		// Define the filter to select all books
// 		const filter = {};

// 		// Define the update to add the "status" property
// 		const update = {$set: {status: "not read"}};

// 		// Use the updateMany method to add the "status" property to all documents
// 		const result = await Book.updateMany(filter, update);

// 		if (result.nModified === 0) {
// 			return response.status(404).json({message: "No books were updated"});
// 		}

// 		return response
// 			.status(200)
// 			.send({message: "Status property added to all books successfully"});
// 	} catch (err) {
// 		console.log(err.message);
// 		response.status(500).send({message: err.message});
// 	}
// });

export default router;
