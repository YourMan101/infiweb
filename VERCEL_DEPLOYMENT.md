# 🚀 Vercel Deployment Guide

## Quick Deploy Steps

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to [vercel.com](https://vercel.com)**
   - Sign up or log in with your GitHub account

2. **Click "Add New..." → "Project"**

3. **Import your GitHub repository**
   - Select `YourMan101/infiweb` from the list
   - Click "Import"

4. **Configure Project Settings:**
   After clicking "Import", you'll see a configuration page. Look for these settings:
   
   **Where to find "Root Directory":**
   - Scroll down on the configuration page
   - Look for a section called **"Configure Project"** or **"Build and Output Settings"**
   - You'll see a field labeled **"Root Directory"** (it might be collapsed under "Advanced" or "Show Advanced Options")
   - **Click on it** or expand the advanced options
   - **Change the value from** `./` (or empty) **to** `public`
   - This tells Vercel that your website files are in the `public` folder, not the root
   
   **Other settings to configure:**
   - **Framework Preset**: Select "Other" (or leave as default)
   - **Build Command**: Leave empty (or `echo 'No build needed'`)
   - **Output Directory**: Leave empty (or `public`)
   - **Install Command**: `npm install` (optional, but good to have)
   
   **Note:** If you don't see "Root Directory" immediately, look for:
   - A button/link that says "Show Advanced Options" or "Configure"
   - Or it might be in a dropdown/expandable section
   - Sometimes it's labeled as "Root Directory" or "Project Root"

5. **Click "Deploy"**
   - Vercel will automatically deploy your site
   - Your site will be live at: `https://infiweb.vercel.app` (or similar)

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI** (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from your project directory**:
   ```bash
   cd C:\Users\User\Documents\GitHub\infiweb
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Yes**
   - Which scope? Select your account
   - Link to existing project? **No** (for first deployment)
   - Project name: **infiweb** (or your preferred name)
   - Directory: **public** (IMPORTANT!)
   - Override settings? **No** (or Yes if you want to customize)

5. **For production deployment**:
   ```bash
   vercel --prod
   ```

## 📋 Pre-Deployment Checklist

✅ **Verify before deploying:**
- [ ] Test website locally: `npm start` and visit `http://localhost:3000`
- [ ] Check all pages load correctly:
  - [ ] Homepage (`/`)
  - [ ] Contact page (`/contact.html`)
  - [ ] More page (`/more.html`)
  - [ ] Project FSE 215 (`/project-fse215.html`)
  - [ ] Project FSE 101 (`/project-fse101.html`)
- [ ] Test team member modals (click on team members)
- [ ] Verify all images load correctly
- [ ] Test on mobile device/responsive view

## 🔧 Important Configuration Notes

### Root Directory Setting - WHERE TO FIND IT

**CRITICAL**: In Vercel dashboard, you MUST set the **Root Directory** to `public`. This tells Vercel where your website files are located.

**Step-by-step to find Root Directory:**

1. After importing your repository, you'll be on the "Configure Project" page
2. Look for a section with settings like:
   - Framework Preset
   - Build and Output Settings
   - Environment Variables
3. **Root Directory** is usually located:
   - In the "Build and Output Settings" section, OR
   - Under an "Advanced" or "Show More" expandable section
   - It might be a text input field or a dropdown
4. **Default value** is usually `./` (current directory) or empty
5. **Change it to**: `public` (just type `public` in the field)
6. This is the folder where your `index.html` file is located

**Visual Guide:**
```
Configure Project
├── Framework Preset: [Other ▼]
├── Build and Output Settings
│   ├── Root Directory: [public] ← CHANGE THIS!
│   ├── Build Command: [leave empty]
│   └── Output Directory: [leave empty]
└── Environment Variables (optional)
```

**If you can't find it:**
- Look for a "Show Advanced Options" button/link and click it
- Or check if there's a "Configure" button that expands more settings
- The field might be labeled as "Project Root" instead of "Root Directory"

### Why This Matters
- Your website files (HTML, CSS, JS) are in the `public` folder
- Vercel needs to know to serve files from `public` instead of the root
- Without this setting, Vercel won't find your `index.html`

## 🌐 After Deployment

### Your Site Will Be Live At:
- **Production URL**: `https://infiweb.vercel.app` (or your custom domain)
- **Preview URLs**: Created for each deployment

### Automatic Deployments
- Vercel automatically deploys when you push to GitHub
- Each push creates a new preview deployment
- Production deployments happen when you merge to main (or manually)

### Custom Domain (Optional)
1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## 🐛 Troubleshooting

### Issue: 404 errors on all pages
**Solution**: Make sure "Root Directory" is set to `public` in Vercel settings

### Issue: Images not loading
**Solution**: Check that image paths start with `/` (e.g., `/images/team1.png`)

### Issue: CSS/JS not loading
**Solution**: Verify file paths in HTML are correct (should start with `/`)

### Issue: Team modal not working
**Solution**: Check browser console for JavaScript errors

## 📞 Need Help?

- **Vercel Documentation**: https://vercel.com/docs
- **Vercel Support**: https://vercel.com/support

---

**Ready to deploy? Follow the steps above and your website will be live in minutes!** 🎉

