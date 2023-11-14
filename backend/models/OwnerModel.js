import mongoose from "mongoose";

const OwnerSchema = mongoose.Schema({
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	books: [
		{
			book: {
				type: mongoose.Schema.Types.ObjectId,
				ref: "Book",
			},
			status: {
				type: String, // Assuming your status is a string, you can adjust the type accordingly
				default: "unread", // Default status if not provided
			},
		},
	],
});

export const Owner = mongoose.model("Owner", OwnerSchema);
