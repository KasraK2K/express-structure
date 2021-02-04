import mongoose from "mongoose";

export const megamind = mongoose.createConnection(
	"mongodb://localhost:27017/megamind",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);
