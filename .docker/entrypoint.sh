#!/bin/bash

# Script de entry point

npm install 
npm run typeorm migration:run 
npm run dev