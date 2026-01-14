# Quick Start Guide

Get started with `@showwaiyan/rendermd` in 30 seconds!

## Installation

```bash
npm install -g @showwaiyan/rendermd
```

Or use without installing:

```bash
npx @showwaiyan/rendermd README.md
```

## Basic Usage

```bash
# Render any markdown file
rendermd README.md

# That's it! Your browser will open with a beautifully styled version
```

## Common Commands

```bash
# Dark theme
rendermd docs.md --theme dark

# Disable table of contents
rendermd notes.md --no-toc

# Keep the HTML file (don't auto-delete)
rendermd article.md --no-auto-cleanup
```

## Configuration

Create `.rendermdrc.json` in your project:

```json
{
  "theme": "dark",
  "toc": true,
  "copyButton": true
}
```

## What Gets Rendered?

- ✅ GitHub Flavored Markdown
- ✅ Syntax-highlighted code blocks
- ✅ Math equations ($...$, $$...$$)
- ✅ Mermaid diagrams
- ✅ Tables, task lists, and more
- ✅ Auto-generated table of contents

## Example

Try it with the included example:

```bash
rendermd example.md
```

## Need Help?

```bash
rendermd --help
```

Visit [GitHub](https://github.com/Showwaiyan/Render-md) for full documentation.
