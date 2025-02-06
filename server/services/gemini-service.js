/*
    File: server/services/gemini-service.js
    Purpose: Provides integration with Google's Gemini 2.0 API for processing
    text and multimodal inputs with enhanced performance.
*/

const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Print statement for initialization
console.log('Initializing Gemini Service...');

// Initialize the Gemini API with the API key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

class GeminiService {
    constructor() {
        // Print statement for model initialization
        console.log('Setting up Gemini 2.0 models...');
        
        // Use Gemini 2.0 Pro Experimental for best performance in coding and world knowledge
        this.model = genAI.getGenerativeModel({ 
            model: 'gemini-2.0-pro-exp-02-05',
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7,
                topP: 0.8,
                topK: 40
            }
        });
        
        // Use Gemini 2.0 Pro Vision for multimodal capabilities
        this.visionModel = genAI.getGenerativeModel({ 
            model: 'gemini-2.0-pro-vision',
            generationConfig: {
                maxOutputTokens: 2048,
                temperature: 0.7,
                topP: 0.8,
                topK: 40
            }
        });
    }

    async processMessage(message) {
        try {
            // Print statement for request processing
            console.log('Processing message with Gemini 2.0 Pro Experimental...');

            // Start a chat session with enhanced configuration
            const chat = this.model.startChat({
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40
                },
            });

            // Send message to Gemini API
            const result = await chat.sendMessage(message);
            const response = await result.response;
            
            // Print statement for successful response
            console.log('Received response from Gemini 2.0 Pro Experimental');
            
            return response.text();
        } catch (error) {
            // Print statement for error handling
            console.error('Error processing message with Gemini:', error);
            throw error;
        }
    }

    async processMultiModal(text, imageData) {
        try {
            // Print statement for multimodal request
            console.log('Processing multimodal input with Gemini 2.0 Pro Vision...');

            // Process the multimodal content with enhanced configuration
            const result = await this.visionModel.generateContent({
                contents: [
                    {
                        role: 'user',
                        parts: [
                            { text },
                            {
                                inlineData: {
                                    data: imageData,
                                    mimeType: 'image/jpeg'
                                }
                            }
                        ]
                    }
                ],
                generationConfig: {
                    maxOutputTokens: 2048,
                    temperature: 0.7,
                    topP: 0.8,
                    topK: 40
                }
            });

            const response = await result.response;
            
            // Print statement for successful response
            console.log('Received multimodal response from Gemini 2.0 Pro Vision');
            
            return response.text();
        } catch (error) {
            // Print statement for error handling
            console.error('Error processing multimodal content with Gemini:', error);
            throw error;
        }
    }
}

module.exports = new GeminiService();
