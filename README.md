# Ai-Formula
# Next.js AI-Powered Application

## Overview
Welcome to my project, an AI-powered web application built with Next.js, integrating a local Language Model (LLM) using DeepSeek 1.5B via llama.cpp. This project demonstrates how to leverage open-source AI while maintaining performance and code quality.

## Prerequisites
Before running this project, ensure you have:
- Working knowledge of React and Next.js
- Familiarity with JavaScript/TypeScript
- Basic AI/ML concepts
- API development experience
- A local LLM set up (e.g., DeepSeek 1.5B with llama.cpp)

## Project Structure
```
/app/api/query       # API routes for LLM communication
/components/dashboard # AI query interface components
/components/ui       # Reusable UI components
/src/lib/services    # Core LLM integration service
```

## Core Features
### Model Service (`modelService.js`)
- Initializes and configures the AI model.
- Sends queries and processes responses.
- Handles errors and logs execution details.
- Validates the environment before execution.
- Uses Node.js's `spawn` function to run the model process.

### Query Interface Component (`QueryInterface.js`)
- Handles user input and submission.
- Streams AI responses for real-time feedback.
- Manages query state, loading indicators, and error handling.
- Auto-scrolls to the latest AI response.
- Styled with Tailwind CSS.

### API Route (`route.js`)
- Receives and validates user queries.
- Streams AI responses efficiently.
- Handles errors gracefully.
- Configurable API settings.

## Running the Project
1. Clone the repository:
   ```sh
   git clone <repository-url>
   cd <project-folder>
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```
4. Ensure your local LLM is running and accessible.

## Contact
For questions or contributions, feel free to reach out!

---
Enjoy exploring AI-powered applications with Next.js!

