import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { AppShell } from "../../../components/layout/app-shell";
import { ApplicationHeader } from "../../../components/layout/application-header";
import { PageContainer } from "../../../components/layout/page-container";
import { DesktopSidebar } from "../../../components/navigation/desktop-sidebar";
import { MobileNavigation } from "../../../components/navigation/mobile-navigation";
import { NewSessionForm } from "../../../features/sessions/components/new-session-form";

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
      <PageContainer size="wide">
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

          <NewSessionForm />
        </div>
      </PageContainer>
    </AppShell>
  );
}
