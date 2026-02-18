import mongoose, { Schema, Document } from "mongoose";

export interface INote extends Document {
  title: string;
  content: string;
}

const NoteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model<INote>("Note", NoteSchema);
