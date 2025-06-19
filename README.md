# Musician Press Kit Builder

A powerful web application for musicians to create professional, shareable digital press kits with customizable templates and analytics.

## Overview

The Digital Press Kit Builder allows musicians and artists to:

- Create and customize professional press kits
- Showcase music, videos, photos, and tour dates
- Share press kits with industry professionals
- Track engagement with analytics
- Manage multiple press kits for different purposes

## Features

- **User Authentication System**: Secure account management with social login options
- **Press Kit Creation and Editing**: Intuitive drag-and-drop interface
- **Media Management**: Support for images, videos, audio, and downloadable files
- **Biography and Text Content**: Rich text editor for compelling artist stories
- **Tour/Event Calendar**: Display and manage upcoming shows
- **Contact and Booking Information**: Secure methods for industry professionals to get in touch
- **Social Media Integration**: Connect all your platforms in one place
- **Analytics Dashboard**: Track views, engagement, and link clicks
- **Sharing and Privacy Controls**: Public links and password-protected sections
- **Templates and Customization**: Professional designs with brand customization

## Technology Stack

### Front-end
- React.js with hooks
- Tailwind CSS
- Material-UI / Chakra UI
- Context API / Redux
- Formik with Yup

### Back-end
- Node.js with Express.js
- RESTful API
- JWT Authentication
- bcrypt for password security

### Database
- PostgreSQL
- AWS S3 for media storage
- Redis for caching

### DevOps
- AWS / Heroku / Vercel
- GitHub Actions
- Sentry
- Google Analytics

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL
- Redis

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musician-press-kit-builder.git
cd musician-press-kit-builder
```

2. Install dependencies
```bash
# Install backend dependencies
cd server
npm install

# Install frontend dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In the server directory, create a .env file
cp .env.example .env
```

4. Set up the database
```bash
# Run database migrations
cd server
npm run migrate
```

5. Start the development servers
```bash
# Start the backend server
cd server
npm run dev

# In a new terminal, start the frontend server
cd client
npm start
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
musician-press-kit-builder/
├── client/                 # React frontend
│   ├── public/             # Static files
│   └── src/                # Source files
│       ├── components/     # UI components
│       ├── context/        # Context API
│       ├── hooks/          # Custom hooks
│       ├── pages/          # Page components
│       ├── services/       # API services
│       └── utils/          # Utility functions
├── server/                 # Express backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   └── utils/              # Utility functions
├── .github/                # GitHub workflows
└── docs/                   # Documentation
```

## API Documentation

API documentation is available at `/api/docs` when running the development server.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [PostgreSQL](https://www.postgresql.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Material-UI](https://mui.com/)