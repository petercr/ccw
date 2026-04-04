if echo "$VERCEL_GIT_COMMIT_REF" | grep -q "^entire/checkpoints/"; then exit 0; else exit 1; fi
