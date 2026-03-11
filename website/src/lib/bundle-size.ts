import { gzipSync } from "zlib";

const API_BASE_URL =
  "https://pub-9197ce7f777e4624837aafbc57c580a2.r2.dev/react-native";

export type BundleSizeEntry = {
  raw: number;
  gzipped: number;
};

/**
 * Fetch the component source code and calculate its bundle size.
 * Returns null if the component is not found.
 */
export async function fetchBundleSize(
  componentName: string,
): Promise<BundleSizeEntry | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/${componentName}.tsx`, {
      next: { revalidate: 86400 }, // Cache for 24 hours
    });

    if (!response.ok) {
      return null;
    }

    const code = await response.text();
    const rawSize = Buffer.byteLength(code, "utf8");
    const gzippedSize = gzipSync(code).length;

    return {
      raw: rawSize,
      gzipped: gzippedSize,
    };
  } catch {
    return null;
  }
}

/**
 * Format a byte count into a human-readable string.
 * Returns format like "~0.4 kB" or "~12.5 kB".
 */
export function formatSize(bytes: number): string {
  const kb = bytes / 1024;
  return `~${kb.toFixed(1)} kB`;
}
