import open from 'open';

export async function openInBrowser(filePath: string): Promise<void> {
  try {
    await open(filePath, { wait: false });
  } catch (error) {
    throw new Error(`Failed to open browser: ${(error as Error).message}`);
  }
}
