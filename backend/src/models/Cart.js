const { Schema, model, Types } = require('mongoose');

const cartItemSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, default: 1, min: 1 },
    price: { type: Number, min: 0 },
    addedAt: { type: Date, default: Date.now }
  },
  { _id: false }
);

const cartSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true, unique: true },
    items: { type: [cartItemSchema], default: [] },
    status: {
      type: String,
      enum: ['active', 'converted', 'abandoned'],
      default: 'active'
    }
  },
  { timestamps: true }
);

cartSchema.index({ user: 1 });

module.exports = model('Cart', cartSchema);
