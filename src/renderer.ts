import { marked } from 'marked';
import { gfmHeadingId } from 'marked-gfm-heading-id';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { RenderConfig } from './types.js';
import { generateToc, renderTocHtml } from './plugins/toc.js';

// Configure marked with GFM and syntax highlighting
export function configureMarked(config: RenderConfig): void {
  // Add GFM heading IDs for anchor links
  marked.use(gfmHeadingId());

  // Add syntax highlighting if enabled
  if (config.syntaxHighlight) {
    marked.use(
      markedHighlight({
        langPrefix: 'hljs language-',
        highlight(code, lang) {
          const language = hljs.getLanguage(lang) ? lang : 'plaintext';
          return hljs.highlight(code, { language }).value;
        },
      })
    );
  }

  // Enable GFM
  marked.use({
    gfm: true,
    breaks: true,
  });
}

export async function renderMarkdown(
  markdown: string,
  config: RenderConfig,
  filename: string = 'Markdown Preview'
): Promise<string> {
  configureMarked(config);

  // Parse markdown to HTML
  const contentHtml = await marked.parse(markdown);

  // Generate table of contents if enabled
  const toc = config.toc ? generateToc(contentHtml) : [];
  const tocHtml = config.toc ? renderTocHtml(toc) : '';

  // Check if mermaid diagrams are present
  const hasMermaid = (config.mermaid ?? false) && contentHtml.includes('language-mermaid');

  // Check if math is present
  const hasMath = (config.math ?? false) && (markdown.includes('$$') || markdown.includes('$'));

  // Build the complete HTML
  return buildHtml(contentHtml, tocHtml, config, filename, hasMermaid, hasMath);
}

function buildHtml(
  content: string,
  toc: string,
  config: RenderConfig,
  title: string,
  hasMermaid: boolean,
  hasMath: boolean
): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(title)}</title>
  ${getStyles(config)}
  ${config.syntaxHighlight ? getSyntaxHighlightStyles(config.theme) : ''}
  ${hasMath ? getKatexStyles() : ''}
</head>
<body>
  <div class="container">
    ${toc}
    <main class="content">
      ${content}
    </main>
  </div>
  ${config.copyButton ? getCopyButtonScript() : ''}
  ${hasMermaid ? getMermaidScript() : ''}
  ${hasMath ? getKatexScript() : ''}
  ${getTocScrollScript()}
