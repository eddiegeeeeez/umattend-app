# 🚀 Server Startup Scripts - Summary

I've created multiple ways to start both your frontend and backend servers together!

## ✅ What Was Created

### 1. **Main Node.js Scripts** (Recommended)

- **`start-dev.js`** - Development mode starter
- **`start-prod.js`** - Production mode starter

**Features:**
- ✨ Colored console output (cyan for client, magenta for server)
- 🎯 Prefixed logs for easy identification
- 🛑 Graceful shutdown (Ctrl+C stops both servers)
- 💻 Cross-platform (Windows, Linux, macOS)
- 🔍 Error handling and process monitoring

**Usage:**
```bash
npm run dev      # Development
npm run start    # Production
```

### 2. **Platform-Specific Scripts**

- **`start-dev.bat`** - Windows batch file (opens separate terminal windows)
- **`start-dev.sh`** - Unix/Linux/Mac shell script

**Usage:**
```bash
# Windows
start-dev.bat

# Unix/Linux/Mac
chmod +x start-dev.sh
./start-dev.sh
```

### 3. **Package.json Scripts**

Added to `package.json` in the root:

```json
{
  "scripts": {
    "dev": "node start-dev.js",
    "dev:concurrent": "concurrently --kill-others-on-fail ...",
    "dev:client": "cd client && npm run dev",
    "dev:server": "cd server && npm run dev",
    "install:all": "npm install && cd client && npm install && cd ../server && npm install",
    "build": "cd server && npm run build && cd ../client && npm run build",
    "start": "node start-prod.js",
    "start:concurrent": "concurrently --kill-others-on-fail ...",
    "start:client": "cd client && npm start",
    "start:server": "cd server && npm run prod"
  }
}
```

### 4. **Documentation**

- **`START_SCRIPTS_README.md`** - Detailed documentation for the scripts
- Updated main **`README.md`** with quick start instructions

## 🎯 Quick Start Guide

### First Time Setup

```bash
# Install all dependencies
npm run install:all
```

### Start Development Servers

**Option 1: Using Node.js script (Recommended)**
```bash
npm run dev
```

**Option 2: Using concurrently**
```bash
npm run dev:concurrent
```

**Option 3: Platform-specific**
```bash
# Windows
start-dev.bat

# Unix/Linux/Mac
./start-dev.sh
```

### What Happens When You Run `npm run dev`

1. ✅ Starts Express server on `http://localhost:5000` (or your configured port)
2. ✅ Starts Next.js client on `http://localhost:3000`
3. ✅ Shows color-coded logs:
   - 🟣 Magenta = Server logs
   - 🔵 Cyan = Client logs
   - 🟢 Green = Main process logs
4. ✅ Press `Ctrl+C` to stop both servers cleanly

## 📊 Output Example

```
╔═══════════════════════════════════════════════╗
║      UMAttend Development Server Starter      ║
╚═══════════════════════════════════════════════╝

[MAIN] Starting server...
[MAIN] Starting client...
[MAIN] Launching servers...

[MAIN] Both servers are starting up...
[MAIN] Press Ctrl+C to stop all servers

[SERVER] Server is running on port 5000
[CLIENT] ▲ Next.js 15.5.4
[CLIENT] - Local: http://localhost:3000
```

## 🔧 Troubleshooting

### Issue: Port already in use
```bash
# Find and kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Find and kill process on port 5000 (Windows)
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: Dependencies not found
```bash
npm run install:all
```

### Issue: Need to run servers separately
```bash
# In terminal 1
npm run dev:server

# In terminal 2
npm run dev:client
```

## 📦 Dependencies Added

- **concurrently** (^9.1.2) - Alternative method to run multiple commands

## 🎨 Customization

You can customize the scripts by editing:

- `start-dev.js` - Change colors, prefixes, or behavior
- `start-prod.js` - Modify production startup
- `package.json` - Add more scripts or modify existing ones

## 🌟 Benefits

1. **Single Command** - Start everything with one command
2. **Clear Logs** - Color-coded output helps identify which server is logging
3. **Easy Debugging** - Separate prefixes make it easy to track issues
4. **Graceful Shutdown** - No orphaned processes when you stop
5. **Cross-Platform** - Works on Windows, Linux, and macOS
6. **Multiple Options** - Choose the method that works best for you

## 📝 Next Steps

1. ✅ Make sure your `.env` files are configured
2. ✅ Run `npm run install:all` if you haven't already
3. ✅ Start development with `npm run dev`
4. ✅ Visit `http://localhost:3000` for the client
5. ✅ API is available at `http://localhost:5000`

Happy coding! 🚀
