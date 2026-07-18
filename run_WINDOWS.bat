@echo off
setLocal

set scriptpath=%~dp0
@echo off
node -v > nul 2>&1
if errorlevel 1 (
  echo Node.js is not installed. Please install it.
  echo Press Ctrl+C to exit.
  pause
  exit /b
)
echo Node.js is installed.
start /min cmd /c "cd %scriptpath%frontend && ng serve --port 4200 --open"
start /min cmd /c "cd %scriptpath%backend && npm run build && npm start"

endLocal