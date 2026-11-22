# Contributing to the OWASP AI Exchange

See [the AI Exchange contribute page](https://owaspai.org/contribute/) for instructions to contribute on content. If you want to contribute beyond content (e.g. website features), then read below.




---

How to contribute to the **OWASP AI Exchange** and edit/preview your changes locally.

## Get the repository locally
To make changes to it and preview, you must download the repository (the codebase/where the website lives) onto your computer. Doing this via zip file or a git command is not the best option, because your changes will have to be suggested via a pull request (or PR in short). To achieve this we must make a **fork**. A fork is your own copy of the repository, or a <u>'personal clone of the code'</u> (the codebase/where the website lives) that you can make changes to without suggesting them immediately.
1. Sign up or log in to GitHub, this is **required to make a clone and suggest your changes**, do this via [here](https://github.com/signup)
2. Navigate to the [main page](https://github.com/OWASP/www-project-ai-security-and-privacy-guide) of the GitHub repository
3. Click **Fork** in the top right
4. This will open a page asking you to configure your fork. GitHub should autocomplete this, by giving your fork a name, owner and description, so just press **Create fork**
5. Congrats! You have just created your own copy of the site!

Great, now let's get it onto your machine. First you need **git**, and installing it **differs per operating system**, so please choose the right option from below for your operating system and follow those steps!

<details>
  <summary><b>Windows</b></summary>

  Using browser to install
  1. Go to the [Git for Windows download page](https://git-scm.com).
  2. Download the **64-bit Git for Windows Setup** installer.
  3. Open the `.exe` file and follow the setup wizard. *(Just use the default settings unless you know what you're doing).*

  Using terminal to install
  1. Open Windows Terminal, Command Prompt, or PowerShell
  2. Run:
  ```bash
  winget install --id Git.Git -e --source winget
  ```

  ### Verification
  Open a new terminal window and type:
  ```bash
  git --version
  ```
</details>

<details>
  <summary><b>macOS</b></summary>

  Using terminal to install (advanced):
  if you have [Homebrew](https://brew.sh) installed, open your Terminal and run:
  ```bash
  brew install git
  ```

  Using browser to install:
  1. Go to the [Git macOS download page](https://git-scm.com).
  2. Download the `.dmg` installer file.
  3. Open the file and follow the on-screen instructions.

  On newer versions via terminal:
  1. Open your Terminal
  2. Type `git`, and press enter.
  3. If it is not installed, macOS will automatically prompt you to install the **Xcode Command Line Tools**, which includes Git. Follow those instructions.

  ### Verification
  Open your Terminal and type:
  ```bash
  git --version
  ```
</details>

<details>
  <summary><b>Linux</b></summary>

  Most Linux distributions can install git with their package manager, for example:
  ```bash
  sudo apt install git     # Ubuntu / Debian
  sudo dnf install git     # Fedora
  ```

  ### Verification
  ```bash
  git --version
  ```
</details>

Now that you have **git** installed, we can get the repository on your computer:
1. Navigate to the desired location/folder you want the repository to be installed in using the `cd` command. By default you start in `~`, your user folder (the folder with your username in Finder or File Explorer).
2. Run the command below, or go to your fork on GitHub, press the green **Code** button and copy the link shown there:
```bash
git clone https://github.com/<youraccountname>/<repositoryname>
```
3. Go into the new folder: `cd <repositoryname>`

Congrats, now you are ready to start making actual changes!

## Contribution guidelines
Before you start writing content, please read and apply the [Content contribution guidelines](https://owaspai.org/go/ccg) on the contribute page. They cover the roadmap, avoiding advertising and self-promotion, labelling AI use, and the general writing goal. Not sure about something? Feel free to [reach out to us](https://owaspai.org/connect) with your questions.

## Making changes and recording them for later merge
To make it easier for moderators/admins to review your changes, split them into **multiple pull requests (PRs)**. To make those, you first make your changes and upload them to your fork, so they can be merged.
1. Make your changes. That's something there is no tutorial for... sorry
2. Make sure to only make changes to <b>1 kind of issue,</b> this means: 'fixing typos in the documentation on clause x page x, x.x title.' before uploading any of your changes, so you can split them easily later.
3. Made your changes, fixed the typos? Great, now let's record what you changed with a title, so we can later upload it to your own copy of the site. First select the changed files, then save them with a short description:
```bash
git add .
git commit -m 'describe what you changed here'
```

Want to see your changes locally? I get that, let's explain how to do so.

## Previewing your changes locally
The website is built with a tool called **Hugo**. You don't have to install Hugo yourself, but Hugo needs two helpers on your computer: **Node.js** (runs Hugo for you) and **Go** (downloads the look/theme of the site). You only have to install these once.

<details>
  <summary><b>Windows</b></summary>

  Using browser to install
  1. Go to [nodejs.org](https://nodejs.org) and download the **LTS** version, open the `.msi` file and click through the installer.
  2. Go to [go.dev/dl](https://go.dev/dl/) and download the **Microsoft Windows** installer, open it and click through the installer.

  Using terminal to install
  1. Open Windows Terminal, Command Prompt, or PowerShell
  2. Run:
  ```bash
  winget install OpenJS.NodeJS.LTS
  winget install GoLang.Go
  ```

  ### Verification
  Close your terminal, open a **new** one and type:
  ```bash
  node --version
  go version
  ```
</details>

<details>
  <summary><b>macOS</b></summary>

  Using terminal to install (advanced):
  if you have [Homebrew](https://brew.sh) installed, open your Terminal and run:
  ```bash
  brew install node go
  ```

  Using browser to install:
  1. Go to [nodejs.org](https://nodejs.org), download the **LTS** version (`.pkg` file), open it and follow the instructions.
  2. Go to [go.dev/dl](https://go.dev/dl/), download the **macOS** installer (`.pkg` file, pick **ARM64** for M1/M2/M3/M4 Macs, **x86-64** for older Intel Macs), open it and follow the instructions.

  ### Verification
  Close your Terminal, open a **new** one and type:
  ```bash
  node --version
  go version
  ```
</details>

<details>
  <summary><b>Linux</b></summary>

  Install **Node.js** and **Go** with your package manager, for example:
  ```bash
  sudo apt install nodejs npm golang     # Ubuntu / Debian
  sudo dnf install nodejs golang         # Fedora
  ```
  Your distribution's Node.js too old (below version 18)? Get the **LTS** version from [nodejs.org](https://nodejs.org/en/download) instead.

  ### Verification
  ```bash
  node --version
  go version
  ```
</details>

Both commands print a version number? Great! Now let's start the preview:
1. Open your terminal and go into the folder of the repository with `cd`, for example: `cd www-project-ai-security-and-privacy-guide`
2. The first time only, install the remaining parts (this can take a few minutes):
```bash
npm install
```
3. Go into the folder where the website lives and download the theme (also only needed the first time):
```bash
cd content/ai_exchange
npx hugo-extended@0.147.0 mod get github.com/imfing/hextra@v0.11.1
```
4. Start the preview:
```bash
npx hugo-extended@0.147.0 server --renderToMemory
```
5. Open [http://localhost:1313](http://localhost:1313) in your browser. Congrats, that's the site running on your own computer!

Every time you save a file, the page in your browser updates by itself. The search bar doesn't work in this preview, that's normal (see [Full build with search](#full-build-with-search) if you need it). Done looking? Press `Ctrl + C` in the terminal to stop the preview.

> **Why `--renderToMemory`?** Without it, Hugo writes the whole built website into the `public` folder, and that folder is part of the repository. You'd suddenly see hundreds of changed files you never touched. With `--renderToMemory` nothing is written to disk, so only your own changes show up.

Next time you want to preview, you only need step 1, then `cd content/ai_exchange` and step 4.

## Uploading your changes to your fork
Your changes are recorded (committed), but they're still only on your computer. Let's upload them to your own copy of the site (your fork) on GitHub:
1. First check what you are about to upload:
```bash
git status
```
Only files you changed yourself should be listed. See files you didn't touch (for example in the `public` folder)? Undo those with `git checkout -- <path of the file>` before continuing.

2. Upload (push) your commits:
```bash
git push
```
3. Go to your fork on GitHub (`https://github.com/<youraccountname>/<repositoryname>`) and you'll see your commit there. Congrats, it's online!

> **Tip: one branch per change.** Want to send several separate changes (remember: one kind of issue per PR)? Make a new **branch** for each change *before* you start editing, then each branch becomes its own pull request:
> ```bash
> git checkout main
> git checkout -b fix-typos-testing-section
> ```
> After committing, upload that branch with `git push -u origin fix-typos-testing-section`.

## Suggesting your changes (pull request)
Now the last step: asking the moderators/admins to add your changes to the real website. This is called a **pull request (PR)**.
1. Go to your fork on GitHub. Right after pushing, a yellow bar shows up saying your branch had recent pushes, click **Compare & pull request**.
   No yellow bar? Click the **Contribute** button (above the list of files), then **Open pull request**.
2. Check at the top that it says: base repository `OWASP/www-project-ai-security-and-privacy-guide`, base `main` ← your fork and your branch.
3. Give it a clear **title**, for example: 'Fix typos in testing section 5.2'.
4. In the **description**, explain:
   - what you changed
   - why you changed it
   - a source (link) if you added or changed a fact
   - if you mention a tool or article you work for or are connected to, say so
   - if you used AI for a meaningful part of it, say so and what for (see [Label AI use](https://owaspai.org/go/ccg))
5. Click **Create pull request**.

Congrats, you just made your first contribution! A moderator will look at it, they might ask questions or request small changes in the comments of the PR. You'll get an email when they reply.

Needed to fix something they asked for? Just make the change, commit and `git push` again on the same branch, the PR updates by itself.

> **Bonus:** a few minutes after creating the PR, a preview version of the whole site with your changes is built automatically. Because your PR comes from a fork, a moderator first has to approve this, so don't worry if it doesn't show up right away.

## Just want to report something? (issue)
Found a mistake or have an idea, but don't want to change it yourself? That's totally fine, open an **issue** instead. This only needs a GitHub account, nothing else.
1. Go to the [issues page](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/issues).
2. Use the search bar first, maybe someone already reported it. If so, leave a comment or a 👍 there.
3. Click **New issue**.
4. Give it a clear title, for example: 'Section 5.2: link to the testing tool is broken'.
5. In the description, write which page (paste the link from owaspai.org), what's wrong or missing, and your suggestion if you have one.
6. Click **Create**. You'll get an email when someone replies.

## Stuck?
- **'command not found'**: close your terminal, open a new one and try again. Still not working? Install that program again.
- **`go` not found while running `mod get`**: Go isn't installed (or your terminal was open during the install), see the install steps above.
- **Still stuck?** Ask in an [issue](https://github.com/OWASP/www-project-ai-security-and-privacy-guide/issues) or on [OWASP Slack](https://owasp.org/slack/invite). Beginner questions are welcome!

## Tech
For contributors working on the website itself (layouts, styling, scripts, build). All commands run from the repository root.

The website at owaspai.org is rendered from this repository by **Hugo** (with the [Hextra](https://github.com/imfing/hextra) theme) in the CI/CD pipeline (`.github/workflows/`). Pushes to `main` deploy the live site; pull requests that touch `content/` get a preview deploy. Search is powered by [Pagefind](https://pagefind.app/), which runs after the Hugo build.

### Full build with search
The live preview above (`hugo server`) has no search and no PDF. To test the site as it is deployed, including search:

```bash
npm run test:site
```

This builds the site, builds the Pagefind search index, and serves it at **http://localhost:3000**. Open that URL, click the search icon in the header, and try a query.

Or run the steps separately:

```bash
npm run build:site    # Hugo build
npm run pagefind      # Search index (required for search to work)
npm run serve         # Serve at http://localhost:3000
npm run build:pdf     # Optional: the downloadable PDF (see scripts/README.md)
```

Note: this writes into `content/ai_exchange/public`. Don't commit those generated files.

**If you get** `permission denied` **on** `/var/lib/snapd/void` **when using a system-installed Hugo:** that's the Snap sandbox. Either run `sudo snap install hugo --classic` or use the commands above, they use `npx hugo-extended` so no system Hugo is needed.

### Tests

```bash
npm test             # Unit tests (OpenCRE enrichment, PDF page count)
npm run test:e2e     # Browser end-to-end tests (builds and serves the site; not run in CI)
```

### Checking hyperlinks
There is no automated link check in CI, so check links yourself when you change headings, move content or edit many links. Heading anchors change when a heading is renamed, and other pages, the `/go/` permalinks and the e2e tests may link to them.

With the site running via `npm run test:site`, run in a second terminal:

```bash
# Internal links only (fast)
npx linkinator http://localhost:3000 --recurse --skip "^(?!http://localhost)"

# Including external links (slow, some sites block automated checks)
npx linkinator http://localhost:3000 --recurse
```

### Permalinks (`owaspai.org/go/...`)
Short links such as `owaspai.org/go/roadmap` and `owaspai.org/go/ccg` are redirects defined in `content/ai_exchange/firebase.json`. They only work on the deployed site (Firebase Hosting), not in a local preview. When you rename a heading that a permalink points to, update the destination there.

### Analytics
The live site uses [GoatCounter](https://www.goatcounter.com/) for privacy-friendly pageview statistics (which pages are read, not who is reading them). The tracking snippet lives in `content/ai_exchange/layouts/partials/analytics.html` and is included from `layouts/_default/baseof.html`. Dashboard access and weekly email reports are managed in the GoatCounter account (`aix.goatcounter.com`).
