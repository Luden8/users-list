export const PAGE_SIZE = 10;

export const DEPARTMENTS = [
  "Accounting",
  "Business Development",
  "Engineering",
  "Human Resources",
  "Legal",
  "Marketing",
  "Product Management",
  "Research and Development",
  "Sales",
  "Services",
  "Support",
  "Training",
] as const;

export const AGE_RANGES = [
  { label: "All ages", min: 0, max: 200 },
  { label: "18–25", min: 18, max: 25 },
  { label: "26–35", min: 26, max: 35 },
  { label: "36–45", min: 36, max: 45 },
  { label: "46+", min: 46, max: 200 },
] as const;
