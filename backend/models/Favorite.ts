import { Schema, model, type Document, type Types } from "mongoose";

export interface FavoriteDocument extends Document {
  user: Types.ObjectId;
  products: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const favoriteSchema = new Schema<FavoriteDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
      index: true,
    },

    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

favoriteSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    if (ret._id) {
      ret.id = String(ret._id);
    }
    delete ret._id;
    return ret;
  },
});

export default model<FavoriteDocument>("Favorite", favoriteSchema);
