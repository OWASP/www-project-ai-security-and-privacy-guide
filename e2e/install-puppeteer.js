#!/usr/bin/env node
const { execSync, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const { Browser } = require('@puppeteer/browsers');
const {
  PUPPETEER_CACHE_DIR,
  CHROME_BUILD_ID,
  resolveChromeExecutablePath,
} = require('./puppeteer-chrome');

function validateChromeInstall(executablePath) {
  const result = spawnSync(executablePath, ['--version'], {
    encoding: 'utf8',
    timeout: 15000,
  });
  if (result.error || result.status !== 0) {
    const detail = result.stderr || result.stdout || result.error?.message || 'unknown error';
    throw new Error(`chrome-headless-shell failed --version check: ${detail}`);
  }
}

function removeManagedChromeCache() {
  if (fs.existsSync(PUPPETEER_CACHE_DIR)) {
    fs.rmSync(PUPPETEER_CACHE_DIR, { recursive: true, force: true });
  }
}

function extractZipFallback() {
  const browserRoot = path.join(PUPPETEER_CACHE_DIR, 'chrome-headless-shell');
  const zips = fs
    .readdirSync(browserRoot)
    .filter((name) => name.endsWith('.zip'))
    .map((name) => path.join(browserRoot, name));
  if (!zips.length) {
    throw new Error(`No chrome-headless-shell zip found in ${browserRoot}`);
  }

  const targetDir = path.join(browserRoot, `mac_arm-${CHROME_BUILD_ID}`);
  fs.mkdirSync(targetDir, { recursive: true });

  for (const zipPath of zips) {
    execSync(`unzip -o -q "${zipPath}" -d "${targetDir}"`, { stdio: 'inherit' });
  }
}

async function installManagedChrome() {
  const { install } = require('@puppeteer/browsers');
  removeManagedChromeCache();
  fs.mkdirSync(PUPPETEER_CACHE_DIR, { recursive: true });

  console.log('Installing Puppeteer chrome-headless-shell to', PUPPETEER_CACHE_DIR);
  try {
    await install({
      browser: Browser.CHROMEHEADLESSSHELL,
      buildId: CHROME_BUILD_ID,
      cacheDir: PUPPETEER_CACHE_DIR,
    });
  } catch (err) {
    console.warn('Puppeteer install reported an error; attempting unzip fallback:', err.message);
  }

  try {
    return resolveChromeExecutablePath();
  } catch (_) {
    extractZipFallback();
    return resolveChromeExecutablePath();
  }
}

async function main() {
  try {
    const executablePath = resolveChromeExecutablePath();
    validateChromeInstall(executablePath);
    console.log('Puppeteer chrome-headless-shell already installed at', executablePath);
    return;
  } catch (_) {}

  const installedChrome = await installManagedChrome();
  validateChromeInstall(installedChrome);
  console.log('Puppeteer chrome-headless-shell installed at', installedChrome);
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
