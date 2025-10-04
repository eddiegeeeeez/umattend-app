# UMAttend App - Start Scripts

This directory contains scripts to easily start both the frontend and backend servers.

## Quick Start

### Development Mode

To start both servers in development mode:

```bash
npm run dev
```

This will start:
- **Backend Server** (Express): Running on the port defined in your server `.env` file
- **Frontend Client** (Next.js): Running on `http://localhost:3000`

### Production Mode

To start both servers in production mode:

```bash
npm run start
```

**Note**: Make sure to build both projects first:
```bash
npm run build
```

## Individual Server Commands

If you want to run servers separately:

```bash
# Run only the backend server
npm run dev:server

# Run only the frontend client
npm run dev:client
```

## Installation

First time setup - install all dependencies for both projects:

```bash
npm run install:all
```

Or install manually:
```bash
# Install root dependencies
npm install

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## Available Scripts

- `npm run dev` - Start both servers in development mode
- `npm run dev:client` - Start only the frontend (Next.js)
- `npm run dev:server` - Start only the backend (Express)
- `npm run start` - Start both servers in production mode
- `npm run build` - Build both projects for production
- `npm run install:all` - Install dependencies for all projects

## Scripts Overview

### start-dev.js
A Node.js script that spawns both the client and server processes concurrently with colored output for easy debugging. It handles graceful shutdown when you press Ctrl+C.

### start-prod.js
Similar to start-dev.js but runs both servers in production mode.

## Features

- ✅ Colored console output for easy identification
- ✅ Separate prefixes for client and server logs
- ✅ Graceful shutdown handling
- ✅ Works on Windows, Linux, and macOS
- ✅ Error handling and process monitoring

## Troubleshooting

If you encounter issues:

1. Make sure all dependencies are installed:
   ```bash
   npm run install:all
   ```

2. Check that your environment variables are set up correctly in both `client/.env` and `server/.env`

3. Ensure ports are not already in use

4. Try running servers individually to isolate issues:
   ```bash
   npm run dev:client
   npm run dev:server
   ```
