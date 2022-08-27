import mongoose from "mongoose";

const globalSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "please enter title"],
    },

    description: {
      type: String,
      required: [true, "please enter title"],
    },
  },

  {
    timestamps: true,
  }
);

export default mongoose.model("Order", globalSchema);
