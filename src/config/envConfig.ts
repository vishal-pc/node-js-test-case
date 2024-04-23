import * as dotenv from "dotenv";
dotenv.config();

export interface EnvConfig {
  Port: number;
  Mongo_Db_Name: string;
  Mongo_Db_Pass: string;
  Express_Secret: string;
  Jwt_Secret: string;
  Jwt_Expiry_Hours: string;
}

export const envConfig: EnvConfig = {
  Port: process.env.Port ? parseInt(process.env.Port, 10) : 5000,
  Mongo_Db_Name: process.env.Mongo_DB_Name || "localhost",
  Mongo_Db_Pass: process.env.Mongo_DB_Pass || "localhost",
  Express_Secret: process.env.Express_Secret || "defaultSecret",
  Jwt_Secret: process.env.Jwt_Secret || "defaultSecret",
  Jwt_Expiry_Hours: process.env.Jwt_Expiry_Hours || "default",
};
