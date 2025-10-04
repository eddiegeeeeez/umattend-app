@echo off
REM UMAttend Development Server Starter for Windows
REM This batch file starts both frontend and backend servers

echo.
echo ================================================
echo   UMAttend Development Server Starter
echo ================================================
echo.

echo Starting both servers...
echo.

start "UMAttend Server" cmd /k "cd /d %~dp0server && npm run dev"
start "UMAttend Client" cmd /k "cd /d %~dp0client && npm run dev"

echo.
echo Both servers are starting in separate windows...
echo Close the terminal windows to stop the servers.
echo.
pause
