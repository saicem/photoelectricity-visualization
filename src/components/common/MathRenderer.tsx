import { useState, useEffect, useMemo, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
import { scheduleKaTeX } from '@/lib/kaTeXScheduler';

interface MathRendererProps {
  children: string;
  className?: string;
  displayMode?: boolean;
}

function SkeletonDisplay() {
  return (
    <div className="w-full py-2" role="presentation" aria-busy="true">
      <div className="h-12 bg-lab-surface rounded-lg animate-pulse relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-lab-border/20 to-transparent shimmer-slide" />
      </div>
    </div>
  );
}

function SkeletonInline() {
  return (
    <span
      className="inline-block w-16 h-4 bg-lab-surface rounded animate-pulse relative align-middle overflow-hidden"
      role="presentation"
      aria-busy="true"
    >
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-lab-border/20 to-transparent shimmer-slide" />
    </span>
  );
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

  if (!html) {
    return isDisplay ? <SkeletonDisplay /> : <SkeletonInline />;
  }

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
