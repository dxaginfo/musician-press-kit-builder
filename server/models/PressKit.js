const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PressKitSchema = new Schema({
  user_id: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  title: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  template_id: {
    type: Schema.Types.ObjectId,
    ref: 'template',
    required: true
  },
  is_public: {
    type: Boolean,
    default: false
  },
  password: {
    type: String,
    default: null
  },
  view_count: {
    type: Number,
    default: 0
  },
  custom_domain: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Create index for faster lookups
PressKitSchema.index({ user_id: 1 });
PressKitSchema.index({ slug: 1 }, { unique: true });

module.exports = mongoose.model('press_kit', PressKitSchema);