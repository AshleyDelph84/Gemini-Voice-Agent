/*
    File: hooks/useVoiceRecording.js
    Purpose: Custom hook for managing voice recording state and WebSocket communication
    for audio transmission.
*/

import { useState, useCallback } from 'react';
import { useWebSocket } from '@/contexts/WebSocketContext';

export function useVoiceRecording() {
    const { socket, isConnected } = useWebSocket();
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState(null);

    const startRecording = useCallback(() => {
        if (!isConnected) {
            // Print statement for connection check
            console.error('Cannot start recording: WebSocket not connected');
            setError('WebSocket not connected');
            return;
        }

        try {
            // Print statement for recording start
            console.log('Starting recording...');
            socket.send(JSON.stringify({ type: 'START_RECORDING' }));
            setIsRecording(true);
            setError(null);
        } catch (err) {
            // Print statement for error handling
            console.error('Error starting recording:', err);
            setError('Failed to start recording');
        }
    }, [socket, isConnected]);

    const stopRecording = useCallback(() => {
        if (!isConnected) {
            // Print statement for connection check
            console.error('Cannot stop recording: WebSocket not connected');
            setError('WebSocket not connected');
            return;
        }

        try {
            // Print statement for recording stop
            console.log('Stopping recording...');
            socket.send(JSON.stringify({ type: 'STOP_RECORDING' }));
            setIsRecording(false);
            setError(null);
        } catch (err) {
            // Print statement for error handling
            console.error('Error stopping recording:', err);
            setError('Failed to stop recording');
        }
    }, [socket, isConnected]);

    return {
        isRecording,
        error,
        startRecording,
        stopRecording
    };
}
