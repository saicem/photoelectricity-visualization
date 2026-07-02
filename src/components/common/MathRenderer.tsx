import { useState, useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import { scheduleKaTeX } from '@/lib/kaTeXScheduler';

interface MathRendererProps {
  children: string;
  className?: string;
  displayMode?: boolean;
}

export default function MathRenderer({ children, className = '', displayMode }: MathRendererProps) {
  const [html, setHtml] = useState('');
  const isDisplay = useMemo(() => displayMode ?? children.startsWith('$$'), [displayMode, children]);
  const mountedRef = useRef(false);

  useEffect(() => {
    mountedRef.current = true;

    let tex = children;

    if (tex.startsWith('$$') && tex.endsWith('$$')) {
      tex = tex.slice(2, -2);
    } else if (tex.startsWith('$') && tex.endsWith('$')) {
      tex = tex.slice(1, -1);
    }

    scheduleKaTeX(
      () => {
        if (!mountedRef.current) return;
        try {
          const result = katex.renderToString(tex, {
            displayMode: isDisplay,
            throwOnError: false,
            output: 'html',
            strict: false,
          });
          if (mountedRef.current) {
            setHtml(result);
          }
        } catch {
          if (mountedRef.current) {
            setHtml(children);
          }
        }
      },
      isDisplay ? 1 : 0,
    );

    return () => {
      mountedRef.current = false;
    };
  }, [children, displayMode, isDisplay]);

  if (isDisplay) {
    return (
      <div
        className={`katex-display-wrapper w-full overflow-x-auto overflow-y-hidden py-2 ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  return <span className={`katex-inline-wrapper ${className}`} dangerouslySetInnerHTML={{ __html: html }} />;
}
