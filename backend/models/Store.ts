import { Schema, model, type Document, type Types } from "mongoose";

export interface StoreDocument extends Document {
  owner: Types.ObjectId;
  title: string;
  description: string;
  phone: string;
  status: "pending" | "approved" | "declined";
  createdAt: Date;
  updatedAt: Date;
}

const storeSchema = new Schema<StoreDocument>(
  {
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "declined"],
      default: "pending",
    },
  },
  { timestamps: true }
);

storeSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    if (ret._id) {
      ret.id = String(ret._id);
    }
    delete ret._id;
    return ret;
  },
});

export default model<StoreDocument>("Store", storeSchema);
