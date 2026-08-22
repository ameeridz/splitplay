"use client";

import { useState } from "react";
import {
  AlertCircle,
  CalendarDays,
  CheckCircle2,
  Clock3,
  MapPin,
  NotebookText,
  Trophy,
} from "lucide-react";

import {
  activityOptions,
  getActivityLabel,
  initialSessionFormValues,
  isCustomActivity,
  type SessionFormErrors,
  type SessionFormValues,
} from "../session-form-model";

const fieldIds: Partial<Record<keyof SessionFormValues, string>> = {
  customActivityName: "custom-activity-name",
  date: "session-date",
  startTime: "session-start-time",
  venue: "session-venue",
};

function validateSessionForm(values: SessionFormValues) {
  const errors: SessionFormErrors = {};

  if (
    isCustomActivity(values.activityType) &&
    !values.customActivityName.trim()
  ) {
    errors.customActivityName = "Enter a custom activity name.";
  }

  if (!values.date) {
    errors.date = "Select a session date.";
  }

  if (!values.startTime) {
    errors.startTime = "Select a start time.";
  }

  if (!values.venue.trim()) {
    errors.venue = "Enter a venue.";
  }

  return errors;
}

function focusFirstInvalidField(errors: SessionFormErrors) {
  const fieldOrder: Array<keyof SessionFormValues> = [
    "customActivityName",
    "date",
    "startTime",
    "venue",
  ];

  const firstInvalidField = fieldOrder.find((field) => errors[field]);
  const firstInvalidFieldId = firstInvalidField
    ? fieldIds[firstInvalidField]
    : undefined;

  if (firstInvalidFieldId) {
    window.requestAnimationFrame(() => {
      document.getElementById(firstInvalidFieldId)?.focus();
    });
  }
}

