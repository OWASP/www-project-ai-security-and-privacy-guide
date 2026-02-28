# PDF Generation

This directory contains the scripts and assets used to generate the OWASP AI Exchange PDF from the website's HTML content.

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

## Running the Generator

To generate the PDF manually, make sure you have run `npm install`, then execute:

```bash
node scripts/generate-pdf.js
```

The resulting PDF will be saved to `content/ai_exchange/public/OWASP-AI-Exchange.pdf`.
