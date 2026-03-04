"use client";

import React, { useRef } from "react";
import { Check, Copy } from "lucide-react";
import { useCopyButton } from "fumadocs-ui/utils/use-copy-button";

const markdownCache = new Map<string, string>();

interface CopyMarkdownButtonProps {
  markdownUrl: string;
}

function CopyMarkdownButton({ markdownUrl }: CopyMarkdownButtonProps) {
  const [isLoading, setLoading] = React.useState(false);

  const onContentPrefetch = React.useCallback(async () => {
    if (markdownCache.has(markdownUrl)) return;
    try {
      const response = await fetch(markdownUrl);
      const content = await response.text();
      markdownCache.set(markdownUrl, content);
    } catch {
      // Silently fail prefetch
    }
  }, [markdownUrl]);

  const [checked, onClick] = useCopyButton(async () => {
    const cached = markdownCache.get(markdownUrl);
    if (cached) return navigator.clipboard.writeText(cached);

    setLoading(true);
    try {
      const response = await fetch(markdownUrl);
      const content = await response.text();
      markdownCache.set(markdownUrl, content);
      return navigator.clipboard.writeText(content);
    } finally {
      setLoading(false);
    }
  });

  return (
    <button
      onClick={onClick}
      onFocus={onContentPrefetch}
      onMouseEnter={onContentPrefetch}
      onTouchStart={onContentPrefetch}
      disabled={isLoading}
      className="inline-flex items-center gap-1.5 h-7 px-2.5 rounded-md text-xs font-medium
        bg-fd-secondary text-black dark:text-white border border-fd-border
        hover:bg-fd-secondary/80 disabled:opacity-50 transition-colors [&_svg]:size-3"
    >
      {checked ? <Check /> : <Copy />}
      Copy Markdown
    </button>
  );
}

export { CopyMarkdownButton };
