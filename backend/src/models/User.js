const { Schema, model, Types } = require('mongoose');

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, trim: true },
    role: {
      type: String,
      enum: ['customer', 'admin', 'seller'],
      default: 'customer'
    },
    stores: [{ type: Types.ObjectId, ref: 'Store' }],
    cart: { type: Types.ObjectId, ref: 'Cart' },
    isActive: { type: Boolean, default: true },
    lastLoginAt: { type: Date }
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });

module.exports = model('User', userSchema);
