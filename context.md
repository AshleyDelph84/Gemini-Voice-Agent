# Project Context: Real-Time Voice-Controlled Multi-Agent System

## Overview
This project creates an interactive voice agent system using Google’s Multimodal Live API—our single non‑negotiable integration point for handling natural, bidirectional audio (and video) communication. The system is built on the Agno framework and is composed of a team of four agents:

- **Voice Agent (Controller):**  
  Receives live multimodal input (speech or text) via the Multimodal Live API, uses a lightweight LLM (Gemini 1.5 Flash) to parse user intent, delegates tasks to specialized agents, and finally communicates the results back to the user as audio.

- **Calendar Agent:**  
  Specialized for querying and managing calendar information.

- **Email Agent:**  
  Handles email tasks like summarization or composing messages.

- **Web Search Agent:**  
  Manages web search queries to complement the voice agent when external information is required.

## Core Features & Requirements
1. **Real-Time, Multimodal Interaction:**  
   - All voice and text interactions pass through the Google Multimodal Live API, which internally manages voice activity detection (VAD) and ensures sub‑second latency.
  
2. **Lightweight LLM Integration:**  
   - Use Gemini 1.5 Flash as the LLM on the voice agent side. This enables fast intent parsing and task delegation while keeping the solution entirely within Google’s ecosystem.

3. **Next.js Frontend:**  
   - The user-facing interface is built with Next.js to provide a modern, responsive, and scalable frontend that connects (via WebSockets) to our backend services.

4. **Modular Agent Architecture:**  
   - The Agno framework orchestrates a team of specialized agents. The voice agent delegates user requests using a combination of rule‑based and LLM‑assisted decisions to the Calendar, Email, and Web Search agents.

## Architecture Summary
- **Frontend / Communication Layer:**  
  - **Next.js Web Application:**  
    Builds a modern, responsive UI and connects via WebSocket to the backend.
  - **WebSocket Server:**  
    (E.g. built with FastAPI) provides bidirectional streaming and works seamlessly with the Google Multimodal Live API.

- **Backend (Agent Orchestration):**  
  - **Voice Agent:**  
    Built with Agno. It uses the Gemini 1.5 Flash LLM to interpret spoken user commands (routed through the Multimodal Live API), delegates tasks to appropriate specialized agents, and streams audio responses back.
  - **Specialized Agents:**  
    Separate agents for calendar, email, and web search tasks, each implemented as independent modules in Agno.

- **Integration & Processing:**  
  - **Google Multimodal Live API:**  
    Routes all audio and text input/output. This API inherently supports VAD and low latency, so no extra implementation is required for these aspects.
  - **Google Gemini 1.5 Flash:**  
    Acts as the core LLM for processing user intent and delegating tasks.
  
## Future Extensibility
- Additional specialized agents can be added to expand functionality.
- The modular architecture supports further LLM upgrades or integration of additional Google APIs.