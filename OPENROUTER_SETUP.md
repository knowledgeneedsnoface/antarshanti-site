# 🔑 OpenRouter API Key Setup

## Get Your API Key

1. Go to: https://openrouter.ai/keys
2. Sign in or create an account
3. Click "Create Key"
4. Copy your API key (starts with `sk-or-v1-`)

## Local Development Setup

1. Open the `.env.local` file in the project root
2. Replace `your_api_key_here` with your actual API key:
   ```
   NEXT_PUBLIC_OPENROUTER_API_KEY=sk-or-v1-your-actual-key-here
   ```
3. Save the file
4. Restart your dev server: `npm run dev`

## Vercel Deployment Setup

1. Go to: https://vercel.com/knowledgeneedsnofaces-projects/antarshanti-site/settings/environment-variables
2. Click "Add New"
3. Set:
   - **Key**: `NEXT_PUBLIC_OPENROUTER_API_KEY`
   - **Value**: Your OpenRouter API key
   - **Environments**: Check all (Production, Preview, Development)
4. Click "Save"
5. Redeploy: Go to Deployments → Click latest deployment → Click "..." → "Redeploy"

## Testing API Connection

After setting up:

1. Visit: https://antarshanti-site.vercel.app/twin/demo
2. Select a spiritual path
3. Send a message
4. You should get an AI response

If you see an error, check the browser console for details.

## Free vs Paid API

- **Free Tier** (`sk-or-v1-free`): Limited requests, may have delays
- **Paid Tier**: More reliable, faster responses
- Current code tries free tier first, falls back gracefully

## Security Note

⚠️ **Important**: Never commit your `.env.local` file to git!
- It's already in `.gitignore`
- Use Vercel environment variables for production
- Keep your API key secret

## Troubleshooting

### "Module not found" error
```bash
npm install
```

### API not responding
1. Check API key is correct
2. Check OpenRouter dashboard for usage/limits
3. Try with a paid API key if free tier is rate-limited

### Environment variable not working
1. Restart dev server after changing `.env.local`
2. In Vercel, redeploy after adding environment variable
3. Make sure variable name starts with `NEXT_PUBLIC_`
