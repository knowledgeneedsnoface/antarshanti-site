#!/bin/bash

echo "Checking deployment status..."
echo "Waiting for Vercel to build and deploy..."

for i in {1..6}; do
  echo "Check $i/6..."
  sleep 10
done

echo ""
echo "Opening the deployed site..."
open "https://antarshanti-site.vercel.app/twin/demo"

echo ""
echo "✅ Done! Check your browser to test the Digital Twin."
