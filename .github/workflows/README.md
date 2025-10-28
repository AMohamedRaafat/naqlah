# GitHub Actions Workflows

This directory contains automated workflows for the Naqlah project.

## Workflows

### 1. CI - Lint and Build (`ci.yml`)
Runs on every push and pull request to ensure code quality.

**Steps:**
- Checkout code
- Setup Node.js
- Install dependencies
- Run ESLint
- Build the project

### 2. Deploy to Vercel (`deploy.yml`)
Automatically deploys to Vercel on push to `master` or `main` branch.

**Steps:**
- Checkout code
- Setup Node.js
- Install dependencies
- Run linter
- Build project
- Deploy to Vercel (production)

## Setup Instructions

### Required GitHub Secrets

To enable automatic deployment, add these secrets to your GitHub repository:

#### For Vercel Deployment:

1. **VERCEL_TOKEN**
   - Go to [Vercel Account Settings → Tokens](https://vercel.com/account/tokens)
   - Create a new token
   - Copy and add it to GitHub Secrets

2. **VERCEL_ORG_ID**
   - Run `vercel login` in your terminal
   - Run `vercel link` in your project directory
   - Find the `orgId` in `.vercel/project.json`

3. **VERCEL_PROJECT_ID**
   - Same as above, find `projectId` in `.vercel/project.json`

4. **NEXT_PUBLIC_API_URL** (Optional)
   - Your API endpoint URL
   - Example: `https://api.naqlah.com`

### How to Add Secrets to GitHub:

1. Go to your repository on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each secret with its name and value

### Alternative: Deploy to Other Platforms

If you prefer a different deployment platform, you can modify the `deploy.yml` file:

#### For GitHub Pages:
Replace the deploy step with:
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./out
```

#### For Custom Server (SSH):
Replace the deploy step with:
```yaml
- name: Deploy to Server
  uses: appleboy/scp-action@master
  with:
    host: ${{ secrets.HOST }}
    username: ${{ secrets.USERNAME }}
    key: ${{ secrets.SSH_KEY }}
    source: ".next,public,package.json"
    target: "/var/www/naqlah"
```

## Workflow Status

You can view the status of your workflows in the **Actions** tab of your GitHub repository.

## Troubleshooting

- If deployment fails, check the workflow logs in the Actions tab
- Ensure all required secrets are properly configured
- Verify that your `package.json` has the correct build scripts
- Check that your Node.js version matches the one specified in the workflow

## Local Testing

To test the build locally before pushing:
```bash
npm run lint
npm run build
```

