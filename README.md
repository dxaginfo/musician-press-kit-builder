# Digital Press Kit Builder

A professional web application for musicians to create and share digital press kits with customizable templates and analytics.

## Overview

The Digital Press Kit Builder is designed to help artists present themselves professionally to industry contacts, fans, and potential collaborators. This application enables musicians to create, manage, and share digital press kits that showcase their music, media, biography, tour dates, and contact information.

## Features

- **User Authentication**: Secure signup, login, and profile management
- **Press Kit Creation**: Multiple press kits for different projects or purposes
- **Customizable Templates**: Choose from professionally designed templates
- **Media Management**: Upload photos, embed music from Spotify/SoundCloud, add videos
- **Biography Editor**: Format text with basic styling options
- **Tour Calendar**: Display upcoming shows with venue details and ticket links
- **Contact Management**: Secure contact methods for industry professionals
- **Social Media Integration**: Link to platforms and display social presence
- **Analytics Dashboard**: Track views, engagement, and link clicks
- **Sharing Controls**: Custom URLs, password protection, and domain mapping

## Tech Stack

### Frontend
- React.js with hooks
- Chakra UI / Material-UI components
- Context API for state management
- Formik with Yup for form validation
- Responsive design for all devices

### Backend
- Node.js with Express.js
- RESTful API architecture
- JWT Authentication
- MongoDB with Mongoose ODM
- AWS S3 for media storage

### DevOps
- AWS for hosting
- GitHub Actions for CI/CD
- Sentry for error monitoring
- Google Analytics integration

## Getting Started

### Prerequisites
- Node.js (v14+)
- MongoDB
- AWS account (for media storage)

### Installation

1. Clone the repository
```bash
git clone https://github.com/dxaginfo/musician-press-kit-builder.git
cd musician-press-kit-builder
```

2. Install backend dependencies
```bash
cd server
npm install
```

3. Install frontend dependencies
```bash
cd client
npm install
```

4. Set up environment variables
Create a `.env` file in the server directory based on `.env.example`

5. Run database migrations
```bash
cd server
npm run migrate
```

6. Start development servers

Backend:
```bash
cd server
npm run dev
```

Frontend:
```bash
cd client
npm start
```

7. Access the application at `http://localhost:3000`

## Project Structure

```
musician-press-kit-builder/
├── client/                 # React frontend
│   ├── public/             # Static files
│   ├── src/                # Source code
│   │   ├── components/     # UI components
│   │   ├── context/        # Context API
│   │   ├── layouts/        # Page layouts
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   └── utils/          # Utility functions
│   └── package.json        # Frontend dependencies
├── server/                 # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Route controllers
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── services/           # Business logic
│   ├── utils/              # Utility functions
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password with token

### Press Kits
- `GET /api/press-kits` - Get all press kits for current user
- `GET /api/press-kits/:id` - Get a specific press kit
- `POST /api/press-kits` - Create a new press kit
- `PUT /api/press-kits/:id` - Update a press kit
- `DELETE /api/press-kits/:id` - Delete a press kit
- `GET /api/press-kits/public/:slug` - View a public press kit

### Sections
- `GET /api/sections/:pressKitId` - Get all sections for a press kit
- `POST /api/sections` - Create a new section
- `PUT /api/sections/:id` - Update a section
- `DELETE /api/sections/:id` - Delete a section
- `PUT /api/sections/reorder` - Reorder sections

### Media
- `GET /api/media/:pressKitId` - Get all media for a press kit
- `POST /api/media/upload` - Upload media files
- `DELETE /api/media/:id` - Delete media item
- `PUT /api/media/reorder` - Reorder media items

### Events
- `GET /api/events/:pressKitId` - Get all events for a press kit
- `POST /api/events` - Create a new event
- `PUT /api/events/:id` - Update an event
- `DELETE /api/events/:id` - Delete an event

### Analytics
- `GET /api/analytics/:pressKitId` - Get analytics for a press kit
- `GET /api/analytics/overview` - Get user's overall analytics

## Deployment

### Production Build

1. Build the frontend
```bash
cd client
npm run build
```

2. Configure the production server
   - Set NODE_ENV=production in your environment
   - Configure a production MongoDB database
   - Set up AWS S3 for media storage

3. Start the production server
```bash
cd server
npm start
```

### Docker Deployment

A Dockerfile and docker-compose.yml are provided for containerized deployment.

```bash
docker-compose up -d
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Express.js](https://expressjs.com/)
- [Chakra UI](https://chakra-ui.com/)

## Contact

For questions or support, please contact [dxag.info@gmail.com](mailto:dxag.info@gmail.com).