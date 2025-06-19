/**
 * Initial migration to create the database schema
 */
module.exports = {
  async up(db) {
    // Create collections if they don't exist
    await db.createCollection('users', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['email', 'password_hash', 'name'],
          properties: {
            email: {
              bsonType: 'string',
              description: 'Email address must be a string and is required'
            },
            password_hash: {
              bsonType: 'string',
              description: 'Password hash must be a string and is required'
            },
            name: {
              bsonType: 'string',
              description: 'Name must be a string and is required'
            },
            profile_image_url: {
              bsonType: 'string',
              description: 'Profile image URL must be a string'
            },
            account_status: {
              enum: ['active', 'inactive', 'suspended'],
              description: 'Status must be one of: active, inactive, suspended'
            }
          }
        }
      }
    });

    await db.createCollection('templates', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['name', 'description', 'thumbnail_url', 'configuration'],
          properties: {
            name: {
              bsonType: 'string',
              description: 'Template name must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string and is required'
            },
            thumbnail_url: {
              bsonType: 'string',
              description: 'Thumbnail URL must be a string and is required'
            },
            is_premium: {
              bsonType: 'bool',
              description: 'Is premium must be a boolean'
            },
            configuration: {
              bsonType: 'object',
              description: 'Configuration must be an object and is required'
            }
          }
        }
      }
    });

    await db.createCollection('press_kits', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['user_id', 'title', 'slug', 'description', 'template_id'],
          properties: {
            user_id: {
              bsonType: 'objectId',
              description: 'User ID must be an ObjectId and is required'
            },
            title: {
              bsonType: 'string',
              description: 'Title must be a string and is required'
            },
            slug: {
              bsonType: 'string',
              description: 'Slug must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string and is required'
            },
            template_id: {
              bsonType: 'objectId',
              description: 'Template ID must be an ObjectId and is required'
            },
            is_public: {
              bsonType: 'bool',
              description: 'Is public must be a boolean'
            },
            password: {
              bsonType: ['string', 'null'],
              description: 'Password must be a string or null'
            },
            view_count: {
              bsonType: 'int',
              description: 'View count must be an integer'
            },
            custom_domain: {
              bsonType: ['string', 'null'],
              description: 'Custom domain must be a string or null'
            }
          }
        }
      }
    });

    await db.createCollection('sections', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['press_kit_id', 'type', 'title'],
          properties: {
            press_kit_id: {
              bsonType: 'objectId',
              description: 'Press Kit ID must be an ObjectId and is required'
            },
            type: {
              enum: ['bio', 'media', 'tour', 'contact', 'press', 'music', 'custom'],
              description: 'Type must be one of: bio, media, tour, contact, press, music, custom'
            },
            title: {
              bsonType: 'string',
              description: 'Title must be a string and is required'
            },
            content: {
              bsonType: 'object',
              description: 'Content must be an object'
            },
            display_order: {
              bsonType: 'int',
              description: 'Display order must be an integer'
            },
            is_visible: {
              bsonType: 'bool',
              description: 'Is visible must be a boolean'
            }
          }
        }
      }
    });

    await db.createCollection('media_items', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['press_kit_id', 'section_id', 'type', 'title', 'url'],
          properties: {
            press_kit_id: {
              bsonType: 'objectId',
              description: 'Press Kit ID must be an ObjectId and is required'
            },
            section_id: {
              bsonType: 'objectId',
              description: 'Section ID must be an ObjectId and is required'
            },
            type: {
              enum: ['image', 'audio', 'video', 'document'],
              description: 'Type must be one of: image, audio, video, document'
            },
            title: {
              bsonType: 'string',
              description: 'Title must be a string and is required'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string'
            },
            url: {
              bsonType: 'string',
              description: 'URL must be a string and is required'
            },
            thumbnail_url: {
              bsonType: 'string',
              description: 'Thumbnail URL must be a string'
            },
            file_size: {
              bsonType: 'int',
              description: 'File size must be an integer'
            },
            duration: {
              bsonType: 'int',
              description: 'Duration must be an integer'
            },
            display_order: {
              bsonType: 'int',
              description: 'Display order must be an integer'
            }
          }
        }
      }
    });

    await db.createCollection('events', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['press_kit_id', 'title', 'venue', 'city', 'event_date'],
          properties: {
            press_kit_id: {
              bsonType: 'objectId',
              description: 'Press Kit ID must be an ObjectId and is required'
            },
            title: {
              bsonType: 'string',
              description: 'Title must be a string and is required'
            },
            venue: {
              bsonType: 'string',
              description: 'Venue must be a string and is required'
            },
            city: {
              bsonType: 'string',
              description: 'City must be a string and is required'
            },
            country: {
              bsonType: 'string',
              description: 'Country must be a string'
            },
            event_date: {
              bsonType: 'date',
              description: 'Event date must be a date and is required'
            },
            ticket_url: {
              bsonType: ['string', 'null'],
              description: 'Ticket URL must be a string or null'
            },
            description: {
              bsonType: 'string',
              description: 'Description must be a string'
            },
            is_featured: {
              bsonType: 'bool',
              description: 'Is featured must be a boolean'
            }
          }
        }
      }
    });

    await db.createCollection('social_links', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['press_kit_id', 'platform', 'url'],
          properties: {
            press_kit_id: {
              bsonType: 'objectId',
              description: 'Press Kit ID must be an ObjectId and is required'
            },
            platform: {
              bsonType: 'string',
              description: 'Platform must be a string and is required'
            },
            url: {
              bsonType: 'string',
              description: 'URL must be a string and is required'
            },
            display_order: {
              bsonType: 'int',
              description: 'Display order must be an integer'
            },
            is_visible: {
              bsonType: 'bool',
              description: 'Is visible must be a boolean'
            }
          }
        }
      }
    });

    await db.createCollection('analytics', {
      validator: {
        $jsonSchema: {
          bsonType: 'object',
          required: ['press_kit_id', 'visit_date'],
          properties: {
            press_kit_id: {
              bsonType: 'objectId',
              description: 'Press Kit ID must be an ObjectId and is required'
            },
            visitor_ip: {
              bsonType: 'string',
              description: 'Visitor IP must be a string'
            },
            user_agent: {
              bsonType: 'string',
              description: 'User agent must be a string'
            },
            referrer: {
              bsonType: 'string',
              description: 'Referrer must be a string'
            },
            visit_date: {
              bsonType: 'date',
              description: 'Visit date must be a date and is required'
            },
            viewed_sections: {
              bsonType: 'array',
              description: 'Viewed sections must be an array'
            },
            clicked_links: {
              bsonType: 'array',
              description: 'Clicked links must be an array'
            },
            duration: {
              bsonType: 'int',
              description: 'Duration must be an integer'
            }
          }
        }
      }
    });

    // Create indexes
    await db.collection('users').createIndex({ email: 1 }, { unique: true });
    await db.collection('press_kits').createIndex({ user_id: 1 });
    await db.collection('press_kits').createIndex({ slug: 1 }, { unique: true });
    await db.collection('sections').createIndex({ press_kit_id: 1 });
    await db.collection('sections').createIndex({ press_kit_id: 1, display_order: 1 });
    await db.collection('media_items').createIndex({ press_kit_id: 1 });
    await db.collection('media_items').createIndex({ section_id: 1 });
    await db.collection('media_items').createIndex({ press_kit_id: 1, type: 1 });
    await db.collection('events').createIndex({ press_kit_id: 1 });
    await db.collection('events').createIndex({ press_kit_id: 1, event_date: 1 });
    await db.collection('social_links').createIndex({ press_kit_id: 1 });
    await db.collection('analytics').createIndex({ press_kit_id: 1 });
    await db.collection('analytics').createIndex({ press_kit_id: 1, visit_date: 1 });

    // Create default templates
    await db.collection('templates').insertMany([
      {
        name: 'Classic',
        description: 'A clean, professional template with a traditional layout',
        thumbnail_url: '/templates/classic-thumbnail.jpg',
        is_premium: false,
        configuration: {
          colors: {
            primary: '#1a1a1a',
            secondary: '#4a86e8',
            background: '#ffffff',
            text: '#333333',
            accent: '#f44336'
          },
          fonts: {
            heading: 'Montserrat',
            body: 'Open Sans'
          },
          layout: 'vertical'
        },
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Modern',
        description: 'A sleek, contemporary design with bold elements',
        thumbnail_url: '/templates/modern-thumbnail.jpg',
        is_premium: false,
        configuration: {
          colors: {
            primary: '#212121',
            secondary: '#3f51b5',
            background: '#fafafa',
            text: '#424242',
            accent: '#ff9800'
          },
          fonts: {
            heading: 'Raleway',
            body: 'Roboto'
          },
          layout: 'grid'
        },
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        name: 'Minimalist',
        description: 'A simple, clean design that lets your content shine',
        thumbnail_url: '/templates/minimalist-thumbnail.jpg',
        is_premium: false,
        configuration: {
          colors: {
            primary: '#000000',
            secondary: '#808080',
            background: '#ffffff',
            text: '#333333',
            accent: '#c0c0c0'
          },
          fonts: {
            heading: 'Lato',
            body: 'Lato'
          },
          layout: 'horizontal'
        },
        created_at: new Date(),
        updated_at: new Date()
      }
    ]);
  },

  async down(db) {
    // Remove collections
    await db.collection('analytics').drop();
    await db.collection('social_links').drop();
    await db.collection('events').drop();
    await db.collection('media_items').drop();
    await db.collection('sections').drop();
    await db.collection('press_kits').drop();
    await db.collection('templates').drop();
    await db.collection('users').drop();
  }
};