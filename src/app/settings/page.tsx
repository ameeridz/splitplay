import { AppShell } from "../../components/layout/app-shell";
import { ApplicationHeader } from "../../components/layout/application-header";
import { PageContainer } from "../../components/layout/page-container";
import { DesktopSidebar } from "../../components/navigation/desktop-sidebar";
import { MobileNavigation } from "../../components/navigation/mobile-navigation";
import { ThemeSelector } from "../../components/theme/theme-selector";

const settingsSections = [
  {
    title: "Backup and restore",
    description:
      "Export or restore SplitSukan data using a versioned JSON backup.",
    status: "Coming later",
  },
  {
    title: "Local data",
    description:
      "Review local storage information or clear application data safely.",
    status: "Coming later",
  },
  {
    title: "About SplitSukan",
    description:
      "View the application version, product direction, and local-first privacy notes.",
    status: "Coming later",
  },
] as const;

export default function SettingsPage() {
  return (
    <AppShell
      sidebar={<DesktopSidebar />}
      header={
        <ApplicationHeader
          title="Settings"
          description="Manage appearance, backups, and local application data."
        />
      }
      mobileNavigation={<MobileNavigation />}
    >
      <PageContainer size="standard">
        <div className="space-y-8">
          <section
            aria-labelledby="appearance-title"
            className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
              <div className="max-w-xl">
                <p className="text-sm font-semibold tracking-wide text-primary">
                  APPEARANCE
                </p>

                <h2
                  id="appearance-title"
                  className="mt-2 text-xl font-bold tracking-tight sm:text-2xl"
                >
                  Choose your theme
                </h2>

                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Use Light or Dark permanently, or allow SplitSukan to follow
                  the current appearance setting on this device.
                </p>
              </div>

              <div className="w-full sm:w-auto sm:min-w-72">
                <ThemeSelector />
              </div>
            </div>
          </section>

          <section aria-labelledby="preferences-title">
            <div>
              <h2
                id="preferences-title"
                className="text-xl font-bold tracking-tight"
              >
                Application settings
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Additional local-first controls will be added in dedicated
                milestones.
              </p>
            </div>

            <div className="mt-4 space-y-3">
              {settingsSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
                >
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="max-w-2xl">
                      <h3 className="font-bold tracking-tight">
                        {section.title}
                      </h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {section.description}
                      </p>
                    </div>

                    <span className="w-fit shrink-0 rounded-full bg-info-surface px-3 py-1 text-xs font-semibold text-info-foreground">
                      {section.status}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <aside className="rounded-2xl border border-dashed border-border-strong bg-surface-muted p-5 sm:p-6">
            <h2 className="text-base font-bold tracking-tight">
              Your data stays local
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              SplitSukan does not require an account or cloud database for the
              local MVP. Clearing browser data or removing the installed PWA
              may remove locally stored sessions, so JSON backup support will
              be added before the MVP is considered stable.
            </p>
          </aside>
        </div>
      </PageContainer>
    </AppShell>
  );
}
