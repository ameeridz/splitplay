import { ThemeSelector } from "../components/theme/theme-selector";

const statusTokens = [
  {
    label: "Paid",
    description: "Payment completed",
    className: "bg-success-surface text-success-foreground",
  },
  {
    label: "Pending",
    description: "Payment is still required",
    className: "bg-warning-surface text-warning-foreground",
  },
  {
    label: "Information",
    description: "Additional session detail",
    className: "bg-info-surface text-info-foreground",
  },
  {
    label: "Error",
    description: "Action requires attention",
    className: "bg-danger-surface text-danger-foreground",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-8">
        <header className="flex flex-col gap-5 border-b border-border pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-sm font-semibold tracking-wide text-primary">
              SPLITPLAY
            </p>

            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Design foundation
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground sm:text-base">
                Preview the semantic colors and appearance settings that will
                support the SplitPlay interface.
              </p>
            </div>
          </div>

          <ThemeSelector />
        </header>

        <section
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
          aria-labelledby="surface-preview-title"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2
                id="surface-preview-title"
                className="text-xl font-semibold tracking-tight"
              >
                Surface preview
              </h2>

              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Standard cards use semantic surfaces, borders and foreground
                colors.
              </p>
            </div>

            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground">
              Local MVP
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <article className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-muted-foreground">Total expenses</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">RM68.00</p>
            </article>

            <article className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-muted-foreground">To receive</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-success">
                RM35.00
              </p>
            </article>

            <article className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-muted-foreground">Outstanding</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-warning">
                RM20.00
              </p>
            </article>

            <article className="rounded-xl border border-border bg-surface-muted p-4">
              <p className="text-sm text-muted-foreground">Participants</p>
              <p className="mt-2 text-2xl font-bold tracking-tight">8</p>
            </article>
          </div>
        </section>

        <section
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
          aria-labelledby="status-preview-title"
        >
          <div>
            <h2
              id="status-preview-title"
              className="text-xl font-semibold tracking-tight"
            >
              Status colors
            </h2>

            <p className="mt-1 text-sm leading-6 text-muted-foreground">
              Statuses combine labels, descriptions and semantic colors instead
              of depending on color alone.
            </p>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {statusTokens.map((status) => (
              <article
                key={status.label}
                className={[
                  "rounded-xl border border-border p-4",
                  status.className,
                ].join(" ")}
              >
                <p className="font-semibold">{status.label}</p>
                <p className="mt-1 text-sm opacity-80">
                  {status.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="rounded-2xl border border-border bg-surface p-5 shadow-sm sm:p-6"
          aria-labelledby="action-preview-title"
        >
          <h2
            id="action-preview-title"
            className="text-xl font-semibold tracking-tight"
          >
            Action preview
          </h2>

          <p className="mt-1 text-sm leading-6 text-muted-foreground">
            Buttons use semantic primary and secondary action colors.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              className="min-h-11 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
            >
              Create Session
            </button>

            <button
              type="button"
              className="min-h-11 rounded-xl bg-secondary px-5 py-2.5 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-secondary-hover"
            >
              View Details
            </button>

            <button
              type="button"
              className="min-h-11 rounded-xl border border-border-strong bg-surface px-5 py-2.5 text-sm font-semibold text-foreground transition-colors hover:bg-surface-muted"
            >
              Cancel
            </button>
          </div>
        </section>

        <footer className="border-t border-border pt-6 text-sm text-subtle-foreground">
          SplitPlay — Play together. Split fairly.
        </footer>
      </div>
    </main>
  );
}