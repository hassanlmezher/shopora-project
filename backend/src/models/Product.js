const { Schema, model, Types } = require('mongoose');

const productSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    currency: {
      type: String,
      default: 'USD',
      uppercase: true,
      minlength: 3,
      maxlength: 3
    },
    categories: [{ type: String, trim: true }],
    images: [{ type: String }],
    stock: { type: Number, default: 0, min: 0 },
    sku: { type: String, unique: true, sparse: true, trim: true },
    store: { type: Types.ObjectId, ref: 'Store', required: true },
    isActive: { type: Boolean, default: true },
    attributes: { type: Map, of: String }
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
