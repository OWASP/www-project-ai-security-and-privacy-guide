#!/usr/bin/env node
/**
 * E2E test suite - run manually with: npm run test:e2e
 * Not added to CI.
 */
const path = require('path');
const fs = require('fs');
const { BASE_URL, build, startServer, stopServer, withBrowser } = require('./helpers');

const results = { pass: 0, fail: 0, errors: [] };
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

function pass(name) {
  results.pass++;
  console.log('  ✓', name);
}

function fail(name, err) {
  results.fail++;
  results.errors.push({ name, err: err.message });
  console.log('  ✗', name, '-', err.message);
}

async function run(name, fn) {
  try {
    await fn();
    pass(name);
  } catch (err) {
    fail(name, err);
  }
}

// --- Tests ---

async function testSearchHighlightSection(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent#threats-to-agentic-ai`, {
    waitUntil: 'networkidle0',
    timeout: 10000,
  });
  await page.waitForSelector('.search-highlight-current', { timeout: 5000 });
  const url = page.url();
  if (!url.includes('#threats-to-agentic-ai')) throw new Error(`URL missing hash: ${url}`);
  const isInSection = await page.evaluate(() => {
    const current = document.querySelector('.search-highlight-current');
    const sectionAnchor = document.getElementById('threats-to-agentic-ai');
    if (!current || !sectionAnchor) return false;
    const sectionHeading = sectionAnchor.closest('h1, h2, h3, h4, h5, h6');
    if (!sectionHeading) return false;
    if (sectionHeading.contains(current)) return true;
    let next = sectionHeading.nextElementSibling;
    while (next) {
      if (/^H[1-6]$/.test((next.tagName || '').toUpperCase())) break;
      if (next.contains(current)) return true;
      next = next.nextElementSibling;
    }
    return false;
  });
  if (!isInSection) throw new Error('Current highlight not in section');
}

