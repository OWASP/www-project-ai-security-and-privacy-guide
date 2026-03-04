const { spawn } = require('child_process');
const path = require('path');
const { execSync } = require('child_process');

const BASE_URL = 'http://localhost:3000';
const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/public');

let serverProcess;

function build() {
  execSync('npm run build:site && npm run pagefind', {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    serverProcess = spawn('npx', ['serve', PUBLIC_DIR, '-p', '3000'], {
      cwd: PROJECT_ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Server failed to start within 15s'));
      }
    }, 15000);
    const checkReady = () => {
      if (resolved) return;
      resolved = true;
      clearTimeout(timeout);
      setTimeout(resolve, 800);
    };
    serverProcess.stdout?.on('data', (d) => {
      if (String(d).includes('3000') || String(d).includes('localhost')) checkReady();
    });
    serverProcess.stderr?.on('data', (d) => {
      if (String(d).includes('3000') || String(d).includes('localhost')) checkReady();
    });
    serverProcess.on('error', reject);
  });
}

function stopServer() {
  if (serverProcess) {
    serverProcess.kill('SIGTERM');
    serverProcess = null;
  }
}

async function withBrowser(fn) {
  const puppeteer = require('puppeteer');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

module.exports = { BASE_URL, build, startServer, stopServer, withBrowser };
