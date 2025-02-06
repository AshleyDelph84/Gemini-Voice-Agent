/*
    File: server/websocket-server.js
    Purpose: Implements a WebSocket server for handling real-time voice data transmission
    and communication between the client and server.
*/

const WebSocket = require('ws');
const geminiService = require('./services/gemini-service');

// Print statement for debugging server start
console.log('Starting WebSocket Server...');

// Create a new WebSocket server instance
const wss = new WebSocket.Server({ port: 8080 });

// Keep track of all connected clients
const clients = new Set();

// Handle new WebSocket connections
wss.on('connection', (ws) => {
    // Print statement for debugging new connections
    console.log('New client connected');
    
    // Add the new client to our set
    clients.add(ws);

    // Handle incoming messages
    ws.on('message', async (message) => {
        try {
            const data = JSON.parse(message);
            
            // Print statement for debugging incoming messages
            console.log('Received:', data.type);

            switch (data.type) {
                case 'START_RECORDING':
                    // Print statement for recording start
                    console.log('Client started recording');
                    ws.send(JSON.stringify({ type: 'RECORDING_STARTED' }));
                    break;

                case 'PROCESS_TEXT':
                    try {
                        // Print statement for text processing
                        console.log('Processing text with Gemini:', data.text);
                        const response = await geminiService.processMessage(data.text);
                        ws.send(JSON.stringify({ 
                            type: 'GEMINI_RESPONSE', 
                            response 
                        }));
                    } catch (error) {
                        // Print statement for error handling
                        console.error('Error processing text:', error);
                        ws.send(JSON.stringify({ 
                            type: 'ERROR', 
                            error: 'Failed to process text with Gemini' 
                        }));
                    }
                    break;

                case 'PROCESS_MULTIMODAL':
                    try {
                        // Print statement for multimodal processing
                        console.log('Processing multimodal data with Gemini');
                        const response = await geminiService.processMultiModal(
                            data.text,
                            data.imageData
                        );
                        ws.send(JSON.stringify({ 
                            type: 'GEMINI_RESPONSE', 
                            response 
                        }));
                    } catch (error) {
                        // Print statement for error handling
                        console.error('Error processing multimodal data:', error);
                        ws.send(JSON.stringify({ 
                            type: 'ERROR', 
                            error: 'Failed to process multimodal data with Gemini' 
                        }));
                    }
                    break;

                case 'AUDIO_DATA':
                    // Print statement for audio data reception
                    console.log('Received audio data chunk');
                    // This will be implemented in Phase 3
                    break;

                case 'STOP_RECORDING':
                    // Print statement for recording stop
                    console.log('Client stopped recording');
                    ws.send(JSON.stringify({ type: 'RECORDING_STOPPED' }));
                    break;

                default:
                    // Print statement for unknown message types
                    console.log('Unknown message type:', data.type);
            }
        } catch (error) {
            // Print statement for error handling
            console.error('Error processing message:', error);
            ws.send(JSON.stringify({ 
                type: 'ERROR', 
                error: 'Failed to process message' 
            }));
        }
    });

    // Handle client disconnection
    ws.on('close', () => {
        // Print statement for client disconnection
        console.log('Client disconnected');
        clients.delete(ws);
    });

    // Handle errors
    ws.on('error', (error) => {
        // Print statement for error handling
        console.error('WebSocket error:', error);
        clients.delete(ws);
    });

    // Send initial connection confirmation
    ws.send(JSON.stringify({ 
        type: 'CONNECTED', 
        message: 'Successfully connected to WebSocket server' 
    }));
});

// Print statement for successful server start
console.log('WebSocket Server is running on ws://localhost:8080');

// Handle server errors
wss.on('error', (error) => {
    // Print statement for server error handling
    console.error('WebSocket Server error:', error);
});
