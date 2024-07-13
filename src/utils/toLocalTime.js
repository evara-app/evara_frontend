export function convertTime(time, local = "en-US") {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(time).toLocaleDateString(local, options);
}
