import type { ReactNode } from "react";

type AppShellProps = {
  children: ReactNode;
  header?: ReactNode;
  sidebar?: ReactNode;
  mobileNavigation?: ReactNode;
};

export function AppShell({
  children,
  header,
  sidebar,
  mobileNavigation,
}: AppShellProps) {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <div className="mx-auto min-h-dvh w-full lg:grid lg:grid-cols-[17rem_minmax(0,1fr)]">
        {sidebar ? (
          <aside className="hidden border-r border-border bg-surface lg:block">
            <div className="sticky top-0 h-dvh">{sidebar}</div>
          </aside>
        ) : null}

        <div className="flex min-h-dvh min-w-0 flex-col">
          {header ? (
            <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur-xl supports-backdrop-filter:bg-background/75">
              {header}
            </header>
          ) : null}

          <main
            id="main-content"
            className={[
              "min-w-0 flex-1",
              mobileNavigation
                ? "pb-[calc(6.5rem+env(safe-area-inset-bottom))] lg:pb-0"
                : "",
            ].join(" ")}
          >
            {children}
          </main>
        </div>
      </div>

      {mobileNavigation ? (
        <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
          {mobileNavigation}
        </div>
      ) : null}
    </div>
  );
}