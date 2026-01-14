# @showwaiyan/rendermd - Project Summary

## Overview

`@showwaiyan/rendermd` is a complete, production-ready CLI tool that renders Markdown files into beautifully styled HTML pages and opens them directly in the browser. No live server required—just instant, polished previews.

## Package Information

- **npm package:** `@showwaiyan/rendermd`
- **CLI command:** `rendermd`
- **Version:** 1.0.0
- **Published:** ✅ Available on npm registry

## What Was Built

### Core Features

1. **CLI Tool** (`rendermd <file>`)
   - Instant markdown to HTML rendering
   - Opens in default browser automatically
   - Cross-platform support (macOS, Linux, Windows)

2. **GitHub Modern Styling**
   - Clean, professional design
   - Automatic light/dark mode based on system preference
   - Responsive layout with sticky table of contents

3. **Full GFM Support**
   - Tables
   - Task lists
   - Strikethrough
   - Autolinks
   - And all standard markdown features

4. **Syntax Highlighting**
   - Powered by Highlight.js
   - Auto-language detection
   - 190+ languages supported
   - Beautiful color schemes

5. **Math Rendering**
   - Inline: `$E = mc^2$`
   - Block: `$$...$$`
   - Powered by KaTeX (fast rendering)

6. **Mermaid Diagrams**
   - Flowcharts
   - Sequence diagrams
   - Gantt charts
   - And more

7. **Auto Table of Contents**
   - Generated from h2-h6 headings
   - Sticky sidebar on desktop
   - Smooth scrolling navigation

8. **Copy Code Button**
   - One-click copying
   - Visual feedback
   - Works on all code blocks

9. **Configuration System**
   - `.rendermdrc` or `.rendermdrc.json`
   - Project-level or user-level configs
   - CLI options override config files

10. **Smart Cleanup**
    - Temp files auto-deleted after 60s (configurable)
    - Can be disabled for permanent files
    - Custom cleanup delays

## Project Structure

```
Render-md/
├── src/
│   ├── cli.ts              # CLI entry point with commander.js
│   ├── index.ts            # Public API exports
│   ├── renderer.ts         # Core markdown → HTML conversion
│   ├── types.ts            # TypeScript type definitions
│   ├── plugins/
│   │   └── toc.ts         # Table of contents generator
│   └── utils/
│       ├── browser.ts     # Cross-platform browser launcher
│       ├── config.ts      # Config file loader
│       └── file.ts        # File I/O operations
├── dist/                   # Compiled JavaScript (generated)
├── .rendermdrc.json       # Example config file
├── example.md             # Demo markdown file
├── package.json           # NPM package configuration
├── tsconfig.json          # TypeScript configuration
├── CHANGELOG.md           # Version history
├── QUICKSTART.md          # Quick start guide
└── README.md              # Full documentation
```

## Technologies Used

### Core Dependencies
- **marked** (v17.0.1) - Markdown parser with GFM support
- **marked-gfm-heading-id** (v4.1.3) - Automatic heading IDs for anchors
- **marked-highlight** (v2.2.3) - Syntax highlighting integration
- **highlight.js** (v11.11.1) - Code syntax highlighting
- **katex** (v0.16.27) - Math rendering
- **commander** (v14.0.2) - CLI framework
- **open** (v11.0.0) - Cross-platform browser launcher

### Dev Dependencies
- **TypeScript** (v5.9.3) - Type safety and modern JS features
- **@types/node** - Node.js type definitions
- **prettier** - Code formatting

## How It Works

1. **Input**: User runs `rendermd file.md`
2. **Config Loading**: Loads settings from `.rendermdrc` (if exists)
3. **File Reading**: Reads the markdown file
4. **Parsing**: Converts markdown to HTML using marked.js
5. **Enhancement**: Adds syntax highlighting, TOC, math, diagrams
6. **Styling**: Wraps content in GitHub Modern styled HTML
7. **Temp File**: Writes complete HTML to `/tmp/rendermd-{hash}.html`
8. **Browser**: Opens file in default browser
9. **Cleanup**: Deletes temp file after delay (optional)

## CLI Usage

```bash
# Basic usage
rendermd README.md

# Options
rendermd file.md --theme dark        # Force dark theme
rendermd file.md --no-toc            # Disable table of contents
rendermd file.md --no-auto-cleanup   # Keep temp file
rendermd file.md --cleanup-delay 120000  # 2-minute cleanup
```

## Configuration File

Create `.rendermdrc.json`:

```json
{
  "theme": "auto",
  "toc": true,
  "lineNumbers": true,
  "copyButton": true,
  "math": true,
  "mermaid": true,
  "syntaxHighlight": true,
  "autoCleanup": true,
  "cleanupDelay": 60000
}
```

## Installation & Publishing

### Local Testing
```bash
npm install
npm run build
npm link
rendermd example.md
```

### Published to npm ✅
```bash
npm publish --access public
```

Users can install globally:
```bash
npm install -g @showwaiyan/rendermd
```

Or use without installing:
```bash
npx @showwaiyan/rendermd README.md
```

## Testing

The tool has been tested with:
- `example.md` - Full feature demonstration
- `README.md` - Real-world documentation
- Various CLI options and configurations

## Next Steps for Users

1. **Install**: `npm install -g @showwaiyan/rendermd`
2. **Try it**: `rendermd README.md`
3. **Configure**: Create `.rendermdrc.json` with your preferences
4. **Enjoy**: Preview markdown files beautifully styled

## Future Enhancements (Optional)

- Custom CSS theme support
- Export to PDF
- Watch mode for auto-refresh
- Plugin system
- More diagram types (PlantUML, Graphviz)
- Presentation/slideshow mode

## Key Benefits

1. **No Server Required** - Unlike many markdown previewers
2. **Self-Contained Output** - All CSS/JS inline, portable HTML
3. **Professional Styling** - GitHub-quality rendering
4. **Feature-Rich** - Math, diagrams, syntax highlighting, TOC
5. **Configurable** - CLI options + config files
6. **Fast** - Instant rendering and opening
7. **Clean** - Auto-cleanup of temp files

## License

ISC License - Free and open source

## Author

showwaiyan

---

**The tool is complete and ready to use!** 🎉
