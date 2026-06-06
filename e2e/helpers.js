const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const BASE_URL = 'http://localhost:3000';
const PROJECT_ROOT = path.join(__dirname, '..');
const PUBLIC_DIR = path.join(PROJECT_ROOT, 'content/ai_exchange/public');
const { launchOptions } = require('./puppeteer-chrome');

let serverProcess;

function build() {
  const env = { ...process.env };
  const localGo = path.join(PROJECT_ROOT, '.tools', 'go', 'bin');
  if (fs.existsSync(path.join(localGo, 'go'))) {
    env.PATH = `${localGo}:${env.PATH || ''}`;
  }
  execSync('npm run build:site && npm run pagefind', {
    cwd: PROJECT_ROOT,
    stdio: 'inherit',
    env,
  });
}

function startServer() {
  return new Promise((resolve, reject) => {
    const serveBin = path.join(PROJECT_ROOT, 'node_modules', '.bin', 'serve');
    const serveCmd = fs.existsSync(serveBin) ? serveBin : 'npx';
    const serveArgs = fs.existsSync(serveBin)
      ? [PUBLIC_DIR, '-p', '3000']
      : ['serve', PUBLIC_DIR, '-p', '3000'];

    serverProcess = spawn(serveCmd, serveArgs, {
      cwd: PROJECT_ROOT,
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let resolved = false;
    const timeout = setTimeout(() => {
      if (!resolved) {
        resolved = true;
        reject(new Error('Server failed to start within 60s'));
      }
    }, 60000);
    const checkReady = (chunk) => {
      const text = String(chunk);
      if (
        text.includes('Accepting connections') ||
        text.includes('localhost:3000') ||
        text.includes('127.0.0.1:3000')
      ) {
        if (resolved) return;
        resolved = true;
        clearTimeout(timeout);
        setTimeout(resolve, 800);
      }
    };
    serverProcess.stdout?.on('data', checkReady);
    serverProcess.stderr?.on('data', checkReady);
    serverProcess.on('error', reject);
    serverProcess.on('exit', (code) => {
      if (!resolved) {
        resolved = true;
        clearTimeout(timeout);
        reject(new Error(`Server exited before ready (code ${code})`));
      }
    });
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
  const browser = await puppeteer.launch(launchOptions());
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

module.exports = { BASE_URL, build, startServer, stopServer, withBrowser };
