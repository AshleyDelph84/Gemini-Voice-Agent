/*
    File: pages/index.js
    Purpose: Main page component for the Gemini Voice Agent application.
    Provides the user interface for voice recording and displays transcriptions.
*/

import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { useVoiceRecording } from '@/hooks/useVoiceRecording';
import { useWebSocket } from '@/contexts/WebSocketContext';
import { useGemini } from '@/hooks/useGemini';

export default function Home() {
  const { isRecording, error: recordingError, startRecording, stopRecording } = useVoiceRecording();
  const { isConnected, error: connectionError } = useWebSocket();
  const { response, error: geminiError, isProcessing, processText } = useGemini();

  const handleRecordingClick = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Test Gemini API with a simple message
  const testGemini = () => {
    processText('Hello! Can you help me understand what you can do?');
  };

  return (
    <>
      <Head>
        <title>Gemini Voice Agent</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container mx-auto p-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-600">Gemini Voice Agent</h1>
          {/* Connection status indicator */}
          <div className={`mt-2 text-sm ${isConnected ? 'text-green-600' : 'text-red-600'}`}>
            {isConnected ? 'Connected to server' : 'Disconnected from server'}
          </div>
        </header>
        
        <main>
          <div className="flex flex-col items-center gap-4 mb-8">
            <Button 
              onClick={handleRecordingClick}
              variant={isRecording ? 'destructive' : 'default'}
              disabled={!isConnected}
            >
              {isRecording ? 'Stop Recording' : 'Start Recording'}
            </Button>

            {/* Test Gemini button */}
            <Button
              onClick={testGemini}
              disabled={!isConnected || isProcessing}
              variant="default"
            >
              {isProcessing ? 'Processing...' : 'Test Gemini API'}
            </Button>
            
            {/* Error messages */}
            {(recordingError || connectionError || geminiError) && (
              <div className="mt-4 text-sm text-red-600">
                {recordingError || connectionError || geminiError}
              </div>
            )}
          </div>

          <div className="bg-white shadow rounded p-6">
            <h2 className="text-2xl font-semibold mb-4">Response</h2>
            <div className="p-4 bg-gray-50 rounded border border-gray-200 min-h-[100px]">
              {isProcessing ? 'Processing...' : response || 'No response yet...'}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
