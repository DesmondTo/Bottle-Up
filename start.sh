#!/bin/bash

# Run 'npm run dev' command in other folders
cd user-service
npm start &

cd ../bottle-service
npm start &

cd ../chat-service
npm start &

# Run 'npx react-native start' and 'npx react-native run-ios' commands in 'frontend' folder
cd ../frontend
npx react-native start &
npx react-native run-ios --simulator='iPhone 14s' &
npx react-native run-ios --simulator='iPhone 14 Pro (16.0)'
