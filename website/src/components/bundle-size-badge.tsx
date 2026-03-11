import { fetchBundleSize, formatSize } from "@/lib/bundle-size";
import { Package } from "lucide-react";

export type BundleSizeBadgeProps = {
  slug: string;
  className?: string;
};

/**
 * Server Component that displays the gzipped bundle size for a component.
 * Fetches the component source from the API and calculates its size.
 */
export async function BundleSizeBadge({
  slug,
  className,
}: BundleSizeBadgeProps) {
  const size = await fetchBundleSize(slug);

  if (!size) {
    return null;
  }

  return (
    <span
      className={`inline-flex flex-shrink-0 items-center gap-1.5 h-7 px-2 md:px-2.5 rounded-md text-xs font-medium bg-fd-secondary text-black dark:text-white border border-fd-border ${className ?? ""}`}
      title={`Raw: ${formatSize(size.raw)} / Gzipped: ${formatSize(size.gzipped)}`}
    >
      <Package aria-hidden="true" className="size-3" />
      {formatSize(size.gzipped)}
    </span>
  );
}
