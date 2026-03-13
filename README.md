# OWASP AI Exchange Flagship project

Welcome to the GitHub repository for the OWASP AI Exchange, to be found at [owaspai.org](http://owaspai.org/): the living set of documents that collect AI threats and controls from collaboration between experts worldwide.

The goal of this initiative is to collect and clearly present the state of the art on AI security and privacy through community collaboration.

## Project Lead

- [Rob van der Veer (Software Improvement Group)](https://www.linkedin.com/in/robvanderveer/) - [rob.vanderveer@owasp.org](mailto:rob.vanderveer@owasp.org)

## Tech

The website at owaspai.org is rendered from this Github repository by technology called Hugo, part of the CI/CD pipeline. Search is powered by [Pagefind](https://pagefind.app/), which runs after the Hugo build.

### Testing the site (including search) locally

From the repo root (Hugo is run via `npx`, so you don't need it installed):

```bash
npm run test:site
```

This builds the site, builds the Pagefind search index, and serves it at **http://localhost:3000**. Open that URL, click the search icon in the header, and try a query.

Or run the steps separately:

```bash
npm run build:site    # Hugo build
npm run pagefind      # Search index (required for search to work)
npm run serve         # Serve at http://localhost:3000
```

**If you get** `permission denied` **on** `/var/lib/snapd/void` **when using a system-installed Hugo:** that's the Snap sandbox. Either run `sudo snap install hugo --classic` or use the commands above—they use `npx hugo-extended` so no system Hugo is needed.

## Contributions

The OWASP projects are an open source effort, and we enthusiastically welcome all forms of contributions and feedback.

Contribution instructions at https://owaspai.org/contribute/

In case this repo is still called AI security and privacy guide: that is for historical reasons.