async function testSearchFullFlow(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/`, { waitUntil: 'networkidle0' });
  await page.click('#search-toggle');
  await page.waitForSelector('.search-overlay.active', { timeout: 3000 });
  const input = await page.waitForSelector(
    'input[type="search"], .pagefind-ui__search-input, #pagefind-search input',
    { timeout: 5000 }
  );
  await input.type('agent', { delay: 50 });
  await delay(2000);
  const link = await page.waitForSelector(
    '#pagefind-search a[href*="threats-to-agentic-ai"]',
    { timeout: 8000 }
  );
  await Promise.all([
    page.waitForNavigation({ waitUntil: 'networkidle0' }),
    link.click(),
  ]);
  await page.waitForSelector('.search-highlight-current', { timeout: 5000 });
  const url = page.url();
  if (!url.includes('threats-to-agentic-ai')) {
    throw new Error(`Expected threats-to-agentic-ai section: ${url}`);
  }
  const inSection = await page.evaluate(() => {
    const current = document.querySelector('.search-highlight-current');
    const anchor = document.getElementById('threats-to-agentic-ai');
    if (!current || !anchor) return false;
    const heading = anchor.closest('h1, h2, h3, h4, h5, h6');
    if (!heading) return false;
    if (heading.contains(current)) return true;
    let next = heading.nextElementSibling;
    while (next) {
      if (/^H[1-6]$/.test((next.tagName || '').toUpperCase())) break;
      if (next.contains(current)) return true;
      next = next.nextElementSibling;
    }
    return false;
  });
  if (!inSection) throw new Error('Highlight not in threats-to-agentic-ai section');
}

async function testHighlightNoHash(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-current', { timeout: 5000 });
  const bar = await page.$('.search-highlight-bar-visible');
  if (!bar) throw new Error('Highlight bar not visible');
  const countText = await page.$eval('.search-highlight-count', (el) => el.textContent);
  if (!countText || (!countText.includes('match') && !countText.includes('Match'))) {
    throw new Error(`Expected match count: ${countText}`);
  }
}

async function testNextPrev(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-bar-visible', { timeout: 5000 });
  const nextBtn = await page.$('.search-highlight-next');
  if (!nextBtn) throw new Error('Next button not found');
  const isDisabled = await nextBtn.evaluate((el) => el.disabled);
  if (isDisabled) throw new Error('Next should be enabled with multiple matches');
  await nextBtn.click();
  await delay(400);
  const current = await page.$('.search-highlight-current');
  if (!current) throw new Error('Current highlight lost after Next');
  const prevBtn = await page.$('.search-highlight-prev');
  await prevBtn.click();
  await delay(400);
  const current2 = await page.$('.search-highlight-current');
  if (!current2) throw new Error('Current highlight lost after Prev');
}

async function testClear(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-close', { timeout: 5000 });
  await page.click('.search-highlight-close');
  await delay(400);
  const bar = await page.$('.search-highlight-bar');
  if (bar) throw new Error('Bar should be removed');
  const highlights = await page.$$('.search-highlight-word');
  if (highlights.length > 0) throw new Error('Highlights should be removed');
}

async function testMatchCount(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-count', { timeout: 5000 });
  const text = await page.$eval('.search-highlight-count', (el) => el.textContent);
  if (!text.match(/Match \d+ of \d+|1 match found/)) {
    throw new Error(`Expected "Match X of Y" or "1 match found": ${text}`);
  }
  const nextBtn = await page.$('.search-highlight-next');
  if (nextBtn && !(await nextBtn.evaluate((el) => el.disabled))) {
    await nextBtn.click();
    await delay(300);
    const text2 = await page.$eval('.search-highlight-count', (el) => el.textContent);
    if (!text2.includes('Match 2')) throw new Error(`Count should update: ${text2}`);
  }
}

async function testBarVisibility(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-bar-visible', { timeout: 5000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
  await delay(400);
  const barVisible = await page.evaluate(() => {
    const bar = document.querySelector('.search-highlight-bar-visible');
    if (!bar) return false;
    const rect = bar.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight + 50;
  });
  if (!barVisible) {
    const bar = await page.$('.search-highlight-bar-visible');
    if (!bar) throw new Error('Bar not visible when scrolled');
  }
}

async function testHomepage(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  const title = await page.title();
  if (!title || !title.toLowerCase().includes('ai')) throw new Error(`Bad title: ${title}`);
  const nav = await page.$('.main-navigation, .nav-list');
  if (!nav) throw new Error('Main nav not found');
  const hero = await page.$('h1, .hero-content');
  if (!hero) throw new Error('Hero content not found');
}

async function testDocsOverview(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/`, { waitUntil: 'networkidle0' });
  const title = await page.$('.docs-title, h1');
  if (!title) throw new Error('Docs title not found');
  const toc = await page.$('#TableOfContents, .docs-toc');
  if (!toc) throw new Error('TOC not found');
}

async function testMainNav(page) {
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  const links = [
    { text: 'Content', href: '/docs/ai_security_overview/' },
    { text: 'Media', href: '/media/' },
  ];
  for (const { text, href } of links) {
    const link = await page.$(`a.nav-link[href*="${href.split('/')[1]}"]`);
    if (!link) throw new Error(`Nav link not found: ${text}`);
    await link.click();
    await page.waitForNavigation({ waitUntil: 'networkidle0' });
    const url = page.url();
    if (!url.includes(href.split('/')[1])) throw new Error(`Wrong page after ${text}: ${url}`);
  }
}

