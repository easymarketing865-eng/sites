# 📧 Resend Email Setup Guide

## ✅ What's Already Done

Your contact form is now ready for Resend integration! I've updated:
- ✅ API endpoint (`/api/submit-contact`) with proper Resend integration
- ✅ Better error handling and logging
- ✅ Support for both Resend's domain and your custom domain
- ✅ Professional email formatting

## 🚀 Quick Setup (5 minutes)

### Step 1: Get Your Resend API Key
1. **Sign up:** https://resend.com (free - 3,000 emails/month)
2. **Go to:** https://resend.com/api-keys
3. **Create API Key:** Name it "Easy Production Contact Form"
4. **Copy the key** (starts with `re_...`)

### Step 2: Add Environment Variables

**For Railway:**
1. Go to your Railway project dashboard
2. Click your service → **Variables** tab
3. Add these variables:
   ```
   RESEND_API_KEY=re_your_api_key_here
   FROM_EMAIL=onboarding@resend.dev
   ```

**For Vercel:**
1. Project Settings → Environment Variables
2. Add the same variables above

**For Netlify:**
1. Site Settings → Environment Variables  
2. Add the same variables above

### Step 3: Deploy & Test
1. **Redeploy** your app (should happen automatically after adding env vars)
2. **Test the contact form** on your website
3. **Check** `easymarketing865@gmail.com` for the email!

## 📧 Email Details

**Emails will be sent:**
- **From:** `onboarding@resend.dev` (Resend's domain)
- **To:** `easymarketing865@gmail.com`
- **Reply-To:** Customer's email address
- **Subject:** "New Project Inquiry from [Customer Name]"

**Email content includes:**
- Contact information (name, email, phone, company)
- Project details (type, budget, timeline)
- Full customer message
- Timestamp

## 🔧 Advanced Setup (Optional)

### Use Your Own Domain
To send emails from `noreply@easyproduction.kg`:

1. **In Resend Dashboard:** Domains → Add Domain
2. **Add:** `easyproduction.kg`
3. **Add DNS records** they provide to your domain registrar
4. **Update environment variable:** `FROM_EMAIL=noreply@easyproduction.kg`

### Test Without Email Service
- Without `RESEND_API_KEY`: Form submissions are logged to console
- Check your hosting platform's logs to see submissions
- Form still shows success message to users

## 🧪 Testing

### Test the form:
1. Fill out your contact form
2. Submit it
3. Look for these in your logs:
   ```
   📧 Sending email via Resend...
   ✅ Email sent successfully via Resend: [email_id]
   ```

### Without API key:
```
⚠️ RESEND_API_KEY not found. Logging submission instead:
📧 New contact form submission:
💡 To send actual emails, add RESEND_API_KEY environment variable
```

## 🆘 Troubleshooting

**Form shows "error sending message":**
- Check if `RESEND_API_KEY` is set correctly
- Verify API key is valid in Resend dashboard
- Check hosting platform logs for detailed error

**Emails not arriving:**
- Check spam folder
- Verify email address `easymarketing865@gmail.com` is correct
- Check Resend dashboard logs

**Still having issues?**
- Test form locally first
- Check browser network tab for API errors
- Review hosting platform logs

## 📊 Resend Dashboard

Monitor your emails at: https://resend.com/emails
- See delivery status
- Track email opens (if HTML email)
- View error logs
- Monitor usage

---

🎉 **That's it!** Your contact form will now send professional emails to `easymarketing865@gmail.com` automatically! 