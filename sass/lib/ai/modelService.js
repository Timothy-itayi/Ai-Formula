// lib/ai/modelService.js
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

class DeepSeekService {
  constructor() {
    // Configure the service to use your specific llama-simple-chat setup
    this.modelConfig = {
      // Path to the llama.cpp build directory containing the executable
      llamaBuildPath: '/Users/user/Desktop/llama.cpp/build/bin',
      // Path to the model file
      modelPath: '/Users/user/Desktop/llama.cpp/models/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf',
      // Specific parameters matching your alias configuration
      parameters: {
        contextSize: 4096,
        ngl: 0  // GPU layers parameter from your configuration
      }
    };
  }

  async queryModel(userQuery) {
    try {
      // Construct the path to llama-simple-chat executable
      const executablePath = path.join(this.modelConfig.llamaBuildPath, 'llama-simple-chat');
      
      // Log the command we're about to execute to help with debugging
      console.log('Executing model with:', {
        executable: executablePath,
        model: this.modelConfig.modelPath,
        contextSize: this.modelConfig.parameters.contextSize,
        ngl: this.modelConfig.parameters.ngl
      });

      // Spawn the process using llama-simple-chat with your configuration
      const llamaProcess = spawn(executablePath, [
        '-m', this.modelConfig.modelPath,
        '-c', this.modelConfig.parameters.contextSize,
        '-ngl', this.modelConfig.parameters.ngl,
        '--prompt', this.buildF1Prompt(userQuery)
      ]);

      return new Promise((resolve, reject) => {
        let response = '';
        let error = '';

        // Capture the model's output
        llamaProcess.stdout.on('data', (data) => {
          const output = data.toString();
          console.log('Model output:', output);
          response += output;
        });

        // Capture any errors
        llamaProcess.stderr.on('data', (data) => {
          const errorOutput = data.toString();
          console.error('Model error:', errorOutput);
          error += errorOutput;
        });

        // Handle process completion
        llamaProcess.on('close', (code) => {
          if (code === 0) {
            resolve(this.processResponse(response));
          } else {
            reject(new Error(`Model process failed with code ${code}. Error: ${error}`));
          }
        });

        // Handle any process errors
        llamaProcess.on('error', (err) => {
          reject(new Error(`Failed to start model process: ${err.message}`));
        });
      });
    } catch (error) {
      console.error('Error in model query:', error);
      throw error;
    }
  }

  buildF1Prompt(userQuery) {
    // Create a conversation-style prompt that matches llama-simple-chat's format
    return `You are an F1 expert assistant. Please help with the following query about Formula 1:
${userQuery}`;
  }

  processResponse(response) {
    // Clean up and structure the model's response
    return {
      answer: this.cleanResponse(response),
      timestamp: new Date().toISOString(),
      model: 'DeepSeek-1.5B',
      metadata: {
        processedAt: new Date().toISOString(),
        modelVersion: 'R1-Distill-Qwen-1.5B'
      }
    };
  }

  cleanResponse(response) {
    // Remove any system prompts or artifacts from the response
    // This method can be expanded based on the actual output format
    return response.trim().replace(/^Assistant: /, '');
  }
}

// Export a singleton instance of the service
export const deepSeekService = new DeepSeekService();