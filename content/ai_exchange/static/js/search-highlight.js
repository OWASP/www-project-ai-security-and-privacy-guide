(function () {
  // Read ?q= from URL
  const params = new URLSearchParams(window.location.search);
  let q = params.get("q");
  if (!q) return;

  // Normalize: + => space, decode, trim
  try { q = decodeURIComponent(q.replace(/\+/g, " ")); } catch {}
  q = q.trim();
  if (!q) return;

  // Support quoted phrases + individual words (min length 2)
  const phrases = [];
  q.replace(/"([^"]+)"/g, (_, m) => (phrases.push(m.trim()), ""));
  const rest = q.replace(/"[^"]+"/g, "").trim();
  const words = rest ? rest.split(/\s+/).filter(w => w.length >= 2) : [];
  const terms = [...new Set([...phrases, ...words].map(t => t.toLowerCase()))];
  if (!terms.length) return;

  // Inject minimal CSS
  const style = document.createElement("style");
  style.textContent = `
    .search-highlight {
      background: #ffeb3b;
      padding: 0 .06em;
      border-radius: .2em;
    }
  `;
  document.head.appendChild(style);

  // Choose a safe container (adjust if needed)
  const container = document.querySelector("main, article, .content, .post-content, .markdown");
  if (!container) return;

  // Build regexes (escape special chars)
  const regexes = terms.map(t => ({
    re: new RegExp(t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi")
  }));

  // Walk text nodes and wrap matches
  const walker = document.createTreeWalker(
    container,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        if (!node.nodeValue || !node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        const p = node.parentNode;
        if (!p) return NodeFilter.FILTER_REJECT;
        const tag = p.nodeName.toLowerCase();
        if (["script","style","noscript","code","pre"].includes(tag)) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  const matches = [];
  textNodes.forEach(n => {
    let txt = n.nodeValue;
    let changed = false;
    regexes.forEach(({re}) => {
      if (re.test(txt)) {
        changed = true;
        txt = txt.replace(re, m => `<span class="search-highlight">${m}</span>`);
      }
    });
    if (changed) {
      const frag = document.createElement("span");
      frag.innerHTML = txt;
      const parent = n.parentNode;
      parent.replaceChild(frag, n);
      // Move children out to avoid extra nesting
      const toInsert = [];
      while (frag.firstChild) toInsert.push(frag.firstChild), frag.removeChild(frag.firstChild);
      toInsert.forEach(c => {
        parent.insertBefore(c, frag);
        if (c.nodeType === 1 && c.classList.contains("search-highlight")) matches.push(c);
      });
      parent.removeChild(frag);
    }
  });

  // Scroll to first match (center)
  if (matches.length) {
    matches[0].scrollIntoView({ behavior: "smooth", block: "center" });
  }
})();
