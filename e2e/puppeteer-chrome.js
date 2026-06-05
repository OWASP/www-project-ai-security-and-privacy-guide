const fs = require('fs');
const path = require('path');
const { Browser, computeExecutablePath } = require('@puppeteer/browsers');
const { PUPPETEER_REVISIONS } = require('puppeteer-core/lib/cjs/puppeteer/revisions.js');

const PROJECT_ROOT = path.join(__dirname, '..');
const PUPPETEER_CACHE_DIR = path.join(PROJECT_ROOT, '.cache', 'puppeteer');
const CHROME_BUILD_ID = PUPPETEER_REVISIONS['chrome-headless-shell'];

process.env.PUPPETEER_CACHE_DIR = PUPPETEER_CACHE_DIR;

function resolveChromeExecutablePath() {
  const executablePath = computeExecutablePath({
    cacheDir: PUPPETEER_CACHE_DIR,
    browser: Browser.CHROMEHEADLESSSHELL,
    buildId: CHROME_BUILD_ID,
  });
  if (!fs.existsSync(executablePath)) {
    throw new Error(
      `Puppeteer chrome-headless-shell is not installed at ${executablePath}. Run: npm run puppeteer:install`
    );
  }
  return executablePath;
}

function launchOptions(extraArgs = []) {
  return {
    headless: 'shell',
    executablePath: resolveChromeExecutablePath(),
    args: ['--no-sandbox', '--disable-setuid-sandbox', ...extraArgs],
  };
}

module.exports = {
  PUPPETEER_CACHE_DIR,
  CHROME_BUILD_ID,
  resolveChromeExecutablePath,
  launchOptions,
};
