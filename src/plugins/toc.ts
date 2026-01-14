export interface TocItem {
  id: string;
  text: string;
  level: number;
}

export function generateToc(html: string): TocItem[] {
  const headingRegex = /<h([2-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h\1>/gi;
  const toc: TocItem[] = [];
  
  let match;
  while ((match = headingRegex.exec(html)) !== null) {
    const level = parseInt(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]*>/g, ''); // Strip HTML tags
    
    toc.push({ id, text, level });
  }
  
  return toc;
}

export function renderTocHtml(toc: TocItem[]): string {
  if (toc.length === 0) {
    return '';
  }
  
  let html = '<nav class="toc"><div class="toc-title">Table of Contents</div><ul>';
  
  for (const item of toc) {
    const indent = (item.level - 2) * 20;
    html += `<li style="padding-left: ${indent}px"><a href="#${item.id}">${item.text}</a></li>`;
  }
  
  html += '</ul></nav>';
  
  return html;
}
