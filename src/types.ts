export interface RenderConfig {
  theme?: 'light' | 'dark' | 'auto';
  toc?: boolean;
  lineNumbers?: boolean;
  copyButton?: boolean;
  math?: boolean;
  mermaid?: boolean;
  syntaxHighlight?: boolean;
  autoCleanup?: boolean;
  cleanupDelay?: number; // in milliseconds
}

export const DEFAULT_CONFIG: RenderConfig = {
  theme: 'auto',
  toc: true,
  lineNumbers: true,
  copyButton: true,
  math: true,
  mermaid: true,
  syntaxHighlight: true,
  autoCleanup: true,
  cleanupDelay: 60000, // 60 seconds
};
