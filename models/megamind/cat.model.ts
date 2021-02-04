import mongoose from "mongoose";
import { megamind as database } from "../../databases/megamind.database";

const CatSchema = new mongoose.Schema({ name: String });

export default database.model("cat", CatSchema);
