# Infinity Mätkonsult AB Website

This repository contains the source code for [infinitymk.se](https://www.infinitymk.se/). The code is stored on GitHub, and the live website is hosted on Vercel.

## Working on the website from another computer

You can work from any computer with internet access. The important thing is to get the project from GitHub rather than copying it from an old computer. GitHub is the shared, saved copy of the project.

### One-time setup on a new computer

1. Install [Git for Windows](https://git-scm.com/download/win) and [Node.js](https://nodejs.org/) (use a current LTS version).
2. Sign in to GitHub with an account that has access to `YourMan101/infiweb`.
3. Open Git Bash, choose a folder where you want to keep the project, and clone it:

   ```bash
   cd ~/Documents
   git clone https://github.com/YourMan101/infiweb.git
   cd infiweb
   ```

4. Install the project dependencies:

   ```bash
   npm install
   ```

   You only need to do this once per computer, or again if the project's dependencies change.

5. (Optional) Open the folder in Visual Studio Code:

   ```bash
   code .
   ```

### Preview the website on your computer

From the project folder in Git Bash, start the local server:

```bash
npm start
```

Open <http://localhost:3000> in your browser. This preview is only on your computer; it does not change the live website. Keep the terminal open while previewing. Press `Ctrl+C` in that terminal when you are finished.

### Make and publish a change

1. Before editing, get any work that may have been pushed from another computer:

   ```bash
   git pull origin main
   ```

2. Edit the relevant files and preview the site locally. Main content files are:
   - `public/index.html` — homepage content and project cards
   - `public/project-fse101.html` and `public/project-fse215.html` — project detail pages
   - `public/css/style.css` — styling and responsive layout
   - `public/js/main.js` — interactive features and team information
   - Other pages and images are in `public/`

3. Review which files changed:

   ```bash
   git status
   git diff
   ```

4. Save the change to Git and send it to GitHub:

   ```bash
   git add .
   git commit -m "Describe the website change"
   git push origin main
   ```

   Use a short commit message that describes what you changed. Git may ask you to sign in to GitHub in a browser.

5. Vercel is connected to this repository. A push to `main` should start a deployment automatically. Check the project's **Deployments** page in the [Vercel dashboard](https://vercel.com/dashboard) and wait for the newest deployment to complete successfully.
6. Visit [infinitymk.se](https://www.infinitymk.se/) and verify the change. If the old version still appears, wait a few minutes and hard-refresh with `Ctrl+Shift+R`, or try a private/incognito window.

The local preview, GitHub, and the live website are separate:

- **Local preview:** your current working files on your computer.
- **GitHub:** the shared project history and source code.
- **Live website:** the version deployed by Vercel from GitHub.

Saving a file or previewing locally does not publish it. The normal publishing steps are commit, push, then confirm the Vercel deployment.

## Helpful Git commands

Run these from inside the `infiweb` folder:

```bash
git status                 # See which files have changed
git pull origin main       # Get the latest work from GitHub
git diff                   # Review local edits
git add .                  # Stage changes for the next commit
git commit -m "Message"    # Save a version locally
git push origin main       # Send commits to GitHub
```

If Git says there are conflicts when pulling, stop before making more edits. The conflicting files need to be reconciled rather than overwritten. Do not use `git reset --hard` or discard files to try to fix this.

## Project structure

```text
infiweb/
├── public/
│   ├── css/style.css
│   ├── js/main.js
│   ├── images/
│   ├── index.html
│   ├── more.html
│   ├── contact.html
│   ├── project-fse101.html
│   └── project-fse215.html
├── server.js
├── package.json
└── README.md
```

## Important reminders

- Make sure `git status` is clean after pushing. Changes that exist only on one computer are not available on another computer.
- Do not commit passwords, access tokens, private customer information, or other secrets.
- Do not add the `node_modules` folder to Git; `npm install` recreates it from the package files.
- Keep access to the GitHub account that can write to `YourMan101/infiweb`. Vercel dashboard access may also be needed to inspect deployment settings or troubleshoot a failed deployment.
- The public website domain is `https://www.infinitymk.se/`. Do not change domain or project settings in Vercel unless you intend to change how the live site is hosted.

## Technologies

- HTML, CSS, and JavaScript
- Node.js and Express for local development
- GitHub for source control
- Vercel for hosting and deployment

## Contact

Infinity Mätkonsult AB

Email: infinity.matkonsult@gmail.com

Phone: +46768969580 / +46768969591

[LinkedIn](https://www.linkedin.com/company/infinity-m%C3%A4tkonsult-ab/about/)
