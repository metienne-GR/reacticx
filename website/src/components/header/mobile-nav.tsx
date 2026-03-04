import { cn } from "#/lib/utils";
import React from "react";
import { navLinks, socialLinks } from "./header";
import { createPortal } from "react-dom";
import Link from "next/link";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleClose = () => setOpen(false);

  return (
    <>
      {/* Animated hamburger button */}
      <button
        type="button"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden cursor-pointer p-2 hover:bg-white/10 rounded-md transition-colors text-white"
        onClick={() => setOpen((v) => !v)}
      >
        <div className="relative w-5 h-5">
          <span
            className={cn(
              "absolute left-0 h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ease-in-out",
              open ? "top-2.25 rotate-45" : "top-1",
            )}
          />
          <span
            className={cn(
              "absolute left-0 top-2.25 h-[1.5px] w-full bg-current rounded-full transition-all duration-200 ease-in-out",
              open ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100",
            )}
          />
          <span
            className={cn(
              "absolute left-0 h-[1.5px] w-full bg-current rounded-full transition-all duration-300 ease-in-out",
              open ? "top-2.25 -rotate-45" : "top-3.5",
            )}
          />
        </div>
      </button>

      {/* Keep portal always mounted so exit animation plays */}
      {mounted &&
        createPortal(
          <div
            className={cn(
              "bg-black/95 backdrop-blur-sm supports-backdrop-filter:bg-black/50",
              "fixed top-14 right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden border-t border-white/10 md:hidden",
              "transition-all duration-300 ease-out",
              open
                ? "opacity-100 translate-y-0 pointer-events-auto"
                : "opacity-0 -translate-y-2 pointer-events-none",
            )}
            id="mobile-menu"
          >
            <div className="size-full p-4 flex flex-col">
              {/* Navigation Links */}
              <div className="grid gap-y-1">
                {navLinks.map((link, i) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={handleClose}
                    className="justify-start gap-3 h-12 text-base inline-flex items-center px-4 rounded-md text-white hover:bg-white/10 transition-all duration-300"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(8px)",
                      transitionDelay: open ? `${i * 50 + 60}ms` : "0ms",
                    }}
                  >
                    <link.icon className="h-5 w-5 opacity-70" />
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div
                className="my-4 h-px bg-white/10 transition-all duration-300"
                style={{
                  opacity: open ? 1 : 0,
                  transitionDelay: open ? "150ms" : "0ms",
                }}
              />

              {/* Social Links */}
              <div className="grid gap-y-1">
                <p
                  className="px-4 py-2 text-xs font-medium text-white/50 uppercase tracking-wider transition-all duration-300"
                  style={{
                    opacity: open ? 1 : 0,
                    transform: open ? "translateY(0)" : "translateY(8px)",
                    transitionDelay: open ? "170ms" : "0ms",
                  }}
                >
                  Connect
                </p>
                {socialLinks.map((link, i) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleClose}
                    className="justify-start gap-3 h-12 text-base inline-flex items-center px-4 rounded-md text-white hover:bg-white/10 transition-all duration-300"
                    style={{
                      opacity: open ? 1 : 0,
                      transform: open ? "translateY(0)" : "translateY(8px)",
                      transitionDelay: open ? `${i * 50 + 210}ms` : "0ms",
                    }}
                  >
                    <link.icon className="h-5 w-5 opacity-70" />
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