</body>
</html>`;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function getStyles(config: RenderConfig): string {
  return `<style>
    :root {
      --bg-primary: #ffffff;
      --bg-secondary: #f6f8fa;
      --bg-tertiary: #ffffff;
      --text-primary: #24292f;
      --text-secondary: #57606a;
      --border-color: #d0d7de;
      --link-color: #0969da;
      --link-hover: #0550ae;
      --code-bg: #f6f8fa;
      --inline-code-bg: rgba(175, 184, 193, 0.2);
      --blockquote-border: #d0d7de;
      --toc-bg: #f6f8fa;
      --shadow: rgba(0, 0, 0, 0.1);
    }

    ${config.theme === 'dark' || config.theme === 'auto' ? `
    @media (prefers-color-scheme: dark) {
      :root {
        --bg-primary: #0d1117;
        --bg-secondary: #161b22;
        --bg-tertiary: #0d1117;
        --text-primary: #c9d1d9;
        --text-secondary: #8b949e;
        --border-color: #30363d;
        --link-color: #58a6ff;
        --link-hover: #79c0ff;
        --code-bg: #161b22;
        --inline-code-bg: rgba(110, 118, 129, 0.4);
        --blockquote-border: #3b434b;
        --toc-bg: #161b22;
        --shadow: rgba(0, 0, 0, 0.3);
      }
    }` : ''}

    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: var(--text-primary);
      background-color: var(--bg-primary);
      padding: 0;
      margin: 0;
    }

    .container {
      max-width: 1280px;
      margin: 0 auto;
      display: flex;
      gap: 2rem;
      padding: 2rem;
    }

    .content {
      flex: 1;
      min-width: 0;
      max-width: 900px;
      margin: 0 auto;
    }

    .toc {
      position: sticky;
      top: 2rem;
      width: 280px;
      height: fit-content;
      max-height: calc(100vh - 4rem);
      overflow-y: auto;
      background: var(--toc-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1.5rem;
      flex-shrink: 0;
    }

    .toc-title {
      font-weight: 600;
      font-size: 0.875rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      color: var(--text-secondary);
      margin-bottom: 1rem;
    }

    .toc ul {
      list-style: none;
    }

    .toc li {
      margin: 0.5rem 0;
    }

    .toc a {
      color: var(--text-secondary);
      text-decoration: none;
      font-size: 0.875rem;
      transition: color 0.2s;
      display: block;
    }

    .toc a:hover {
      color: var(--link-color);
    }

    @media (max-width: 1024px) {
      .toc {
        display: none;
      }
    }

    h1, h2, h3, h4, h5, h6 {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: 600;
      line-height: 1.25;
      color: var(--text-primary);
    }

    h1 { font-size: 2em; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3em; }
    h2 { font-size: 1.5em; border-bottom: 1px solid var(--border-color); padding-bottom: 0.3em; }
    h3 { font-size: 1.25em; }
    h4 { font-size: 1em; }
    h5 { font-size: 0.875em; }
    h6 { font-size: 0.85em; color: var(--text-secondary); }

    p {
      margin-top: 0;
      margin-bottom: 1em;
    }

    a {
      color: var(--link-color);
      text-decoration: none;
    }

    a:hover {
      color: var(--link-hover);
      text-decoration: underline;
    }

    ul, ol {
      margin-top: 0;
      margin-bottom: 1em;
      padding-left: 2em;
    }

    li + li {
      margin-top: 0.25em;
    }

    blockquote {
      margin: 0 0 1em 0;
      padding: 0 1em;
      color: var(--text-secondary);
      border-left: 4px solid var(--blockquote-border);
    }

    code {
      font-family: ui-monospace, SFMono-Regular, "SF Mono", Menlo, Consolas, "Liberation Mono", monospace;
      font-size: 0.875em;
      background: var(--inline-code-bg);
      padding: 0.2em 0.4em;
      border-radius: 6px;
    }

    pre {
      background: var(--code-bg);
      border: 1px solid var(--border-color);
      border-radius: 8px;
      padding: 1em;
      overflow-x: auto;
      margin-bottom: 1em;
      position: relative;
    }

    pre code {
      background: none;
      padding: 0;
      font-size: 0.875em;
      line-height: 1.5;
    }

    ${config.copyButton ? `
    .code-block-wrapper {
      position: relative;
    }

    .copy-button {
      position: absolute;
      top: 0.5rem;
      right: 0.5rem;
      background: var(--bg-secondary);
      border: 1px solid var(--border-color);
      border-radius: 6px;
      padding: 0.4rem 0.8rem;
      font-size: 0.75rem;
      cursor: pointer;
      opacity: 0;
      transition: opacity 0.2s, background 0.2s;
      color: var(--text-primary);
    }

    pre:hover .copy-button {
      opacity: 1;
    }

    .copy-button:hover {
      background: var(--border-color);
    }

    .copy-button.copied {
      background: #28a745;
      color: white;
      border-color: #28a745;
    }` : ''}

    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1em;
      border: 1px solid var(--border-color);
      border-radius: 8px;
      overflow: hidden;
    }

    th, td {
      padding: 0.75em 1em;
      text-align: left;
      border: 1px solid var(--border-color);
    }

    th {
      background: var(--bg-secondary);
      font-weight: 600;
    }

    tr:nth-child(even) {
      background: var(--bg-secondary);
    }

    img {
      max-width: 100%;
      height: auto;
      border-radius: 8px;
      margin: 1em 0;
    }

    hr {
      height: 1px;
      border: none;
      background: var(--border-color);
      margin: 2em 0;
    }

    /* Task lists */
    input[type="checkbox"] {
      margin-right: 0.5em;
    }

    /* Scrollbar styling */
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    ::-webkit-scrollbar-track {
      background: var(--bg-secondary);
    }

    ::-webkit-scrollbar-thumb {
      background: var(--border-color);
      border-radius: 5px;
    }

    ::-webkit-scrollbar-thumb:hover {
      background: var(--text-secondary);
    }
  </style>`;
}

function getSyntaxHighlightStyles(theme?: string): string {
  const isDark = theme === 'dark' || theme === 'auto';
  const themeFile = isDark ? 'github-dark' : 'github';
  
  // We'll inline the highlight.js CSS
  return `<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/${themeFile}.min.css">`;
}

function getKatexStyles(): string {
  return `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css">`;
}

function getCopyButtonScript(): string {
  return `<script>
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('pre code').forEach((block) => {
        const button = document.createElement('button');
        button.className = 'copy-button';
        button.textContent = 'Copy';
        
        button.addEventListener('click', async () => {
          const code = block.textContent;
          await navigator.clipboard.writeText(code);
          button.textContent = 'Copied!';
          button.classList.add('copied');
          setTimeout(() => {
            button.textContent = 'Copy';
            button.classList.remove('copied');
          }, 2000);
        });
        
        block.parentElement.style.position = 'relative';
        block.parentElement.appendChild(button);
      });
    });
  </script>`;
}

function getMermaidScript(): string {
  return `<script type="module">
    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
    mermaid.initialize({ 
      startOnLoad: true,
      theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'default'
    });
  </script>`;
}

function getKatexScript(): string {
  return `<script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
  <script defer src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/contrib/auto-render.min.js" onload="renderMathInElement(document.body, {
    delimiters: [
      {left: '$$', right: '$$', display: true},
      {left: '$', right: '$', display: false}
    ]
  });"></script>`;
}

function getTocScrollScript(): string {
  return `<script>
    document.addEventListener('DOMContentLoaded', () => {
      const links = document.querySelectorAll('.toc a');
      links.forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const targetId = link.getAttribute('href').substring(1);
          const target = document.getElementById(targetId);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    });
  </script>`;
}
