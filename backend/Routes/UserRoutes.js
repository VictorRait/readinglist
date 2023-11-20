import express from "express";
import {User} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import the 'jsonwebtoken' library
import {Owner} from "../models/OwnerModel.js";
import {Book} from "../models/bookModel.js";
const router = express.Router();

// Middleware to verify and decode the JWT token
function authenticateToken(req, res, next) {
	console.log("Request headers:", req.headers);
	const token = req.headers["authorization"]?.split(" ")[1]; // Assuming the token is passed in the "Authorization" header

	if (!token) {
		return res.status(401).json({error: "Unauthorized"});
	}

	const jwtSecret = "yourSecretKey";
	jwt.verify(token, jwtSecret, (err, user) => {
		if (err) {
			return res.status(403).json({error: err.message});
		}
		req.user = user; // The decoded user data is now available in the request object
		next();
	});
}

// Protected route that requires authentication

router.get("/profile", authenticateToken, async (req, res) => {
	try {
		const userId = req.user.userId;

		// Find the "owners" document that matches the user's ID
		const owner = await Owner.findOne({user: userId});

		if (!owner) {
			return res.status(404).json({error: "Owner not found"});
		}

		const bookIds = owner.books.map((book) => book._id); // Assuming 'books' contains objects with '_id' field

		// Find all books from the Book collection using the bookIds array
		const books = await Book.find({_id: {$in: bookIds}});

		res.json({user: req.user, books, booksOwned: owner.books});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: "Internal server error"});
	}
});
router.post("/register", async (req, res) => {
	try {
		console.log(req.body);
		if (!req.body.userName || !req.body.email || !req.body.password) {
			return res
				.status(400)
				.send({message: "Username, Email, and Password required"});
		}

		// Hash the password
		const hashedPassword = await bcrypt.hash(req.body.password, 10);

		// Create a new user
		const user = new User({
			userName: req.body.userName,
			email: req.body.email,
			password: hashedPassword,
		});
		console.log(user);
		// Create book documents or retrieve existing books

		// Save the user to the database
		await user.save();

		const owner = new Owner({
			user: user._id,
			books: [],
		});

		await owner.save();
		res.status(201).json({message: "User registered successfully"});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: "Internal server error"});
	}
});

// Function to create a JWT token
function createTokenForUser(user) {
	// This is a simple example; you may want to customize your token generation
	const jwtSecret = "yourSecretKey"; // Keep this secret and do not hardcode it
	const token = jwt.sign({userId: user._id, email: user.email}, jwtSecret, {
		expiresIn: "1h", // Token expiration time (e.g., 1 hour)
	});
	return token;
}
router.post("/login", async (req, res) => {
	try {
		const {email, password} = req.body;

		const user = await User.findOne({email});
		const userName = user.userName;
		if (!user) {
			return res.status(401).json({error: "Invalid credentials"});
		}

		const passwordMatch = await bcrypt.compare(password, user.password);

		if (!passwordMatch) {
			return res.status(401).json({error: "Invalid credentials"});
		}

		// Generate a JSON Web Token (JWT) to authenticate the user
		// You can use a library like jsonwebtoken to create the token
		const jwtToken = createTokenForUser(user);

		res.json({token: jwtToken, user});
	} catch (error) {
		console.error(error);
		res.status(500).json({error: "Internal server error"});
	}
});
export default router;
