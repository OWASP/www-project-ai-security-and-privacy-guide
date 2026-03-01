# PDF Generation

This directory contains the scripts and assets used to generate the OWASP AI Exchange PDF from the website's HTML content.

## Running the Generator

**Prerequisites:** The site must be built first. Either run the full build or build the site and search index:

```bash
# Full build (site + search + PDF) - recommended
npm run build:all

# Or step by step:
npm run build:site    # Build Hugo site
npm run pagefind     # Build search index
npm run build:pdf    # Generate PDF (requires site to be built)
```

The PDF is saved to `content/ai_exchange/public/OWASP-AI-Exchange.pdf`.

## Modifying the PDF Look and Feel

There are two main ways to customize the look and feel of the generated PDF:

### 1. Frontpage (`pdf_frontpage.html`)

The frontpage of the PDF can be customized by editing the `scripts/pdf_frontpage.html` file. This is a standard HTML file that gets injected at the beginning of the document.

The script supports two placeholders that are automatically replaced during generation:
- `{{ASSETS_DIR}}`: Absolute path to the repository's `assets/` directory (useful for embedding images).
- `{{DATE}}`: The current date formatted as a locale date string.

### 2. Styles and Layout (`generate-pdf.js`)

For all other styling (fonts, colors, margins, table of contents, headers/footers), you need to modify `scripts/generate-pdf.js`.

- **CSS Styling:** Find the `style.textContent` block inside `generate-pdf.js`. Here you can change CSS properties such as:
  - `font-size`, `font-family`, and `color` for `body`, `h1`, `h2`, etc.
  - Margins and padding.
  - Styles for specific elements like `table`, `pre`, and `img`.

- **Page Margins and PDF Metadata:** Search for the `page.pdf({...})` configuration block in `generate-pdf.js`. You can modify:
  - `margin`: Change the `top`, `bottom`, `left`, and `right` margins (e.g., `20mm`).
  - `headerTemplate` & `footerTemplate`: Customize the HTML used for the header and footer on each page. Note that the font sizes here are generally smaller and require inline styles.
  - `format`: Set the page format (e.g., `A4`, `Letter`).

- **PDF Metadata:** Title, author, subject, and keywords are set via pdf-lib after generation. Search for `pdfDoc.setTitle` in `generate-pdf.js` to modify.

## Image Quality

For best PDF output, use source images at least **600–800 px wide**. Small images (e.g. 464–479 px) will be scaled up and may appear pixelated. Images in sections 2.1, 2.3, and 2.4 are currently below this threshold; replacing them with higher-resolution versions will improve quality.

## Content Parity

PDF generation includes a content parity check. It fails if images or tables in the assembled PDF content don't match the website. Fix any missing images or content mismatches before the PDF will generate successfully.
