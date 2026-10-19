# Vercel Deployment Guide

## Deploy the site

1. Import `YourMan101/infiweb` in Vercel.
2. Keep the **Root Directory** set to the repository root (`./`). Do not set it to `public`: the contact API is in the root-level `api` directory.
3. Use the `Other` framework preset. Keep the build command empty or use the existing `vercel.json` settings. The static output directory is `public`.
4. Deploy the project.

The `api/contact.js` serverless function sends contact-form submissions through Resend to the existing `info@infinitymk.se` Outlook inbox.

## Configure contact-form delivery

1. Create a Resend account and verify a sending domain that you control.
2. Create a Resend API key.
3. In Vercel, open **Project Settings → Environment Variables** and add:
   - `RESEND_API_KEY`: the Resend API key.
   - `CONTACT_FROM_EMAIL`: a sender address on the verified domain, for example `Infinity Mätkonsult <website@infinitymk.se>`.
4. Apply the variables to Production (and Preview if you want to test preview deployments), then redeploy.

Keep the API key in Vercel environment variables. Do not put it in website JavaScript, HTML, or a committed file. The form reports an error rather than claiming delivery until both variables are configured and Resend accepts the message.

## Local development

Run `npm start` and open `http://localhost:3000`. The local Express server exposes the same `/api/contact` endpoint. Add the two variables to your local environment before testing actual email delivery; without them, the endpoint returns a clear unavailable response.
