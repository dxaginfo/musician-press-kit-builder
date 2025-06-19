const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MediaItemSchema = new Schema({
  press_kit_id: {
    type: Schema.Types.ObjectId,
    ref: 'press_kit',
    required: true
  },
  section_id: {
    type: Schema.Types.ObjectId,
    ref: 'section',
    required: true
  },
  type: {
    type: String,
    enum: ['image', 'audio', 'video', 'document'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  url: {
    type: String,
    required: true
  },
  thumbnail_url: {
    type: String,
    default: ''
  },
  file_size: {
    type: Number,
    default: 0
  },
  duration: {
    type: Number,
    default: 0
  },
  display_order: {
    type: Number,
    default: 0
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
MediaItemSchema.index({ press_kit_id: 1 });
MediaItemSchema.index({ section_id: 1 });
MediaItemSchema.index({ press_kit_id: 1, type: 1 });

module.exports = mongoose.model('media_item', MediaItemSchema);