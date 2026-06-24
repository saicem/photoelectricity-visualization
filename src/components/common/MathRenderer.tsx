import { useEffect, useRef, useState } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

interface MathRendererProps {
  children: string;
  className?: string;
  displayMode?: boolean;
}

export default function MathRenderer({ children, className = '', displayMode }: MathRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [html, setHtml] = useState('');

  useEffect(() => {
    let tex = children;
    let isDisplay = displayMode;

    if (tex.startsWith('$$') && tex.endsWith('$$')) {
      tex = tex.slice(2, -2);
      isDisplay = true;
    } else if (tex.startsWith('$') && tex.endsWith('$')) {
      tex = tex.slice(1, -1);
      isDisplay = isDisplay ?? false;
    }

    try {
      const rendered = katex.renderToString(tex, {
        displayMode: isDisplay ?? false,
        throwOnError: false,
        output: 'html',
        strict: false,
      });
      setHtml(rendered);
    } catch (e) {
      setHtml(children);
    }
  }, [children, displayMode]);

  if (displayMode || children.startsWith('$$')) {
    return (
      <div
        ref={containerRef}
        className={`katex-display-wrapper w-full overflow-x-auto overflow-y-hidden py-2 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return (
    <span
      ref={containerRef}
      className={`katex-inline-wrapper ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
