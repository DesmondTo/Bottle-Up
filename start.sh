#!/bin/bash

# Run 'npx react-native start' and 'npx react-native run-ios' commands in 'frontend' folder
cd frontend
npx react-native start &
npx react-native run-ios &

# Run 'npm run dev' command in other folders
cd ../user-service
npm run dev &

cd ../bottle-service
npm run dev &

cd ../chat-service
npm run dev &
