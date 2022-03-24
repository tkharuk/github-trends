export const formatDaysAgo = (value) => {
  const date = new Date(value);
  const deltaDays = (date.getTime() - Date.now()) / (1000 * 3600 * 24);
  const formatter = new Intl.RelativeTimeFormat("en", { style: "narrow" });
  const formatted = formatter.format(Math.round(deltaDays), "days");

  return formatted;
};
