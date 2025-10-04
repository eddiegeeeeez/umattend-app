#!/bin/bash

# UMAttend Development Server Starter for Unix-like systems
# This script starts both frontend and backend servers

echo ""
echo "================================================"
echo "   UMAttend Development Server Starter"
echo "================================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${GREEN}Starting both servers...${NC}"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down servers...${NC}"
    kill $SERVER_PID $CLIENT_PID 2>/dev/null
    exit 0
}

# Trap SIGINT and SIGTERM
trap cleanup SIGINT SIGTERM

# Start server
cd "$SCRIPT_DIR/server"
npm run dev &
SERVER_PID=$!
echo -e "${MAGENTA}[SERVER]${NC} Started with PID: $SERVER_PID"

# Start client
cd "$SCRIPT_DIR/client"
npm run dev &
CLIENT_PID=$!
echo -e "${CYAN}[CLIENT]${NC} Started with PID: $CLIENT_PID"

echo ""
echo -e "${GREEN}Both servers are starting...${NC}"
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for both processes
wait
