import { Schema, model, type Document, type Types } from "mongoose";

export type OrderStatus = "pending" | "processing" | "shipped" | "delivered" | "canceled";

export interface OrderItem {
  product: Types.ObjectId;
  quantity: number;
  priceAtPurchase: number;
}

export interface OrderDocument extends Document {
  user: Types.ObjectId;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
}

const orderSchema = new Schema<OrderDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
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
          required: true,
          min: 1,
        },

        priceAtPurchase: {
          type: Number,
          required: true,
          min: 0,
        },
      },
    ],

    status: {
      type: String,
      enum: ["pending", "processing", "shipped", "delivered", "canceled"],
      default: "pending",
    },
  },
  { timestamps: true }
);

orderSchema.set("toJSON", {
  versionKey: false,
  transform: (_doc, ret: any) => {
    if (ret._id) {
      ret.id = String(ret._id);
    }
    delete ret._id;
    return ret;
  },
});

export default model<OrderDocument>("Order", orderSchema);
