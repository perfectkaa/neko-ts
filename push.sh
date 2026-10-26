#!/usr/bin/env bash
# This script pushes the local repository to GitHub using the correct credentials.
# Ensure you have a personal access token (PAT) with repo scope.
# Replace <YOUR_PAT> with your token or configure a credential helper.

# Set remote with token authentication (avoid embedding token in URL for security).
# You can also use a credential manager, e.g., git credential-store.

# Example using token in URL (not recommended for public repos):
# git remote set-url origin https://<YOUR_PAT>@github.com/perfectkaa/neko-ts.git

# Then push:
# git push -u origin main

# Or, if you have a credential helper configured:
# git push -u origin main

echo "Push script ready. Configure your credentials and run ./push.sh"
