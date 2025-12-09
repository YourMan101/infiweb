# 🌐 Domain Setup: Vercel to Loopia

## Step-by-Step Guide to Configure Your Domain

### Part 1: Get DNS Records from Vercel

1. **Login to Vercel Dashboard**
   - Go to https://vercel.com
   - Login with your account

2. **Navigate to Your Project**
   - Click on your project (e.g., "infiweb")
   - Or go to: https://vercel.com/dashboard → Select your project

3. **Go to Domain Settings**
   - Click on **"Settings"** tab (top navigation)
   - Click on **"Domains"** in the left sidebar

4. **Add Your Domain**
   - Click the **"Add Domain"** or **"Add"** button
   - Enter your domain name (e.g., `yourdomain.com`)
   - Click **"Add"** or **"Continue"**

5. **Copy DNS Records**
   - Vercel will display the DNS records you need
   - You'll see something like this:

   **For Root Domain (yourdomain.com):**
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

   **For WWW Subdomain (www.yourdomain.com):**
   ```
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

   **OR sometimes A records:**
   ```
   Type: A
   Name: @
   Value: 76.76.21.21 (example IP)
   ```

6. **Write Down These Values:**
   - Record Type (CNAME or A)
   - Name/Host (@ or www)
   - Value/Target (the domain or IP Vercel provides)

---

### Part 2: Configure DNS in Loopia Dashboard

1. **Login to Loopia Dashboard**
   - Go to your Loopia control panel
   - Login with your credentials

2. **Navigate to DNS Management**
   - Look for **"DNS Settings"**, **"DNS Zones"**, **"DNS Management"**, or **"DNS Records"**
   - Find your domain in the list
   - Click on it to edit DNS records

3. **Add the CNAME Record**
   - Click **"Add Record"** or **"New Record"**
   - Select **"CNAME"** as the record type
   - **Name/Host field:**
     - For root domain: Enter `@` or leave blank (depends on Loopia interface)
     - For www subdomain: Enter `www`
   - **Value/Target field:**
     - Paste the value from Vercel (e.g., `cname.vercel-dns.com`)
   - **TTL:** Leave as default (usually 3600 or auto)
   - Click **"Save"** or **"Add"**

4. **If Vercel Provided A Records Instead:**
   - Select **"A"** as the record type
   - **Name:** `@` (for root) or leave blank
   - **Value/Target:** Enter the IP address from Vercel
   - Click **"Save"**

5. **Wait for DNS Propagation**
   - DNS changes can take 5 minutes to 48 hours
   - Usually takes 15-60 minutes
   - Vercel will automatically detect when DNS is configured correctly

---

### Part 3: Verify in Vercel

1. **Go back to Vercel Dashboard**
   - Navigate to: Settings → Domains
   - You should see your domain listed
   - Wait for the status to change from "Pending" to "Valid" or "Active"
   - A green checkmark indicates successful configuration

2. **If Status Shows "Invalid Configuration":**
   - Double-check the DNS records in Loopia match exactly what Vercel shows
   - Make sure you saved the changes in Loopia
   - Wait a bit longer for DNS propagation
   - Try clearing your DNS cache or using a different network

---

## 📝 Quick Checklist

- [ ] Added domain in Vercel Dashboard (Settings → Domains)
- [ ] Copied the CNAME or A record value from Vercel
- [ ] Logged into Loopia Dashboard
- [ ] Found DNS Management section
- [ ] Added CNAME record with correct Name and Value
- [ ] Saved the DNS record in Loopia
- [ ] Waited 15-60 minutes for DNS propagation
- [ ] Verified domain status in Vercel shows "Valid"

---

## 🎯 Common Issues

### Issue: "Invalid Configuration" in Vercel
**Solutions:**
- Ensure the CNAME value matches exactly (no extra spaces)
- Check that you're editing the correct domain in Loopia
- Wait longer for DNS propagation (up to 48 hours)
- Verify the record type is correct (CNAME vs A)

### Issue: Can't find DNS Settings in Loopia
**Look for these sections:**
- "DNS Zones"
- "DNS Records"
- "Domain Management" → "DNS"
- "Advanced Settings" → "DNS"
- Or contact Loopia support if you can't locate it

### Issue: Site still not loading after DNS setup
**Check:**
- DNS propagation status (use tools like `dig` or online DNS checker)
- Vercel domain status shows "Valid"
- Clear browser cache
- Try accessing site in incognito/private mode

---

## 🔗 Useful Links

- **Vercel Domain Documentation**: https://vercel.com/docs/concepts/projects/domains
- **Vercel Support**: https://vercel.com/support
- **Loopia Support**: Check your Loopia dashboard for support contact

---

**Note:** The exact DNS record value depends on your Vercel project. Always use the value shown in your Vercel Dashboard under Settings → Domains.
