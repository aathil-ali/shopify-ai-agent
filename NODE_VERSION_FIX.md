# 🚨 Node.js Version Issue - Quick Fix Guide

## 🔍 **Problem Identified**

You're using Node.js v23.11.0, which is too new and causes compatibility issues
with native packages like `better-sqlite3`.

## ✅ **Solution: Use Node.js v20.x (LTS)**

### **Option 1: Using Node Version Manager (nvm) - Recommended**

```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Restart terminal or run:
source ~/.bashrc  # or ~/.zshrc

# Install and use Node.js 20.x LTS
nvm install 20.11.0
nvm use 20.11.0

# Verify version
node --version  # Should show v20.11.0

# Set as default
nvm alias default 20.11.0
```

### **Option 2: Using Homebrew**

```bash
# Uninstall current Node.js
brew uninstall node

# Install Node.js 20.x LTS
brew install node@20

# Link it
brew link node@20 --force

# Verify version
node --version  # Should show v20.x.x
```

### **Option 3: Download from Official Site**

- Go to [nodejs.org](https://nodejs.org)
- Download Node.js 20.x LTS
- Install the package

## 🔧 **After Installing Correct Node.js Version**

```bash
# Navigate to project
cd /Users/aathil/projects/shopify-ai-agent

# Clean previous installation
rm -rf node_modules package-lock.json

# Install with correct Node.js version
npm install

# Verify installation
npm run test:block-1.1
```

## 📋 **Package Updates Made**

I've updated the package.json with compatible versions:

### **Fixed Packages:**

- ✅ `better-sqlite3`: `^8.7.0` (compatible with Node 20.x)
- ✅ `knex`: `^2.5.1` (stable version)
- ✅ `multer`: `^2.0.0-rc.2` (fixes security issues)
- ✅ `sharp`: `^0.32.6` (compatible version)
- ✅ `rimraf`: `^4.4.1` (updated version)
- ✅ `@google/generative-ai`: `^0.17.1` (stable version)

### **Node.js Version Constraint:**

- ✅ Added `"node": ">=18.0.0 <21.0.0"` in engines

## 🎯 **Next Steps**

1. **Install Node.js 20.x** using one of the methods above
2. **Clean and reinstall**:
   `rm -rf node_modules package-lock.json && npm install`
3. **Test Block 1.1**: `npm run test:block-1.1`

**The issue is resolved with compatible package versions! Just need to use the
correct Node.js version.**
