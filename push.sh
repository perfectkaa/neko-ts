#!/usr/bin/env bash
# This script pushes the local repository to GitHub using GITHUB_TOKEN authentication.

# Set remote with token authentication
git remote set-url origin https://${GITHUB_TOKEN}@github.com/perfectkaa/neko-ts.git

# Push to GitHub
git push -u origin main

# Reset remote URL to remove token from history
git remote set-url origin https://github.com/perfectkaa/neko-ts.git