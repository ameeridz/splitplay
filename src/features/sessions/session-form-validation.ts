import {
  isCustomActivity,
  type SessionFormErrors,
  type SessionFormValues,
} from "./session-form-model";

export const sessionFormFieldOrder: Array<keyof SessionFormValues> = [
  "customActivityName",
  "date",
  "startTime",
  "venue",
];

export function validateSessionForm(values: SessionFormValues) {
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

export function getFirstInvalidSessionField(errors: SessionFormErrors) {
  return sessionFormFieldOrder.find((field) => errors[field]);
}
