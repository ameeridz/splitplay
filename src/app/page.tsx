import { AppShell } from "../components/layout/app-shell";
import { ApplicationHeader } from "../components/layout/application-header";
import { DesktopSidebar } from "../components/navigation/desktop-sidebar";
import { MobileNavigation } from "../components/navigation/mobile-navigation";

const financialMetrics = [
  {
    label: "Total expenses",
    value: "RM68.00",
    valueClassName: "text-foreground",
  },
  {
    label: "To receive",
    value: "RM35.00",
    valueClassName: "text-success",
  },
  {
    label: "Outstanding",
    value: "RM20.00",
    valueClassName: "text-warning",
  },
  {
    label: "Participants",
    value: "8",
    valueClassName: "text-foreground",
  },
] as const;

const recentSessions = [
  {
    activity: "Badminton",
    schedule: "Saturday, 9:00 PM",
    venue: "ABC Badminton Centre",
    amount: "RM68.00",
    status: "Partially settled",
    statusClassName: "bg-warning-surface text-warning-foreground",
  },
  {
    activity: "Futsal",
    schedule: "Wednesday, 8:30 PM",
    venue: "Arena Sports Hub",
    amount: "RM120.00",
    status: "Settled",
    statusClassName: "bg-success-surface text-success-foreground",
  },
] as const;

export default function Home() {
  return (
    <AppShell
      sidebar={<DesktopSidebar />}
      header={
        <ApplicationHeader
          title="Sessions"
          description="Manage your sports expenses fairly."
        />
      }
      mobileNavigation={<MobileNavigation />}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        <section
          aria-labelledby="welcome-title"
          className={[
            "overflow-hidden rounded-3xl border border-border",
            "bg-surface p-5 shadow-sm sm:p-7",
          ].join(" ")}
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary">
                SPLITSUKAN
              </p>

              <h2
                id="welcome-title"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Play together. Split fairly.
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Create a sports session, record shared expenses, and keep every
                participant&apos;s balance clear.
              </p>
            </div>

            <span className="w-fit rounded-full bg-info-surface px-3 py-1.5 text-xs font-semibold text-info-foreground">
              AppShell preview
            </span>
          </div>
        </section>

        <section aria-labelledby="overview-title" className="mt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 id="overview-title" className="text-xl font-bold tracking-tight">
                Financial overview
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Preview data for the responsive application shell.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {financialMetrics.map((metric) => (
              <article
                key={metric.label}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <p className="text-sm text-muted-foreground">{metric.label}</p>
                <p
                  className={[
                    "mt-2 text-2xl font-bold tracking-tight",
                    metric.valueClassName,
                  ].join(" ")}
                >
                  {metric.value}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section aria-labelledby="sessions-title" className="mt-8">
          <div>
            <h2 id="sessions-title" className="text-xl font-bold tracking-tight">
              Recent sessions
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Session management will be implemented in a later milestone.
            </p>
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            {recentSessions.map((session) => (
              <article
                key={`${session.activity}-${session.schedule}`}
                className="rounded-2xl border border-border bg-surface p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <h3 className="text-lg font-bold tracking-tight">
                      {session.activity}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {session.schedule}
                    </p>
                    <p className="mt-1 truncate text-sm text-subtle-foreground">
                      {session.venue}
                    </p>
                  </div>

                  <div className="shrink-0 sm:text-right">
                    <p className="text-lg font-bold tracking-tight">
                      {session.amount}
                    </p>
                    <span
                      className={[
                        "mt-2 inline-flex rounded-full px-3 py-1",
                        "text-xs font-semibold",
                        session.statusClassName,
                      ].join(" ")}
                    >
                      {session.status}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section
          aria-labelledby="shell-notes-title"
          className="mt-8 rounded-2xl border border-dashed border-border-strong bg-surface-muted p-5 sm:p-6"
        >
          <h2 id="shell-notes-title" className="text-lg font-bold tracking-tight">
            Responsive shell checkpoint
          </h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
            Mobile and tablet layouts use the floating bottom navigation.
            Laptop and desktop layouts replace it with the left sidebar. The
            sticky header provides a compact Light, Dark, and System appearance
            menu.
          </p>
        </section>
      </div>
    </AppShell>
  );
}
