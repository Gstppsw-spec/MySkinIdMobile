export const formatDateToIndo = (dateString?: string | Date | null) => {
  if (!dateString) return "-";

  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formatter.format(date);
};
