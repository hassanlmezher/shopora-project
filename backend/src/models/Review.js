const { Schema, model, Types } = require('mongoose');

const reviewSchema = new Schema(
  {
    product: { type: Types.ObjectId, ref: 'Product', required: true },
    user: { type: Types.ObjectId, ref: 'User', required: true },
    order: { type: Types.ObjectId, ref: 'Order' },
    rating: { type: Number, required: true, min: 1, max: 5 },
    title: { type: String, trim: true },
    comment: { type: String, trim: true, maxlength: 2000 },
    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

reviewSchema.index({ user: 1, product: 1 }, { unique: true });

module.exports = model('Review', reviewSchema);