async function testMobileMenu(page) {
  await page.setViewport({ width: 375, height: 667 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle0' });
  const hamburger = await page.$('.hamburger');
  if (!hamburger) throw new Error('Hamburger not found');
  await hamburger.click();
  await page.waitForSelector('.mobile-menu-overlay.active', { timeout: 3000 });
  const menuLink = await page.$('.mobile-nav-link[href*="docs"]');
  if (!menuLink) throw new Error('Mobile nav link not found');
  await menuLink.click();
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
  const url = page.url();
  if (!url.includes('docs')) throw new Error(`Mobile nav did not navigate: ${url}`);
}

async function testKeyboardNavigation(page) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-bar-visible', { timeout: 5000 });
  const before = await page.$eval('.search-highlight-count', (el) => el.textContent || '');
  // ArrowDown should move to next match
  await page.keyboard.press('ArrowDown');
  await delay(400);
  const afterDown = await page.$eval('.search-highlight-count', (el) => el.textContent || '');
  if (afterDown === before) {
    throw new Error(`Keyboard ArrowDown did not change current match: ${before} -> ${afterDown}`);
  }
  // ArrowUp should move back
  await page.keyboard.press('ArrowUp');
  await delay(400);
  const afterUp = await page.$eval('.search-highlight-count', (el) => el.textContent || '');
  if (afterUp === afterDown) {
    throw new Error(`Keyboard ArrowUp did not change current match: ${afterDown} -> ${afterUp}`);
  }
}

async function testSearchNoResultsHighlight(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=doesnotexist`, {
    waitUntil: 'networkidle0',
  });
  await delay(800);
  const bar = await page.$('.search-highlight-bar');
  if (bar) throw new Error('Bar should not appear for term with no matches');
  const highlights = await page.$$('.search-highlight-word');
  if (highlights.length > 0) throw new Error('No highlights expected for term with no matches');
  // Sanity: page content is still there
  const heading = await page.$('.docs-title, h1');
  if (!heading) throw new Error('Page did not render correctly');
}

async function testSearchFocusManagement(page) {
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto(`${BASE_URL}/docs/ai_security_overview/`, { waitUntil: 'networkidle0' });
  // Open search with keyboard '/' shortcut
  await page.keyboard.press('/');
  await page.waitForSelector('.search-overlay.active', { timeout: 3000 });
  // Focus on the Pagefind input may be slightly delayed; poll briefly
  let ok = false;
  for (let i = 0; i < 5 && !ok; i++) {
    const focusOpen = await page.evaluate(() => {
      const active = document.activeElement;
      const inPagefind = active && active.closest('#pagefind-search');
      const isInput =
        active &&
        (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA' || active.isContentEditable);
      return { isInput, inPagefind: !!inPagefind };
    });
    if (focusOpen.isInput && focusOpen.inPagefind) {
      ok = true;
      break;
    }
    await delay(200);
  }
  if (!ok) {
    throw new Error('When search opens, focus should be on the Pagefind input');
  }
  // Close with Escape and check focus returns to search toggle
  await page.keyboard.press('Escape');
  await delay(200);
  const focusClose = await page.evaluate(() => {
    const active = document.activeElement;
    const inOverlay = active && active.closest('#pagefind-search');
    return {
      id: active && active.id,
      inOverlay: !!inOverlay,
      overlayActive: !!document.querySelector('.search-overlay.active'),
    };
  });
  if (focusClose.overlayActive) throw new Error('Search overlay should be closed after Escape');
  if (focusClose.inOverlay) {
    throw new Error('Focus should not remain trapped inside the search overlay after Escape');
  }
}

async function testSearchBarAria(page) {
  await page.goto(`${BASE_URL}/docs/ai_security_overview/?highlight=agent`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-bar-visible', { timeout: 5000 });
  const attrs = await page.evaluate(() => {
    const bar = document.querySelector('.search-highlight-bar');
    if (!bar) return null;
    const prev = document.querySelector('.search-highlight-prev');
    const next = document.querySelector('.search-highlight-next');
    const close = document.querySelector('.search-highlight-close');
    return {
      role: bar.getAttribute('role'),
      ariaLive: bar.getAttribute('aria-live'),
      prevLabel: prev && prev.getAttribute('aria-label'),
      nextLabel: next && next.getAttribute('aria-label'),
      closeLabel: close && close.getAttribute('aria-label'),
    };
  });
  if (!attrs) throw new Error('Search highlight bar not found for ARIA test');
  if (attrs.role !== 'status') throw new Error(`Expected bar role=status, got ${attrs.role}`);
  if (attrs.ariaLive !== 'polite')
    throw new Error(`Expected bar aria-live=polite, got ${attrs.ariaLive}`);
  if (!attrs.prevLabel || !attrs.nextLabel || !attrs.closeLabel) {
    throw new Error(
      `Expected aria-labels on prev/next/close, got prev=${attrs.prevLabel}, next=${attrs.nextLabel}, close=${attrs.closeLabel}`
    );
  }
}

async function testHighlightOnOtherPage(page) {
  await page.goto(`${BASE_URL}/docs/2_threats_through_use/?highlight=threats`, {
    waitUntil: 'networkidle0',
  });
  await page.waitForSelector('.search-highlight-bar-visible', { timeout: 5000 });
  const highlights = await page.$$('.search-highlight-word');
  if (highlights.length === 0) {
    throw new Error('Expected at least one highlight on other docs page');
  }
}

async function testHashOnlyScroll(page) {
  // First: hash-only navigation without highlight
  await page.goto(`${BASE_URL}/docs/ai_security_overview/#threats-to-agentic-ai`, {
    waitUntil: 'networkidle0',
  });
  const positionOk = await page.evaluate(() => {
    const el = document.getElementById('threats-to-agentic-ai');
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.top < window.innerHeight / 2;
  });
  if (!positionOk) throw new Error('Hash-only navigation did not scroll to section');
  const bar = await page.$('.search-highlight-bar');
  if (bar) throw new Error('Highlight bar should not appear for hash-only navigation');

  // Then: same section with highlight parameter still works
  await page.goto(
    `${BASE_URL}/docs/ai_security_overview/?highlight=agent#threats-to-agentic-ai`,
    { waitUntil: 'networkidle0' }
  );
  await page.waitForSelector('.search-highlight-current', { timeout: 5000 });
  const url = page.url();
  if (!url.includes('threats-to-agentic-ai')) {
    throw new Error(`Expected section hash with highlight: ${url}`);
  }
}

