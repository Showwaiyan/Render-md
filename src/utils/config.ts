import { readFile } from 'fs/promises';
import { existsSync } from 'fs';
import { homedir } from 'os';
import { join } from 'path';
import { RenderConfig, DEFAULT_CONFIG } from '../types.js';

export async function loadConfig(): Promise<RenderConfig> {
  const configPaths = [
    join(process.cwd(), '.rendermdrc'),
    join(process.cwd(), '.rendermdrc.json'),
    join(homedir(), '.rendermdrc'),
    join(homedir(), '.rendermdrc.json'),
  ];

  for (const configPath of configPaths) {
    if (existsSync(configPath)) {
      try {
        const content = await readFile(configPath, 'utf-8');
        const userConfig = JSON.parse(content);
        return { ...DEFAULT_CONFIG, ...userConfig };
      } catch (error) {
        console.warn(`Warning: Failed to parse config file at ${configPath}`);
      }
    }
  }

  return DEFAULT_CONFIG;
}
