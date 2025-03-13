# sql-cursor-ai-agent

SQL builder AI agent

![wallpaper.jpg](./wallpaper.jpg)

## Overview

This project is a tool that helps you create SQL queries using AI technology. It has a web interface that works like Cursor, making it easy to use. The system uses two different AI agents that work together:

1. One agent talks with you to understand what you need
2. Another agent creates the actual SQL code

### User Agent

The User Agent is the AI that you directly communicate with. It:
- Listens to your requests in normal language
- Tries to understand what information you need
- Creates a plan for getting that information from a database
- Passes this plan to the SQL Agent

### SQL Agent

The SQL Agent is the technical expert that:
- Takes the plan from the User Agent
- Knows how to write proper SQL code
- Creates the correct SQL query that will get the information you need
- Returns a working query that can be run on your database

## Installation

Simply clone the repository and install the dependencies:

```bash
nvm use 20
npm install
```

## Local Development

Simply run the start script:

```bash
nvm use 20
npm run start
```

Then, visit `http://localhost:3000` to see the app in action.

## Build

Simply run the build script:

```bash
nvm use 20
npm run build
```