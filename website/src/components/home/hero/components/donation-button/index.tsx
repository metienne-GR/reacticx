import { HeartPlus } from "lucide-react";

export function DonateButton() {
  return (
    <div className="flex items-center justify-center">
      <a
        href="https://buymeacoffee.com/rit3zh"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full border border-border bg-background px-12 font-medium text-foreground transition-colors duration-300 hover:bg-muted/50 hover:text-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 active:scale-95"
      >
        <div className="flex items-center justify-center gap-2 transition-colors duration-300 group-hover:text-neutral-400">
          <HeartPlus className="h-4 w-4 transition-colors duration-300" />
          <span>Donate Now</span>
        </div>
      </a>
    </div>
  );
}
