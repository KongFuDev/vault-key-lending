# Vercel Deployment Guide for Vault Key Lending

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) if you don't have one
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare the required environment variables

## Step-by-Step Deployment Instructions

### Step 1: Connect to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click on "New Project" or "Import Project"
3. Select "Import Git Repository"
4. Choose "GitHub" as your Git provider
5. Search for and select `KongFuDev/vault-key-lending`
6. Click "Import"

### Step 2: Configure Project Settings

1. **Project Name**: `vault-key-lending` (or your preferred name)
2. **Framework Preset**: Select "Vite"
3. **Root Directory**: Leave as default (`.`)
4. **Build Command**: `npm run build`
5. **Output Directory**: `dist`
6. **Install Command**: `npm install`

### Step 3: Configure Environment Variables

In the Vercel dashboard, go to "Settings" → "Environment Variables" and add:

```
VITE_CHAIN_ID=11155111
VITE_RPC_URL=your_rpc_endpoint_here
VITE_WALLET_CONNECT_PROJECT_ID=your_wallet_connect_project_id
VITE_INFURA_API_KEY=your_infura_api_key
VITE_RPC_URL_ALT=your_alternative_rpc_url
```

**Important**: Make sure to set these for all environments (Production, Preview, Development)

### Step 4: Configure Build Settings

1. Go to "Settings" → "General"
2. Set the following:
   - **Node.js Version**: 18.x
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

### Step 5: Deploy

1. Click "Deploy" button
2. Wait for the build process to complete
3. Your application will be available at the provided Vercel URL

### Step 6: Custom Domain (Optional)

1. Go to "Settings" → "Domains"
2. Add your custom domain
3. Configure DNS settings as instructed by Vercel
4. Wait for SSL certificate to be issued

## Post-Deployment Configuration

### Step 7: Verify Deployment

1. Visit your deployed URL
2. Test wallet connection functionality
3. Verify all environment variables are working
4. Check that the application loads without errors

### Step 8: Monitor and Maintain

1. **Analytics**: Enable Vercel Analytics in the dashboard
2. **Logs**: Monitor deployment logs for any issues
3. **Updates**: Future pushes to main branch will auto-deploy
4. **Performance**: Monitor Core Web Vitals in Vercel dashboard

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Check Node.js version (should be 18.x)
   - Verify all dependencies are in package.json
   - Check build logs for specific errors

2. **Environment Variables**:
   - Ensure all variables are set for the correct environment
   - Check variable names match exactly (case-sensitive)
   - Verify no extra spaces or characters

3. **Wallet Connection Issues**:
   - Verify WalletConnect Project ID is correct
   - Check RPC URL is accessible
   - Ensure chain ID matches your configuration

### Build Optimization

1. **Bundle Size**: Monitor bundle size in build logs
2. **Dependencies**: Remove unused dependencies
3. **Code Splitting**: Implement lazy loading for better performance

## Security Considerations

1. **Environment Variables**: Never commit sensitive keys to repository
2. **HTTPS**: Vercel automatically provides SSL certificates
3. **CORS**: Configure CORS settings if needed for API calls
4. **Rate Limiting**: Consider implementing rate limiting for API calls

## Performance Optimization

1. **CDN**: Vercel automatically provides global CDN
2. **Caching**: Configure appropriate cache headers
3. **Images**: Optimize images and use WebP format
4. **Code Splitting**: Implement dynamic imports for better loading

## Monitoring

1. **Uptime**: Monitor application uptime
2. **Performance**: Track Core Web Vitals
3. **Errors**: Set up error tracking (Sentry, etc.)
4. **Analytics**: Monitor user behavior and performance

## Backup and Recovery

1. **Code**: All code is backed up in GitHub
2. **Environment Variables**: Document all environment variables
3. **Database**: If using external database, ensure proper backups
4. **Domain**: Keep domain registration details secure

## Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in the repository
- **Community**: Join Vercel Discord for community support

## Additional Notes

- The application uses Sepolia testnet for development
- Ensure your wallet is connected to Sepolia network
- Test all functionality before going live
- Consider implementing proper error boundaries
- Set up proper logging and monitoring
