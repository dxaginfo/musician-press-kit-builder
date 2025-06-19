const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const PressKit = require('../../models/PressKit');
const Section = require('../../models/Section');
const MediaItem = require('../../models/MediaItem');
const Event = require('../../models/Event');
const SocialLink = require('../../models/SocialLink');
const { check, validationResult } = require('express-validator');
const slugify = require('slugify');
const analyticsService = require('../../services/analyticsService');

/**
 * @route   GET api/press-kits
 * @desc    Get all press kits for current user
 * @access  Private
 */
router.get('/', auth, async (req, res) => {
  try {
    const pressKits = await PressKit.find({ user_id: req.user.id })
      .select('title slug description is_public view_count created_at updated_at')
      .sort({ updated_at: -1 });

    res.json(pressKits);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/press-kits/:id
 * @desc    Get press kit by ID
 * @access  Private
 */
router.get('/:id', auth, async (req, res) => {
  try {
    const pressKit = await PressKit.findById(req.params.id);

    if (!pressKit) {
      return res.status(404).json({ msg: 'Press kit not found' });
    }

    // Check user
    if (pressKit.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Get all related data
    const sections = await Section.find({ press_kit_id: pressKit._id }).sort({ display_order: 1 });
    const mediaItems = await MediaItem.find({ press_kit_id: pressKit._id }).sort({ display_order: 1 });
    const events = await Event.find({ press_kit_id: pressKit._id }).sort({ event_date: 1 });
    const socialLinks = await SocialLink.find({ press_kit_id: pressKit._id }).sort({ display_order: 1 });

    const fullPressKit = {
      ...pressKit._doc,
      sections,
      mediaItems,
      events,
      socialLinks
    };

    res.json(fullPressKit);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Press kit not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   POST api/press-kits
 * @desc    Create a press kit
 * @access  Private
 */
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('template_id', 'Template is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { title, description, template_id, is_public = false, custom_domain = null } = req.body;

      // Create slug from title
      let slug = slugify(title, { lower: true, strict: true });
      
      // Check if slug exists, if so, add a random string
      const slugExists = await PressKit.findOne({ slug });
      if (slugExists) {
        const randomString = Math.random().toString(36).substring(2, 7);
        slug = `${slug}-${randomString}`;
      }

      const newPressKit = new PressKit({
        user_id: req.user.id,
        title,
        slug,
        description,
        template_id,
        is_public,
        custom_domain,
        view_count: 0
      });

      const pressKit = await newPressKit.save();

      // Create default sections
      const defaultSections = [
        {
          press_kit_id: pressKit._id,
          type: 'bio',
          title: 'Biography',
          content: { text: 'Your artist biography goes here.' },
          display_order: 0,
          is_visible: true
        },
        {
          press_kit_id: pressKit._id,
          type: 'media',
          title: 'Media',
          content: { description: 'Photos, videos, and audio tracks.' },
          display_order: 1,
          is_visible: true
        },
        {
          press_kit_id: pressKit._id,
          type: 'tour',
          title: 'Tour Dates',
          content: { description: 'Upcoming shows and events.' },
          display_order: 2,
          is_visible: true
        },
        {
          press_kit_id: pressKit._id,
          type: 'contact',
          title: 'Contact',
          content: { email: '', phone: '', message: 'Get in touch for bookings and inquiries.' },
          display_order: 3,
          is_visible: true
        }
      ];

      await Section.insertMany(defaultSections);

      res.json(pressKit);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @route   PUT api/press-kits/:id
 * @desc    Update a press kit
 * @access  Private
 */
router.put('/:id', auth, async (req, res) => {
  try {
    const pressKit = await PressKit.findById(req.params.id);

    if (!pressKit) {
      return res.status(404).json({ msg: 'Press kit not found' });
    }

    // Check user
    if (pressKit.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    const { title, description, template_id, is_public, custom_domain } = req.body;

    // Build update object with only provided fields
    const pressKitFields = {};
    if (title) pressKitFields.title = title;
    if (description) pressKitFields.description = description;
    if (template_id) pressKitFields.template_id = template_id;
    if (is_public !== undefined) pressKitFields.is_public = is_public;
    if (custom_domain !== undefined) pressKitFields.custom_domain = custom_domain;

    // Update slug if title changed
    if (title && title !== pressKit.title) {
      let newSlug = slugify(title, { lower: true, strict: true });
      
      // Check if slug exists (excluding current press kit)
      const slugExists = await PressKit.findOne({ 
        slug: newSlug,
        _id: { $ne: req.params.id }
      });

      if (slugExists) {
        const randomString = Math.random().toString(36).substring(2, 7);
        newSlug = `${newSlug}-${randomString}`;
      }

      pressKitFields.slug = newSlug;
    }

    // Update timestamp
    pressKitFields.updated_at = Date.now();

    const updatedPressKit = await PressKit.findByIdAndUpdate(
      req.params.id,
      { $set: pressKitFields },
      { new: true }
    );

    res.json(updatedPressKit);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Press kit not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   DELETE api/press-kits/:id
 * @desc    Delete a press kit
 * @access  Private
 */
router.delete('/:id', auth, async (req, res) => {
  try {
    const pressKit = await PressKit.findById(req.params.id);

    if (!pressKit) {
      return res.status(404).json({ msg: 'Press kit not found' });
    }

    // Check user
    if (pressKit.user_id.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete related data (cascade delete)
    await Section.deleteMany({ press_kit_id: pressKit._id });
    await MediaItem.deleteMany({ press_kit_id: pressKit._id });
    await Event.deleteMany({ press_kit_id: pressKit._id });
    await SocialLink.deleteMany({ press_kit_id: pressKit._id });

    // Delete the press kit
    await pressKit.remove();

    res.json({ msg: 'Press kit removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Press kit not found' });
    }
    res.status(500).send('Server Error');
  }
});

/**
 * @route   GET api/press-kits/public/:slug
 * @desc    Get public press kit by slug
 * @access  Public
 */
router.get('/public/:slug', async (req, res) => {
  try {
    const pressKit = await PressKit.findOne({ slug: req.params.slug });

    if (!pressKit) {
      return res.status(404).json({ msg: 'Press kit not found' });
    }

    // Check if press kit is public
    if (!pressKit.is_public) {
      return res.status(401).json({ msg: 'This press kit is private' });
    }

    // Get all related data
    const sections = await Section.find({ 
      press_kit_id: pressKit._id,
      is_visible: true 
    }).sort({ display_order: 1 });
    
    const mediaItems = await MediaItem.find({ press_kit_id: pressKit._id }).sort({ display_order: 1 });
    
    // Only show upcoming events and past events up to 30 days
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const events = await Event.find({ 
      press_kit_id: pressKit._id,
      $or: [
        { event_date: { $gte: new Date() } },
        { event_date: { $gte: thirtyDaysAgo } }
      ]
    }).sort({ event_date: 1 });
    
    const socialLinks = await SocialLink.find({ 
      press_kit_id: pressKit._id,
      is_visible: true
    }).sort({ display_order: 1 });

    const fullPressKit = {
      ...pressKit._doc,
      sections,
      mediaItems,
      events,
      socialLinks
    };

    // Track view
    analyticsService.trackView(pressKit._id, req);

    // Increment view count
    await PressKit.findByIdAndUpdate(
      pressKit._id,
      { $inc: { view_count: 1 } }
    );

    res.json(fullPressKit);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;