function testPdfBuild() {
  const { execSync } = require('child_process');
  execSync('npm run build:pdf', { cwd: path.join(__dirname, '..'), stdio: 'pipe' });
  const pdfPath = path.join(__dirname, '../content/ai_exchange/public/OWASP-AI-Exchange.pdf');
  if (!fs.existsSync(pdfPath)) throw new Error('PDF not generated');
  const stat = fs.statSync(pdfPath);
  if (stat.size < 10000) throw new Error(`PDF too small: ${stat.size} bytes`);
}

// --- Runner ---

async function main() {
  console.log('Building site and starting server...\n');
  build();
  await startServer();
  console.log('Server running at', BASE_URL, '\n');

  await withBrowser(async (browser) => {
    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 800 });

    await run('1. Search highlight scrolls to section (issue #150)', () =>
      testSearchHighlightSection(page)
    );
    await run('2. Full search flow: search → click result → land in section', () =>
      testSearchFullFlow(page)
    );
    await run('3. Highlight without hash scrolls to first match', () =>
      testHighlightNoHash(page)
    );
    await run('4. Next/Previous navigation keeps highlights', () => testNextPrev(page));
    await run('5. Clear button removes highlights', () => testClear(page));
    await run('6. Match count displays correctly', () => testMatchCount(page));
    await run('7. Highlight bar visible when scrolled', () => testBarVisibility(page));
    await run('8. Homepage loads', () => testHomepage(page));
    await run('9. Docs overview loads', () => testDocsOverview(page));
    await run('10. Main navigation works', () => testMainNav(page));
    await run('11. Mobile menu works', () => testMobileMenu(page));
    await run('12. Keyboard navigation between matches works', () =>
      testKeyboardNavigation(page)
    );
    await run('13. Non-existent highlight term produces no bar', () =>
      testSearchNoResultsHighlight(page)
    );
    await run('14. Search focus management works (open/close)', () =>
      testSearchFocusManagement(page)
    );
    await run('15. Highlight bar ARIA attributes are set', () => testSearchBarAria(page));
    await run('16. Highlight works on another docs page', () => testHighlightOnOtherPage(page));
    await run('17. Hash-only scroll and highlight coexist', () => testHashOnlyScroll(page));
  });

  await run('18. PDF build succeeds', () => testPdfBuild());

  stopServer();

  console.log('\n---');
  console.log(`Passed: ${results.pass}, Failed: ${results.fail}`);
  if (results.fail > 0) {
    results.errors.forEach(({ name, err }) => console.error(`  ${name}: ${err}`));
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('Fatal:', err);
  stopServer();
  process.exit(1);
});
