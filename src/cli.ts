#!/usr/bin/env node

import { Command } from 'commander';
import { resolve, basename } from 'path';
import { existsSync } from 'fs';
import { renderMarkdown } from './renderer.js';
import { readMarkdownFile, writeTempHtml, cleanupTempFile } from './utils/file.js';
import { openInBrowser } from './utils/browser.js';
import { loadConfig } from './utils/config.js';
import { RenderConfig } from './types.js';

const program = new Command();

program
  .name('rendermd')
  .description('Render Markdown files in the browser with rich styling')
  .version('1.0.0')
  .argument('<file>', 'Markdown file to render')
  .option('-t, --theme <theme>', 'Theme: light, dark, or auto', 'auto')
  .option('--no-toc', 'Disable table of contents')
  .option('--no-line-numbers', 'Disable line numbers in code blocks')
  .option('--no-copy-button', 'Disable copy button in code blocks')
  .option('--no-math', 'Disable math rendering')
  .option('--no-mermaid', 'Disable Mermaid diagram rendering')
  .option('--no-syntax-highlight', 'Disable syntax highlighting')
  .option('--no-auto-cleanup', 'Disable automatic cleanup of temp files')
  .option('--cleanup-delay <ms>', 'Delay before cleaning up temp file (ms)', '60000')
  .action(async (file: string, options: any) => {
    try {
      // Resolve file path
      const filePath = resolve(process.cwd(), file);
      
      // Check if file exists
      if (!existsSync(filePath)) {
        console.error(`Error: File not found: ${filePath}`);
        process.exit(1);
      }

      // Load config from file
      const baseConfig = await loadConfig();

      // Merge with CLI options
      const config: RenderConfig = {
        theme: options.theme || baseConfig.theme,
        toc: options.toc !== undefined ? options.toc : baseConfig.toc,
        lineNumbers: options.lineNumbers !== undefined ? options.lineNumbers : baseConfig.lineNumbers,
        copyButton: options.copyButton !== undefined ? options.copyButton : baseConfig.copyButton,
        math: options.math !== undefined ? options.math : baseConfig.math,
        mermaid: options.mermaid !== undefined ? options.mermaid : baseConfig.mermaid,
        syntaxHighlight: options.syntaxHighlight !== undefined ? options.syntaxHighlight : baseConfig.syntaxHighlight,
        autoCleanup: options.autoCleanup !== undefined ? options.autoCleanup : baseConfig.autoCleanup,
        cleanupDelay: parseInt(options.cleanupDelay) || baseConfig.cleanupDelay || 60000,
      };

      console.log(`Rendering: ${basename(filePath)}`);

      // Read markdown file
      const markdown = await readMarkdownFile(filePath);

      // Render to HTML
      const html = await renderMarkdown(markdown, config, basename(filePath));

      // Write to temp file
      const tempFilePath = await writeTempHtml(html, filePath);
      console.log(`Generated: ${tempFilePath}`);

      // Open in browser
      await openInBrowser(tempFilePath);
      console.log('Opened in browser');

      // Schedule cleanup if enabled
      if (config.autoCleanup) {
        const delay = config.cleanupDelay ?? 60000;
        cleanupTempFile(tempFilePath, delay);
        console.log(`Temp file will be cleaned up in ${delay / 1000}s`);
      } else {
        console.log(`Temp file saved at: ${tempFilePath}`);
      }

    } catch (error) {
      console.error(`Error: ${(error as Error).message}`);
      process.exit(1);
    }
  });

program.parse();
