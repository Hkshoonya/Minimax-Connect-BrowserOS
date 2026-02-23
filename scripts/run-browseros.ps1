# Launch BrowserOS with CDP for development server
# Usage: .\run-browseros.ps1
$BROWSEROS_PATH = "$env:LOCALAPPDATA\BrowserOS\BrowserOS\Application\chrome.exe"
$CDP_PORT = 9222

if (-not (Test-Path $BROWSEROS_PATH)) {
    Write-Error "BrowserOS not found at $BROWSEROS_PATH. Install from https://www.browseros.com"
    exit 1
}

Write-Host "Starting BrowserOS with CDP on port $CDP_PORT..."
Start-Process -FilePath $BROWSEROS_PATH -ArgumentList "--remote-debugging-port=$CDP_PORT"
Write-Host "Set BROWSEROS_CDP_PORT=$CDP_PORT when running the server"
