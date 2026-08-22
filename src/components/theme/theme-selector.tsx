"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";

const themeOptions = [
  {
    value: "light",
    label: "Light",
  },
  {
    value: "dark",
    label: "Dark",
  },
  {
    value: "system",
    label: "System",
  },
] as const;

function subscribe() {
  return () => {};
}

export function ThemeSelector() {
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const { theme, setTheme } = useTheme();

  if (!mounted) {
    return (
      <div
        className="h-11 w-full animate-pulse rounded-xl bg-surface-muted sm:w-auto sm:min-w-72"
        aria-hidden="true"
      />
    );
  }

  return (
    <fieldset className="w-full sm:w-auto">
      <legend className="sr-only">Choose appearance theme</legend>

      <div className="grid grid-cols-3 rounded-xl border border-border bg-surface-muted p-1">
        {themeOptions.map((option) => {
          const isSelected = theme === option.value;

          return (
            <label
              key={option.value}
              className={[
                "relative flex min-h-9 cursor-pointer items-center justify-center rounded-lg px-4 py-2",
                "text-sm font-medium transition-colors",
                "focus-within:ring-2 focus-within:ring-focus-ring focus-within:ring-offset-2",
                "focus-within:ring-offset-background",
                isSelected
                  ? "bg-surface text-foreground shadow-sm"
                  : "text-muted-foreground hover:bg-input-hover hover:text-foreground",
              ].join(" ")}
            >
              <input
                type="radio"
                name="theme"
                value={option.value}
                checked={isSelected}
                onChange={() => setTheme(option.value)}
                className="sr-only"
              />

              {option.label}
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}