# UMAttend App

A modern attendance management system built with **Next.js** (client) and **Express.js + TypeScript** (server) for University of Mindanao.

## 📝 Description

UMAttend is a comprehensive attendance management application designed to streamline event attendance tracking for University of Mindanao.

### Tech Stack

**Frontend:**

- Next.js 15 with Turbopack
- React 19
- TypeScript
- TailwindCSS
- Radix UI Components

**Backend:**

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT Authentication
- Google OAuth

## 🚀 Setup Local Environment

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** database
- **Git**

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/riomar0001/umattend-app.git
   cd umattend-app
   ```

2. **Install root dependencies**

   ```bash
   npm install
   ```

3. **Setup Server**

   ```bash
   cd server
   npm install
   ```

4. **Setup Client**

   ```bash
   cd ../client
   npm install
   ```

5. **Environment Configuration**

   **Server Environment** (`server/.env`):

   ```env

   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/umattend"
   DIRECT_URL="postgresql://username:password@localhost:5432/umattend"
   
   # JWT
   JWT_SECRET="your-jwt-secret"
   JWT_REFRESH_SECRET="your-refresh-secret"
   
   # Google OAuth
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Server
   PORT=5000
   NODE_ENV="development"
   ```

   **Client Environment** (`client/.env.local`):

   ```env

   NEXT_PUBLIC_API_URL="http://localhost:5000"
   NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
   ```

6. **Database Setup**

   ```bash
   cd server
   npx prisma migrate dev
   npx prisma generate
   ```

## 🏃‍♂️ How to Run the Code

### Quick Start (Recommended)

**Start both servers at once:**

```bash
npm run dev
```

This will start both the frontend and backend servers concurrently with colored output.

**Alternative methods:**

```bash
# Using concurrently package
npm run dev:concurrent

# Windows batch file (opens separate windows)
start-dev.bat

# Unix/Linux/Mac shell script
./start-dev.sh
```

### Development Mode (Manual)

If you prefer to run servers separately:

1. **Start the Server** (Terminal 1):

   ```bash
   cd server
   npm run dev
   ```

   Server will run on `http://localhost:5000`

2. **Start the Client** (Terminal 2):

   ```bash
   cd client
   npm run dev
   ```

   Client will run on `http://localhost:3000`

### Production Mode

**Build both projects:**

```bash
npm run build
```

**Start both servers in production:**

```bash
npm run start
```

**Manual approach:**

1. **Build and Start Server**:

   ```bash
   cd server
   npm run build
   npm run prod
   ```

2. **Build and Start Client**:

   ```bash
   cd client
   npm run build
   npm start
   ```

### Available Root Scripts

```bash
# Development
npm run dev                 # Start both servers (recommended)
npm run dev:concurrent      # Alternative using concurrently
npm run dev:client          # Start only frontend
npm run dev:server          # Start only backend

# Production
npm run build               # Build both projects
npm run start               # Start both servers in production
npm run start:concurrent    # Alternative using concurrently
npm run start:client        # Start only frontend
npm run start:server        # Start only backend

# Installation
npm run install:all         # Install all dependencies
```

## 🔧 Format Checking

This project uses **Husky** for pre-commit hooks with **lint-staged** to ensure code quality.

### Available Commands

**Server** (`cd server`):

```bash

npm run lint          # Check for linting errors
npm run lint:fix      # Auto-fix linting errors
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm run type-check    # TypeScript type checking
```

**Client** (`cd client`):

```bash

npm run lint          # Next.js linting
npm run lint:fix      # Auto-fix Next.js linting errors
npm run format        # Format code with Prettier
npm run format:check  # Check code formatting
npm run type-check    # TypeScript type checking
```

### Manual Format Check

```bash
# Check all files formatting
npm run format:server && npm run format:client

# Run full validation
npm run lint:server && npm run lint:client && npm run type-check:server && npm run type-check:client
```

## 📚 Resources

### Documentation

- [Next.js Documentation](https://nextjs.org/docs)
- [Express.js Guide](https://expressjs.com/en/guide/routing.html)
- [Prisma Documentation](https://www.prisma.io/docs/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

### Project Structure

```plaintext

umattend-app/
├── client/                 # Next.js Frontend
│   ├── src/
│   │   ├── app/           # App Router pages
│   │   ├── components/    # Reusable components
│   │   └── lib/          # Utilities and configs
│   ├── public/           # Static assets
│   └── package.json
├── server/               # Express.js Backend
│   ├── src/
│   │   ├── v1/           # API v1 routes
│   │   │   ├── controllers/
│   │   │   ├── services/
│   │   │   ├── repositories/
│   │   │   ├── middlewares/
│   │   │   └── validators/
│   │   ├── configs/      # Configuration files
│   │   └── utils/        # Utility functions
│   ├── prisma/           # Database schema & migrations
│   └── package.json
├── .husky/               # Git hooks
├── CONTRIBUTING.md       # Contribution guidelines
└── package.json          # Root package.json
```

### API Endpoints

- **Authentication**: `/api/v1/auth/*`
- **Users**: `/api/v1/users/*`
- **Events**: `/api/v1/events/*`
- **Students**: `/api/v1/students/*`

## 🚀 Deployment

This project includes automated CI/CD pipelines using GitHub Actions with Docker, Nginx, and Let's Encrypt SSL.

### Quick Deployment Guide

**For a complete setup guide, see [QUICKSTART.md](./QUICKSTART.md) (30 minutes)**

**Deployment documentation:**

- 📘 [Deployment Guide](./DEPLOYMENT.md) - Comprehensive deployment documentation
- ✅ [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Step-by-step checklist
- 📊 [Pipeline Summary](./PIPELINE_SUMMARY.md) - Architecture and overview

### Environments

- **Local**: `docker-compose.local.yml` - Development with hot reload
- **Staging**: Auto-deploy on push to `staging` branch
- **Production**: Auto-deploy on push to `main`/`master` branch

### Deployment Features

✅ Automated Docker builds  
✅ Nginx reverse proxy  
✅ SSL/TLS with Let's Encrypt  
✅ Auto-renewal of SSL certificates  
✅ Database migrations  
✅ Zero-downtime deployments  
✅ Environment-specific configurations  

### Quick Commands

```bash
# Local development with Docker
docker compose -f docker-compose.local.yml up -d

# Deploy using helper script
./scripts/deploy.sh staging up    # Start staging
./scripts/deploy.sh staging logs  # View logs
```

### Required GitHub Secrets

See `.github/secrets.template` for complete list of required secrets:

- SSH credentials
- Domain configuration
- Environment variables
- API keys

### Contributing

Please read [CONTRIBUTING.md](./CONTRIBUTING.md) for details on:

- Branching strategy
- Commit message format
- Code style guidelines
- Pre-push checklist

### Development Tools

- **ESLint**: Code linting and quality
- **Prettier**: Code formatting
- **TypeScript**: Type safety
- **Prisma Studio**: Database management UI
- **Docker**: Containerization and deployment
- **GitHub Actions**: CI/CD automation
