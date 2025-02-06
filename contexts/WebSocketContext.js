/*
    File: contexts/WebSocketContext.js
    Purpose: Provides a React context for managing WebSocket connections and state
    throughout the application.
*/

import { createContext, useContext, useEffect, useState } from 'react';

const WebSocketContext = createContext(null);

export function WebSocketProvider({ children }) {
    const [socket, setSocket] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Print statement for connection attempt
        console.log('Attempting to connect to WebSocket server...');
        
        const ws = new WebSocket('ws://localhost:8080');

        ws.onopen = () => {
            // Print statement for successful connection
            console.log('Connected to WebSocket server');
            setIsConnected(true);
            setError(null);
        };

        ws.onclose = () => {
            // Print statement for connection close
            console.log('Disconnected from WebSocket server');
            setIsConnected(false);
        };

        ws.onerror = (error) => {
            // Print statement for connection error
            console.error('WebSocket error:', error);
            setError('Failed to connect to WebSocket server');
        };

        setSocket(ws);

        // Cleanup on unmount
        return () => {
            if (ws) {
                ws.close();
            }
        };
    }, []);

    const value = {
        socket,
        isConnected,
        error
    };

    return (
        <WebSocketContext.Provider value={value}>
            {children}
        </WebSocketContext.Provider>
    );
}

export function useWebSocket() {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    return context;
}
