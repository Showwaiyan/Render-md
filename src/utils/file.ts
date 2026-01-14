import { readFile, writeFile, unlink } from 'fs/promises';
import { tmpdir } from 'os';
import { join } from 'path';
import { createHash } from 'crypto';

export async function readMarkdownFile(filePath: string): Promise<string> {
  try {
    return await readFile(filePath, 'utf-8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      throw new Error(`File not found: ${filePath}`);
    }
    throw new Error(`Failed to read file: ${(error as Error).message}`);
  }
}

export async function writeTempHtml(content: string, sourceFilePath: string): Promise<string> {
  const hash = createHash('md5')
    .update(sourceFilePath + Date.now())
    .digest('hex')
    .substring(0, 8);
  
  const tempFilePath = join(tmpdir(), `rendermd-${hash}.html`);
  
  await writeFile(tempFilePath, content, 'utf-8');
  
  return tempFilePath;
}

export async function cleanupTempFile(filePath: string, delay: number = 60000): Promise<void> {
  setTimeout(async () => {
    try {
      await unlink(filePath);
    } catch (error) {
      // Ignore cleanup errors
    }
  }, delay);
}
