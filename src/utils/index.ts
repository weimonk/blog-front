import { format } from "date-fns";

export function formatToReadableDate(date: string) {
  return format(new Date(date), "MMMM dd, yyyy");
}
