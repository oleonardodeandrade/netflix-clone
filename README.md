<div align="center">

# 🎬 Netflix Clone

A modern, full-stack Netflix clone built with React 19, TypeScript, and cutting-edge web technologies. Features real-time movie data, user authentication, personalized recommendations, and a pixel-perfect Netflix-inspired UI.

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![Vite](https://img.shields.io/badge/Vite-7.1-purple)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-cyan)
![License](https://img.shields.io/badge/license-MIT-green)

**[🚀 Live Demo](https://netflix-clone-front-two.vercel.app)** · **[📝 Report Bug](https://github.com/oleonardodeandrade/netflix-clone/issues)** · **[✨ Request Feature](https://github.com/oleonardodeandrade/netflix-clone/issues)**

</div>

---

## 📸 Screenshots

### Home Page
![Home Page](.github/screenshots/home.png)
*Browse trending movies, personalized recommendations, and continue watching*

### Profile Selector
![Profile Selector](.github/screenshots/profiles.png)
*Multi-profile support with custom avatars and Kids Mode*

### Video Player
![Video Player](.github/screenshots/player.png)
*Full-screen video playback with custom controls*

### Search Results
![Search Results](.github/screenshots/search.png)
*Real-time search with instant results*

## ✨ Features

### Core Functionality

| Feature | Description |
|---------|------------|
| 🎬 **Movie Browsing** | Browse popular, trending, and top-rated movies with smooth scrolling |
| 👥 **Multi-Profile Support** | Create up to 5 profiles per account with custom avatars |
| 👶 **Kids Mode** | Safe, age-appropriate content filtering for children |
| 🔍 **Advanced Search** | Real-time search with instant results and autocomplete |
| 🎭 **Genre Filtering** | Filter content by Action, Comedy, Drama, Horror, and more |
| ▶️ **Video Playback** | Full-screen video player with custom controls |
| ⭐ **Rating System** | Rate movies with a 5-star rating system |
| ❤️ **My List** | Save favorite movies to your personal list |
| 📺 **Continue Watching** | Resume watching from where you left off, per profile |
| 📱 **Responsive Design** | Seamless experience across desktop, tablet, and mobile |
| 🎨 **Skeleton Loading** | Elegant loading states for better UX |

### Technical Highlights

| Technology | Purpose |
|-----------|---------|
| 🔐 **Clerk Authentication** | Secure user authentication and session management |
| 🗄️ **PostgreSQL + Drizzle ORM** | Type-safe database operations with Prisma |
| 🎨 **TailwindCSS** | Utility-first CSS with Netflix-inspired design system |
| 🚀 **Performance Optimizations** | Lazy loading, code splitting, and memoization |
| 🌐 **TMDB API Integration** | Real-time movie data and metadata |
| 💾 **Jotai State Management** | Atomic state management for React |
| 🎯 **Full TypeScript** | End-to-end type safety |
| 📦 **Vite Build Tool** | Lightning-fast HMR and optimized builds |

## 🛠️ Tech Stack

<table>
<tr>
<td width="50%" valign="top">

### Frontend
- ⚛️ **React 19** - Concurrent features
- 📘 **TypeScript** - Type safety
- ⚡ **Vite** - Build tool & HMR
- 🎨 **TailwindCSS** - Styling
- 🧩 **Jotai** - State management
- 🛣️ **React Router** - Routing
- 📹 **Video.js** - Video player

</td>
<td width="50%" valign="top">

### Backend & Services
- 🔐 **Clerk** - Authentication
- 🗄️ **PostgreSQL** - Database
- 🔧 **Drizzle ORM** - Type-safe ORM
- 🎬 **TMDB API** - Movie data
- 🚀 **Hono** - API framework
- 🔄 **Express** - Backend server

</td>
</tr>
</table>

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ and Yarn
- PostgreSQL database
- TMDB API key
- Clerk account

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/oleonardodeandrade/netflix-clone.git
cd netflix-clone
```

2. **Install dependencies**
```bash
yarn install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/netflix_clone

# TMDB API
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
```

4. **Set up the database**
```bash
yarn db:push
```

5. **Start the development server**
```bash
yarn dev
```

The app will be available at `http://localhost:5173`

## 📁 Project Structure

```
netflix-clone/
├── src/
│   ├── components/          # React components
│   │   ├── header/         # Navigation and search
│   │   ├── hero/           # Hero section components
│   │   ├── movie/          # Movie card, row, modal
│   │   ├── video/          # Video player
│   │   └── rating/         # Star rating component
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Main page
│   │   ├── Watch.tsx       # Video player page
│   │   ├── MyList.tsx      # User's favorites
│   │   └── SearchResults.tsx
│   ├── services/           # API services
│   │   ├── api/            # Backend API calls
│   │   └── api-provider/   # TMDB integration
│   ├── store/              # Jotai state management
│   ├── types/              # TypeScript definitions
│   └── db/                 # Database schema
├── server/                 # Backend API routes
└── public/                 # Static assets
```

## 🎯 Key Features Implementation

### Authentication Flow
- Secure login/signup with Clerk
- Protected routes for authenticated users
- User profile management
- Session persistence

### Movie Data Management
- Real-time data from TMDB API
- Efficient caching strategy
- Optimistic UI updates
- Error handling and retry logic

### Video Playback
- Full-screen video player
- YouTube trailer integration
- Custom controls
- Responsive video quality

### Personalization
- User ratings storage
- Favorite movies list
- Watch history tracking
- Continue watching feature

## 🎨 UI/UX Features

- **Smooth Animations** - CSS transitions and transforms
- **Hover Effects** - Interactive movie cards with scale effects
- **Lazy Loading** - Optimized image and component loading
- **Skeleton Loading** - Elegant loading states
- **Responsive Design** - Mobile-first approach
- **Dark Theme** - Netflix-inspired color scheme

## 🔒 Security Features

- Environment variable protection
- Secure authentication with Clerk
- API key management
- CORS configuration
- Input validation

## 📊 Performance Optimizations

- Code splitting with React.lazy
- Image lazy loading
- Debounced search
- Memoized components
- Optimized bundle size

## 🧪 Available Scripts

```bash
# Development
yarn dev              # Start dev server

# Building
yarn build            # Build for production
yarn preview          # Preview production build

# Database
yarn db:push          # Push schema to database
yarn db:studio        # Open Drizzle Studio

# Code Quality
yarn lint             # Run ESLint
yarn type-check       # Run TypeScript compiler
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

### Manual Deployment

```bash
# Build the project
yarn build

# The dist/ folder contains production-ready files
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [TMDB](https://www.themoviedb.org/) for providing the movie database API
- [Netflix](https://www.netflix.com/) for design inspiration
- [Clerk](https://clerk.com/) for authentication services

## 📧 Contact

Leonardo Andrade - [@oleonardodeandrade](https://github.com/oleonardodeandrade)

Project Link: [https://github.com/oleonardodeandrade/netflix-clone](https://github.com/oleonardodeandrade/netflix-clone)

---

⭐ Star this repository if you found it helpful!
