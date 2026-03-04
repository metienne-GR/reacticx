"use client";

import * as React from "react";
import { Preview } from "./preview";
import { PreviewComment } from "./preview-comment";

interface PreviewClientProps {
  children: React.ReactNode;
  className?: string;
  isPremium?: boolean;
  link: string;
  useIframe?: boolean;
  height?: string;
  compact?: boolean;
  comment?: string[];
}

function PreviewClient(props: PreviewClientProps) {
  const [key, setKey] = React.useState(0);

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  return (
    <div className="relative">
      <div key={key}>
        <Preview {...props} />
      </div>
    </div>
  );
}

export { PreviewClient, PreviewComment };
