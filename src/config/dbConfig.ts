import mongoose from "mongoose";
import { envConfig } from "../config/envConfig";

mongoose
  .connect(
    `mongodb+srv://${envConfig.Mongo_Db_Name}:${envConfig.Mongo_Db_Pass}@chat.rylxpqx.mongodb.net/?retryWrites=true&w=majority&appName=Chat`
  )
  .then(() => console.log("Database Connected...👍️"))
  .catch((err) => console.error("Database not connected...🥱", err));
