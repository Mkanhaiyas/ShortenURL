import mongoose from "mongoose";

const dbConnect = async () => {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("Database Connected Successfully"));
  } catch (error) {
    console.log(error);
  }
};

export default dbConnect;
