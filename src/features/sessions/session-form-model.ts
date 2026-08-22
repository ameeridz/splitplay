export const activityOptions = [
  {
    value: "badminton",
    label: "Badminton",
  },
  {
    value: "futsal",
    label: "Futsal",
  },
  {
    value: "pickleball",
    label: "Pickleball",
  },
  {
    value: "other",
    label: "Other",
  },
] as const;

export type ActivityType = (typeof activityOptions)[number]["value"];

export type SessionFormValues = {
  activityType: ActivityType;
  customActivityName: string;
  date: string;
  startTime: string;
  venue: string;
  note: string;
};

export type SessionFormErrors = Partial<
  Record<keyof SessionFormValues, string>
>;

export const initialSessionFormValues: SessionFormValues = {
  activityType: "badminton",
  customActivityName: "",
  date: "",
  startTime: "",
  venue: "",
  note: "",
};

export function isCustomActivity(activityType: ActivityType) {
  return activityType === "other";
}

export function getActivityLabel(activityType: ActivityType) {
  return (
    activityOptions.find((option) => option.value === activityType)?.label ??
    "Other"
  );
}
