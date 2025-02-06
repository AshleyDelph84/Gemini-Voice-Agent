/*
    File: hooks/useGemini.js
    Purpose: Custom hook for managing interactions with the Gemini API through WebSocket
*/

import { useState, useCallback } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';

export function useGemini() {
    const { socket, isConnected } = useWebSocket();
    const [response, setResponse] = useState('');
    const [error, setError] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);

    // Handle incoming Gemini responses
    const handleGeminiResponse = useCallback((event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'GEMINI_RESPONSE') {
            // Print statement for response handling
            console.log('Received Gemini response');
            setResponse(data.response);
            setIsProcessing(false);
            setError(null);
        } else if (data.type === 'ERROR') {
            // Print statement for error handling
            console.error('Received error from server:', data.error);
            setError(data.error);
            setIsProcessing(false);
        }
    }, []);

    // Process text with Gemini
    const processText = useCallback((text) => {
        if (!isConnected) {
            // Print statement for connection check
            console.error('Cannot process text: WebSocket not connected');
            setError('WebSocket not connected');
            return;
        }

        try {
            // Print statement for text processing
            console.log('Sending text to process:', text);
            setIsProcessing(true);
            socket.send(JSON.stringify({
                type: 'PROCESS_TEXT',
                text
            }));

            // Add response handler
            socket.addEventListener('message', handleGeminiResponse);

            // Cleanup
            return () => {
                socket.removeEventListener('message', handleGeminiResponse);
            };
        } catch (err) {
            // Print statement for error handling
            console.error('Error sending text:', err);
            setError('Failed to send text for processing');
            setIsProcessing(false);
        }
    }, [socket, isConnected, handleGeminiResponse]);

    // Process multimodal data with Gemini
    const processMultiModal = useCallback((text, imageData) => {
        if (!isConnected) {
            // Print statement for connection check
            console.error('Cannot process multimodal data: WebSocket not connected');
            setError('WebSocket not connected');
            return;
        }

        try {
            // Print statement for multimodal processing
            console.log('Sending multimodal data to process');
            setIsProcessing(true);
            socket.send(JSON.stringify({
                type: 'PROCESS_MULTIMODAL',
                text,
                imageData
            }));

            // Add response handler
            socket.addEventListener('message', handleGeminiResponse);

            // Cleanup
            return () => {
                socket.removeEventListener('message', handleGeminiResponse);
            };
        } catch (err) {
            // Print statement for error handling
            console.error('Error sending multimodal data:', err);
            setError('Failed to send multimodal data for processing');
            setIsProcessing(false);
        }
    }, [socket, isConnected, handleGeminiResponse]);

    return {
        response,
        error,
        isProcessing,
        processText,
        processMultiModal
    };
}
