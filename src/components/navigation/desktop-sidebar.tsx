"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CalendarDays,
  Plus,
  Settings,
  Split,
} from "lucide-react";

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

export function DesktopSidebar() {
  const pathname = usePathname();

  const sessionsActive = isSessionsRoute(pathname);
  const settingsActive = isSettingsRoute(pathname);

  return (
    <nav
      aria-label="Primary navigation"
      className="flex h-full flex-col px-4 py-5"
    >
      <Link
        href="/"
        aria-label="SplitSukan home"
        className={[
          "flex items-center gap-3 rounded-2xl px-3 py-2",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
          "focus-visible:ring-offset-surface",
        ].join(" ")}
      >
        <span
          aria-hidden="true"
          className={[
            "flex size-11 shrink-0 items-center justify-center rounded-2xl",
            "bg-primary text-primary-foreground",
            "shadow-[0_0.5rem_1.5rem_color-mix(in_oklch,var(--primary)_20%,transparent)]",
          ].join(" ")}
        >
          <Split size={23} strokeWidth={2.3} />
        </span>

        <span className="min-w-0">
          <span className="block truncate text-base font-bold tracking-tight">
            SplitSukan
          </span>
          <span className="block truncate text-xs text-muted-foreground">
            Play together. Split fairly.
          </span>
        </span>
      </Link>

      <Link
        href="/sessions/new"
        className={[
          "mt-7 flex min-h-11 items-center justify-center gap-2 rounded-xl px-4",
          "bg-primary text-sm font-semibold text-primary-foreground",
          "transition-colors hover:bg-primary-hover",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
          "focus-visible:ring-offset-surface",
        ].join(" ")}
      >
        <Plus aria-hidden="true" size={19} strokeWidth={2.4} />
        <span>New Session</span>
      </Link>

      <div className="mt-7 space-y-1">
        <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
          Workspace
        </p>

        <Link
          href="/"
          aria-current={sessionsActive ? "page" : undefined}
          className={[
            "flex min-h-11 items-center gap-3 rounded-xl px-3",
            "text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            "focus-visible:ring-offset-surface",
            sessionsActive
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          ].join(" ")}
        >
          <CalendarDays
            aria-hidden="true"
            size={20}
            strokeWidth={sessionsActive ? 2.4 : 2}
          />
          <span>Sessions</span>
        </Link>

        <Link
          href="/settings"
          aria-current={settingsActive ? "page" : undefined}
          className={[
            "flex min-h-11 items-center gap-3 rounded-xl px-3",
            "text-sm font-medium transition-colors",
            "focus-visible:outline-none focus-visible:ring-2",
            "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
            "focus-visible:ring-offset-surface",
            settingsActive
              ? "bg-primary/12 text-primary"
              : "text-muted-foreground hover:bg-surface-muted hover:text-foreground",
          ].join(" ")}
        >
          <Settings
            aria-hidden="true"
            size={20}
            strokeWidth={settingsActive ? 2.4 : 2}
          />
          <span>Settings</span>
        </Link>
      </div>

      <div className="mt-auto rounded-2xl border border-border bg-surface-muted p-4">
        <p className="text-sm font-semibold text-foreground">Local MVP</p>
        <p className="mt-1 text-xs leading-5 text-muted-foreground">
          Your session data stays on this device until cloud sharing is added
          in a later phase.
        </p>
      </div>
    </nav>
  );
}
