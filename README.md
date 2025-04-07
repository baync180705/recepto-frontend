# Recepto Frontend

A React-based frontend client for Recepto.

## Technology Stack

- **Framework**: React 19 with TypeScript & SWC Compiler
- **Build Tool**: Vite
- **State Management**: Redux Toolkit
- **Styling**: TailwindCSS
- **Charting**: ChartJS
- **Package Manager**: bun

## Directory Structure

- `/src`: Root directory for source code
  - `/app`: Core application setup containing hooks and Redux store
  - `/components`: Reusable UI components shared across features
  - `/features`: Feature-specific components and logic
  - `/slices`: Redux slice files for state management
  - `/types`: TypeScript type definitions
  - `/data`: Mock data and constants

## Setup Instructions

1. **Clone the Repository**
```bash
git clone git@github.com:baync180705/recepto-frontend.git
cd recepto-frontend
```
2. **Install Dependencies**
```bash
npm install
##OR
bun install
```
3. **Start Development Server**
```bash
npm run dev
##OR
bun run dev
```
