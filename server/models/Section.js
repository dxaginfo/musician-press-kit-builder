const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SectionSchema = new Schema({
  press_kit_id: {
    type: Schema.Types.ObjectId,
    ref: 'press_kit',
    required: true
  },
  type: {
    type: String,
    enum: ['bio', 'media', 'tour', 'contact', 'press', 'music', 'custom'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  content: {
    type: Schema.Types.Mixed,
    default: {}
  },
  display_order: {
    type: Number,
    default: 0
  },
  is_visible: {
    type: Boolean,
    default: true
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
SectionSchema.index({ press_kit_id: 1 });
SectionSchema.index({ press_kit_id: 1, display_order: 1 });

module.exports = mongoose.model('section', SectionSchema);