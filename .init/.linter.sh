#!/bin/bash
cd /home/kavia/workspace/code-generation/dreamlit-explorer-105415-7ab85f3c/dreamreads_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

