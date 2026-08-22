import Link from "next/link";
import { ArrowLeft, CalendarDays, Clock3, MapPin, Trophy } from "lucide-react";

import { AppShell } from "../../../components/layout/app-shell";
import { ApplicationHeader } from "../../../components/layout/application-header";
import { PageContainer } from "../../../components/layout/page-container";
import { DesktopSidebar } from "../../../components/navigation/desktop-sidebar";
import { MobileNavigation } from "../../../components/navigation/mobile-navigation";

const sessionFields = [
  {
    label: "Activity",
    value: "Badminton",
    helper: "Choose Badminton, Futsal, Pickleball, or another activity.",
    icon: Trophy,
  },
  {
    label: "Date",
    value: "Select a date",
    helper: "The local calendar date of the sports session.",
    icon: CalendarDays,
  },
  {
    label: "Start time",
    value: "Select a time",
    helper: "The expected starting time for the session.",
    icon: Clock3,
  },
  {
    label: "Venue",
    value: "Enter a venue",
    helper: "Court, field, gym, or another meeting location.",
    icon: MapPin,
  },
] as const;

export default function NewSessionPage() {
  return (
    <AppShell
      sidebar={<DesktopSidebar />}
      header={
        <ApplicationHeader
          title="New Session"
          description="Set up the basic details for a sports session."
        />
      }
      mobileNavigation={<MobileNavigation />}
    >
      <PageContainer size="standard">
        <div className="space-y-6">
          <Link
            href="/"
            className={[
              "inline-flex min-h-11 items-center gap-2 rounded-xl px-3",
              "text-sm font-semibold text-muted-foreground",
              "transition-colors hover:bg-surface-muted hover:text-foreground",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
            ].join(" ")}
          >
            <ArrowLeft aria-hidden="true" size={19} strokeWidth={2.3} />
            <span>Back to Sessions</span>
          </Link>

          <section
            aria-labelledby="session-details-title"
            className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
          >
            <div className="max-w-2xl">
              <p className="text-sm font-semibold tracking-wide text-primary">
                SESSION DETAILS
              </p>

              <h2
                id="session-details-title"
                className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
              >
                Create a sports session
              </h2>

              <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
                Add the activity, schedule, and venue first. Participants and
                shared expenses will be added after the session is created.
              </p>
            </div>

            <div className="mt-7 grid gap-4 sm:grid-cols-2">
              {sessionFields.map((field) => {
                const FieldIcon = field.icon;

                return (
                  <article
                    key={field.label}
                    className="rounded-2xl border border-border bg-surface-muted p-4"
                  >
                    <div className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground"
                      >
                        <FieldIcon size={19} strokeWidth={2.2} />
                      </span>

                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-foreground">
                          {field.label}
                        </p>
                        <p className="mt-1 text-sm text-primary">
                          {field.value}
                        </p>
                        <p className="mt-2 text-xs leading-5 text-muted-foreground">
                          {field.helper}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>

          <section
            aria-labelledby="form-status-title"
            className="rounded-2xl border border-dashed border-border-strong bg-surface-muted p-5 sm:p-6"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="max-w-2xl">
                <h2
                  id="form-status-title"
                  className="text-lg font-bold tracking-tight"
                >
                  Form foundation only
                </h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Input controls, validation, and local session creation will be
                  implemented in dedicated tasks. This route currently confirms
                  the responsive layout and navigation flow.
                </p>
              </div>

              <button
                type="button"
                disabled
                className="min-h-11 shrink-0 cursor-not-allowed rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-50"
              >
                Create Session
              </button>
            </div>
          </section>
        </div>
      </PageContainer>
    </AppShell>
  );
}
