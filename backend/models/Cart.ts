import { Schema, model, type Document, type Types } from "mongoose";

export interface CartItem {
  product: Types.ObjectId;
  quantity: number;
}

export interface CartDocument extends Document {
  user: Types.ObjectId;
  items: CartItem[];
  createdAt: Date;
  updatedAt: Date;
}

const cartSchema = new Schema<CartDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
      unique: true,
    },

    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
      },
    ],
  },
  { timestamps: true }
);

cartSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    if (ret._id) {
      ret.id = String(ret._id);
    }
    delete ret._id;
    return ret;
  },
});

export default model<CartDocument>("Cart", cartSchema);