export function NewSessionForm() {
  const [values, setValues] = useState<SessionFormValues>(
    initialSessionFormValues,
  );
  const [errors, setErrors] = useState<SessionFormErrors>({});
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);

  function updateField<Field extends keyof SessionFormValues>(
    field: Field,
    value: SessionFormValues[Field],
  ) {
    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => {
      if (!currentErrors[field]) {
        return currentErrors;
      }

      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });

    setSubmittedSuccessfully(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateSessionForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmittedSuccessfully(false);
      focusFirstInvalidField(nextErrors);
      return;
    }

    setSubmittedSuccessfully(true);
  }

  function handleReset() {
    setValues(initialSessionFormValues);
    setErrors({});
    setSubmittedSuccessfully(false);
  }

  const activityLabel = isCustomActivity(values.activityType)
    ? values.customActivityName.trim() || "Custom activity"
    : getActivityLabel(values.activityType);

  const errorCount = Object.keys(errors).length;

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
      <form
        aria-labelledby="session-form-title"
        noValidate
        onSubmit={handleSubmit}
        onReset={handleReset}
        className="rounded-3xl border border-border bg-surface p-5 shadow-sm sm:p-7"
      >
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-wide text-primary">
            SESSION DETAILS
          </p>

          <h2
            id="session-form-title"
            className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl"
          >
            Create a sports session
          </h2>

          <p className="mt-3 text-sm leading-6 text-muted-foreground sm:text-base">
            Add the activity, schedule, and venue first. Participants and
            shared expenses will be added after the session is created.
          </p>
        </div>

        {errorCount > 0 ? (
          <div
            role="alert"
            aria-live="assertive"
            className="mt-6 rounded-2xl border border-danger/40 bg-danger-surface p-4 text-danger-foreground"
          >
            <div className="flex items-start gap-3">
              <AlertCircle
                aria-hidden="true"
                size={20}
                strokeWidth={2.3}
                className="mt-0.5 shrink-0"
              />
              <div>
                <p className="text-sm font-bold">
                  Review {errorCount === 1 ? "this field" : "these fields"}{" "}
                    before continuing.
                </p>
                <p className="mt-1 text-xs leading-5 opacity-85">
                  The first invalid field has been focused for correction.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        {submittedSuccessfully ? (
          <div
            role="status"
            aria-live="polite"
            className="mt-6 rounded-2xl border border-success/40 bg-success-surface p-4 text-success-foreground"
          >
            <div className="flex items-start gap-3">
              <CheckCircle2
                aria-hidden="true"
                size={20}
                strokeWidth={2.3}
                className="mt-0.5 shrink-0"
              />
              <div>
                <p className="text-sm font-bold">Session details are valid.</p>
                <p className="mt-1 text-xs leading-5 opacity-85">
                  Local session saving will be connected in a later task.
                </p>
              </div>
            </div>
          </div>
        ) : null}

        <fieldset className="mt-7">
          <legend className="flex items-center gap-2 text-sm font-bold text-foreground">
            <Trophy aria-hidden="true" size={19} strokeWidth={2.2} />
            Activity
          </legend>

          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {activityOptions.map((option) => {
              const selected = values.activityType === option.value;

              return (
                <label
                  key={option.value}
                  className={[
                    "flex min-h-12 cursor-pointer items-center justify-center rounded-xl",
                    "border px-3 py-2 text-center text-sm font-semibold",
                    "transition-colors focus-within:ring-2 focus-within:ring-focus-ring",
                    "focus-within:ring-offset-2 focus-within:ring-offset-background",
                    selected
                      ? "border-primary bg-primary/12 text-primary"
                      : "border-border bg-surface-muted text-muted-foreground hover:border-border-strong hover:text-foreground",
                  ].join(" ")}
                >
                  <input
                    type="radio"
                    name="activityType"
                    value={option.value}
                    checked={selected}
                    onChange={() => {
                      updateField("activityType", option.value);

                      if (option.value !== "other") {
                        setErrors((currentErrors) => {
                          if (!currentErrors.customActivityName) {
                            return currentErrors;
                          }

                          const nextErrors = { ...currentErrors };
                          delete nextErrors.customActivityName;
                          return nextErrors;
                        });
                      }
                    }}
                    className="sr-only"
                  />
                  {option.label}
                </label>
              );
            })}
          </div>
        </fieldset>

        {isCustomActivity(values.activityType) ? (
          <div className="mt-5">
            <label
              htmlFor="custom-activity-name"
              className="text-sm font-bold text-foreground"
            >
              Custom activity name
            </label>
            <input
              id="custom-activity-name"
              name="customActivityName"
              type="text"
              value={values.customActivityName}
              onChange={(event) =>
                updateField("customActivityName", event.target.value)
              }
              placeholder="Example: Basketball"
              autoComplete="off"
              aria-invalid={Boolean(errors.customActivityName)}
              aria-describedby={
                errors.customActivityName
                  ? "custom-activity-name-error custom-activity-name-help"
                  : "custom-activity-name-help"
              }
              className={[
                "mt-2 min-h-11 w-full rounded-xl border bg-input px-3",
                "text-sm text-foreground outline-none transition-colors",
                "placeholder:text-subtle-foreground hover:bg-input-hover",
                "focus:ring-2 focus:ring-focus-ring",
                errors.customActivityName
                  ? "border-danger"
                  : "border-border focus:border-primary",
              ].join(" ")}
            />
            {errors.customActivityName ? (
              <p
                id="custom-activity-name-error"
                className="mt-2 text-sm font-medium text-danger"
              >
                {errors.customActivityName}
              </p>
            ) : null}
            <p
              id="custom-activity-name-help"
              className="mt-2 text-xs leading-5 text-muted-foreground"
            >
              Enter the sport or activity when it is not listed above.
            </p>
          </div>
        ) : null}

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="session-date"
              className="flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <CalendarDays aria-hidden="true" size={19} strokeWidth={2.2} />
              Date
            </label>
            <input
              id="session-date"
              name="date"
              type="date"
              value={values.date}
              onChange={(event) => updateField("date", event.target.value)}
              aria-invalid={Boolean(errors.date)}
              aria-describedby={errors.date ? "session-date-error" : undefined}
              className={[
                "mt-2 min-h-11 w-full rounded-xl border bg-input px-3",
                "text-sm text-foreground outline-none transition-colors",
                "hover:bg-input-hover focus:ring-2 focus:ring-focus-ring",
                errors.date
                  ? "border-danger"
                  : "border-border focus:border-primary",
              ].join(" ")}
            />
            {errors.date ? (
              <p
                id="session-date-error"
                className="mt-2 text-sm font-medium text-danger"
              >
                {errors.date}
              </p>
            ) : null}
          </div>

          <div>
            <label
              htmlFor="session-start-time"
              className="flex items-center gap-2 text-sm font-bold text-foreground"
            >
              <Clock3 aria-hidden="true" size={19} strokeWidth={2.2} />
              Start time
            </label>
            <input
              id="session-start-time"
              name="startTime"
              type="time"
              value={values.startTime}
              onChange={(event) =>
                updateField("startTime", event.target.value)
              }
              aria-invalid={Boolean(errors.startTime)}
              aria-describedby={
                errors.startTime ? "session-start-time-error" : undefined
              }
              className={[
                "mt-2 min-h-11 w-full rounded-xl border bg-input px-3",
                "text-sm text-foreground outline-none transition-colors",
                "hover:bg-input-hover focus:ring-2 focus:ring-focus-ring",
                errors.startTime
                  ? "border-danger"
                  : "border-border focus:border-primary",
              ].join(" ")}
            />
            {errors.startTime ? (
              <p
                id="session-start-time-error"
                className="mt-2 text-sm font-medium text-danger"
              >
                {errors.startTime}
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          <label
            htmlFor="session-venue"
            className="flex items-center gap-2 text-sm font-bold text-foreground"
          >
            <MapPin aria-hidden="true" size={19} strokeWidth={2.2} />
            Venue
          </label>
          <input
            id="session-venue"
            name="venue"
            type="text"
            value={values.venue}
            onChange={(event) => updateField("venue", event.target.value)}
            placeholder="Example: ABC Badminton Centre"
            autoComplete="off"
            aria-invalid={Boolean(errors.venue)}
            aria-describedby={errors.venue ? "session-venue-error" : undefined}
            className={[
              "mt-2 min-h-11 w-full rounded-xl border bg-input px-3",
              "text-sm text-foreground outline-none transition-colors",
              "placeholder:text-subtle-foreground hover:bg-input-hover",
              "focus:ring-2 focus:ring-focus-ring",
              errors.venue
                ? "border-danger"
                : "border-border focus:border-primary",
            ].join(" ")}
          />
          {errors.venue ? (
            <p
              id="session-venue-error"
              className="mt-2 text-sm font-medium text-danger"
            >
              {errors.venue}
            </p>
          ) : null}
        </div>

        <div className="mt-5">
          <label
            htmlFor="session-note"
            className="flex items-center gap-2 text-sm font-bold text-foreground"
          >
            <NotebookText aria-hidden="true" size={19} strokeWidth={2.2} />
            Note
            <span className="font-normal text-muted-foreground">Optional</span>
          </label>
          <textarea
            id="session-note"
            name="note"
            value={values.note}
            onChange={(event) => updateField("note", event.target.value)}
            placeholder="Example: Court 3 and Court 4"
            rows={4}
            className={[
              "mt-2 w-full resize-y rounded-xl border border-border bg-input",
              "px-3 py-3 text-sm text-foreground outline-none transition-colors",
              "placeholder:text-subtle-foreground hover:bg-input-hover",
              "focus:border-primary focus:ring-2 focus:ring-focus-ring",
            ].join(" ")}
          />
        </div>

        <div className="mt-7 flex flex-col-reverse gap-3 border-t border-border pt-6 sm:flex-row sm:justify-end">
          <button
            type="reset"
            className={[
              "min-h-11 rounded-xl border border-border-strong bg-surface px-5",
              "text-sm font-semibold text-foreground transition-colors",
              "hover:bg-surface-muted focus-visible:outline-none",
              "focus-visible:ring-2 focus-visible:ring-focus-ring",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            ].join(" ")}
          >
            Reset
          </button>

          <button
            type="submit"
            className={[
              "min-h-11 rounded-xl bg-primary px-5",
              "text-sm font-semibold text-primary-foreground",
              "transition-colors hover:bg-primary-hover",
              "focus-visible:outline-none focus-visible:ring-2",
              "focus-visible:ring-focus-ring focus-visible:ring-offset-2",
              "focus-visible:ring-offset-background",
            ].join(" ")}
          >
            Create Session
          </button>
        </div>
      </form>

      <aside className="h-fit rounded-3xl border border-border bg-surface p-5 shadow-sm xl:sticky xl:top-24">
        <p className="text-sm font-semibold tracking-wide text-primary">
          LIVE PREVIEW
        </p>
        <h2 className="mt-2 text-xl font-bold tracking-tight">
          {activityLabel}
        </h2>

        <dl className="mt-5 space-y-4">
          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
              Date
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {values.date || "Not selected"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
              Start time
            </dt>
            <dd className="mt-1 text-sm font-medium text-foreground">
              {values.startTime || "Not selected"}
            </dd>
          </div>

          <div>
            <dt className="text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
              Venue
            </dt>
            <dd className="mt-1 wrap-break-word text-sm font-medium text-foreground">
              {values.venue.trim() || "Not entered"}
            </dd>
          </div>

          {values.note.trim() ? (
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-subtle-foreground">
                Note
              </dt>
              <dd className="mt-1 whitespace-pre-wrap wrap-break-word text-sm leading-6 text-foreground">
                {values.note.trim()}
              </dd>
            </div>
          ) : null}
        </dl>

        <div
          className={[
            "mt-6 rounded-2xl p-4",
            submittedSuccessfully
              ? "bg-success-surface text-success-foreground"
              : "bg-info-surface text-info-foreground",
          ].join(" ")}
        >
          <p className="text-sm font-semibold">
            {submittedSuccessfully
              ? "Ready for local saving"
              : "Saved locally later"}
          </p>
          <p className="mt-1 text-xs leading-5 opacity-80">
            {submittedSuccessfully
              ? "The form is valid. Local session creation will be connected in the next milestone."
              : "Complete the required fields, then select Create Session to validate the form."}
          </p>
        </div>
      </aside>
    </div>
  );
}
