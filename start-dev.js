#!/usr/bin/env node

/**
 * Development Server Starter
 * This script starts both the frontend (Next.js) and backend (Express) servers concurrently
 */

const { spawn } = require('child_process');
const path = require('path');

// ANSI color codes for better console output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  
  // Foreground colors
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

// Prefix for console messages
const prefix = {
  client: `${colors.cyan}[CLIENT]${colors.reset}`,
  server: `${colors.magenta}[SERVER]${colors.reset}`,
  main: `${colors.green}[MAIN]${colors.reset}`,
};

console.log(`${colors.bright}${colors.green}
╔═══════════════════════════════════════════════╗
║      UMAttend Development Server Starter      ║
╚═══════════════════════════════════════════════╝
${colors.reset}`);

const isWindows = process.platform === 'win32';

function startProcess(name, script, cwd, color) {
  console.log(`${prefix.main} Starting ${name}...`);
  
  const proc = spawn('npm', ['run', script], {
    cwd: path.resolve(__dirname, cwd),
    stdio: 'pipe',
    shell: true,
  });

  proc.stdout.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${color}[${name.toUpperCase()}]${colors.reset} ${line}`);
    });
  });

  proc.stderr.on('data', (data) => {
    const lines = data.toString().split('\n').filter(line => line.trim());
    lines.forEach(line => {
      console.log(`${color}[${name.toUpperCase()}]${colors.reset} ${colors.red}${line}${colors.reset}`);
    });
  });

  proc.on('close', (code) => {
    if (code !== 0) {
      console.log(`${color}[${name.toUpperCase()}]${colors.reset} ${colors.red}Process exited with code ${code}${colors.reset}`);
    }
  });

  proc.on('error', (error) => {
    console.error(`${color}[${name.toUpperCase()}]${colors.reset} ${colors.red}Failed to start: ${error.message}${colors.reset}`);
  });

  return proc;
}

console.log(`${prefix.main} ${colors.yellow}Launching servers...${colors.reset}\n`);

const serverProcess = startProcess('server', 'dev', 'server', colors.magenta);
const clientProcess = startProcess('client', 'dev', 'client', colors.cyan);

function cleanup() {
  console.log(`\n${prefix.main} ${colors.yellow}Shutting down servers...${colors.reset}`);
  
  serverProcess.kill();
  clientProcess.kill();
  
  process.exit(0);
}

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);

console.log(`\n${prefix.main} ${colors.green}Both servers are starting up...${colors.reset}`);
console.log(`${prefix.main} ${colors.dim}Press Ctrl+C to stop all servers${colors.reset}\n`);
