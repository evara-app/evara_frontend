export function convertTime(time, local) {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return new Date(time).toLocaleDateString(local, options);
}
