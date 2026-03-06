import type * as React from "react";
import { ComponentSourceClient } from "./client";
import { DynamicCodeBlock } from "fumadocs-ui/components/dynamic-codeblock";

const R2_BASE_URL =
  "https://pub-9197ce7f777e4624837aafbc57c580a2.r2.dev/react-native";

interface ComponentSourceProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string;
  src?: string;
  code?: string;
  lang?: string;
}

/**
 * Strips template literal backticks from code string
 * Handles: `code here` or `code here`;
 */
function stripTemplateLiteral(code: string): string {
  const trimmed = code.trim();

  // Check if wrapped in template literal backticks
  if (
    trimmed.startsWith("`") &&
    (trimmed.endsWith("`") || trimmed.endsWith("`;"))
  ) {
    // Remove starting backtick
    let result = trimmed.slice(1);

    // Remove ending backtick (and optional semicolon)
    if (result.endsWith("`;")) {
      result = result.slice(0, -2);
    } else if (result.endsWith("`")) {
      result = result.slice(0, -1);
    }

    return result.trim();
  }

  return trimmed;
}

export async function ComponentSource({
  name,
  src,
  code,
  lang = "tsx",
  children,
  className,
  ...props
}: ComponentSourceProps) {
  let sourceCode: string | null = null;

  // Priority 1: Use inline code prop if provided
  if (code) {
    sourceCode = stripTemplateLiteral(code);
  }
  // Priority 2: Check if children is a string
  else if (typeof children === "string") {
    sourceCode = stripTemplateLiteral(children);
  }
  // Priority 3: Fetch source from R2 bucket
  else if (name) {
    try {
      const res = await fetch(`${R2_BASE_URL}/${name}.tsx`);
      if (res.ok) {
        sourceCode = await res.text();
      }
    } catch (error) {
      console.error("Error fetching component source:", error);
    }
  }

  return (
    <ComponentSourceClient className={className} {...props}>
      {sourceCode ? (
        <DynamicCodeBlock lang={lang} code={sourceCode} />
      ) : (
        children
      )}
    </ComponentSourceClient>
  );
}
