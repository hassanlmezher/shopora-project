const { Schema, model, Types } = require('mongoose');

const favoriteSchema = new Schema(
  {
    user: { type: Types.ObjectId, ref: 'User', required: true },
    product: { type: Types.ObjectId, ref: 'Product' },
    store: { type: Types.ObjectId, ref: 'Store' },
    taggedAt: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

favoriteSchema.pre('validate', function ensureTargetExists(next) {
  if (!this.product && !this.store) {
    return next(new Error('Favorite must reference either a product or a store.'));
  }
  next();
});

favoriteSchema.index({ user: 1, product: 1 }, { unique: true, sparse: true });
favoriteSchema.index({ user: 1, store: 1 }, { unique: true, sparse: true });

module.exports = model('Favorite', favoriteSchema);
