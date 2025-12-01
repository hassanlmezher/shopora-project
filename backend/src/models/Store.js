const { Schema, model, Types } = require('mongoose');

const addressSchema = new Schema(
  {
    line1: { type: String, trim: true },
    line2: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true }
  },
  { _id: false }
);

const storeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    owner: { type: Types.ObjectId, ref: 'User', required: true },
    description: { type: String, trim: true },
    approved: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'suspended'],
      default: 'pending'
    },
    approvedAt: { type: Date },
    contactEmail: { type: String, trim: true },
    phone: { type: String, trim: true },
    address: addressSchema,
    categories: [{ type: String, trim: true }],
    logo: { type: String, trim: true }
  },
  { timestamps: true }
);

storeSchema.pre('save', function setApprovalMetadata(next) {
  if (this.isModified('approved')) {
    this.status = this.approved ? 'approved' : this.status;
    if (this.approved && !this.approvedAt) {
      this.approvedAt = new Date();
    }
  }
  next();
});

module.exports = model('Store', storeSchema);
