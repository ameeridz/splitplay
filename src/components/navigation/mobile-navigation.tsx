"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Plus, Settings } from "lucide-react";

function isSessionsRoute(pathname: string) {
  return (
    pathname === "/" ||
    pathname === "/sessions" ||
    pathname.startsWith("/sessions/")
  );
}

function isSettingsRoute(pathname: string) {
  return pathname === "/settings" || pathname.startsWith("/settings/");
}

export function MobileNavigation() {
  const pathname = usePathname();

  const sessionsActive = isSessionsRoute(pathname);
  const settingsActive = isSettingsRoute(pathname);

  return (
    <nav
      aria-label="Primary navigation"
      className="px-4 pb-[calc(0.75rem+env(safe-area-inset-bottom))]"
    >
      <div
        className={[
          "mx-auto grid w-full max-w-md grid-cols-[1fr_auto_1fr]",
          "items-center gap-2 rounded-[1.75rem] p-2",
          "border border-border/80 bg-surface/90",
          "shadow-[0_1rem_3rem_var(--shadow-color)]",
          "backdrop-blur-2xl supports-backdrop-filter:bg-surface/75",
        ].join(" ")}
      >
        <Link
          href="/"
          aria-current={sessionsActive ? "page" : undefined}
          className={[
            "group relative flex min-h-14 min-w-0 flex-col",
            "items-center justify-center gap-1 rounded-2xl px-3",
            "text-xs font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
            sessionsActive
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          ].join(" ")}
        >
          <CalendarDays
            aria-hidden="true"
            size={21}
            strokeWidth={sessionsActive ? 2.4 : 2}
          />

          <span className="truncate">Sessions</span>

          <span
            aria-hidden="true"
            className={[
              "absolute bottom-1.5 h-1 w-1 rounded-full bg-primary",
              "transition-opacity",
              sessionsActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </Link>

        <Link
          href="/sessions/new"
          aria-label="Create new session"
          className={[
            "-mt-8 flex size-16 shrink-0 items-center justify-center rounded-full",
            "bg-primary text-primary-foreground",
            "shadow-[0_0.75rem_2rem_color-mix(in_oklch,var(--primary)_30%,transparent)]",
            "transition-transform hover:scale-[1.03] hover:bg-primary-hover",
            "active:scale-95",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
            "motion-reduce:transform-none motion-reduce:transition-none",
          ].join(" ")}
        >
          <Plus aria-hidden="true" size={28} strokeWidth={2.4} />
        </Link>

        <Link
          href="/settings"
          aria-current={settingsActive ? "page" : undefined}
          className={[
            "group relative flex min-h-14 min-w-0 flex-col",
            "items-center justify-center gap-1 rounded-2xl px-3",
            "text-xs font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
            settingsActive
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          ].join(" ")}
        >
          <Settings
            aria-hidden="true"
            size={21}
            strokeWidth={settingsActive ? 2.4 : 2}
          />

          <span className="truncate">Settings</span>

          <span
            aria-hidden="true"
            className={[
              "absolute bottom-1.5 h-1 w-1 rounded-full bg-primary",
              "transition-opacity",
              settingsActive ? "opacity-100" : "opacity-0",
            ].join(" ")}
          />
        </Link>
      </div>
    </nav>
  );
}
