export const formatDate = (dateValue, needTime = false) => {
  try {
    const date = new Date(dateValue);
    if (isNaN(date.getTime())) return dateValue;

    const dateOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };

    const datePart = date.toLocaleDateString("en-US", dateOptions);

    if (!needTime) return datePart;

    const timePart = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return `${datePart}, ${timePart}`;
  } catch (error) {
    return dateValue;
  }
};

export function getTimeToResponse(viewedAt, respondedAt) {
  const start = new Date(viewedAt);
  const end = new Date(respondedAt);

  const diffMs = end - start; // difference in milliseconds
  if (isNaN(diffMs) || diffMs < 0) return "Invalid";

  const diffSeconds = Math.floor(diffMs / 1000);
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  if (hours > 0) {
    return `${pad(hours)}h ${pad(minutes)}m ${pad(seconds)}s`;
  }
  return `${pad(minutes)}m ${pad(seconds)}s`;
}

function pad(num) {
  return String(num).padStart(2, "0");
}
