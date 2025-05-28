export function parseEndDate(raw: FormDataEntryValue | null): Date | null {
  if (typeof raw !== "string" || raw.trim() === "") return null;
  const date = new Date(raw);
    return isNaN(date.getTime()) ? null : date;
}
