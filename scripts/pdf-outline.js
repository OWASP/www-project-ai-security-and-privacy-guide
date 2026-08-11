const { PDFArray, PDFDict, PDFName } = require('pdf-lib');

// Shared reader for the document outline (bookmarks) tree of a PDF loaded with
// pdf-lib. The build script (assert + title repair) and the e2e suite all need
// the same First/Next traversal; keeping it here stops the copies drifting
// apart (issue #198).

// Depth-first walk over the outline tree in document order, starting at depth
// 1. Calls visit(item, depth) with each bookmark item dictionary. Returns
// false without visiting anything when the PDF has no outline. Throws on a
// malformed tree that revisits an item, instead of looping forever.
function walkOutline(pdfDoc, visit) {
  const outlinesRef = pdfDoc.catalog.get(PDFName.of('Outlines'));
  if (!outlinesRef) return false;
  const seen = new Set();
  const walk = (dict, depth) => {
    let itemRef = dict.get(PDFName.of('First'));
    while (itemRef) {
      const tag = itemRef.toString();
      if (seen.has(tag)) {
        throw new Error(`Document outline is malformed: item ${tag} appears twice in the tree.`);
      }
      seen.add(tag);
      const item = pdfDoc.context.lookup(itemRef, PDFDict);
      visit(item, depth);
      walk(item, depth + 1);
      itemRef = item.get(PDFName.of('Next'));
    }
  };
  walk(pdfDoc.context.lookup(outlinesRef, PDFDict), 1);
  return true;
}

function itemTitle(item) {
  const title = item.get(PDFName.of('Title'));
  return title && title.decodeText ? title.decodeText() : null;
}

// A bookmark points either at a /Dest array directly or through a /A GoTo
// action; either way the first element must reference a page in the document.
function itemResolvesToPage(pdfDoc, pageRefs, item) {
  let dest = item.get(PDFName.of('Dest'));
  if (!dest) {
    const actionRef = item.get(PDFName.of('A'));
    if (!actionRef) return false;
    dest = pdfDoc.context.lookup(actionRef, PDFDict).get(PDFName.of('D'));
  }
  if (!dest) return false;
  const destArray = pdfDoc.context.lookup(dest);
  if (!(destArray instanceof PDFArray) || destArray.size() === 0) return false;
  return pageRefs.has(destArray.get(0).toString());
}

// Flatten the outline into [{item, depth, title, resolvesToPage}] in document
// order, or null when the PDF has no outline. `item` is the live pdf-lib
// dictionary, so callers may mutate entries (e.g. rewrite a /Title).
function collectOutline(pdfDoc) {
  const pageRefs = new Set(pdfDoc.getPages().map((p) => p.ref.toString()));
  const entries = [];
  const hasOutline = walkOutline(pdfDoc, (item, depth) => {
    entries.push({
      item,
      depth,
      title: itemTitle(item),
      resolvesToPage: itemResolvesToPage(pdfDoc, pageRefs, item),
    });
  });
  return hasOutline ? entries : null;
}

module.exports = { collectOutline };
