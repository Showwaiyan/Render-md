# rendermd Demo

This is a demonstration of all the features supported by rendermd.

## Introduction

Welcome to **rendermd**! This tool converts Markdown files into beautifully styled HTML pages. It supports all the features you'd expect from a modern Markdown renderer.

## Text Formatting

You can use *italic*, **bold**, ***bold italic***, ~~strikethrough~~, and `inline code`.

### Links and Images

Check out the [rendermd repository](https://github.com/Showwaiyan/Render-md) on GitHub.

## Lists

### Unordered List

- First item
- Second item
  - Nested item 1
  - Nested item 2
- Third item

### Ordered List

1. First step
2. Second step
3. Third step

### Task List

- [x] Set up the project
- [x] Implement core features
- [ ] Write documentation
- [ ] Publish to npm

## Code Blocks

### JavaScript

```javascript
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(10)); // 55
```

### Python

```python
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
```

## Tables

| Feature | Supported | Notes |
|---------|-----------|-------|
| GFM | ✅ | Full support |
| Syntax Highlighting | ✅ | Via Highlight.js |
| Math | ✅ | Via KaTeX |
| Mermaid | ✅ | Client-side rendering |
| Auto TOC | ✅ | From h2-h6 |

## Math Equations

### Inline Math

The quadratic formula is $x = \frac{-b \pm \sqrt{b^2 - 4ac}}{2a}$.

### Block Math

$$
\int_{-\infty}^{\infty} e^{-x^2} dx = \sqrt{\pi}
$$

$$
E = mc^2
$$

## Mermaid Diagrams

### Flowchart

```mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Celebrate!]
    B -->|No| D[Debug]
    D --> E[Fix bugs]
    E --> B
    C --> F[End]
```

### Sequence Diagram

```mermaid
sequenceDiagram
    participant User
    participant CLI
    participant Browser
    User->>CLI: rendermd file.md
    CLI->>CLI: Parse markdown
    CLI->>CLI: Generate HTML
    CLI->>Browser: Open temp file
    Browser->>User: Display styled page
```

## Blockquotes

> This is a blockquote. It can contain multiple paragraphs.
>
> Like this one. Blockquotes can also contain other Markdown elements.

## Horizontal Rule

---

## Advanced Features

### Nested Lists with Code

1. First, install the package:
   ```bash
   npm install -g rendermd
   ```

2. Then run it on any markdown file:
   ```bash
   rendermd README.md
   ```

3. Enjoy the beautiful output!

### Complex Table

| Language | Paradigm | Typing | Year |
|----------|----------|--------|------|
| JavaScript | Multi-paradigm | Dynamic | 1995 |
| Python | Multi-paradigm | Dynamic | 1991 |
| Rust | Multi-paradigm | Static | 2010 |
| Go | Procedural | Static | 2009 |

## Conclusion

**rendermd** makes it easy to preview your Markdown files with professional styling. Try it out today!

Visit the [GitHub repository](https://github.com/Showwaiyan/Render-md) for more information.
