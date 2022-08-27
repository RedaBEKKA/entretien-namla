import mongoose from "mongoose";

const globalSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "please enter name"],
    },

    email: {
      type: String,
      required: [true, "please enter email"],
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Supplier", globalSchema);
