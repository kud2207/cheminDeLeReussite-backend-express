import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL as string ;

const mongoConnect = async (): Promise<void> => {
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connecté avec succès");
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Erreur de connexion MongoDB:", error.message);
      console.error("Nom de l'erreur:", error.name);
    } else {
      console.error("Erreur inconnue lors de la connexion MongoDB:", error);
    }
  }
};
export default mongoConnect; 