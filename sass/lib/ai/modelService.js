// lib/ai/modelService.js
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs/promises';

class DeepSeekService {
  constructor() {
    // Store the command you normally use to run the model
    this.modelConfig = {
      command: './build/bin/llama-simple-chat',
      workingDirectory: '/Users/user/Desktop/llama.cpp',
      modelPath: './models/DeepSeek-R1-Distill-Qwen-1.5B-Q4_K_M.gguf',
      parameters: {
        contextSize: 4096,
        ngl: 0
      }
    };
  }

  async queryModel(userQuery) {
    try {
      // Log the current working directory and command
      console.log('Executing model with configuration:', {
        workingDir: this.modelConfig.workingDirectory,
        command: this.modelConfig.command,
        modelPath: this.modelConfig.modelPath
      });

      // Create the model process using your existing command structure
      const modelProcess = spawn(
        this.modelConfig.command,
        [
          '-m', this.modelConfig.modelPath,
          '-c', this.modelConfig.parameters.contextSize,
          '-ngl', this.modelConfig.parameters.ngl
        ],
        {
          cwd: this.modelConfig.workingDirectory, // Set working directory to llama.cpp folder
          shell: true // This might be needed for the command to work properly
        }
      );

      return new Promise((resolve, reject) => {
        let response = '';
        let errorOutput = '';

        modelProcess.stdout.on('data', (data) => {
          console.log('Model output:', data.toString());
          response += data.toString();
        });

        modelProcess.stderr.on('data', (data) => {
          console.error('Model error output:', data.toString());
          errorOutput += data.toString();
        });

        modelProcess.on('close', (code) => {
          console.log(`Model process exited with code ${code}`);
          if (code === 0) {
            resolve({
              answer: response.trim(),
              timestamp: new Date().toISOString()
            });
          } else {
            reject(new Error(`Model process failed with code ${code}. Error: ${errorOutput}`));
          }
        });

        modelProcess.on('error', (error) => {
          console.error('Failed to start model process:', error);
          reject(error);
        });

        // Send the query to the model
        modelProcess.stdin.write(userQuery + '\n');
        modelProcess.stdin.end();
      });
    } catch (error) {
      console.error('Error in model execution:', error);
      throw error;
    }
  }

  async validateEnvironment() {
    try {
      // Check if we can access the working directory
      await fs.access(this.modelConfig.workingDirectory);
      
      // Check if we can access the model file
      const modelFullPath = path.join(
        this.modelConfig.workingDirectory,
        this.modelConfig.modelPath
      );
      await fs.access(modelFullPath);

      // Check if we can access the executable
      const executablePath = path.join(
        this.modelConfig.workingDirectory,
        this.modelConfig.command
      );
      await fs.access(executablePath);

      return true;
    } catch (error) {
      console.error('Environment validation failed:', error);
      return false;
    }
  }
}

// Create and validate the service before exporting
const deepSeekService = new DeepSeekService();

// Immediately validate the environment
deepSeekService.validateEnvironment()
  .then(isValid => {
    if (!isValid) {
      console.error('DeepSeek service environment validation failed');
    } else {
      console.log('DeepSeek service environment validated successfully');
    }
  });

export { deepSeekService };