import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      process.env.DATABASE_URL,
      { useNewUrlParser: true },
      function (err) {
        if (err) throw err;
        console.log("Successfully connected");
      }
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export { connectDb };
