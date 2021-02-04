import mongoose from "mongoose";

export const megamind = mongoose.createConnection(
	"mongodb://localhost:27017/megamind",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

// Using MongoDB with Mongoose — Populate Virtuals

// https://medium.com/dev-genius/using-mongodb-with-mongoose-populate-virtuals-91710f066de7

// https://thewebdev.info/2020/09/26/using-mongodb-with-mongoose%e2%80%8a-%e2%80%8apopulate-virtuals/
