import { Schema, model, type Document, type Types } from "mongoose";

export interface ReviewDocument extends Document {
  user: Types.ObjectId;
  product: Types.ObjectId;
  rating: number;
  comment: string;
  createdAt: Date;
  updatedAt: Date;
}

const reviewSchema = new Schema<ReviewDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
      index: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
      default: "",
    },
  },
  { timestamps: true }
);

reviewSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    if (ret._id) {
      ret.id = String(ret._id);
    }
    delete ret._id;
    return ret;
  },
});

export default model<ReviewDocument>("Review", reviewSchema);
